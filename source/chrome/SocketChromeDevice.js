
"use strict";

var settings = require ('settings');
var dict = require ('dict');
require('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:socketdevice');
var EventEmitter = require ('events').EventEmitter;

let addresses = dict ();
let connections = dict ();

debug ('Adding listener for socket addresses');
chrome.sockets.tcp.onReceive.addListener (function (info)
{
	if (connections.has (''+info.socketId))
	{
		debug ('Socket port with socketId '+info.socketId+' has received '+info.data.byteLength+' bytes');
		var device = connections.get (''+info.socketId);
		device.receiveData (info.data);
	}
});

chrome.sockets.tcp.onReceiveError.addListener (function (info)
{
	if (connections.has (''+info.socketId))
	{
		debug ('Socket port with connectionId '+info.socketId+' has received an error '+info.error+' '+chrome.runtime.lastError);
		var device = connections.get (''+info.socketId);
		device.disconnect ();
	}
});

const PACKET_SEPARATOR = 255;
const PACKET_ESCAPE = 0;
const BUFFER_SIZE = 8192;
const SERIAL_BUFFER_SIZE = 1024;

const CONNECTING = 1;
const SEPARRATOR = 2;
const CONNECTED = 3;
const ERROR = 4;
const DISCONNECTED = 5;

export default class SocketChromeDevice extends EventEmitter
{
	constructor (ip, port, options)
	{
		super ();
		debug ('Verifying if there is any connection to '+ip+' '+port);
		this.address = ip+' '+port;
		this.ip = ip;
		this.port = port;
		this.connection = null;
		this.receivedFirstPacketSeparator = false;
		this.receivedData = new Buffer (BUFFER_SIZE);
		this.receivedDataPosition = 0;
		this.buffers = [];
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
			// console.log (that.status);
			if (that.staus <= CONNECTING);
			that.emit ('connecting');
			chrome.sockets.tcp.create ({}, function (createInfo)
			{
				that.connection = createInfo;
				chrome.sockets.tcp.connect (createInfo.socketId, that.ip, that.port | 0, function (result)
				{
					if(chrome.runtime.lastError) 
					{
						debug ('Socket error');
						debug (chrome.runtime.lastError);
					} 
					if (result >= 0)
					{
						// that.connection = createInfo;
						if (!that.shouldDisconnect)
						{
							debug ('Connected to '+that.address+' with socketId '+createInfo.socketId);
							if (that.status < SEPARRATOR)
							{
								that.status = SEPARRATOR;
								that.emit ('separator');
								// console.log (connection);
								connections.set (''+createInfo.socketId, that);
							}
						}
						else that.disconnect ();
					}
					else
					{
						// TODO error
						if (that.status <= ERROR)
						{
							that.status = ERROR;
							that.emit ('error');
						}
						addresses.delete (that.address);
					}
				});
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
				// this.buffers.splice (0, 1);
				chrome.sockets.tcp.send (this.connection.socketId, arraydata, function (sendInfo)
				{
					if (sendInfo.error)
					{
						debug ('Sending '+arraydata.byteLength+' to port '+that.address+' retuned an error '+sendInfo.error+' '+chrome.runtime.lastError);
						if (sendInfo.error === 'system_error')
						{
							if (that.status <= ERROR)
							{
								that.status = ERROR;
								that.emit ('error');
								that.buffers = [];
								that.disconnect ();
							}
						}
					}
					else
					{
						debug ('Sent '+sendInfo.bytesSent+' of '+arraydata.byteLength+' to '+that.address+' using socketId '+that.connection.socketId);
						if (sendInfo.bytesSent < arraydata.byteLength)
						{
							// console.log ('Sent less bytes than request');
							debug ('Sent less bytes than in data, sending '+(that.buffers[0].byteLength-sendInfo.bytesSent)+' into the bytes next data');
							that.buffers[0] = that.buffers[0].slice (sendInfo.bytesSent);
						}
						else
						{
							debug ('There are '+that.buffers.length+' data to send');
							that.buffers.splice (0, 1);
						}
					}
					that.isSending = false;
					that._send ();
				});
			}
			else
			{
				debug ('Already sending data for '+this.address+' using socketId '+this.connection.socketId);
			}
		}
		else
		{
			debug ('Disconnected');
		}
	}

