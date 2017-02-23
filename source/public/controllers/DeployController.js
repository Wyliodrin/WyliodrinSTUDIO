
"use strict";

var angular = require ('angular');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:FileExplorerController');

var path = require ('path');

var _ = require ('lodash');

var $ = require ('jquery');

var mixpanel = require ('mixpanel');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller('DeployController', function($scope, $timeout, $mdDialog, $wydevice, $translate){

		$scope.translatevars={};

		this.exit = function ()
		{
			$mdDialog.hide ();
		};


	});

};
