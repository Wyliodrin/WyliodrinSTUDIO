
"use strict";

var angular = require ('angular');
var library = require ('library');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:NotebookController');

var mixpanel = require ('mixpanel');

var ace_ui = require ('angular-ui-ace');
var _ = require ('lodash');

var $ = require ('jquery');

debug ('Loading');


module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller ('NotebookController', function ($scope, $element, $timeout, $mdDialog, $filter, $wyapp, $wydevice, $translate)
	{
		debug ('Registering');



		
	});
};
