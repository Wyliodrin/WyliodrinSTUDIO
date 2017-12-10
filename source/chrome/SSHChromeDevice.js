
"use strict";

var settings = require ('settings');
var dict = require ('dict');
require('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:sshdevice');
var EventEmitter = require ('events').EventEmitter;

var Client = require ('ssh2').Client;

let addresses = dict ();
let connections = dict ();

const PACKET_SEPARATOR = 255;
const BUFFER_SEPARRATOR = new Buffer ([PACKET_SEPARATOR, PACKET_SEPARATOR]);
const PACKET_ESCAPE = 0;
const BUFFER_SIZE = 8192;

const CONNECTING = 1;
const SEPARRATOR = 2;
const CONNECTED = 3;
const ERROR = 4;
const DISCONNECTED = 5;

export default class SSHChromeDevice extends EventEmitter
{
	constructor (ip, port, options)
	{
		super ();
		debug ('Verifying if there is any connection to '+ip+' '+port);
		this.address = ip+' '+port;
		this.ip = ip;
		this.port = port;
		this.options = options;
		this.connection = null;
		this.stream = null;
		this.receivedFirstPacketSeparator = false;
		this.receivedData = new Buffer (BUFFER_SIZE);
		this.receivedDataPosition = 0;
		this.buffers = [];
		this.openShell = null;
		this.openInstall = null;
		this.isSending = false;
		this.previousByte = 0;
		this.status = CONNECTING;
		this.shouldDisconnect = false;

		if (!addresses.has (this.address))
		{
			addresses.set (this.address, this);
		}
		else
		{
			debug ('Connection to '+this.address+' already exists');
			return addresses.get (this.address);
		}

		debug ('Connecting to '+this.address);
		var that = this;
		process.nextTick (function ()
		{
			if (that.staus <= CONNECTING);
			that.emit ('connecting');

			that.connection = new Client ();

			that.connection.on ('ready', function ()
			{
				debug ('ssh connected');
				that.connection.forwardOut ('', 7000, '127.0.0.1', 7000, function (error, stream)
				{
					if (error) 
					{
						if (error.reason === 'CONNECT_FAILED')
						{
							that.emit ('install');
						}
					}
					else
					{
						that.stream = stream;
						that.emit ('separator');
						stream.on ('close', function ()
						{
							console.log ('disconnect');
							that.disconnect ();
						});
						stream.on ('data', function (data)
						{
							that.receiveData (data);
						});
					}
				});
			});

			that.connection.on ('error', function (error)
			{
				console.log (JSON.stringify (error));
				if (error.level === "client-authentication")
				{
					that.emit ('connection_login_failed');
					that.connection.end ();
				}
				else
				{
					that.connection.end ();
				}

				that.emit ('error');
				addresses.delete (that.address);
			});

			that.connection.connect ({
				host: that.ip,
				port: that.port,
				username: that.options.username,
				password: that.options.password
			});
		});
	}

	_escape (buffer)
	{
		var l = 0;
		for (let i=0; i<buffer.length; i++)
		{
			if (buffer[i]===PACKET_SEPARATOR) l = l+2;
			else l = l+1;
		}
		if (l===buffer.length) return buffer;
		else
		{
			var data = new Buffer (l);
			var li=0;
			for (let i=0; i<buffer.length; i++)
			{
				if (buffer[i] === PACKET_SEPARATOR)
				{
					data[li]=buffer[i];
					li++;
					data[li]=PACKET_ESCAPE;
					li++;
				}
				else
				{
					data[li] = buffer[i];
					li++;
				}
			}
			return data;
		}
	}

	_send ()
	{
		if (this.isConnected ())
		{
			var that = this;
			if (!this.isSending && this.buffers.length > 0)
			{
				this.isSending = true;
				var arraydata = this.buffers[0];
				this.buffers.splice (0, 1);
				this.stream.write (arraydata, function (err)
				{
					that.isSending = false;
					that._send ();
				});
			}
			else
			{
				debug ('Already sending data for '+this.address);
			}
		}
		else
		{
			debug ('Disconnected');
		}
	}

	send (data)
	{
		if (this.isConnected() && this.stream !== null)
		{
			data = this._escape (data);
			this.buffers.push (data);
			this.buffers.push (BUFFER_SEPARRATOR);
			this._send ();
			
			debug ('Seding '+data.length+' bytes to '+this.address);
			var that = this;
		}
		else
		{
			debug ('Disconnected');
		}
	}

	_addToBuffer (data)
	{
		// TODO put maximum limit
		// debug ('Adding '+data+' to receivedData for port '+this.address);
		if (this.receivedDataPosition >= this.receivedData.length)
		{
			// TODO verify a maximum size
			debug ('Data size exceeded, enlarging data with '+this.receivedData.length+' for port '+this.address);
			var receivedData = this.receivedData;
			this.receivedData = new Buffer (receivedData.length*2);
			for (var pos=0; pos < receivedData.length; pos++)
			{
				this.receivedData[pos] = receivedData[pos];
			}
			this.receivedDataPosition = pos;
		}
		this.receivedData[this.receivedDataPosition] = data;
		this.receivedDataPosition=this.receivedDataPosition+1;
	}

	_packet ()
	{
		debug ('Packet of size '+this.receivedDataPosition+' received for port '+this.address);
		var data = this.receivedData.slice (0, this.receivedDataPosition);
		this.receivedDataPosition = 0;
		return data;
	}