	send (data)
	{
		if (this.isConnected())
		{
			data = this._escape (data);
			var additional = false;
			var size = data.length+2;
			var arraydata;
			var arraydatauint;
			var pos;
			if (size % SERIAL_BUFFER_SIZE > 0) additional = true;
			debug ('Splitting data into '+(((size/SERIAL_BUFFER_SIZE)>>0)+(additional?1:0))+' packets ');
			var offset = 0;
			for (var split = ((size / SERIAL_BUFFER_SIZE)>>0)-1; split >= 0; split--)
			{
				arraydata = new ArrayBuffer (SERIAL_BUFFER_SIZE);
				arraydatauint = new Uint8Array (arraydata);
				for (pos = 0; pos<SERIAL_BUFFER_SIZE; pos++)
				{
					if (split === 0 && (pos === SERIAL_BUFFER_SIZE-2 || pos === SERIAL_BUFFER_SIZE-1) && additional === false)
					{
						arraydatauint[pos] = PACKET_SEPARATOR;
					}
					else
					{
						arraydatauint[pos] = data[offset];
						offset++;
					}
					// console.log (arraydatauint[pos]);
				}	
				this.buffers.push (arraydata);
				this._send ();
			}
			if (additional === true)
			{
				arraydata = new ArrayBuffer (size % SERIAL_BUFFER_SIZE);
				arraydatauint = new Uint8Array (arraydata);
				var additional_size = size%SERIAL_BUFFER_SIZE;
				for (pos = 0; pos<additional_size; pos++)
				{
					if (pos !== additional_size-2 && pos !== additional_size-1)
					{
						arraydatauint[pos] = data[offset];
						offset++;
					}
					else
					{
						arraydatauint[pos] = PACKET_SEPARATOR;
					}
					// console.log (arraydatauint[pos]);
				}
				this.buffers.push (arraydata);
				this._send ();
			}
			
			debug ('Seding '+data.length+' bytes to '+this.address+' using socketId '+this.connection.socketId);
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
		// debug ('Adding '+data+' to receivedData for port '+this.address+' using socketId '+this.connection.socketId);
		if (this.receivedDataPosition >= this.receivedData.length)
		{
			// TODO verify a maximum size
			debug ('Data size exceeded, enlarging data with '+this.receivedData.length+' for port '+this.address+' using socketId '+this.connection.socketId);
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
		debug ('Packet of size '+this.receivedDataPosition+' received for port '+this.address+' using socketId '+this.connection.socketId);
		var data = this.receivedData.slice (0, this.receivedDataPosition);
		this.receivedDataPosition = 0;
		return data;
	}

	receiveData (data)
	{
		// TODO event emitter
		debug ('Received '+data.byteLength+' bytes for port '+this.address+' using socketId '+this.connection.socketId);
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
						this.emit ('data', this._packet ());
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
						debug ('Random bytes for port '+this.address+' using socketId '+this.connection.socketId);
					}
					// console.log ('adding byte to data');
					this._addToBuffer(datauint[pos]);
					this.previousByte = datauint[pos];
				}
			}
			else
			{
				if (datauint[pos] === PACKET_SEPARATOR && this.previousByte === PACKET_SEPARATOR) 
				{
					debug ('Received first packet separataor for port '+this.address+' using socketId '+this.connection.socketId);
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
					debug ('Random bytes for port '+this.address+' using socketId '+this.connection.socketId);
					this.previousByte = datauint[pos];
				}
			}
		}
	}

	flush ()
	{
		debug ('Flushing '+this.address+' using socketId '+this.connection.socketId);
		chrome.serial.flush (this.connection.socketId, function (result)
		{
			debug ('Flusing result '+result+' to '+this.address+' using socketId '+this.connection.socketId);
		});
	}

	isConnected ()
	{
		return this.connection!==null;
	}

	disconnect ()
	{
		// TODO disconnect
		this.shouldDisconnect = true;
		if (this.isConnected())
		{
			var socketId = this.connection.socketId;
			this.status = DISCONNECTED;
			this.emit ('disconnected');
			debug ('Disconnecting port '+this.address+' using socketId'+this.connection.socketId);
			chrome.sockets.tcp.disconnect (socketId, function ()
			{
				debug ('Disconnected '+socketId+' port '+this.address);
				chrome.sockets.tcp.close (socketId, function ()
				{

				});
			});
			this.receivedFirstPacketSeparator = false;
			addresses.delete (this.address);
			connections.delete (''+this.connection.socketId);
			this.connection = null;
		}
	}
}