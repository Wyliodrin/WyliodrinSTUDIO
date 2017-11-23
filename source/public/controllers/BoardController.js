
"use strict";

var angular = require ('angular');

var mixpanel = require ('mixpanel');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:BoardController');

var _ = require ('lodash');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller('BoardController', function($scope, $timeout, $wydevice, $wyapp, $mdDialog){
		debug ('Registering');

		$scope.LABEL = _.clone (settings.LABEL);
		$scope.device = ($wydevice.device?$wydevice.device.category:'board');

		mixpanel.track ('Board',
		{
			category: $scope.device
		});

		this.select = function (boardname)
		{
			$scope.device = boardname;
			mixpanel.track ('Board',
			{
				category: $scope.device
			});
		};

      	this.exit = function ()
      	{
      		$mdDialog.hide ();
      		debug ('Library Setup Request');
      	};
	});
};
