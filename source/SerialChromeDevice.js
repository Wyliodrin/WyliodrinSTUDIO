
"use strict";

var settings = require ('settings');
var dict = require ('dict');
require('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:serialdevice');
var EventEmitter = require ('events').EventEmitter;

let ports = dict ();
let connections = dict ();

debug ('Adding listener for serial ports');
chrome.serial.onReceive.addListener (function (info)
{
	if (connections.has (''+info.connectionId))
	{
		debug ('Serial port with connectionId '+info.connectionId+' has received '+info.data.byteLength+' bytes');
		var device = connections.get (''+info.connectionId);
		device.receiveData (info.data);
	}
});

chrome.serial.onReceiveError.addListener (function (info)
{
	if (connections.has (''+info.connectionId))
	{
		debug ('Serial port with connectionId '+info.connectionId+' has received an error '+info.error+' '+chrome.runtime.lastError);
		var device = connections.get (''+info.connectionId);
		device.disconnect ();
	}
});

const PACKET_SEPARATOR = 255;
const PACKET_ESCAPE = 0;
const BUFFER_SIZE = 4096;
const SERIAL_BUFFER_SIZE = 1024;

const CONNECTING = 1;
const SEPARRATOR = 2;
const CONNECTED = 3;
const ERROR = 4;
const DISCONNECTED = 5;

export default class SerialChromeDevice extends EventEmitter
{
	static listDevices (done)
	{
		chrome.serial.getDevices (function (list)
		{
			done (null, list);
		});
	}

	constructor (port, options)
	{
		super ();
		debug ('Verifying if there is any connection to '+port);
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
		if (!ports.has (port))
		{
			ports.set (port, this);
		}
		else
		{
			debug ('Connection to '+this.port+' already exists');
			return ports.get (port);
		}

		debug ('Connecting to '+this.port);
		var that = this;
		process.nextTick (function ()
		{
			console.log (that.status);
			if (that.staus <= CONNECTING);
			that.emit ('connecting');
			chrome.serial.connect (that.port, options, function (connection)
			{
				if(chrome.runtime.lastError) 
				{
					debug ('Serial error');
					debug (chrome.runtime.lastError);
				}
				if (connection)
				{
					that.connection = connection;
					if (!that.shouldDisconnect)
					{
						debug ('Connected to '+that.port+' with connectionId '+connection.connectionId);
						if (that.status < SEPARRATOR)
						{
							that.status = SEPARRATOR;
							that.emit ('separator');
							// console.log (connection);
							connections.set (''+connection.connectionId, that);
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
					ports.delete (that.port);
				}
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
					data[li]=buffer[li];
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
				chrome.serial.send (this.connection.connectionId, arraydata, function (sendInfo)
				{
					if (sendInfo.error)
					{
						debug ('Sending '+arraydata.byteLength+' to port '+that.port+' retuned an error '+sendInfo.error+' '+chrome.runtime.lastError);
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
						debug ('Sent '+sendInfo.bytesSent+' of '+arraydata.byteLength+' to '+that.port+' using connectionId '+that.connection.connectionId);
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
				debug ('Already sending data for '+this.port+' using connectionId '+this.connection.connectionId);
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
			
			debug ('Seding '+data.length+' bytes to '+this.port+' using connectionId '+this.connection.connectionId);
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
		// debug ('Adding '+data+' to receivedData for port '+this.port+' using connectionId '+this.connection.connectionId);
		if (this.receivedDataPosition >= this.receivedData.length)
		{
			// TODO verify a maximum size
			debug ('Data size exceeded, enlarging data with '+this.receivedData.length+' for port '+this.port+' using connectionId '+this.connection.connectionId);
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
		debug ('Packet of size '+this.receivedDataPosition+' received for port '+this.port+' using connectionId '+this.connection.connectionId);
		var data = this.receivedData.slice (0, this.receivedDataPosition);
		this.receivedDataPosition = 0;
		return data;
	}

	receiveData (data)
	{
		// TODO event emitter
		debug ('Received '+data.byteLength+' bytes for port '+this.port+' using connectionId '+this.connection.connectionId);
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
						debug ('Random bytes for port '+this.port+' using connectionId '+this.connection.connectionId);
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
					debug ('Received first packet separataor for port '+this.port+' using connectionId '+this.connection.connectionId);
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
					debug ('Random bytes for port '+this.port+' using connectionId '+this.connection.connectionId);
					this.previousByte = datauint[pos];
				}
			}
		}
	}

	flush ()
	{
		debug ('Flushing '+this.port+' using connectionId '+this.connection.connectionId);
		chrome.serial.flush (this.connection.connectionId, function (result)
		{
			debug ('Flusing result '+result+' to '+this.port+' using connectionId '+this.connection.connectionId);
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
			var connectionId = this.connection.connectionId;
			this.status = DISCONNECTED;
			this.emit ('disconnected');
			debug ('Disconnecting port '+this.port+' using connectionId'+this.connection.connectionId);
			chrome.serial.disconnect (connectionId, function ()
			{
				debug ('Disconnected '+connectionId+' port '+this.port);
			});
			this.receivedFirstPacketSeparator = false;
			ports.delete (this.port);
			connections.delete (''+this.connection.connectionId);
			this.connection = null;
		}
	}
}