	receiveData (data)
	{
		// TODO event emitter
		debug ('Received '+data.byteLength+' bytes for port '+this.address);
		var datauint = new Uint8Array (data);
		// TODO more efficient to string
		for (var pos=0; pos<datauint.length; pos++)
		{
			// console.log (datauint[pos]);
			if (this.receivedFirstPacketSeparator)
			{
				if (datauint[pos] === PACKET_SEPARATOR)
				{
					if (this.previousByte === PACKET_SEPARATOR)
					{
						var packet = this._packet ();
						this.emit ('data', packet);
						this.previousByte = 0;
					}
					else
					{
						this.previousByte = datauint[pos];
					}
				}
				else
				if (datauint[pos] === PACKET_ESCAPE)
				{
					if (this.previousByte === PACKET_SEPARATOR)
					{
						this._addToBuffer (this.previousByte);
						this.previousByte = 0;
					}
					else
					{
						this._addToBuffer (datauint[pos]);
						this.previousByte = datauint[pos];
					}
				}
				else
				{
					if (this.previousByte === PACKET_SEPARATOR)
					{
						debug ('Random bytes for port '+this.address);
					}
					this._addToBuffer(datauint[pos]);
					this.previousByte = datauint[pos];
				}
			}
			else
			{
				if (datauint[pos] === PACKET_SEPARATOR && this.previousByte === PACKET_SEPARATOR) 
				{
					debug ('Received first packet separataor for port '+this.address);
					this.receivedFirstPacketSeparator = true;
					if (this.status < CONNECTED)
					{
						this.status = CONNECTED;
						this.emit ('connected');
					}
					this.previousByte = 0;
				}
				else
				{
					debug ('Random bytes for port '+this.address);
					this.previousByte = datauint[pos];
				}
			}
		}
	}

	isConnected ()
	{
		return this.connection!==null;
	}

	shell (data)
	{
		if (this.isConnected())
		{
			var that = this;
			debug ('Open ssh shell');
			if (data.a === 'o' && this.openShell === null)
			{
				this.connection.shell ({rows: data.r, cols:data.c, term:'xterm-color'}, function (error, stream)
				{
					if (error)
					{
						debug ('Open ssh error');
						that.emit ('message', 's', {a:'o', r:'e', e:error});
					}
					else
					{
						that.openShell = stream;
						that.emit ('message', 's', {a:'o', r:'d'});
						stream.on ('data', function (data)
						{
							that.emit ('message', 's', {a:'k', t:data.toString()});
						});
						stream.stderr.on ('data', function (data)
						{
							that.emit ('message', 's', {a:'k', t:data.toString()});
						});
						stream.on ('error', function ()
						{
							that.openShell = null;
						});
						stream.on ('close', function ()
						{
							that.openShell = null;
						});
					}
				});
			}
			else 
			if (data.a === 'k')
			{
				if (this.openShell === null)
				{
					debug ('Shell not open');
					that.emit ('message', 's', {a:'e', e:'noshell'});
				}
				else
				{
					debug ('Ssh shell keys');
					that.openShell.write (data.t);
				}
			}
			else 
			if (data.a === 'r')
			{
				if (this.openShell === null)
				{
					debug ('Shell not open');
				}
				else
				{
					debug ('Ssh shell keys');
					that.openShell.setWindow (data.r, data.c);
				}
			}
			else
			if (data.a === 's')
			{
				if (this.openShell === null)
				{
					debug ('Shell not open');
				}
				else
				{
					debug ('Ssh shell keys');
					that.openShell.end ();
				}
			}
		}
	}

	install (data)
	{
		if (this.isConnected())
		{
			var that = this;
			console.log (that.options);
			if (data.a === 'i' && this.openInstall === null)
			{
				if (settings.INSTALL[that.options.platform][data.c])
				{
					that.emit ('message', 'install', {a:'i', out:that.options.platform+' '+data.c});
					that.emit ('message', 'install', {a:'i', out:data.toString()});
					this.connection.exec (settings.INSTALL[that.options.platform][data.c], function (error, stream)
					{
						if (error)
						{
							console.log (error);
						}
						else
						{
							that.openInstall = stream;
							stream.on ('data', function (data)
							{
								console.log (data.toString());
								that.emit ('message', 'install', {a:'i', out:data.toString()});
							});
							stream.stderr.on ('data', function (data)
							{
								console.log (data.toString());
								that.emit ('message', 'install', {a:'i', err:data.toString()});
							});
							stream.on ('error', function (error)
							{
								console.log (error.toString());
								that.emit ('message', 'install', {a:'i', e:error});
							});
							stream.on ('close', function (code, signal)
							{
								console.log (code);
								if (code !== 0)
								{
									that.emit ('message', 'install', {a:'i', e:code});
								}
								else
								{
									that.emit ('message', 'install', {a:'i', d:'done'});
								}
							});
						}
					});
				}
				else
				{
					that.emit ('message', 'install', {a:'i', e:'category'});
				}
			}
			else
			if (data.a === 's' && this.openInstall)
			{
				debug ('Stop install');
				this.openInstall.signal ('\x03');
			}
		}
	}

	disconnect ()
	{
		// TODO disconnect
		this.shouldDisconnect = true;
		if (this.isConnected())
		{
			this.status = DISCONNECTED;
			this.emit ('disconnected');
			debug ('Disconnecting port '+this.address);
			this.receivedFirstPacketSeparator = false;
			addresses.delete (this.address);
			connections.delete (''+this.connection.socketId);
			if (this.stream) this.stream.end ();
			this.connection = null;
		}
	}
}