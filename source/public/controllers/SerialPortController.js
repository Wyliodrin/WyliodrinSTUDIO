
"use strict";

var angular = require ('angular');

var mixpanel = require ('mixpanel');

var _ = require ('lodash');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:SerialPortController');

debug ('Loading');


module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller('SerialPortsController', function($scope, $timeout, $filter, $wydevice, $mdDialog, $wyapp){
		debug ('Registering');
		$scope.serialPorts = [];
		$scope.serialPort = null;
		$scope.status = $wydevice.getStatus ();

		$scope.devices = [{ip: '', port: 7000, secureport: 22, name: $filter('translate')('DEVICE_ADDRESS')}];

		$scope.devicesinstall = [];

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

		chrome.mdns.onServiceList.addListener (function (services)
		{
			debug (services);
			$timeout (function ()
			{
				$scope.devices = [];
				_.each (services, function (service)
				{
					$scope.devices.push ({ip: service.ipAddress, port: parseInt(service.serviceHostPort.substring (service.serviceHostPort.lastIndexOf (':')+1)), secureport:22, name: service.serviceName.split('.')[0]+' ('+service.ipAddress+')'});
					var deviceindex = _.findIndex ($scope.devicesinstall, function (device) { return device.ip === service.ipAddress; });
					if (deviceindex >= 0) $scope.devicesinstall.splice (deviceindex, 1);
				});
				$scope.devices.push ({ip: '', port: -1000, name: $filter('translate')('DEVICE_ADDRESS')});
				if ($scope.serialPort === null) $scope.serialPort = $scope.devices[$scope.devices.length-1];
			});
		}, {serviceType: '_wyapp._tcp.local'});

		chrome.mdns.onServiceList.addListener (function (services)
		{
			debug (services);
			var regex = /([^[]+)\[([0-9a-f:]+)\]/;
			$timeout (function ()
			{
				$scope.devicesinstall = [];
				_.each (services, function (service)
				{
					var data = service.serviceName.match (regex);
					if (data && data[2])
					{
						var deviceindex = _.findIndex ($scope.devices, function (device) { return device.ip === service.ipAddress; });
						if (deviceindex < 0 && data[2].toLowerCase().startsWith ('b8:27:eb'))
						{
							$scope.devicesinstall.push ({category: 'raspberrypi', ip: service.ipAddress, port: parseInt(service.serviceHostPort.substring (service.serviceHostPort.lastIndexOf (':')+1)), secureport:22, name: data[1]+' ('+service.ipAddress+')'});
						}
						else
						if (deviceindex < 0 && data[2].toLowerCase().startsWith ('d0:5f:b8'))
						{
							$scope.devicesinstall.push ({category: 'raspberrypi', ip: service.ipAddress, port: parseInt(service.serviceHostPort.substring (service.serviceHostPort.lastIndexOf (':')+1)), secureport:22, name: data[1]+' ('+service.ipAddress+')'});
						}
					}
				});
			});
		}, {serviceType: '_workstation._tcp.local'});

		this.getPorts = function ()
		{
			var that = this;
			setTimeout (function ()
			{
				$wydevice.listDevices (function (err, list)
				{
					if (err)
					{
						that.getPorts ();
					}
					else
					{
						$timeout (function ()
						{
							if (list.length != $scope.serialPorts.length)
							{
								$scope.serialPorts = list;
								// if ($scope.serialPort === null && $scope.serialPorts.length > 0) $scope.serialPort = $scope.serialPorts[0];
							}					
							that.getPorts ();
						});
					}
				});
			}, 1000);
		};

		this.getPorts ();

		$wydevice.on ('status', function (status)
		{
			$timeout (function ()
			{
				$scope.status = status;

				if (status === 'INSTALL')
				{
					var message = $mdDialog.confirm()
				          .title($filter('translate')('DEVICE_QUESTION_INSTALL_SHELL'))
				          .ok($filter('translate')('DEVICE_INSTALL'))
				          .cancel($filter('translate')('PROJECT_SHELL'));
				    $mdDialog.show(message).then(function() {
				   		$wyapp.emit ('install');
				    }, function() {
				     	
				    });
				}

			});
		});

		$wydevice.on ('connection_timeout', function ()
		{
			var message = $mdDialog.confirm()
		          .title($filter('translate')('DEVICE_CONNECTION_TIMEOUT'))
		          .ok($filter('translate')('TOOLBAR_SETUP'))
		          .cancel($filter('translate')('OK'));
		    $mdDialog.show(message).then(function() {
		      $wyapp.emit ('board');
		    }, function() {
		     	
		    });
		});

		$wydevice.on ('connection_error', function ()
		{
			var message = $mdDialog.confirm()
		          .title($filter('translate')('DEVICE_CONNECTION_ERROR'))
		          .ok($filter('translate')('TOOLBAR_SETUP'))
		          .cancel($filter('translate')('OK'));
		    $mdDialog.show(message).then(function() {
		      $wyapp.emit ('board');
		    }, function() {
		     	
		    });
		});

		$wydevice.on ('connection_login_failed', function ()
		{
			var message = $mdDialog.confirm()
		          .title($filter('translate')('DEVICE_CONNECTION_FAILED'))
		          .ok($filter('translate')('DEVICE_CONNECT'))
		          .cancel($filter('translate')('OK'));
		          // Should be a retry button???
		    $mdDialog.show(message).then(function() {
		      // $wyapp.emit ('board');
		      that.open ();
		    }, function() {
		     	
		    });
		});

		this.open = function ()
		{
			debug ('Opening serialport '+$scope.serialPort);
			// console.log ('Opening serialport '+$scope.serialPort);
			if ($scope.serialPort.path === 'chrome')
			{
				$wydevice.connect ($scope.serialPort.path, {type:'chrome'});
				mixpanel.track ('SerialPort Connect',{
					style:'chrome',
					device: 'chrome'
				});
			}
			else
			if ($scope.serialPort.path)
			{
				$wydevice.connect ($scope.serialPort.path);
				mixpanel.track ('SerialPort Connect',{
					style:'serial',
					device: $scope.serialPort.path
				});
			}
			else
			{
				var scope = $scope;
				$mdDialog.show({
			      controller: function ($scope)
			      {
			      	$scope.device =
			      	{
			      		ip: (scope.serialPort.ip.length>0?scope.serialPort.ip:ip),
			      		port: (scope.serialPort.port >= 0?scope.serialPort.port:port),
			      		secureport: (scope.serialPort.secureport >= 0?scope.serialPort.secureport:secureport),
			      		username: users[(scope.serialPort.ip.length>0?scope.serialPort.ip:ip)] || '',
			      		category: scope.serialPort.category
			      	};

			      	$scope.device.secure = true;

			      	this.connect = function ()
			      	{
			      		scope.serialPort.ip = $scope.device.ip;
			      		scope.serialPort.port = $scope.device.port;
			      		users[$scope.device.ip] = $scope.device.username;
			      		ip = $scope.device.ip;
			      		port = $scope.device.port;
			      		var type = 'chrome-socket';
			      		if ($scope.device.secure) 
			      		{
			      			type = 'chrome-ssh';
			      			port = $scope.device.secureport;
			      		}
			      		$wydevice.connect ($scope.device.ip, {type:type, port: port, username:$scope.device.username, password:$scope.device.password, category:scope.serialPort.category});
			      		$mdDialog.hide ();
			      		mixpanel.track ('SerialPort Connect', {
			      			style: 'address',
			      			type: type
			      		});
			      	};

			      	this.exit = function ()
			      	{
			      		$mdDialog.hide ();
			      	};
			      },
			      controllerAs: 'a',
			      templateUrl: '/public/views/authenticate.html',
			      // parent: angular.element(document.body),
			      // targetEvent: ev,
			      escapeToClose: false,
			      clickOutsideToClose: false,
			      fullscreen: false
			    });
			}
		};

		this.exit = function ()
		{
			debug ('Disconnect');
			$wydevice.disconnect ();
		};
	});
};
