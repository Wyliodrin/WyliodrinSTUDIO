
"use strict";

var angular = require ('angular');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:TerminalDialogController');

var mixpanel = require ('mixpanel');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller ('TerminalDialogController', function ($scope, device)
	{
		debug ('Registering');
		console.log ('terminal controller');
		console.log(device);
		$scope.device = device;
	});
};
