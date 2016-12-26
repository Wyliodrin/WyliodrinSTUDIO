"use strict";

var angular = require ('angular');
var $ = require ('jquery');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:DeviceNetworkController');

debug ('Loading');

module.exports = function ()
{
	var app = angular.module ('wyliodrinApp');


	app.controller('DeviceNetworkController', function($scope, $wydevices, $wyapp, $mdDialog, $filter){
		debug ('Registering');

		// var devicesCache = [];
		// var users = {};
		var ip = '';
		var port = 7000;
		var secureport = 22;

		$wydevices.on ('devices', function (devicesList, devicesTree){
			network.devices(devicesList, devicesTree);
		});

		var network = {
			devices: function (devices){},
			// getDevices: function (){return devicesCache;},
			connectDevice: function (device)
			{
				connect(device);

				$wydevices.on ('connection_timeout:'+device.uplink+':'+device.id, function ()
				{
					console.log('on connection_timeout');
					var message = $mdDialog.confirm()
				          .title($filter('translate')('DEVICE_CONNECTION_TIMEOUT'))
				          .ok($filter('translate')('OK'));
				    $mdDialog.show(message);
				});

				$wydevices.on ('connection_error:'+device.uplink+':'+device.id, function ()
				{
					console.log('on connection_error');
					var message = $mdDialog.confirm()
				          .title($filter('translate')('DEVICE_CONNECTION_ERROR'))
				          .ok($filter('translate')('OK'));
				    $mdDialog.show(message);
				});

				$wydevices.on ('connection_login_failed:'+device.uplink+':'+device.id, function (device)
				{
					var message = $mdDialog.alert()
				          .title($filter('translate')('DEVICE_CONNECTION_FAILED'))
				          .ok($filter('translate')('OK'));
				          // Should be a retry button???
				    $mdDialog.show(message);
				});

				$wydevices.on ('status:'+device.uplink+':'+device.id, function (device)
				{
					var status = device.status;
					if (status === 'INSTALL')
					{
						var message = $mdDialog.confirm()
					          .title($filter('translate')('DEVICE_QUESTION_INSTALL_SHELL'))
					          .ok($filter('translate')('DEVICE_INSTALL'))
					          .cancel($filter('translate')('PROJECT_SHELL'));
					    $mdDialog.show(message).then(function() {
					   		$wyapp.emit ('install');
					    });
					}
					else
					{
						network.status (device);
					}
				});
			},

			disconnectDevice: function (device)
			{
				$wydevices.disconnect (device);
			},

			shell: function (device)
			{
				$mdDialog.show({
			      controller: 'TerminalDialogController',
			      // controllerAs: 'x',
			      templateUrl: '/public/views/shell.html',
			      parent: angular.element(document.body),
			      // targetEvent: ev,
			      locals: {device:device},
			      clickOutsideToClose:true,
			      fullscreen: false
			    });
			},

			status: function (device){}
		};

		window.getNetwork  = function ()
		{
			return network;
		};

		var connect = function (device)
		{
			debug ('Connecting to '+device);
			if (device.platform === 'chrome')
			{
				//$scope.connection = 'chrome';
				//$wydevice.connect ('', {type:'chrome'});
				// mixpanel.track ('SerialPort Connect',{
				// 	style:'chrome',
				// 	device: 'chrome'
				// });
			}
			else
			if (device.platform === 'serial')
			{
				//$scope.connection = device.ip;
				//$wydevice.connect (device.ip);
				// mixpanel.track ('SerialPort Connect',{
				// 	style:'serial',
				// 	device: device.ip
				// });
			}
			else
			{
				$mdDialog.show({
			      controller: function ($scope)
			      {
			      	$scope.device =
			      	{
			      		ip: (device.ip?device.ip:ip),
			      		port: (device.port?device.port:port),
			      		secureport: (device.secureport?device.secureport:secureport),
			      		username: (device.username?device.username:'')
			      	};

			      	this.connect = function ()
			      	{
			      		var options = {
			      			ip: $scope.device.ip,
			      			username: $scope.device.username,
			      			port: $scope.device.port,
			      			type: 'chrome-socket',
			      			password: $scope.device.password
			      		};

			      		if ($scope.device.secure) 
			      		{
			      			options.type = 'chrome-ssh';
			      			
			      		}
			      		$wydevices.connect (device.uplink, device.id, options);
			      		$mdDialog.hide ();
			      		// mixpanel.track ('SerialPort Connect', {
			      		// 	style: 'address',
			      		// 	type: type
			      		// });
			      	};

			      	this.exit = function ()
			      	{
			      		$mdDialog.hide ();
			      	};
			      },
			      controllerAs: 'a',
			      templateUrl: '/public/views/authenticate.html',
			      escapeToClose: false,
			      clickOutsideToClose: false,
			      fullscreen: false
			    });
			}

		};


		var getDevices = function ()
		{
			$wydevices.getDevices();
		};
		
		setTimeout(getDevices, 1000);
	});
};