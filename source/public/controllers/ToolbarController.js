
"use strict";

var angular = require ('angular');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:ToolbarController');

var library = require ('library');

debug ('Loading');

module.exports = function ()
{

	var os = '';

	if (settings.platform.CHROME)
	{
		chrome.runtime.getPlatformInfo (function (system)
		{
		  os = system.os;
		});
	}

	var app = angular.module ('wyliodrinApp');

	app.controller ('ToolbarController', function ($scope, $filter, $mdDialog, $wyapp)
	{
		debug ('Registering');

		if (settings.platform.CHROME)
		{
			$scope.isFullscreen = chrome.app.window.current().isFullscreen();
		}

		this.scope = {
			running: '=',
			update: '='
		};



		this.library = function ()
		{
			debug ('Library request');
			$wyapp.emit ('library');
		};

		this.deploy = function ()
		{
			debug ('Deploy request');

			library.listDeployments (function (err, depls){
				if (err)
					$scope.deployments = [];
				else
					$scope.deployments = depls;
				console.log ("$scope.deployments");
				console.log ($scope.deployments);
			});

			
			$mdDialog.show({
		      controller: 'DeployController',
		      controllerAs: 'd',
		      templateUrl: '/public/views/deploy.html',
		      // parent: angular.element(document.body),
		      // targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: false
		    });
		};

		this.exit = function ()
		{
			var message = $mdDialog.confirm()
		          .title($filter('translate')('TOOLBAR_ExitQuestion'))
		          // .textContent('All of the banks have agreed to forgive you your debts.')
		          // .ariaLabel('Lucky day')
		          // .targetEvent(ev)
		          .ok($filter('translate')('YES'))
		          .cancel($filter('translate')('NO'));
		    $mdDialog.show(message).then(function() {
		    	if (settings.platform.CHROME)
		    	{
		      		chrome.app.window.current().close ();
		      	}
		    }, function() {
		     	
		    });
		};

		if (settings.platform.CHROME)
		{
			chrome.app.window.current().onMaximized.addListener (function ()
			{
				$scope.isFullscreen = true;
			});

			chrome.app.window.current().onFullscreened.addListener (function ()
			{
				$scope.isFullscreen = true;
			});

			chrome.app.window.current().onRestored.addListener (function ()
			{
				$scope.isFullscreen = false;
			});

			this.fullscreen = function ()
			{
				debug ('Fullscreen');
				var w = chrome.app.window.current();
				var maximize = w.maximize; 
				var isMaximized = w.isMaximized;

				if (os === 'mac')
				{
					maximize = w.fullscreen;
					isMaximized = w.isFullscreen;
				}

				if (isMaximized ())
				{
					w.restore ();	
				}
				else
				{
					maximize ();
				}
			};

			this.minimize = function ()
			{
				debug ('Minimize');
				var w = chrome.app.window.current();
				if (w.isMinimized ())
				{
					w.restore ();	
				}
				else
				{
					w.minimize ();
				}
			};
		}

		this.packagemanager = function ()
		{
			debug ('Package Manager');
			$mdDialog.show({
		      controller: 'PackageManagerController',
		      controllerAs: 'pm',
		      templateUrl: '/public/views/package-manager.html',
		      // parent: angular.element(document.body),
		      // targetEvent: ev,
		      escapeToClose: false,
		      clickOutsideToClose: false,
		      fullscreen: false
		    });
		};

		this.update = function ()
		{
			debug ('Update');
			$mdDialog.show({
		      controller: 'UpdateController',
		      controllerAs: 'u',
		      templateUrl: '/public/views/update.html',
		      // parent: angular.element(document.body),
		      // targetEvent: ev,
		      escapeToClose: false,
		      clickOutsideToClose: false,
		      fullscreen: false
		    });
		};

		this.taskmanager = function ()
		{
			debug ('Task Manager');
			$mdDialog.show({
		      controller: 'TaskManagerController',
		      controllerAs: 'tm',
		      templateUrl: '/public/views/task-manager.html',
		      // parent: angular.element(document.body),
		      // targetEvent: ev,
		      escapeToClose: false,
		      clickOutsideToClose: false,
		      fullscreen: false
		    });
		};

		this.fileexplorer = function ()
		{
			debug ('File Explorer');
			$mdDialog.show({
		      controller: 'FileExplorerController',
		      controllerAs: 'fe',
		      templateUrl: '/public/views/file-explorer.html',
		      // parent: angular.element(document.body),
		      // targetEvent: ev,
		      escapeToClose: false,
		      clickOutsideToClose: false,
		      fullscreen: false
		    });
		};
		
		this.network = function ()
		{
			debug ('Network');
			$mdDialog.show({
		      controller: 'NetworkController',
		      controllerAs: 'net',
		      templateUrl: '/public/views/network.html',
		      // parent: angular.element(document.body),
		      // targetEvent: ev,
		      escapeToClose: false,
		      clickOutsideToClose: false,
		      fullscreen: false
		    });
		};

		// this.openMenu = function($mdOpenMenu, ev) {
	 //      // originatorEv = ev;
	 //      var connectedDevices = $wydevices.getConnectedDevices();
	 //      for (var i=0; i<connectedDevices.length; i++)
	 //      	connectedDevices[i].selected = false;
	 //      $mdOpenMenu(ev);
	 //    };

		this.stop = function ()
		{
			debug ('Stop request');
			$wyapp.emit ('stop');
		};

		this.about = function ()
		{
			debug ('About request');
			$wyapp.emit ('about');
		};
		
		this.welcome = function ()
		{
			debug ('Welcome');
			$wyapp.emit ('welcome');
		};

		this.documentation = function ()
		{
			debug ('Show documentation');
			if (settings.platform.CHROME)
			{
				chrome.app.window.create('/public/views/documentation.html', {
					id: 'documentation',
					innerBounds: {
						width: 1200,
						height: 750,
						minWidth: 960,
						minHeight: 700
					}
				});
			}
		};

		this.resistorcolorcode = function ()
		{
			debug ('Resistor Color Code');
			$mdDialog.show({
		      controller: 'ResistorColorCodeController',
		      controllerAs: 'rs',
		      templateUrl: '/public/views/resistor-colorcode.html',
		      // parent: angular.element(document.body),
		      // targetEvent: ev,
		      clickOutsideToClose: true,
		      fullscreen: false
		    });
		};

		// this.example = function ()
		// {
		// 	debug ('Show example');
		// 	$mdDialog.show({
		//       controller: 'SoftwareExampleController',
		//       controllerAs: 's',
		//       templateUrl: '/public/views/software-example.html',
		//       // parent: angular.element(document.body),
		//       // targetEvent: ev,
		//       clickOutsideToClose: false,
		//       fullscreen: false
		//     });
		// };

		this.forum = function ()
		{
			debug ('Forum');
			window.open ('http://www.wyliodrin.com/forum');
		};

		this.runAll = function ()
		{
			$wyapp.emit('send', $scope.connectedDevices);
		};

		this.runSelected = function (device)
		{
			var devices = [];
			if (device)
				devices = [device];
			else
				for (var i=0; i<$scope.connectedDevices.length; i++)
					if ($scope.connectedDevices[i].selected)
						devices.push ($scope.connectedDevices[i]);
			$wyapp.emit('send', devices);
		};

		$wyapp.on ('about', function ()
		{
			debug ('About');
			$mdDialog.show({
		      templateUrl: '/public/views/about.html',
		      // parent: angular.element(document.body),
		      controller: function ($scope)
		      {
		      	$scope.LICENSE = settings.LICENSE;
		      	$scope.VERSION = settings.VERSION;
		      	// this.select = function (device)
		      	// {
		      	// 	$scope.device = device;
		      	// };

		      	library.retrieveValue ('usage', true, function (value)
		      	{
		      		$scope.mixpanel = value;
		      	});

		      	$scope.$watch ('mixpanel', function (mixpanel)
		      	{
		      		library.storeValue ('usage', mixpanel);
		      		global.usage = mixpanel;
		      	});

		      	this.paypal = function ()
		      	{
		      		debug ('Show paypal');
					window.open ('http://www.wyliodrin.com/visual2/html/paypal.html');
		      	};

		      	this.license = function ()
				{
					debug ('Usage license');
					$wyapp.emit ('license');
				};

		      	this.exit = function ()
		      	{
		      		$mdDialog.hide ();
		      	};
		      },
		      controllerAs: 'p',
		      // targetEvent: ev,
		      clickOutsideToClose: true,
		      fullscreen: false
		    });
		});
				
		$wyapp.on ('welcome', function ()
		{
			debug ('Welcome');
			$mdDialog.show({
		      templateUrl: '/public/views/welcome.html',
		      // parent: angular.element(document.body),
		      controller: function ($scope)
		      {
		      	$scope.LICENSE = settings.LICENSE;
		      	$scope.VERSION = settings.VERSION;
		      	// this.select = function (device)
		      	// {
		      	// 	$scope.device = device;
		      	// };

		      	library.retrieveValue ('usage', true, function (value)
		      	{
		      		$scope.mixpanel = value;
		      	});

		      	$scope.$watch ('mixpanel', function (mixpanel)
		      	{
		      		library.storeValue ('usage', mixpanel);
		      		global.usage = mixpanel;
		      	});

		      	this.library = function ()
		      	{
		      		$wyapp.emit ('library');
		      	};

		      	this.board = function ()
		      	{
		      		$wyapp.emit ('board');
		      	};

		      	this.exit = function ()
		      	{
		      		$mdDialog.hide ();
		      	};
		      },
		      controllerAs: 'p',
		      // targetEvent: ev,
		      clickOutsideToClose: true,
		      fullscreen: false
		    });
		});
		
		this.board = function ()
		{
			debug ('Board request');
			$wyapp.emit ('board');
		};

		$wyapp.on ('license', function ()
		{
			debug ('License');
			$mdDialog.show({
		      templateUrl: '/public/views/license.html',
		      // parent: angular.element(document.body),
		      controller: function ($scope)
		      {
		      	$scope.LICENSE = settings.LICENSE;
		      	// this.select = function (device)
		      	// {
		      	// 	$scope.device = device;
		      	// };

		      	this.exit = function ()
		      	{
		      		$mdDialog.hide ();
		      	};
		      },
		      controllerAs: 'p',
		      // targetEvent: ev,
		      clickOutsideToClose: true,
		      fullscreen: false
		    });
		});

		$wyapp.on ('board', function ()
		{
			debug ('Board');
			$mdDialog.show({
		      templateUrl: '/public/views/board.html',
		      // parent: angular.element(document.body),
		      controller: 'BoardController',
		      controllerAs: 's',
		      // targetEvent: ev,
		      clickOutsideToClose: false,
		      fullscreen: false
		    });
		});

		$wyapp.on ('install',function ()
		{
			debug ('Install');
			$mdDialog.show({
		      controller: 'InstallController',
		      controllerAs: 'u',
		      templateUrl: '/public/views/install.html',
		      // parent: angular.element(document.body),
		      // targetEvent: ev,
		      escapeToClose: false,
		      clickOutsideToClose: false,
		      fullscreen: false
		    });
		});

		$wyapp.on ('library', function ()
		{
			debug ('Library');
			$mdDialog.show({
		      controller: 'LibraryController',
		      controllerAs: 'l',
		      templateUrl: '/public/views/library.html',
		      // parent: angular.element(document.body),
		      // targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: false
		    });
		});
	});
};
