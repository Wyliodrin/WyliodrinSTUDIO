
var $ = require ('jquery');

var angular = require ('angular');
var library = require ('library');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:AppController');

var mixpanel = require ('mixpanel');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller ('AppController', function ($scope, $wyapp, $timeout, $mdDialog, $wydevice, $filter, $translate)
	{
		debug ('Registering');

		document.title = $filter('translate')('appName');

		mixpanel.track ('Startup');

		$scope.running = false;
		$scope.update = false;
		$scope.connected = false;
		$scope.device = 
		{
			category: 'board'
		};
		$scope.label = settings.LABEL;
		$scope.status = 'DISCONNECTED';
		$scope.project_disable = true;
		$scope.shell_disable = true;
		$scope.project_name = "";
		this.status = function ()
		{
			return 'status label c-status label-'+$scope.status;
		};

		setTimeout (function ()
		{
			$.get ('http://wyliodrin-try.westeurope.cloudapp.azure.com:8080/studio/information', {language: $translate.proposedLanguage() || $translate.use()}, function (response)
			{
				console.log (response);
				if (response && response.id && response.title && response.message)
				{
					console.log ('value');
					library.retrieveValue ('information_'+response.id, false, function (value)
					{
						console.log (value);
						if (!value)
						{
							try
							{
								$mdDialog.show({
									controller: function ($scope)
									{
										$scope.title = response.title;
										$scope.message = response.message;
										this.exit = function ()
										{
											$mdDialog.hide ();
										};
									},
									controllerAs: 'p',
									templateUrl: '/public/views/information.html',
									clickOutsideToClose:false,
									fullscreen: false
								});
								library.storeValue ('information_'+response.id, true);
							}
							catch (e)
							{
								console.log (e);
							}
						}
					});
				}
			});
		}, 45000);

		this.application = function ()
		{
			$wyapp.emit ('tab_application');
		};

		this.shell = function ()
		{
			$wyapp.emit ('tab_shell');
		};

		$wyapp.on ('load', function (project)
		{
			$timeout (function ()
			{
				$scope.project_disable = false;
				$scope.project_name = project.title; 
			});
		});

		$wydevice.on ('update', function ()
		{
			debug ('Update for device');
			$scope.update = true;
		});

		$wydevice.on ('message', function (t, p)
		{
			if (t==='i')
			{
				if ($scope.device.category !== p.c || $scope.device.network !== p.i)
				{
					mixpanel.track ('Device Data',
					{
						category: p.c
					});
				}
				$timeout (function ()
				{
					if (p.tr) $scope.running = p.tr;
					else $scope.running = false;
					if (settings.LABEL[p.c])
					{
						$scope.device.category = p.c;	
						$scope.device.network = p.i;	
					}
					else
					{
						$scope.device.category = 'board';
						$scope.device.network = p.i;
					}
				});
			}
			if (t === 'capabilities')
			{
				$timeout (function ()
				{
					$scope.device.capabilities = p;
				});
			}
		});

		$wydevice.on ('status', function (status)
		{
			debug ('Status '+status);
			mixpanel.track ('Status',
			{
				category: $scope.device.category,
				status: status
			});
			$timeout (function ()
			{
				$scope.connected = (status === 'INSTALL' || status === 'PING' || status === 'CONNECTING' || status === 'SEPARATOR' || status === 'CONNECTED');
				if ($scope.connected === false) 
				{
					$scope.device.category = 'board';
					$scope.device.capabilities = null;
					$scope.update = false;
				}
				$scope.status = status;
				$scope.device.name = $wydevice.device.name;
				$scope.device.platform = $wydevice.device.platform;
				$scope.device.category = $wydevice.device.category;
				if (status === 'CONNECTED' || status === 'INSTALL') $scope.shell_disable = false;
			});
		});
		
		setBoxSize ();

		if (settings.platform.CHROME)
		{
			chrome.app.window.current().onClosed.addListener (function ()
			{
				$wydevice.disconnect ();
			});
		}
		else if (settings.platform.BROWSER)
		{
			$(document).unload (function ()
			{
				$wydevice.disconnect ();
			});
		}
	});
	
	app.directive('ngEnter', function () {
		return function (scope, element, attrs) {
			element.bind("keydown keypress", function(event) {
				if (event.which === 13) {
					scope.$apply(function () {
						scope.$eval(attrs.ngEnter);
					});

					event.preventDefault();
				}
			});
		};
	});

	app.directive('ngEscape', function () {
		return function (scope, element, attrs) {
			element.bind("keydown keypress", function(event) {
				if (event.which === 27) {
					scope.$apply(function () {
						scope.$eval(attrs.ngEscape);
					});

					event.preventDefault();
				}
			});
		};
	});

	function setBoxSize ()
		{
			$('.tabs-box-container').height( $(window).height() - $('.main-toolbar').height() );
		}
		
	$(window).resize (function ()
		{
			setBoxSize ();
		});

};