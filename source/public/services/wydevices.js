
"use strict";

var angular = require ('angular');

var EventEmitter = require ('events').EventEmitter;

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:wydevice');

var compare_versions = require ('compare-versions');

var uuid = require ('uuid');
var _ = require ('lodash');
var moment = require ('moment');

import WyliodrinDevice from './WyliodrinDevice.js';

var TIMEOUT = 10;

debug ('Loading');

var app = angular.module ('wyliodrinApp');

app.factory ('$wydevices', function ($http)
{
	debug ('Registering');

	var LocalDevices = null;
	
	var devicesTree = {};
	var devicesList = [];

	var devicesEmitter = new EventEmitter ();

	function updateDevices (mdnsDevices, _uplink)
	{
		console.log ('updateDevices');
		var device;
		for (var m=0; m<mdnsDevices.length; m++)
    	{
    		device = mdnsDevices[m];
    		//console.log (device);

    		if (devicesTree[device.id])
    		{
    			var existingDevice = devicesTree[device.id];
    			existingDevice._mdns = true;
    		}
    		else
    		{
    			var newDevice = {
    				name: (device.name?device.name:''),
    				uplink: _uplink,
    				port: (device.port?device.port:7000),
    				secureport: (device.secureport?device.secureport:22),
    				ip: device.ip,
    				id: device.ip,
    				_mdns: true,
    				connection: {
    					status:'DISCONNECTED'
    				},
    				properties: {
    					category: (device.category?device.category:'board'),
    					platform: (device.platform?device.platform:'linux')
    				},
    				_listeners: {}
    			};

    			devicesTree[newDevice.id] = newDevice;
    			devicesList.push (newDevice);
    		}
    	}
    	var i=0;
    	while (i<devicesList.length)
    	{
    		device = devicesList[i];
    		if (!device._mdns && device.uplink === _uplink)
    		{
    			if (device.connection.status === 'DISCONNECTED' || 
    				device.connection.status === 'ERROR')
    			{
    				device.connection.status = 'MISSING';
    				device._timeout = moment ().add (TIMEOUT, 'minutes');
    				i++;
    			}
    			else if (device.connection.status === 'MISSING' && 
    				moment(device._timeout).isBefore ())
    			{
    				delete devicesTree[device.id];
    				devicesList.splice (i,1);
    			}
    		}
    		else
    			i++;
    	}
	}
	
	if (settings.platform.CHROME)
	{
		chrome.runtime.getBackgroundPage(function (backgroundPage) {
		    LocalDevices = backgroundPage.LocalDevices;
		    LocalDevices.registerSerialListener (function (serialDevices)
		    {
		    	updateDevices (serialDevices, 'serial');
		    	//devicesService.emit ('devices', devicesList, devicesTree);
		    	devicesEmitter.emit ('devices', devicesList, devicesTree);

		    });
		    LocalDevices.registerLocalListener (function (localDevices)
		    {
		    	updateDevices (localDevices, 'local');
		    	//devicesService.emit ('devices', devicesList, devicesTree);
		    	devicesEmitter.emit ('devices', devicesList, devicesTree);
		    });
		});
	}
	//emit (event, device, args...)
	function emit ()
	{
		var device = arguments[1];
		console.log (device);
		if (device._listeners[arguments[0]])
		{
			var listeners = device._listeners[arguments[0]];
			var args = [];
			for (var i=2; i<arguments.length; i++)
				args.push (arguments[i]);
			for (var l=0; l<listeners.length; l++)
			{
				listeners[l].apply (undefined, args);
			}
		}
	}

	var devicesService = {
		getDevices: function ()
		{
			devicesEmitter.emit ('devices', devicesList, devicesTree);
		},
		// options={
		//  ip:
		// 	name
		//	username:
		//	password:
		//	port:
		//	secureport:
		//	type: chrome-socket/chrome-ssh
		// }
		connect: function (uplink, deviceId, options)
		{
			if (!WyliodrinDevice) throw ('Wyliodrin device not initialised');		

			debug (options);

			var device;
			var newDevice = false;

			if (deviceId)
				device = devicesTree[deviceId];
			else if (options.ip)
			{
				device = _.find (devicesList, function (device){
					return device.ip === options.ip;
				});
				if (device === undefined)
				{
					device = {
						id: options.ip,
						uplink: uplink,
						status: 'DISCONNECTED'
					};

					devicesList.push (device);
					devicesTree[device.id] = device;
					newDevice = true;
				}
			}

			device.name = (options.name?options.name:device.name);
			device.ip = (options.ip?options.ip:device.ip);
			device.port = (options.port?options.port:device.port);
			device.secureport = (options.secureport?options.secureport:device.secureport);
			device.username = (options.username?options.username:device.username);

			device._WyliodrinDevice = new WyliodrinDevice (options);

			if (newDevice)
				devicesEmitter.emit ('devices', devicesList, devicesTree);

			var that = this;
			
			device._WyliodrinDevice.on ('connection_login_failed', function ()
			{
				//if ()
				//that.emit ('connection_login_failed:'+device.uplink+':'+device.id, device);
			});

			device._WyliodrinDevice.on ('connection_error', function ()
			{
				that.emit ('connection_error:'+device.uplink+':'+device.id, device);
			});

			device._WyliodrinDevice.on ('connection_timeout', function ()
			{
				that.emit ('connection_timeout:'+device.uplink+':'+device.id, device);
			});
			
			device._WyliodrinDevice.on ('status', function (_status)
			{
				console.log ('got status in wydevices');
				console.log (_status);
				device.status = _status;
				
				if (_status === 'ERROR' || _status === 'DISCONNECTED')
				{
					device._WyliodrinDevice.removeAllListeners ();
					delete device._WyliodrinDevice;	
				}
				//that.emit ('status:'+device.uplink+':'+device.id, device);
				// if (device._listeners.status)
				// {
				// 	var listeners = device._listeners.status;
				// 	for (var l=0; l<listeners.length; l++)
				// 	{
				// 		listeners[l](device);
				// 	}
				// }

				emit ('status', device, device);
			});

			device._WyliodrinDevice.on ('message', function (t, d)
			{
				if (t === 'i')
				{
					device.name = d.n;
					device.properties = 
					{
						category: (d.c?d.c:device.properties.category),
						device: (d.device?d.device:''),
						platform: (d.platform?d.platform:device.properties.platform),
						osname: (d.osname?d.osname:''),
						osver: (d.osver?d.osver:''),
						version: (d.version?d.version:''),
						libwyliodrin: (d.libwyliodrin?d.libwyliodrin:''),
						wyliodrin_server: (d.wyliodrin_server?d.wyliodrin_server:'')
					};
					device.peripherals = d.peripherals;
					that.emit ('device_info', device);
				}
				else
				if (t === 'capabilities')
				{
					debug (d);
					device.properties.capabilities = d;
					that.emit ('device_info', device);
				}
				else
				if ((t === 'v' || t === 'sv') && !d.s)
				{
					device.properties.version = d.v;
					
					$http.get('https://cdn.rawgit.com/Wyliodrin/wyliodrin-app-server/master/package.json?'+uuid.v4())
				       .then(function(res){
					       	try
					       	{
					        	var version = res.data.version;
					        	debug ('Version '+version);
					        	debug (compare_versions(d.v, version));
					        	if (compare_versions(d.v, version) < 0) 
					        		that.emit ('update:'+device.uplink+':'+device.id);
					        }
					        catch (e)
					        {
					        	debug ('Version error');
					        	debug (e);
					        }
				    	});
				}				
				//that.emit ('message', device.id, t, d, deviceId);
				emit ('message', device, t, d);
			});
		},
		send: function (tag, data, device)
		{
			device._WyliodrinDevice.send (tag, data);
		},

		disconnect: function (device)
		{
			// console.log (device);
			device._WyliodrinDevice.disconnect ();
		},
		//on ('event', function)
		//or
		//on ('event', 'boardId', function)
		on: function ()
		{
			if (arguments.length >=2)
			{
				if (_.isString(arguments[0]) && _.isFunction (arguments[1]))
				{
					devicesEmitter.on (arguments[0], arguments[1]);
				}
				else if (_.isString(arguments[0]) && _.isString (arguments[1]) &&
							 _.isFunction (arguments[2]))
				{
					var device = devicesTree[arguments[1]];
					if (device)
					{
						if (device._listeners[arguments[0]])
							device._listeners[arguments[0]].push (arguments[2]);
						else
							device._listeners[arguments[0]] = [arguments[2]];

					}
				}
			}			
		},
		removeBoardListener: function (boardId, event, callbackFunction)
		{
			var device = devicesTree[boardId];
			if (device && device._listeners[event])
			{
				var index = _.findIndex (device._listeners[event], function (listener){
					return listener.name === callbackFunction.name;
				});
				if (index > -1)
					device._listeners[event].splice (index,1);
			}
		},
		removeAllBoardListeners: function (boardId)
		{
			var device = devicesTree[boardId];
			device._listeners = {};
		}
		// setStatus: function (deviceId, status)
		// {
		// 	_.forEach (devices, function (deviceList){
		// 		for (var i=0; i<deviceList.length; i++)
		// 		{
		// 			if (deviceList[i].id === deviceId)
		// 				deviceList[i].status = status;
		// 		}
		// 	});
		// }
	};

	//devicesService = _.assign (new EventEmitter(), devicesService);

	return devicesService;
});

