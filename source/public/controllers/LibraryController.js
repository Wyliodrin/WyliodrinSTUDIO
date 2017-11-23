
"use strict";

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:LibraryController');

var _ = require ('lodash');

var library = require ('library');

var angular = require ('angular');

var mixpanel = require ('mixpanel');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller ('LibraryController', function ($scope, $filter, $mdDialog, $wyapp, $wydevice)
	{
		debug ('Registering');
		var that = this;
		this.openMenu = function($mdOpenMenu, ev) {
	      $mdOpenMenu(ev);
	    };

		this.add = function ()
		{
			$mdDialog.hide ();
			var addProjDialog = $mdDialog.show({
		      controller: function ($scope)
		      {


				$scope.project = {
					title: '',
					language: 'python'
				};

				$scope.languages = settings.LANGUAGES;


		      	this.add = function ()
		      	{
					debug ('Add project '+$scope.project.title+' language '+$scope.project.language);
					if ($scope.project.title.trim().length > 2)
					{
						mixpanel.track ('Project Create', {
							language: $scope.project.language
						});
						var devicecategory = null;
						if ($wydevice.device) devicecategory = $wydevice.device.category;
						debug ('Project '+devicecategory);

						var oldIds = _.map(that.getPrograms(), 'id');
						//for using when chosing what project to open

						library.add ($scope.project.title, $scope.project.language, null, devicecategory);

						that.listProjects(function(err){
							if (err){
								console.log(err);
							}
							else{
								var newIds = _.map(that.getPrograms(), 'id');
								var idToLoad = _.difference(newIds, oldIds)[0];

								var projectToLoad = _.filter(that.getPrograms(), {'id': idToLoad})[0];

								that.load(projectToLoad);

								$mdDialog.hide ();
							}
						});
					}
					else
					{
						debug ("Project name is unacceptable");
						$wyapp.emit('library');
					}
		      	};

				this.cancel = function ()
		      	{
					$wyapp.emit('library');
		      	};

		      },
		      controllerAs: 'a',
		      templateUrl: '/public/views/add-app.html',
		      clickOutsideToClose:true,
		      fullscreen: false
		    });
		};


		this.load = function (project)
		{
			$mdDialog.hide ();
			$wyapp.emit ('load', project);
		};

		this.rename = function (project)
		{
			mixpanel.track ('Project Rename', {
				language: project.language
			});
			$mdDialog.hide ();
			var renameProjDialog = $mdDialog.show({
		      controller: function ($scope)
		      {


				$scope.title = project.title;


		      	this.rename = function ()
		      	{
					debug ('Rename project '+project.title+' language '+project.language);
					if ($scope.title.trim().length > 3)
					{
						library.rename (project.id, $scope.title);
					}
					else
					{
						debug ("Project name is unacceptable");
					}
					$wyapp.emit('library');
		      	};

				this.cancel = function ()
		      	{
					$wyapp.emit('library');
		      	};

		      },
		      controllerAs: 'a',
		      templateUrl: '/public/views/rename.html',
		      clickOutsideToClose:true,
		      fullscreen: false
		    });
		};

		this.clone = function (project)
		{
			var that = this;

			mixpanel.track ('Project Clone', {
				language: project.language
			});
			$mdDialog.hide ();
			var cloneProjDialog = $mdDialog.show({
				controller: function ($scope)
				{
					$scope.title = project.title;

					this.clone = function ()
					{
						if ($scope.title != project.title && $scope.title.trim().length > 3)
						{
							library.cloneProject(project, $scope.title);
							$wyapp.emit('library');
						}
						else
						{
							var message = $mdDialog.alert()
						          .title($filter('translate')('LIBRARY_ProjectClone', {title:project.title}))
						          .ok($filter('translate')('OK'));

							$mdDialog.show(message).then(function () {
								$wyapp.emit('library');
							}, function() {
								$wyapp.emit('library');
							});
							debug ("Project name is unacceptable");
						}
					};

					this.cancel = function ()
					{
						$wyapp.emit('library');
					};
				},
				controllerAs: 'a',
				templateUrl: '/public/views/clone.html',
				clickOutsideToClose:true,
				fullscreen: false
			});
		};

		this.cancel = function ()
		{
			$mdDialog.hide ();
		};

		this.listProjects = function (done)
		{
			debug ('list projects');
			library.listProjects (function (err, list)
			{
				if (err)
				{
					debug ('Error list programs '+err);
				}
				else
				{
					debug ('programs '+list.length);
					$scope.programs = list;
					$scope.$apply ();
				}
				if (done)
				{
					done(err);
				}
			});
		};

		this.erase = function (project)
		{
			// console.log ($event);
			$mdDialog.hide ();
			var that = this;
			var message = $mdDialog.confirm()
		          .title($filter('translate')('LIBRARY_ProjectErase', {title:project.title}))
		          .ok($filter('translate')('YES'))
		          .cancel($filter('translate')('NO'));
		    $mdDialog.show(message).then(function() {
		    	$wyapp.emit ('library');
		      library.erase (project.id);
		      mixpanel.track ('Project Erase', {
				language: project.language
			});
		      that.listProjects();
		    }, function() {
		     	$wyapp.emit ('library');
		    });
		};

		this.import = function ()
		{
			debug ('Import project');
			chrome.fileSystem.chooseEntry(
			{
				type: 'openFile', accepts:[{
			 		extensions: ['wylioapp']
			 	}]
			},
			function(fileEntry) {
				if(chrome.runtime.lastError)
				{

				}
				if (!fileEntry) {
					debug ('File missing');
					return;
			 	}
			 	debug ('Reading file');
			 	fileEntry.file(function(file)
			 	{
					debug ('Read project');
					var fileReader = new FileReader ();
					fileReader.onload = function (value)
					{
						debug ('Project');
						var projectimport = null;
						try
						{
							projectimport = JSON.parse (value.target.result);
						}
						catch (e)
						{
							debug ('Project format error '+e);
						}
						if (projectimport)
						{
							library.add (projectimport);
							mixpanel.track ('Project Import', {
								language: projectimport.language
							});
							that.listProjects ();
						}
					};
					fileReader.onerror = function (err)
					{
						debug (err);
					};
					fileReader.readAsText (file);
			 	});
			});
		};

		this.example = function ()
		{
			debug ('Show example');
			$mdDialog.hide ();
			$mdDialog.show({
		      controller: 'GitHubExampleController',
		      controllerAs: 'e',
		      templateUrl: '/public/views/github-example.html',
		      clickOutsideToClose: false,
		      fullscreen: false
		    });
		};

		this.export = function (project)
		{
			debug ('Export project '+project.id);
			chrome.fileSystem.chooseEntry(
			{
				type: 'saveFile',
				accepts:[{
					extensions: ['wylioapp']
				}],
				suggestedName: project.title+'.wylioapp'
			},
			function(fileEntry)
			{
				if(chrome.runtime.lastError)
				{

				}
				if (!fileEntry)
				{
					debug ('File missing');
			 		return;
				}
				debug ('Write project');
			 	fileEntry.createWriter(function(fileWriter)
			 	{
			 		var projectexport = _.clone (project);
			 		delete projectexport.id;
			 		delete projectexport.$$hashKey;
			 		debug (JSON.stringify (projectexport));
					var truncate = false;
			 		fileWriter.onwriteend = function (e)
		 			{
						if (truncate === false)
		 				{
							truncate = true;
							e.currentTarget.truncate (e.currentTarget.position);
							mixpanel.track ('Project Export', {
								language: projectexport.language
							});
							debug ('Project export');
						}
		 			};
		 			fileWriter.onerror = function (error)
			 		{
			 			debug ('Export project '+project.id+' error '+error);
			 		};
			 		fileWriter.write (new Blob ([JSON.stringify (projectexport)], {type:'text/json'}), function (error)
		 			{
		 				debug ('Export project '+project.id+' error '+error);
		 			});
			 	});
			});
		};

		$scope.programs = [];

		this.getPrograms = function()
		{
			return $scope.programs;
		};


		this.listProjects ();
	});
};
