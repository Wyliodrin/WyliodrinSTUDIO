
"use strict";

var settings = require ('settings');

require('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:devices');

var EventEmitter = require ('events').EventEmitter;

var emitter = new EventEmitter();

var _ = require ('lodash');

const WYAPP = 0;
const SSHSVC = 1;
const WORKSTATION = 2;

var devices = [];

var serialDevices = [];

var _previousSerialDevices = [];

function deviceId (hostPort)
{
	var id = "";
	if (hostPort)
	{
		id = hostPort.substring (0, hostPort.lastIndexOf(':'));	
	}
	return id;
}

(function listSerialDevices ()
{
	chrome.serial.getDevices (function (list)
	{
		var changes = false;

		// TODO improve check for new serial devices
		if (list.length !== serialDevices.length)
		{
			console.log (list);
			serialDevices = [];
			_.each (list, function (item)
			{
				var device = {
					ip: item.path,
					name: item.displayName || (item.path.startsWith('/')?item.path.substring (item.path.lastIndexOf ('/')+1):item.path),
					uplink: 'serial',
					platform: item.productId,
					category: item.vendorId
				};
				if (device.name.startsWith('cu.')) device.name = device.name.substring (3);
				if (device.name.startsWith('tty.')) device.name = device.name.substring (4);
				if (device.name.startsWith ('Bluetooth-'))
				{
					device.priority = 6;
				}
				else
				{
					device.priority = 1;
				}
				serialDevices.push (device);		
			});
			serialDevices = _.sortBy (serialDevices, "priority");
			console.log (serialDevices);
			emitter.emit ('serial', serialDevices);
		}
		setTimeout (listSerialDevices, 1000);
	});
})();

class Device
{
	constructor (id)
	{
		this._id = id;
		this.properties = {};
		this.parametersArray = [null, null, null, null];
	}

	addParameters (priority, parameters)
	{
		this.properties = {};
		this.parametersArray[priority] = parameters;
	}

	eraseProperties (priority)
	{
		this.properties = {};
		this.parametersArray[priority] = null;
	}

	t (property)
	{
		debug ('Get '+property+' for '+this.id);
		var data = this.properties[property];
		if (data === undefined)
		{
			for (var i = this.parametersArray.length-1; i>=0; i--)
			{
				var parameters = this.parametersArray[i];
				if (parameters !== null)
				{
					if (parameters[property])
					{
						debug ('Found '+property+' priority '+i+' for id '+this.id);
						data = parameters[property];
					}
				}
			}
			this.properties[property] = data;
		}
		return data;
	}

	get id ()
	{
		return this._id;
	}

	get name ()
	{
		return this.get ('name');
	}

	get ip ()
	{
		return this.get ('ip');
	}

	get port ()
	{
		return this.get ('port');
	}

	get secureport ()
	{
		return this.get ('secureport');
	}

	get category ()
	{
		return this.get ('category');
	}

	get platform ()
	{
		return this.get ('platform');
	}

	get uplink ()
	{
		return 'local';
	}

	hasProperties ()
	{
		return _.reduce (this.parametersArray, function (size, parameters) { return size + (parameters === null?0:1); }, 0) !== 0;
	}
}

function registerSerialListener (callback)
{
	process.nextTick (function ()
	{
		callback (serialDevices);
	});
	emitter.on ('serial', callback);
}

function unregisterSerialListener (callback)
{
	emitter.removeListener ('serial', callback);
}

function registerLocalListener (callback)
{
	process.nextTick (function ()
	{
		callback (devices);
	});
	emitter.on ('local', callback);
}

function unregisterLocalListener (callback)
{
	emitter.removeListener ('local', callback);
}

function findDevicePosition (id)
{
	_.findIndex (devices, function (device) { return device.id === id; });
}

function findDevice (id)
{
	debug ('Searching for device '+id);
	var position = _.findIndex (devices, function (device) { return device.id === id; });
	if (position >= 0)
	{
		debug ('Found device '+position);
		return devices[position];
	}
	else return null;
}

function addDevice (device)
{
	devices.push (device);
}

function getLocalDevices ()
{
	return devices;
}

function getSerialDevices (done)
{
	return serialDevices;
}

function eraseDevices (priority)
{
	debug ('Erasing properties with priority '+priority);
	_.each (devices, function (device)
	{
		device.eraseProperties (priority);
	});
}

function compactDevices ()
{
	for (var i=0; i<devices.length; i++)
	{
		debug ('Device hasProperties '+devices[i].hasProperties()+' for id '+devices[i].id);
		if (!devices[i].hasProperties())
		{
			debug ('Device '+devices[i].id+' has 0 properties');
			devices.splice (i, 1);
			i--;
		}
	}
	emitter.emit ('local', devices);
	console.log (devices);
}

