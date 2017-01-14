
var $ = require ('jquery');

var angular = require ('angular');
var marked = require ('marked');
var library = require ('library');
var settings = require ('settings');

require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:ReadmeController');

var mixpanel = require ('mixpanel');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller ('ReadmeController', function ($scope, $wyapp, $timeout, $filter, $mdDialog)
	{
		debug ('Registering');

		marked.setOptions({
		  renderer: new marked.Renderer(),
		  gfm: true,
		  tables: true,
		  breaks: false,
		  pedantic: false,
		  sanitize: false,
		  smartLists: true,
		  smartypants: false
		});

		var id = -1;

		$wyapp.on ('load', function (project)
		{
			$timeout (function ()
			{
				id = project.id;
				$scope.html = marked (project.readme || '');
				$scope.readme = project.readme;
			});
		});

		var scope = $scope;

		this.edit = function ()
		{
			$mdDialog.show({
		      controller: function ($scope)
		      {
		      	$scope.readme = scope.readme || '';
		      	$scope.modify = function ()
		      	{
		      		// console.log ('modify');
		      		// console.log ($scope.readme);
		      		library.storeReadme (id, $scope.readme);
		      		$timeout (function ()
					{
						scope.html = marked ($scope.readme);
						scope.readme = $scope.readme;
					});
		      	};
		      	$scope.load = function (_editor)
		      	{
		      		_editor.$blockScrolling = Infinity;
		      	};
		      	this.exit = function ()
		      	{
		      		$mdDialog.hide ();
		      	};
		      },
		      controllerAs: 'm',
		      templateUrl: '/public/views/readme-edit.html',
		      // parent: angular.element(document.body),
		      // targetEvent: ev,
		      clickOutsideToClose: false,
		      fullscreen: false
		    });
		};
	});
};