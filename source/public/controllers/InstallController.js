
"use strict";

var angular = require ('angular');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:InstallController');

var _ = require ('lodash');

var mixpanel = require ('mixpanel');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller('InstallController', function($scope, $timeout, $filter, $wydevice, $mdDialog){
		debug ('Registering');

		$scope.runoutput = '';
		$scope.runinstall = false;

		if ($wydevice.device.category && $wydevice.device.category !== 'board')
		{
			$wydevice.send ('install', {a:'i', c:$wydevice.device.category});
			$scope.runinstall = true;
		}

		$scope.LABEL = settings.LABEL;
		$scope.INSTALL = settings.INSTALL;

		var that = this;

		mixpanel.track ('Install', {
			category: $wydevice.device.category
		});

		var message = function (t, p)
		{
			if (t === 'install')
			{
				if (p.a === 'i')
				{
					if (p.e !== undefined)
					{
						$timeout (function ()
						{
							$scope.runinstall = false;
						});
					}
					else
					if (p.d !== undefined)
					{
						$timeout (function ()
						{
							$scope.runinstall = false;
							that.exit ();
							var alert = $mdDialog.alert({
						        title: $filter('translate')('INSTALL_Success'),
						        ok: $filter('translate')('OK')
						      });
						      $mdDialog
						        .show (alert)
						        .finally (function() {
						          alert = undefined;
						        });
						});
					}
					else
					if (p.err)
					{
						$timeout (function ()
						{
							$scope.runoutput = $scope.runoutput + p.err;
						});
					}
					else
					if (p.out)
					{
						$timeout (function ()
						{	
							$scope.runoutput = $scope.runoutput + p.out;
						});
					}
				}
			}
		};

		$wydevice.on ('message', message);

		this.install = function (device)
		{
			$wydevice.send ('install', {a:'i', c:device});
			$scope.runinstall = true;
		};

		this.exit = function ()
		{
			if ($scope.runinstall === true)
			{
				// $scope.runinstall = false;
				$wydevice.send ('install', {a:'s'});
			}
			else
			{
				$wydevice.removeListener ('message', message);
				$mdDialog.hide ();
			}
		};
	});
};
