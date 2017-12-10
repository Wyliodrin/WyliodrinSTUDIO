
"use strict";

var angular = require ('angular');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:TaskManagerController');

var mixpanel = require ('mixpanel');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller('TaskManagerController', function($scope, $timeout, $mdDialog, $wydevice){
		debug ('Registering');

		$scope.tasks = [];

		mixpanel.track ('Task Manager', {
			category: $wydevice.device.category
		});
		
		var that = this;

		var message = function (t, p)
		{
			if (t === 'tm')
			{
				$timeout (function ()
				{
					$scope.tasks = p;
				});
			}
		};

		$wydevice.on ('message', message);

		$wydevice.send ('tm', {a:'run'});

		this.stop = function (task)
		{
			debug ('Stopping '+task.PID);
			$timeout (function ()
			{
				task.stopping = true;
			});
			$wydevice.send ('tm', {a:'exit', PID:task.PID});
			mixpanel.track ('Task Stop',{
				category: $wydevice.device.category
			});
		};

		this.exit = function ()
		{
			debug ('Exiting');
			$mdDialog.hide ();
			$wydevice.send ('tm', {a:'stop'});
			$wydevice.removeListener ('message', message);
		};
	});
};
