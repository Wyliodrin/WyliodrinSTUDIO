
"use strict";

var angular = require ('angular');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:FirmwareExampleController');

var mixpanel = require ('mixpanel');

var _ = require ('lodash');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller('FirmwareExampleController', function($scope, $mdDialog, $wydevice, $wyapp){
		debug ('Registering');

		mixpanel.track ('Firmware Example',
		{
			firmware: settings.EXAMPLE.firmware
		});

		$scope.EXAMPLE = settings.EXAMPLE.firmware;

		$scope.label = settings.LABEL;

		$scope.device = $wydevice.device;

		if ($scope.device) $scope.firmware = $scope.label[$wydevice.device.category].firmware;

		$scope.category = ($scope.device?$scope.device.category:'board');

		this.use = function (examplename, example)
		{
			debug ('Use '+examplename);
			$wyapp.emit ('firmware', example);
			$mdDialog.hide ();
		};

		this.exit = function ()
		{
			debug ('Exiting');
			$mdDialog.hide ();
		};
	});
};
