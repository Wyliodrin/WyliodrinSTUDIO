
"use strict";

var angular = require ('angular');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:NetworkController');

var mixpanel = require ('mixpanel');

var _ = require ('lodash');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller('NetworkController', function($scope, $timeout, $mdDialog, $wydevice){
		debug ('Registering');

		mixpanel.track ('Network Manager',
		{
			category: $wydevice.device.category
		});

		$scope.interfaces = [];
		$scope.wifinetworks = {
		};

		$scope.wifi = {
			network: '',
			password: '',
			ssid: ''
		};
		
		var that = this;
		
		$wydevice.send ('net', {a:'run'});

		var message =  function (t, p)
		{
			if (t === 'net')
			{
				if (p.a === 'l')
				{
					_.each (p.n, function (ninterface)
					{
						if (ninterface.t === 'w' && ninterface.s  === null)
						{
							debug ('Wifi '+ninterface.i);
							$wydevice.send ('net', {a:'s', i:ninterface.i});
						}
					});
					if ($scope.wifi.network === '')
					{
						$timeout (function ()
						{
							$scope.interfaces = p.n;
						});
					}
				}
				else
				if (p.a === 's')
				{
					$timeout (function ()
					{
						if (p.e)
						{
						}
						else
						{
							if ($scope.wifi.network === '')
							{
								$timeout (function ()
								{
									$scope.wifinetworks[p.i] = p.n;
									if ($scope.wifinetworks[p.i])
									{
										$scope.wifinetworks[p.i].push ({
											s:null,
											p: 'wpa2'
										});
									}
								});
							}
						}
					});
				}
			}
		};

		$wydevice.on ('message',message);

		this.askPassword = function (ninterface, network)
		{
			if ($scope.wifi.network !== ninterface+'_'+network.s)
			{
				debug (network);
				debug ('Ask password for '+ninterface+' net '+network.s);
				$scope.wifi.password = '';
				$scope.ssid = '';
				if (network.p !== 'open')
				{
					$scope.wifi.network = ninterface+'_'+network.s;
				}
				else
				{
					debug ('Net '+network+' is open, connect');
					that.connect (ninterface, network);
				}
			}
		};

		this.connect = function (ninterface, network, password)
		{
			if (network === null) network = $scope.wifi.ssid;
			$scope.wifinetworks[ninterface] = [];
			debug ($scope.wifiPassword);
			debug ('Connect interface '+ninterface+' network '+network+' password '+password);
			$wydevice.send ('net', {a:'c', i:ninterface, s:network, p:password});
			$scope.wifi.network = '';
			$scope.wifi.password = '';
			$scope.ssid = '';
			mixpanel.track ('Network Connect',
			{
				category: $wydevice.device.category,
				network: 'wifi'
			});
		};
		
		this.disconnect = function (nwinterface)
		{
			$scope.wifinetworks[nwinterface.i] = [];
			nwinterface.s = '';
			$wydevice.send ('net', {a:'d', i:nwinterface.i});
			$wydevice.send ('net', {a:'s', i:nwinterface.i});
			mixpanel.track ('Network Disconnect',
			{
				category: $wydevice.device.category,
				network: 'wifi'
			});
		};

		this.exit = function ()
		{
			debug ('Exiting');
			$mdDialog.hide ();
			$wydevice.send ('net', {a:'stop'});
			$wydevice.removeListener ('message', message); 
		};
	});
};
