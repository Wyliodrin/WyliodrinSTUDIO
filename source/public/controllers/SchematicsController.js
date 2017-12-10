
"use strict";

var angular = require ('angular');
var library = require ('library');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:SchematicsController');

var mixpanel = require ('mixpanel');

var _ = require ('lodash');

var $ = require ('jquery');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller('SchematicsController', function($scope, $filter, $element, $wyapp, $timeout, $wysignalproperties, $mdDialog){
		debug ('Registering');
		$scope.project = 
		{
			schematics: ''
		};
		
		this.load = function ()
		{
			chrome.fileSystem.chooseEntry(
			{
				type: 'openFile', accepts:[{
			 		extensions: ['svg']
			 	}] 
			}, 
			function(fileEntry) {
				if (!fileEntry) {
					debug ('File missing');
					return;
			 	}
			 	debug ('Reading file');
			 	fileEntry.file(function(file) 
			 	{
			 		debug ('Read schematics');
			 		var fileReader = new FileReader ();
			 		fileReader.onload = function (value)
			 		{
			 			$scope.project.schematics = value.target.result;
			 			mixpanel.track ('Schematics Load', {
			 				language: $scope.project.language
			 			});
			 			library.storeSchematics ($scope.project.id, $scope.project.schematics);
			 		};
			 		fileReader.readAsText (file);
			 	});
			});
		};

		this.erase = function ()
		{
			var that = this;
			var message = $mdDialog.confirm()
		          .title($filter('translate')('SCHEMATICS_ERASE'))
		          .ok($filter('translate')('YES'))
		          .cancel($filter('translate')('NO'));
		    $mdDialog.show(message).then(function() {
		    	$scope.project.schematics = '';
		    	mixpanel.track ('Schematics Erase', {
	 				language: $scope.project.language
	 			});
				library.storeSchematics ($scope.project.id, $scope.project.schematics);	
		    }, function() {
		     	
		    });
		};

		$wyapp.on ('load', function (project)
		{
			$timeout (function ()
			{
				$scope.project = project;
			});
		});
	});

	app.directive ('schematics', function ($timeout)
	{
		return {
			restrict: 'E',
			templateNamespace: 'svg',
			scope: {
				value: '=',
			},
			controller: function ($scope, $element)
			{
				$scope.wider = false;
				$scope.$watch ('value', function ()
				{
					debug ('View schematics');
					$element[0].innerHTML = $scope.value;
					$timeout (function ()
					{
						try
						{
							var box = $('schematics svg')[0].getBBox ();
							if (box.width > box.height) $scope.wider = true;
							else $scope.wider = false;
						}
						catch (e)
						{

						}
					});
					
				});
			},

			controllerAs: 's',
			replace: true,
		};
	});
};
