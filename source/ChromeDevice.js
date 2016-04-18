
"use strict";

var settings = require ('settings');
require('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:chromedevice');
var EventEmitter = require ('events').EventEmitter;

var Interpreter = require ('./interpreter.js');

Interpreter.prototype.createConnectedObject = function (obj)
{
	if (typeof obj === "function") return this.createNativeFunction (obj);
	else
	{
		var cobj = this.createObject (this.OBJECT);
		cobj.isReal = true;
		cobj.connectedObject = obj;
		return cobj;
	}
};

var Interpreter_setProperty = Interpreter.prototype.setProperty;

Interpreter.prototype.setProperty = function (obj, name, value, opt_fixed, opt_nonenum)
{
	if (!obj || !obj.isReal) return Interpreter_setProperty.apply (this, arguments);
	else obj.connectedObject[name.toString()] = this.convertToNative (value);
};

var Interpreter_getProperty = Interpreter.prototype.getProperty;

Interpreter.prototype.getProperty = function (obj, name)
{
	if (!obj || !obj.isReal) return Interpreter_getProperty.apply (this, arguments);
	else
	{
		var async = false;
		var namestring = name.toString ();
		console.log (namestring);
		var member = obj.connectedObject [namestring];
		if (!member)
		{
			async = true;
			member = obj.connectedObject[namestring+'_async'];
		}
		if (member && typeof member === "object") return this.createConnectedObject (member);
		else if (member && typeof member === "function")
		{
			if (async === true) return this.createAsyncFunction (member);
			else return this.createNativeFunction (member);
		}
		return this.createPrimitive (member);
	}
};

var Firmata = require ('firmata');

var msgpack = require ('msgpack-lite');

const CONNECTING = 1;
const SEPARRATOR = 2;
const CONNECTED = 3;
const ERROR = 4;
const DISCONNECTED = 5;

var connection = null;

export default class ChromeDevice extends EventEmitter
{
	constructor ()
	{
		super ();
		debug ('Verifying if there is any connection');
		this.status = CONNECTING;
		this.running = false;
		
		if (connection === null)
		{
			connection = this;
		}
		else
		{
			debug ('Connection already exists');
			return connection;
		}

		debug ('Connecting');
		var that = this;
		process.nextTick (function ()
		{
			that.status = CONNECTED;
			that.emit ('connected');

			that.on ('send', that.status_function);
			that.on ('send', that.ping);
			that.on ('send', that.program);

			that.reply ('', null);
			that.status_function ('i');
			that.capabilities ();
		});
	}

	status_function (t, p)
	{
		if (t === 'i')
		{
			this.reply ('i', {c:'chrome', n:'', r: this.running, i:navigator.onLine});
		}
	}

	ping (t, p)
	{
		if (t === 'ping')
		{
			this.reply ('pong', null);
		}
	}

	capabilities ()
	{
		this.reply ('capabilities', {l:{'visual':true, 'nodejs':true}});
	}

