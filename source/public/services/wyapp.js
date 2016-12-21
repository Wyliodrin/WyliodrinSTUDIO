
"use strict";

var angular = require ('angular');

var EventEmitter = require ('events').EventEmitter;

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:wyapp');

var _ = require ('lodash');

debug ('Loadning');

var app = angular.module ('wyliodrinApp');

app.factory ('$wyapp', function ()
{
	debug ('Registering');
	var appService = {

	};

	appService = _.assign (new EventEmitter(), appService);

	return appService;
});
