
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

	app.controller('SerialPortsController', function($scope, $timeout, $filter, $wydevice, $wydevices, $mdDialog, $wyapp){
		debug ('Registering');
		$scope.status = $wydevice.getStatus ();
		$scope.connection = '';

		$scope.devices = [];

		var ctrl = this;

		var that = this;

		var users = {};
		var passwords = {};

		var ip = '';
		var port = 7000;
		var secureport = 22;

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

		$wydevice.on ('connection_busy_error', function ()
		{
			var message = $mdDialog.confirm()
		          .title($filter('translate')('DEVICE_CONNECTION_BUSY'))
		          .ok($filter('translate')('OK'));
		          // Should be a retry button???
		    $mdDialog.show(message).then(function() {
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
		      that.open ();
		    }, function() {
		     	
		    });
		});

		this.name = function ()
		{
			mixpanel.track ('Board Rename', {
				
			});
			$mdDialog.hide ();
			var renameBoardDialog = $mdDialog.show({
		      controller: function ($scope)
		      {
				$scope.name = $wydevice.device.name;

				if ($wydevice.device.version){
					$scope.version = $wydevice.device.version;
				}
				else{
					$scope.version = "Unknown";
				}

				if ($wydevice.device.libversion){
					$scope.libversion = $wydevice.device.libversion;
				}
				else{
					$scope.libversion = "Unknown";
				}
				
				if ($wydevice.device.os){
					$scope.os = $wydevice.device.os;
				}
				else{
					$scope.os = "Unknown";
				}

				$scope.supported = [];
				if ($wydevice.device.capabilities)
				{
					_.forOwn($wydevice.device.capabilities.l, function(value, key) {
						if (value){
							var language = _.filter(settings.LANGUAGES, { 'title' : key } )[0];
							if (language){
								$scope.supported.push(language.text);
							}
						}
					});
				}
				  
				  
		      	this.rename = function ()
		      	{
					debug ('Rename board '+$wydevice.device.name);
					if ($scope.name.trim().length >= 1)
					{
						$wydevice.send ('n', {n:$scope.name.trim()});
						$mdDialog.hide ();
					}
					else
					{
						debug ("Board name is unacceptable");
					}
		      	};
				
				this.cancel = function ()
		      	{
					$mdDialog.hide ();
		      	};

		      },
		      controllerAs: 'a',
		      templateUrl: '/public/views/name.html',
		      clickOutsideToClose:true,
		      fullscreen: false
		    });	
		};

		this.connect = function (device)
		{
			if (!device) device = {ip:'', port:7000, secureport:22};
			debug ('Connecting to '+device);
			if (device.platform === 'chrome')
			{
				$scope.connection = 'chrome';
				$wydevice.connect ('', {type:'chrome'});
				mixpanel.track ('SerialPort Connect',{
					style:'chrome',
					device: 'chrome'
				});
			}
			else
			if (device.uplink === 'serial')
			{
				$scope.connection = device.ip;
				$wydevice.connect (device.ip);
				mixpanel.track ('SerialPort Connect',{
					style:'serial',
					device: device.ip
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
			      		ip: (device.ip.length>0?device.ip:ip),
			      		port: (device.port >= 0?device.port:port),
			      		secureport: (device.secureport >= 0?device.secureport:secureport),
			      		username: users[(device.ip.length>0?device.ip:ip)] || '',
			      		password: passwords[(device.ip.length>0?device.ip:ip)] || '',
			      		category: device.category
			      	};

			      	$scope.device.secure = true;

			      	this.connect = function ()
			      	{
			      		users[$scope.device.ip] = $scope.device.username;
			      		passwords[$scope.device.ip] = $scope.device.password;
			      		ip = $scope.device.ip;
			      		port = $scope.device.port;
			      		var type = 'chrome-socket';
			      		if ($scope.device.secure) 
			      		{
			      			type = 'chrome-ssh';
			      			port = $scope.device.secureport;
			      		}
			      		scope.connection = ip;
			      		$wydevice.connect ($scope.device.ip, {type:type, port: port, username:$scope.device.username, password:$scope.device.password, category:device.category, platform: device.platform});
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
			      escapeToClose: false,
			      clickOutsideToClose: false,
			      fullscreen: false
			    });
			}

		};

		this.open = function ()
		{
			$mdDialog.show({
			      controller: function ($scope, $wydevice, $timeout)
			      {
			      	$scope.devices = {};

			      	var listDevices = function (devices)
			      	{
			      		$timeout (function ()
			      		{
			      			$scope.devices = devices;
			      		});
			      	};

			      	$wydevices.on ('devices', listDevices);
			      	$wydevices.getDevices ();

			      	this.connect = function (device)
			      	{
			      		this.exit ();
			      		that.connect (device);
			      	};

			      	this.exit = function ()
			      	{
			      		$wydevices.removeListener ('devices', listDevices);
			      		this.listPorts = false;
			      		$mdDialog.hide ();
			      	};
			      },
			      controllerAs: 'c',
			      templateUrl: '/public/views/connect.html',
			      escapeToClose: false,
			      clickOutsideToClose: false,
			      fullscreen: false
			    });
		};

		this.exit = function ()
		{
			debug ('Disconnect button');
			$mdDialog.show({
				controller: function ($scope)
				{
					this.disconnect = function ()
					{
						$wydevice.disconnect ();
						$mdDialog.hide ();
					};
					this.poweroff = function ()
					{
						$wydevice.disconnect ("poweroff");
						$mdDialog.hide ();
					};
					this.reboot = function ()
					{
						$wydevice.disconnect ("reboot");
						$mdDialog.hide ();
					};
					this.cancel = function ()
					{
						$mdDialog.hide ();
					};
				},
				controllerAs: 'disconnect',
				templateUrl: '/public/views/dialogs/disconnect.html',
				clickOutsideToClose:true,
				fullscreen: false
			});
		};

		this.exitDialog = function()
		{
			$wydevice.disconnect ();
		};
	});
};
