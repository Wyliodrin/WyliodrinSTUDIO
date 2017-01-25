
"use strict";

var angular = require ('angular');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:GitHubExampleController');
var request = require ('request');

var mixpanel = require ('mixpanel');

var _ = require ('lodash');

var library = require ('library');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller('GitHubExampleController', function($scope, $mdDialog, $wydevice, $wyapp, $http){
		debug ('Registering');

		$scope.repo = '';

		$scope.lst = [];

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

		this.use = function (item)
		{
			$http.get ('https://raw.githubusercontent.com/'+$scope.repo+'/master/'+item.file).then (function (res)
			{
				console.log (res.data);
				var projectexample = res.data;
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
							mixpanel.track ('GitHub Example', {
								language: project.language
							});
							$mdDialog.hide ();
						});
					}
				});
			});
		};

		this.load = function ()
		{
			$http.get ('https://raw.githubusercontent.com/'+$scope.repo+'/master/example.json').then (function (res)
			{
				console.log (res.data);
				var example = res.data;
				$scope.lst = example;
			});
		};

		this.exit = function ()
		{
			debug ('Exiting');
			$mdDialog.hide ();
			$wyapp.emit ('library');
		};
	});
};
