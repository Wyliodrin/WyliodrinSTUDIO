
"use strict";

import WyliodrinDevice from './WyliodrinDevice.js';

var angular = require ('angular');

var EventEmitter = require ('events').EventEmitter;

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:wydevice');

var compare_versions = require ('compare-versions');

var uuid = require ('uuid');
var _ = require ('lodash');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.factory ('$wydevice', function ($http)
	{
		debug ('Registering');

		var device = null;
		// var WyliodrinDevice = null;
		// var Devices = null;
		// var service = null;
		var devices = [];
		var connectedDevices = [];
		var devicesListeners = [];

		chrome.runtime.getBackgroundPage(function (backgroundPage) {
		    WyliodrinDevice = backgroundPage.WyliodrinDevice;
		    Devices = backgroundPage.Devices;
		    Devices.registerListener (function (scannedDevices){
		    	devices = [];
		    	for (var i=0; i<scannedDevices.length; i++)
		    	{
		    		var device = scannedDevices[i];		    		
	    			var options = {
	    				category: (device.category?device.category:'board'),
	    				platform: (device.platform?device.platform:'linux'),
	    				type: null,
	    				port: (device.port?device.port:7000),
	    				username: '',
	    				password: '',
	    				address: (device.ip?device.ip:''),
	    				network: false,
	    				name:device.name,
	    				secureport: (device.secureport?device.secureport:22),
	    			};
	    			devices.push ({wyliodrinDevice: null, options: options,
	    							status: 'DISCONNECTED', id:device.ip});		    		
		    	}
		    	for (var s=0; s<devicesListeners.length; s++)
		    		devicesListeners[s] (devices);
		    });
		});

		// options = {category:'',
		// 			platform:'',
		// 			type:'',
		// 			port:'',
		// 			username:'',
		// 			password:'',
		// 			address:'',
		// 			network:''}
		var deviceService = {

			connect: function (deviceId, options)
			{
				if (!WyliodrinDevice) throw ('Wyliodrin device not initialised');
				debug (options);
				
				var device = _.find(devices, function (d){return deviceId === d.id;});

				if (device)
				{
					device.options = options;
					device.wyliodrinDevice = new WyliodrinDevice (options);

					var that = this;

					device.wyliodrinDevice.on ('connection_login_failed', function (){
						that.emit ('connection_login_failed', device);
					});

					device.wyliodrinDevice.on ('connection_error', function (){
						that.emit ('connection_error', device);
					});

					device.wyliodrinDevice.on ('connection_timeout', function (){
						that.emit ('connection_timeout', device);
					});

					device.wyliodrinDevice.on ('status', function (_status){
						console.log('status');
						console.log (_status);
						if (_status !== 'CONNECTED') 
							device.options.network = false;
						if (_status === 'ERROR' || _status === 'DISCONNECTED')
						{
							device.wyliodrinDevice.removeAllListeners ();
						}
						if (_status === 'CONNECTED')
							connectedDevices.push (device);
						device.status = _status;
						that.emit ('status', _status, device.id);
					});

					device.wyliodrinDevice.on ('message', function (t, d){
						if (t === 'i')
						{
							// console.log (d);
							console.log ('i message');
							console.log(t);
							console.log (d);

							device.status = 'CONNECTED';
							device.options.name = d.n;
							device.options.category = d.c;
							device.options.network = d.i;
							device.options.platform = d.p || 'linux';
							that.emit ('board_info', device);
						}
						else
						if (t === 'capabilities')
						{
							debug (d);
							device.capabilities = d;
						}
						else
						if ((t === 'v' || t === 'sv') && !d.s)
						{
							device.version = d.v;

							$http.get('https://cdn.rawgit.com/Wyliodrin/wyliodrin-app-server/master/package.json?'+uuid.v4())
						       .then(function(res){
							       	try
							       	{
							        	var version = res.data.version;
							        	debug ('Version '+version);
							        	debug (compare_versions(d.v, version));
							        	if (compare_versions(d.v, version) < 0) that.emit ('update');
							        }
							        catch (e)
							        {
							        	debug ('Version error');
							        	debug (e);
							        }
						    	});
						}
						that.emit ('message:'+device.id, t, d, device.id);
					});
				}
			},

			getStatus: function (deviceId)
			{
				// if (deviceId)
				// 	return devices[deviceId].status;
				return null;
			},

			getConnectedDevices: function ()
			{
				return connectedDevices;
			},

			send: function (tag, data, deviceId)
			{
				var device = _.find (devices, function (d){return d.id === deviceId;});
				if (device && device.wyliodrinDevice)
					device.wyliodrinDevice.send (tag, data);
			},

			registerForNetworkDevices: function (done)
			{
				devicesListeners.push (done);
				done (devices);
			},

			unregisterForNetworkDevices: function (done)
			{
				// if (Devices)
				// {
				// 	Devices.unregisterListener (done);
				// }
			},

			disconnect: function (deviceId)
			{
				var device = _.find (devices, function (d){return d.id === deviceId;});
				device.wyliodrinDevice.disconnect ();
			});
		};
		
		deviceService = _.assign (new EventEmitter(), deviceService);
		return deviceService;

	});
};