debug ('mdns for _wyapp');
chrome.mdns.onServiceList.addListener (function (services)
{
	debug ('Services _wyapp');
	debug (services);
	eraseDevices (WYAPP);
	_.each (services, function (service)
	{
		debug ('Service');
		debug (service);
		var id = deviceId (service.serviceHostPort);
		debug ('Device id '+id);
		var device = findDevice (id);
		if (device === null)
		{
			debug ('new device '+id);
			device = new Device (id);
			addDevice (device);
		}

		var category = _.find (service.serviceData, function (serviceData)
		{
			return (serviceData.indexOf ('category=')===0);
		});

		if (category) category = category.substring (9);

		var platform = _.find (service.serviceData, function (serviceData)
		{
			return (serviceData.indexOf ('platform=')===0);
		});

		if (platform) platform = platform.substring (9);

		var name = _.find (service.serviceData, function (serviceData)
		{
			return (serviceData.indexOf ('name=')===0);
		});

		if (name) name = name.substring (5);
		else
		{
			name = service.serviceName.split('.')[0];	
		}

		var parameters = 
		{
			name: name,
			ip: service.ipAddress,
			category: category,
			platform: platform,
			port: parseInt(service.serviceHostPort.substring (service.serviceHostPort.lastIndexOf (':')+1)),
			secureport: 22
		};
		device.addParameters (WYAPP, parameters);
		// $scope.devices.push ({ip: service.ipAddress, port: parseInt(service.serviceHostPort.substring (service.serviceHostPort.lastIndexOf (':')+1)), secureport:22, name: service.serviceName.split('.')[0]+' ('+service.ipAddress+')'});
		// var deviceindex = _.findIndex ($scope.devicesinstall, function (device) { return device.ip === service.ipAddress; });
		// if (deviceindex >= 0) $scope.devicesinstall.splice (deviceindex, 1);
	});
	debug ('Compacting devices');
	compactDevices ();
}, {serviceType: '_wyapp._tcp.local'});

debug ('mdns for _sshsvc');
chrome.mdns.onServiceList.addListener (function (services)
{
	debug ('Services _sshsvc');
	debug (services);
	eraseDevices (SSHSVC);
	_.each (services, function (service)
	{
		debug ('Service');
		debug (service);
		var category = null;
		var name = _.find (service.serviceData, function (serviceData)
		{
			if (serviceData.indexOf ('model=Raspberry Pi')>=0) category = 'raspberrypi';
			else
			if (serviceData.indexOf ('model=SBC')>=0) category = 'dragonboard';
			return (category !== null);
		});
		if (name)
		{
			debug ('Found '+name+' of type '+category);
			var id = deviceId (service.serviceHostPort);
			debug ('Device id '+id);
			var device = findDevice (id);
			if (device === null)
			{
				debug ('new device '+id);
				device = new Device (id);
				addDevice (device);
			}
			// var deviceindex = _.findIndex ($scope.devices, function (device) { return device.ip === service.ipAddress; });
			// if (deviceindex < 0)
			// {
			// 	$scope.devicesinstall.push ({category: category, ip: service.ipAddress, port: parseInt(service.serviceHostPort.substring (service.serviceHostPort.lastIndexOf (':')+1)), secureport:22, name: name.substring (6)+' ('+service.ipAddress+')', type:'_sshsvc._tcp.local', platform:'windows'});
			// }
			var parameters = 
			{
				name: name.substring(6),
				category: category, 
				ip: service.ipAddress,
				port: parseInt(service.serviceHostPort.substring (service.serviceHostPort.lastIndexOf (':')+1)),
				secureport: 22,
				platform: 'windows',
			};
			device.addParameters (SSHSVC, parameters);
		}
		
	});
	debug ('Compacting devices');
	compactDevices ();
}, {serviceType: '_sshsvc._tcp.local'});

debug ('mdns for _workstation'); // Linux Raspberry Pi
chrome.mdns.onServiceList.addListener (function (services)
{
	debug ('Services _workstation');
	debug (services);
	eraseDevices (WORKSTATION);
	var regex = /([^[]+) \[([0-9a-f:]+)\]/;
	// removeDevices ('_workstation._tcp.local');
	_.each (services, function (service)
	{
		debug ('Service');
		debug (service);
		var data = service.serviceName.match (regex);
		if (data && data[2])
		{
			var category = null;
			if (data[2].toLowerCase().startsWith ('b8:27:eb') || data[1] === 'raspberrypi')
			{
				category = 'raspberrypi';
				// $scope.devicesinstall.push ({category: 'raspberrypi', ip: service.ipAddress, port: parseInt(service.serviceHostPort.substring (service.serviceHostPort.lastIndexOf (':')+1)), secureport:22, name: data[1]+' ('+service.ipAddress+')', type:'_workstation._tcp.local', platform:'linux'});
			}
			else
			if (data[2].toLowerCase().startsWith ('d0:5f:b8'))
			{
				category = 'beagleboneblack';
				// $scope.devicesinstall.push ({category: 'beagleboneblack', ip: service.ipAddress, port: parseInt(service.serviceHostPort.substring (service.serviceHostPort.lastIndexOf (':')+1)), secureport:22, name: data[1]+' ('+service.ipAddress+')', type:'_workstation._tcp.local', platform:'linux'});
			}
			if (category)
			{
				debug ('Found '+category);
				var id = deviceId (service.serviceHostPort);
				debug ('Device id '+id);
				var device = findDevice (id);
				if (device === null)
				{
					debug ('new device '+id);
					device = new Device (id);
					addDevice (device);
				}
				var parameters =
				{
					name: data[1],
					category: 'raspberrypi',
					ip: service.ipAddress,
					port: parseInt(service.serviceHostPort.substring (service.serviceHostPort.lastIndexOf (':')+1)),
					secureport: 22,
					platform: 'linux'
				};
				device.addParameters (WORKSTATION, parameters);
			}
		}
	});
	debug ('Compacting devices');
	compactDevices ();
}, {serviceType: '_workstation._tcp.local'});

module.exports.getLocalDevices = getLocalDevices;
module.exports.getSerialDevices = getSerialDevices;
module.exports.registerSerialListener = registerSerialListener;
module.exports.registerLocalListener = registerLocalListener;
module.exports.unregisterSerialListener = unregisterSerialListener;
module.exports.unregisterLocalListener = unregisterLocalListener;


