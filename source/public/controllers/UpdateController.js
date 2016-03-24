
"use strict";

var angular = require ('angular');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:UpdateController');

var _ = require ('lodash');

var mixpanel = require ('mixpanel');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller('UpdateController', function($scope, $timeout, $wydevice, $mdDialog){
		debug ('Registering');

		$scope.runoutput = '';
		$scope.runupdate = true;

		$wydevice.send ('u', {a:'i'});

		var that = this;

		mixpanel.track ('Update', {
			category: $wydevice.device.category
		});

		var message = function (t, p)
		{
			if (t === 'u')
			{
				if (p.a === 'i')
				{
					if (p.e !== undefined)
					{
						$timeout (function ()
						{
							$scope.runupdate = false;
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

		this.exit = function ()
		{
			if ($scope.runupdate === true)
			{
				$scope.runupdate = false;
				$wydevice.send ('u', {a:'s'});
			}
			else
			{
				$wydevice.removeListener ('message', message);
				$mdDialog.hide ();
			}
		};
	});
};
