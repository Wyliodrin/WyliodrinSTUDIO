
"use strict";

var angular = require ('angular');

var mixpanel = require ('mixpanel');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:SerialPortController');

debug ('Loading');


module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller('SerialPortsController', function($scope, $timeout, $filter, $wydevice, $mdDialog){
		debug ('Registering');
		$scope.serialPorts = [];
		$scope.serialPort = null;
		$scope.status = $wydevice.getStatus ();

		$scope.devices = [{ip: '', port: 7000, name: $filter('translate')('DEVICE_ADDRESS')}];

		var ctrl = this;

		var that = this;

		var users = {};

		var ip = '';
		var port = 7000;

		setInterval (function ()
		{
			chrome.mdns.forceDiscovery (function ()
			{
				debug ('mdns discovery');
			});
		}, settings.INTERVAL_MDNS);

		chrome.mdns.onServiceList.addListener (function (services)
		{
			debug (services);
			$timeout (function ()
			{
				$scope.devices = [];
				for (var index=0; index<services.length; index++)
				{
					$scope.devices.push ({ip: services[index].ipAddress, port: parseInt(services[index].serviceHostPort.substring (services[index].serviceHostPort.lastIndexOf (':')+1)), name: services[index].serviceName.split('.')[0]+' ('+services[index].ipAddress+')'});
				}
				$scope.devices.push ({ip: '', port: -1000, name: $filter('translate')('DEVICE_ADDRESS')});
				if ($scope.serialPort === null) $scope.serialPort = $scope.devices[$scope.devices.length-1];
			});
		}, {serviceType: '_wyapp._tcp.local'});

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
			});
		});

		this.open = function ()
		{
			debug ('Opening serialport '+$scope.serialPort);
			// console.log ('Opening serialport '+$scope.serialPort);
			if ($scope.serialPort.path)
			{
				$wydevice.connect ($scope.serialPort.path);
				mixpanel.track ('SerialPort Connect',{
					style:'serial'
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
			      		username: users[(scope.serialPort.ip.length>0?scope.serialPort.ip:ip)]
			      	};

			      	this.connect = function ()
			      	{
			      		scope.serialPort.ip = $scope.device.ip;
			      		scope.serialPort.port = $scope.device.port;
			      		users[$scope.device.ip] = $scope.device.username;
			      		ip = $scope.device.ip;
			      		port = $scope.device.port;
			      		$wydevice.connect ($scope.device.ip, {type:'chrome-socket', port: $scope.device.port, username:$scope.device.username, password:$scope.device.password});
			      		$mdDialog.hide ();
			      		mixpanel.track ('SerialPort Connect', {
			      			style: 'address'
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
