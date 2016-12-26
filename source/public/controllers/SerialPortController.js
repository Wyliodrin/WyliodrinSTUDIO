
"use strict";

var angular = require ('angular');

var mixpanel = require ('mixpanel');

var _ = require ('lodash');

var path = require ('path');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:SerialPortController');

debug ('Loading');


module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller('SerialPortsController', function($scope, $timeout, $filter, $wydevices, $mdDialog, $wyapp){
		debug ('Registering');
		// $scope.serialPorts = [];
		// $scope.serialPort = null;
		//$scope.status = $wydevice.getStatus ();
		$scope.connection = '';

		$scope.devices = [];

		var ctrl = this;

		var that = this;

		var users = {};

		var ip = '';
		var port = 7000;
		var secureport = 22;

		// setInterval (function ()
		// {
		// 	chrome.mdns.forceDiscovery (function ()
		// 	{
		// 		debug ('mdns discovery');
		// 	});
		// }, settings.INTERVAL_MDNS);

		// function removeDevices (serviceType)
		// {
		// 	for (var index = 0; index < $scope.devicesinstall.length; index++)
		// 	{
		// 		if ($scope.devicesinstall[index].type === serviceType)
		// 		{
		// 			$scope.devicesinstall.splice (index, 1);
		// 			index --;
		// 		}
		// 	}
		// }

		// chrome.mdns.onServiceList.addListener (function (services)
		// {
		// 	debug (services);
		// 	$timeout (function ()
		// 	{
		// 		$scope.devices = [];
		// 		_.each (services, function (service)
		// 		{
		// 			$scope.devices.push ({ip: service.ipAddress, port: parseInt(service.serviceHostPort.substring (service.serviceHostPort.lastIndexOf (':')+1)), secureport:22, name: service.serviceName.split('.')[0]+' ('+service.ipAddress+')'});
		// 			var deviceindex = _.findIndex ($scope.devicesinstall, function (device) { return device.ip === service.ipAddress; });
		// 			if (deviceindex >= 0) $scope.devicesinstall.splice (deviceindex, 1);
		// 		});
		// 		$scope.devices.push ({ip: '', port: -1000, name: $filter('translate')('DEVICE_ADDRESS')});
		// 		if ($scope.serialPort === null) $scope.serialPort = $scope.devices[$scope.devices.length-1];
		// 	});
		// }, {serviceType: '_wyapp._tcp.local'});

		// chrome.mdns.onServiceList.addListener (function (services)
		// {
		// 	debug (services);
		// 	var regex = /([^[]+)\[([0-9a-f:]+)\]/;
		// 	$timeout (function ()
		// 	{
		// 		removeDevices ('_workstation._tcp.local');
		// 		_.each (services, function (service)
		// 		{
		// 			var data = service.serviceName.match (regex);
		// 			if (data && data[2])
		// 			{
		// 				var deviceindex = _.findIndex ($scope.devices, function (device) { return device.ip === service.ipAddress; });
		// 				if (deviceindex < 0 && data[2].toLowerCase().startsWith ('b8:27:eb'))
		// 				{
		// 					$scope.devicesinstall.push ({category: 'raspberrypi', ip: service.ipAddress, port: parseInt(service.serviceHostPort.substring (service.serviceHostPort.lastIndexOf (':')+1)), secureport:22, name: data[1]+' ('+service.ipAddress+')', type:'_workstation._tcp.local', platform:'linux'});
		// 				}
		// 				else
		// 				if (deviceindex < 0 && data[2].toLowerCase().startsWith ('d0:5f:b8'))
		// 				{
		// 					$scope.devicesinstall.push ({category: 'beagleboneblack', ip: service.ipAddress, port: parseInt(service.serviceHostPort.substring (service.serviceHostPort.lastIndexOf (':')+1)), secureport:22, name: data[1]+' ('+service.ipAddress+')', type:'_workstation._tcp.local', platform:'linux'});
		// 				}
		// 			}
		// 		});
		// 	});
		// }, {serviceType: '_workstation._tcp.local'});

		// chrome.mdns.onServiceList.addListener (function (services)
		// {
		// 	debug (services);
		// 	$timeout (function ()
		// 	{
		// 		removeDevices ('_sshsvc._tcp.local');
		// 		_.each (services, function (service)
		// 		{
		// 			var category = null;
		// 			var name = _.find (service.serviceData, function (serviceData)
		// 			{
		// 				if (serviceData.indexOf ('model=Raspberry Pi')>=0) category = 'raspberrypi';
		// 				else
		// 				if (serviceData.indexOf ('model=SBC')>=0) category = 'dragonboard';
		// 				return (category !== null);
		// 			});
		// 			if (name)
		// 			{

		// 				var deviceindex = _.findIndex ($scope.devices, function (device) { return device.ip === service.ipAddress; });
		// 				if (deviceindex < 0)
		// 				{
		// 					$scope.devicesinstall.push ({category: category, ip: service.ipAddress, port: parseInt(service.serviceHostPort.substring (service.serviceHostPort.lastIndexOf (':')+1)), secureport:22, name: name.substring (6)+' ('+service.ipAddress+')', type:'_sshsvc._tcp.local', platform:'windows'});
		// 				}
		// 			}
		// 		});
		// 	});
		// }, {serviceType: '_sshsvc._tcp.local'});

		// $wydevice.on ('status', function (status)
		// {
		// 	$timeout (function ()
		// 	{
		// 		$scope.status = status;

		// 		if (status === 'INSTALL')
		// 		{
		// 			var message = $mdDialog.confirm()
		// 		          .title($filter('translate')('DEVICE_QUESTION_INSTALL_SHELL'))
		// 		          .ok($filter('translate')('DEVICE_INSTALL'))
		// 		          .cancel($filter('translate')('PROJECT_SHELL'));
		// 		    $mdDialog.show(message).then(function() {
		// 		   		$wyapp.emit ('install');
		// 		    }, function() {
				     	
		// 		    });
		// 		}

		// 	});
		// });

		// $wydevice.on ('connection_timeout', function ()
		// {
		// 	var message = $mdDialog.confirm()
		//           .title($filter('translate')('DEVICE_CONNECTION_TIMEOUT'))
		//           .ok($filter('translate')('TOOLBAR_SETUP'))
		//           .cancel($filter('translate')('OK'));
		//     $mdDialog.show(message).then(function() {
		//       $wyapp.emit ('board');
		//     }, function() {
		     	
		//     });
		// });

		// $wydevice.on ('connection_error', function ()
		// {
		// 	var message = $mdDialog.confirm()
		//           .title($filter('translate')('DEVICE_CONNECTION_ERROR'))
		//           .ok($filter('translate')('TOOLBAR_SETUP'))
		//           .cancel($filter('translate')('OK'));
		//     $mdDialog.show(message).then(function() {
		//       $wyapp.emit ('board');
		//     }, function() {
		     	
		//     });
		// });

		// $wydevice.on ('connection_login_failed', function ()
		// {
		// 	var message = $mdDialog.confirm()
		//           .title($filter('translate')('DEVICE_CONNECTION_FAILED'))
		//           .ok($filter('translate')('DEVICE_CONNECT'))
		//           .cancel($filter('translate')('OK'));
		//           // Should be a retry button???
		//     $mdDialog.show(message).then(function() {
		//       // $wyapp.emit ('board');
		//       that.open ();
		//     }, function() {
		     	
		//     });
		// });

		// this.name = function ()
		// {
		// 	mixpanel.track ('Board Rename', {
				
		// 	});
		// 	$mdDialog.hide ();
		// 	var renameBoardDialog = $mdDialog.show({
		//       controller: function ($scope)
		//       {

				  
		// 		//$scope.name = $wydevice.device.name;
				  
				  
		//    //    	this.rename = function ()
		//    //    	{
		// 			// //debug ('Rename board '+$wydevice.device.name);
		// 			// if ($scope.name.trim().length >= 1)
		// 			// {
		// 			// 	$wydevice.send ('n', {n:$scope.name.trim()});
		// 			// 	$mdDialog.hide ();
		// 			// }
		// 			// else
		// 			// {
		// 			// 	debug ("Board name is unacceptable");
		// 			// }
		//    //    	};
				
		// 		this.cancel = function ()
		//       	{
		// 			$mdDialog.hide ();
		//       	};

		//       },
		//       controllerAs: 'a',
		//       templateUrl: '/public/views/name.html',
		//       // parent: angular.element(window.body),
		//       // targetEvent: ev,
		//       clickOutsideToClose:true,
		//       fullscreen: false
		//     });	
		// };

		// this.connect = function (device)
		// {
		// 	if (!device) device = {ip:'', port:7000, secureport:22};
		// 	debug ('Connecting to '+device);
		// 	if (device.platform === 'chrome')
		// 	{
		// 		$scope.connection = 'chrome';
		// 		$wydevice.connect ('', {type:'chrome'});
		// 		mixpanel.track ('SerialPort Connect',{
		// 			style:'chrome',
		// 			device: 'chrome'
		// 		});
		// 	}
		// 	else
		// 	if (device.uplink === 'serial')
		// 	{
		// 		$scope.connection = device.ip;
		// 		$wydevice.connect (device.ip);
		// 		mixpanel.track ('SerialPort Connect',{
		// 			style:'serial',
		// 			device: device.ip
		// 		});
		// 	}
		// 	else
		// 	{
		// 		var scope = $scope;
		// 		$mdDialog.show({
		// 	      controller: function ($scope)
		// 	      {
		// 	      	$scope.device =
		// 	      	{
		// 	      		ip: (device.ip.length>0?device.ip:ip),
		// 	      		port: (device.port >= 0?device.port:port),
		// 	      		secureport: (device.secureport >= 0?device.secureport:secureport),
		// 	      		username: users[(device.ip.length>0?device.ip:ip)] || '',
		// 	      		category: device.category
		// 	      	};

		// 	      	$scope.device.secure = true;

		// 	      	this.connect = function ()
		// 	      	{
		// 	      		// device.ip = $scope.device.ip;
		// 	      		// device.port = $scope.device.port;
		// 	      		users[$scope.device.ip] = $scope.device.username;
		// 	      		ip = $scope.device.ip;
		// 	      		port = $scope.device.port;
		// 	      		var type = 'chrome-socket';
		// 	      		if ($scope.device.secure) 
		// 	      		{
		// 	      			type = 'chrome-ssh';
		// 	      			port = $scope.device.secureport;
		// 	      		}
		// 	      		scope.connection = ip;
		// 	      		$wydevice.connect ($scope.device.ip, {type:type, port: port, username:$scope.device.username, password:$scope.device.password, category:device.category, platform: device.platform});
		// 	      		$mdDialog.hide ();
		// 	      		mixpanel.track ('SerialPort Connect', {
		// 	      			style: 'address',
		// 	      			type: type
		// 	      		});
		// 	      	};

		// 	      	this.exit = function ()
		// 	      	{
		// 	      		$mdDialog.hide ();
		// 	      	};
		// 	      },
		// 	      controllerAs: 'a',
		// 	      templateUrl: '/public/views/authenticate.html',
		// 	      // parent: angular.element(document.body),
		// 	      // targetEvent: ev,
		// 	      escapeToClose: false,
		// 	      clickOutsideToClose: false,
		// 	      fullscreen: false
		// 	    });
		// 	}

		// };

		// this.open = function ()
		// {
		// 	// debug ('Opening serialport '+$scope.serialPort);
		// 	$mdDialog.show({
		// 	      controller: function ($scope, $wydevice, $timeout)
		// 	      {
		// 	      	$scope.devices = {};

		// 			// this.getPorts ();

		// 	      	var listDevices = function (devices)
		// 	      	{
		// 	      		$timeout (function ()
		// 	      		{
		// 	      			$scope.devices = devices;
		// 	      		});
		// 	      	};

		// 	      	// $wydevice.registerForNetworkDevices (listDevices);
		// 	      	$wydevices.on ('devices', listDevices);
		// 	      	$wydevices.getDevices ();

		// 	      	this.connect = function (device)
		// 	      	{
		// 	      		this.exit ();
		// 	      		that.connect (device);
		// 	      	};

		// 	      	this.exit = function ()
		// 	      	{
		// 	      		$wydevices.removeListener ('devices', listDevices);
		// 	      		this.listPorts = false;
		// 	      		$mdDialog.hide ();
		// 	      	};
		// 	      },
		// 	      controllerAs: 'c',
		// 	      templateUrl: '/public/views/connect.html',
		// 	      // parent: angular.element(document.body),
		// 	      // targetEvent: ev,
		// 	      escapeToClose: false,
		// 	      clickOutsideToClose: false,
		// 	      fullscreen: false
		// 	    });

		// 	// console.log ('Opening serialport '+$scope.serialPort);
		// 	// if ($scope.serialPort.path === 'chrome')
		// 	// {
		// 	// 	$wydevice.connect ($scope.serialPort.path, {type:'chrome'});
		// 	// 	mixpanel.track ('SerialPort Connect',{
		// 	// 		style:'chrome',
		// 	// 		device: 'chrome'
		// 	// 	});
		// 	// }
		// 	// else
		// 	// if ($scope.serialPort.path)
		// 	// {
		// 	// 	$wydevice.connect ($scope.serialPort.path);
		// 	// 	mixpanel.track ('SerialPort Connect',{
		// 	// 		style:'serial',
		// 	// 		device: $scope.serialPort.path
		// 	// 	});
		// 	// }
		// 	// else
		// 	// {
		// 	// 	var scope = $scope;
		// 	// 	$mdDialog.show({
		// 	//       controller: function ($scope)
		// 	//       {
		// 	//       	$scope.device =
		// 	//       	{
		// 	//       		ip: (scope.serialPort.ip.length>0?scope.serialPort.ip:ip),
		// 	//       		port: (scope.serialPort.port >= 0?scope.serialPort.port:port),
		// 	//       		secureport: (scope.serialPort.secureport >= 0?scope.serialPort.secureport:secureport),
		// 	//       		username: users[(scope.serialPort.ip.length>0?scope.serialPort.ip:ip)] || '',
		// 	//       		category: scope.serialPort.category
		// 	//       	};

		// 	//       	$scope.device.secure = true;

		// 	//       	this.connect = function ()
		// 	//       	{
		// 	//       		scope.serialPort.ip = $scope.device.ip;
		// 	//       		scope.serialPort.port = $scope.device.port;
		// 	//       		users[$scope.device.ip] = $scope.device.username;
		// 	//       		ip = $scope.device.ip;
		// 	//       		port = $scope.device.port;
		// 	//       		var type = 'chrome-socket';
		// 	//       		if ($scope.device.secure) 
		// 	//       		{
		// 	//       			type = 'chrome-ssh';
		// 	//       			port = $scope.device.secureport;
		// 	//       		}
		// 	//       		$wydevice.connect ($scope.device.ip, {type:type, port: port, username:$scope.device.username, password:$scope.device.password, category:scope.serialPort.category, platform: scope.serialPort.platform});
		// 	//       		$mdDialog.hide ();
		// 	//       		mixpanel.track ('SerialPort Connect', {
		// 	//       			style: 'address',
		// 	//       			type: type
		// 	//       		});
		// 	//       	};

		// 	//       	this.exit = function ()
		// 	//       	{
		// 	//       		$mdDialog.hide ();
		// 	//       	};
		// 	//       },
		// 	//       controllerAs: 'a',
		// 	//       templateUrl: '/public/views/authenticate.html',
		// 	//       // parent: angular.element(document.body),
		// 	//       // targetEvent: ev,
		// 	//       escapeToClose: false,
		// 	//       clickOutsideToClose: false,
		// 	//       fullscreen: false
		// 	//     });
		// 	// }
		// };

		this.exit = function ()
		{
			debug ('Disconnect');
			//$wydevices.disconnect ();
		};
	});
};