	program (t, p)
	{
		var that = this;

		function log (text)
		{
			that.reply ('p', {a:'k', t:text.toString().replace (/\n/g,'\r\n')+'\r\n'});
		}

		function stringify (object)
		{
			return JSON.stringify (object);
		}

		function initApi(interpreter, scope) 
		{
			var environment = {
				delay: 100,

			};

			var wyliodrin_console = {
				log: log
			};

			var wyliodrin_firmata = {
				firmata: null,
				analog_pins: {},
				digital_pins: {},
				delay_async: function (millis, callback)
				{
					environment.delay = millis;
					process.nextTick (function ()
					{
						callback(interpreter.createPrimitive (undefined));
					});
				},
				connect_async: function (port, callback)
				{
					wyliodrin_firmata.firmata = new Firmata (port.data, function (err)
					{
						console.log (err);
						if (err) callback (interpreter.createPrimitive (false));
						else callback (interpreter.createPrimitive (true));
					});
				},
				pinMode: function (pin, mode)
				{
					wyliodrin_firmata.firmata.pinMode (pin.data, mode.data);
				},
				analogRead_async: function (pin, callback)
				{
					if (wyliodrin_firmata.analog_pins[pin.data] === undefined)
					{
						wyliodrin_firmata.firmata.analogRead (pin.data, function (value)
						{
							// console.log ('value: '+value);
							if (!value) value = 0;
							if (wyliodrin_firmata.analog_pins[pin.data] === undefined)
							{
								callback (interpreter.createPrimitive(value));
							}
							wyliodrin_firmata.analog_pins[pin.data] = value;
						});
					}
					else
					{
						process.nextTick (function ()
						{
							callback (interpreter.createPrimitive(wyliodrin_firmata.analog_pins[pin.data]));
						});
					}
				},
				digitalWrite: function (pin, value)
				{
					// console.log (value);
					wyliodrin_firmata.firmata.digitalWrite (pin.data, value.data);
				},
				digitalRead_async: function (pin, callback)
				{
					if (wyliodrin_firmata.digital_pins[pin.data] === undefined)
					{
						wyliodrin_firmata.firmata.digitalRead (pin.data, function (value)
						{
							// console.log ('value: '+value);
							if (!value) value = 0;
							if (wyliodrin_firmata.digital_pins[pin.data] === undefined)
							{
								callback (interpreter.createPrimitive (value));
							}
							wyliodrin_firmata.digital_pins[pin.data] = value;
						});
					}
					else
					{
						process.nextTick (function ()
						{
							callback (interpreter.createPrimitive(wyliodrin_firmata.digital_pins[pin]));
						});
					}
				},
				analogWrite: function (pin, value)
				{
					wyliodrin_firmata.firmata.analogWrite (pin.data, value.data);
				},
				disconnect: function ()
				{
					console.log (wyliodrin_firmata.firmata);
					if (wyliodrin_firmata.firmata) this.firmata.close ();
					wyliodrin_firmata.firmata = null;
				}
			};
			var wyliodrin = 
			{
				sendSignal: function (signal, value)
				{
					that.reply ('v', {s:signal.data, v:value.data});
				}
			};
			interpreter.wyliodrin = 
			{
				environment: environment,
				wyliodrin: wyliodrin,
				firmata: wyliodrin_firmata
			};
			interpreter.setProperty (scope, 'console', interpreter.createConnectedObject (wyliodrin_console));
			interpreter.setProperty (scope, 'wyliodrin', interpreter.createConnectedObject (wyliodrin));
			interpreter.setProperty (scope, 'firmata', interpreter.createConnectedObject (wyliodrin_firmata));

		}

		if (t === 'p')
		{
			if (p.a === 'start' && !this.running)
			{
				if (p.l === 'visual' || p.l === 'nodejs')
				{
					try
					{
						var interpreter = new Interpreter (p.p, initApi);
						var run = function ()
						{
							try
							{
								if (interpreter.step () && that.running === true)
								{
									var delay = interpreter.wyliodrin.environment.delay;
									setTimeout (run, delay);
									interpreter.wyliodrin.environment.delay = 0;
								}
								else
								{
									interpreter.wyliodrin.firmata.disconnect ();
									interpreter = null;
									that.running = false;
									that.status_function ('i');
								}
							}
							catch (e)
							{
								log (e.stack);
								that.running = false;
								that.status_function ('i');
							}
						};
						setTimeout (function ()
						{
							that.running = true;
							that.status_function ('i');
							run();
						}, 1000);
					}
					catch (e)
					{
						log (e.stack);
					}
				}
				else
				{
					setTimeout (function ()
					{
						that.reply ('p', {a:'start', r:'s', s:'o', t:'Only visual and javascript are supported'});
					}, 1000);
				}
			}
			else
			if (p.a === 'stop' && this.running)
			{
				this.running = false;
			}
		}
	}

	reply (t, p)
	{
		this.emit ('data', msgpack.encode ({t:t, d:p}));
	}

	send (data)
	{
		var packet = msgpack.decode (data);
		console.log (packet);
		this.emit ('send', packet.t, packet.d);
	}

	isConnected ()
	{
		return connection!==null;
	}

	disconnect ()
	{
		// TODO disconnect
		this.shouldDisconnect = true;
		if (this.isConnected())
		{
			// var socketId = this.connection.socketId;
			this.status = DISCONNECTED;
			this.emit ('disconnected');
			debug ('Disconnecting');
			connection = null;
		}
	}
}