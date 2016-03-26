
"use strict";

var settings = require ('settings');
var _ = require ('lodash');
require('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:wyliodrindevice');
var EventEmitter = require ('events').EventEmitter;
var msgpack = require ('msgpack-lite');
var dict = require ('dict');


import SerialChromeDevice from './SerialChromeDevice.js';
import SocketChromeDevice from './SocketChromeDevice.js';

var devices = dict ();

export default class WyliodrinDevice extends EventEmitter
{
	constructor (device, options)
	{
		super ();
		debug ('Verifying if there is any device with port '+device);
		if (devices.has (device))
		{
			debug ('Device with port '+device+' already exists');
			return devices.get (device);
		}
		devices.set (device, this);
		this.options = _.assign ({
			type: 'chrome-serial',
			port: 7000
		}, options);
		debug (this.options);
		this.status = 'DISCONNECTED';
		debug ('Device setup for '+device);
		this.WasInConnected = false;
		this.WasInSeparator = false;
		this.events  = new EventEmitter ();
		this.device = device;
		this.sender = null;
		this.pingReceived = false;
		this.packetsWithErrors = 0;
		this.name = 'Unknown';
		this.category = 'unknown';
		this.timerstatus = setInterval (function ()
		{
			if (this.status === 'CONNECTED') this.send ('ping', null);
		}, 5000);
		var that = this;
		if (this.options.type === 'chrome-serial') this.port = new SerialChromeDevice (device, {bitrate: 115200});
		else
		if (this.options.type === 'chrome-socket') this.port = new SocketChromeDevice (device, this.options.port);
		else 
		{
			console.error ('Device '+device+ ' has unknown type '+this.options.type);
			throw new Error ('Device '+device+ ' has unknown type '+this.options.type);
		}
		this.port.on ('data', function (data)
		{
			debug ('Received '+data.length+' bytes from device '+that.device);
			that.pingReceived = true;
			if (that.status !== 'CONNECTED')
			{
				that.status = 'CONNECTED';
				that.publishStatus ();
			}
			try
			{
				var m = msgpack.decode (data);
				if (m.t) 
				{
					if (m.t === 'ping') that.send ('pong', null);
					// else 
					// if (m.t === 'pong') 
					// {
					// 	that.pingReceived = true;
					// 	if (that.status !== 'CONNECTED')
					// 	{
					// 		that.status = 'CONNECTED';
					// 		that.publishStatus ();
					// 	}
					// }
					debug ('Received tag '+m.t+' '+JSON.stringify (m.d));
					that.emit ('message', m.t, m.d);
				}
				else
				{
					debug ('Error in packet '+data.toString());
					that.packetsWithErrors++;
				}
			}
			catch (e)
			{
				debug ('Error in packet '+data.toString ());
				debug (e);
				that.packetsWithErrors++;
				that.emit ('packet_error', data);
			}
		});

		this.port.on ('connecting', function ()
		{
			that.status = 'CONNECTING';
			that.publishStatus ();
		});

		this.port.on ('error', function ()
		{
			that.status = 'ERROR';
			that.publishStatus ();
			that.pingReceived = false;
			clearInterval (that.sender);
			debug ('status ERROR');
			if (that.WasInSeparator === false) that.emit ('connection_timeout');
			else
			if (that.WasInConnected === false) that.emit ('connection_login_failed');
			devices.delete (that.device);
		});

		this.port.on ('separator', function ()
		{
			that.status = 'SEPARATOR';
			that.send ('', null);
			if (that.options.type === 'chrome-socket')
			{
				that.send ('login', {username:that.options.username, password:that.options.password});
				setTimeout (function ()
				{
					that.send ('ping', null);
					that.send ('i', null);
				}, 1000);
			}
			else
			{
				that.send ('ping', null);
				that.send ('i', null);
			}
			that.publishStatus ();
			that.WasInSeparator = true;
		});

		this.port.on ('connected', function ()
		{
			that.status = 'CONNECTED';
			that.pingReceived = true;
			that.WasInConnected = true;
			that.publishStatus ();
			that.sender = setInterval (function ()
			{
				if (that.pingReceived === false)
				{
					that.status = 'PING';
					that.publishStatus ();
				}
				else
				{
					that.pingReceived = false;
				}
				that.send ('ping', null);
			}, settings.SENDER);
		});

		this.port.on ('disconnected', function ()
		{
			that.status = 'DISCONNECTED';
			that.publishStatus ();
			if (that.WasInConnected === false) that.emit ('connection_login_failed');
			that.pingReceived = false;
			clearInterval (that.sender);
			debug (that.device);
			devices.delete (that.device);
		});

		// this.on ('message', function (m)
		// {
		// 	if (m.t === 'i')
		// 	{
		// 		debug ('Device type message '+m.d);
		// 		var data = m.d;
		// 		debug ('Device '+this.device+' is '+data.n+', category '+data.c);
		// 		if (data.n) this.name = data.n;
		// 		if (data.c) this.category = data.c;
		// 	}
		// });
	}

	publishStatus ()
	{
		this.emit ('status', this.status);
	}

	static listDevices (type, done)
	{
		if (type === "serial")
		{
			SerialChromeDevice.listDevices (done);
		}
		else
		{
			process.nextTick (function ()
			{
				debug ('Unknown type '+type+' for list devices');
				done (new Error ("Unknown type"));
			});
		}
	}

	static disconnectDevices ()
	{
		try
		{
			devices.forEach (function (port)
			{
				debug (port);
				port.disconnect ();
			});
		}
		catch (e)
		{
			console.log (e);
		}
	}

	send (tag, data)
	{
		debug ('Sending '+JSON.stringify(data)+' with tag '+tag+' to device '+this.device);
		var buffer = msgpack.encode ({t:tag, d:data});

		// console.log (this.port.send);
		this.port.send (buffer);
	}

	getStatistics ()
	{
		return {
			packetsWithErrors: this.packetsWithErrors
		};
	}

	disconnect ()
	{
		clearInterval (this.timerstatus);
		this.port.disconnect ();
	}
}
