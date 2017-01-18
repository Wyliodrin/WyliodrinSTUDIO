"use strict";

var angular = require ('angular');
var $ = require ('jquery');
var _ = require ('lodash');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:DeviceNetworkController');
var library = require ('library');

debug ('Loading');

module.exports = function ()
{
	var app = angular.module ('wyliodrinApp');


	app.controller('DeviceNetworkController', function($attrs, $timeout, $scope, $wydevices, $wyapp, $mdDialog, $filter){
		debug ('Registering');

		var devicesListCache = [];
		var devicesTreeCache = {};
		// var users = {};
		var ip = '';
		var port = 7000;
		var secureport = 22;

		var networkVersion = -1;

		$wydevices.on ('devices', function (devicesList, devicesTree, version){
			if (version !== networkVersion)
			{
				if ($attrs.action === 'deploy' && $scope.editDeploy)
				{
					devicesListCache = _.clone (devicesList);
					devicesTreeCache = _.clone (devicesTree);
					var deployDevices = $scope.deploy.network;

					_.forEach (deployDevices, function (device){
						if (!devicesTreeCache[device.id])
						{
							device.status = 'MISSING';
							devicesList.push (device);
							devicesTree[device.id] = device;
						}
					});
					
				}
				else
				{
					devicesListCache = devicesList;
					devicesTreeCache = devicesTree;
				}
				network.devices(devicesListCache, devicesTreeCache);
				networkVersion = version;
			}
		});

		var network = {
			deploy: $scope.deploy,
			devices: function (devices){},
			getAction: function (){
				return $attrs.action;
			},
			getApplications: function (done)
			{
				library.listProjects (function (err, projects){
					if (err === null)
						done (projects);
					else
						done ([]);
				});
			},
			getDevices: function (){
				return {
					tree: devicesTreeCache,
					list: devicesListCache
				};
			},
			connectDevice: function (device)
			{
				connect(device);
			},

			disconnectDevice: function (device)
			{
				$wydevices.disconnect (device.id);
				//$wydevices.removeAllBoardListeners (device.id);
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

			      		$wydevices.on ('connection_timeout', device.id, function ()
						{
							var message = $mdDialog.confirm()
						          .title($filter('translate')('DEVICE_CONNECTION_TIMEOUT'))
						          .ok($filter('translate')('OK'));
						    $mdDialog.show(message);
						});

						$wydevices.on ('connection_error', device.id, function ()
						{
							var message = $mdDialog.confirm()
						          .title($filter('translate')('DEVICE_CONNECTION_ERROR'))
						          .ok($filter('translate')('OK'));
						    $mdDialog.show(message);
						});

						$wydevices.on ('connection_login_failed', device.id, function (device)
						{
							var message = $mdDialog.alert()
						          .title($filter('translate')('DEVICE_CONNECTION_FAILED'))
						          .ok($filter('translate')('OK'));
						          // Should be a retry button???
						    $mdDialog.show(message);
						});

						$wydevices.on ('status', device.id, function (device)
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
								if (status === 'DISCONNECTED' || status === 'ERROR')
									$wydevices.removeAllBoardListeners(device.id);
							}
						});


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
		
		setTimeout(getDevices, 100);
	});
};