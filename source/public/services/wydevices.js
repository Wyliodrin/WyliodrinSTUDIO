
"use strict";

var angular = require ('angular');

var EventEmitter = require ('events').EventEmitter;

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:wydevice');

var compare_versions = require ('compare-versions');

var uuid = require ('uuid');

var _ = require ('lodash');

debug ('Loading');

var app = angular.module ('wyliodrinApp');

app.factory ('$wydevices', function ($http)
{
	debug ('Registering');

	var LocalDevices = null;
	
	var devices = {};

	if (settings.platform.CHROME)
	{
		chrome.runtime.getBackgroundPage(function (backgroundPage) {
		    LocalDevices = backgroundPage.LocalDevices;
		    LocalDevices.registerSerialListener (function (serialDevices)
		    {
		    	devices.serial = serialDevices;
		    	console.log (devices);
		    	devicesService.emit ('devices', devices);
		    });
		    LocalDevices.registerLocalListener (function (localDevices)
		    {
		    	devices.local = localDevices;
		    	console.log (devices);
		    	devicesService.emit ('devices', devices);
		    });
		});
	}

	var devicesService = {
		getDevices: function ()
		{
			devicesService.emit ('devices', devices);
		}
	};

	devicesService = _.assign (new EventEmitter(), devicesService);

	return devicesService;
});

