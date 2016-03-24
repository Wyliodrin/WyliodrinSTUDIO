
"use strict";

var angular = require ('angular');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:SoftwareExampleController');

var mixpanel = require ('mixpanel');

var _ = require ('lodash');

var library = require ('library');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller('SoftwareExampleController', function($scope, $mdDialog, $wydevice, $wyapp){
		debug ('Registering');


		$scope.EXAMPLE = settings.EXAMPLE.software;

		$scope.label = settings.LABEL;


		$scope.device = $wydevice.device;

		if ($scope.device) $scope.software = $wydevice.device.category;

		$scope.category = ($scope.device?$scope.device.category:'board');

		var language = {};

		this.language = function (title)
		{
			if (language[title]) return language[title];
			else
			{
				var language_value = _.find (settings.LANGUAGES, function (language)
				{
					return (language.title === title);
				});
				if (language_value) language[title] = language_value.text;
			}
			return '';
		};

		this.use = function (examplename, example)
		{
			debug ('Import '+examplename);
			var projectexample = _.clone (example);
			projectexample.date = new Date ().getTime ();
			library.add (projectexample, null, function (err, id)
			{
				debug ('Project Example '+id);
				if (id > 0) 
				{
					debug ('Has id');
					library.retrieveProject (id, function (project)
					{
						debug ('Project '+project);
						$wyapp.emit ('load', project);
						mixpanel.track ('Software Example', {
							language: project.language
						});
					});
				}
			});
			$mdDialog.hide ();
		};

		this.exit = function ()
		{
			debug ('Exiting');
			$mdDialog.hide ();
			$wyapp.emit ('library');
		};
	});
};
