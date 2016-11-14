
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


	app.controller('DeviceNetworkController', function($scope, $wydevice, $wyapp, $mdDialog, $filter){
		debug ('Registering');

		var devicesCache;
		var users = {};
		var ip = '';
		var port = 7000;
		var secureport = 22;


		$wydevice.on ('connection_timeout', function ()
		{
			console.log('on connection_timeout');
			var message = $mdDialog.confirm()
		          .title($filter('translate')('DEVICE_CONNECTION_TIMEOUT'))
		          .ok($filter('translate')('OK'));
		    $mdDialog.show(message);
		});

		$wydevice.on ('connection_error', function ()
		{
			console.log('on connection_error');
			var message = $mdDialog.confirm()
		          .title($filter('translate')('DEVICE_CONNECTION_ERROR'))
		          .ok($filter('translate')('OK'));
		    $mdDialog.show(message);
		});

		$wydevice.on ('connection_login_failed', function (device)
		{
			var message = $mdDialog.alert()
		          .title($filter('translate')('DEVICE_CONNECTION_FAILED'))
		          .ok($filter('translate')('OK'));
		          // Should be a retry button???
		    $mdDialog.show(message);
		});

		var network = {
			devices: function (devices){},
			getDevices: function (){return devicesCache;},
			connectDevice: function (device)
			{
				connect(device);
			},
			disconnectDevice: function (deviceId)
			{
				$wydevice.disconnect (deviceId);
			},
			shell: function (deviceId)
			{
				console.log('shell');
				$mdDialog.show({
			      controller: 'TerminalDialogController',
			      // controllerAs: 'x',
			      templateUrl: '/public/views/shell.html',
			      parent: angular.element(document.body),
			      // targetEvent: ev,
			      locals: {deviceId: deviceId},
			      clickOutsideToClose:true,
			      fullscreen: false
			    });
			},
			status: function (boardId, status){}
		};

		window.getNetwork  = function ()
		{
			return network;
		};

		$wydevice.on ('status', function (status, deviceId)
		{
			console.log('status ' + status);
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
				network.status (deviceId, status);
			}
		});

		var connect = function (device)
		{
			if (!device) device = {ip:'', port:7000, secureport:22};
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
			      		ip: (device.options.address.length>0?device.options.address:ip),
			      		port: (device.options.port >= 0?device.options.port:port),
			      		secureport: (device.options.secureport >= 0?device.options.secureport:secureport),
			      		username: users[(device.options.address.length>0?device.options.address:ip)] || '',
			      		category: device.category
			      	};

			      	this.connect = function ()
			      	{
			      		users[device.id] = $scope.device.username;
			      		ip = $scope.device.ip;
			      		port = $scope.device.port;
			      		var type = 'chrome-socket';
			      		if ($scope.device.secure) 
			      		{
			      			type = 'chrome-ssh';
			      			port = $scope.device.secureport;
			      		}
			      		$wydevice.connect (device.id, {address: $scope.device.ip, type:type, port: port, username:$scope.device.username, password:$scope.device.password, category:device.category, platform: device.platform});
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
			$wydevice.registerForNetworkDevices (function (devices){
				devicesCache = devices;
				network.devices(devices);
			});
		};
		setTimeout(getDevices, 1000);
	});
};
