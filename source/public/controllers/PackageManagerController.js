
"use strict";

var angular = require ('angular');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:PackageManagerController');

var mixpanel = require ('mixpanel');

var _ = require ('lodash');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller('PackageManagerController', function($scope, $timeout, $wydevice, $mdDialog){
		debug ('Registering');

		mixpanel.track ('Package Manager',
		{
			category: $wydevice.device.category
		});

		function listPackages (language)
		{
			$wydevice.send ('pm', {a: 'p', l:language});
		}

		$scope.LANGUAGES = settings.LANGUAGES;
		$scope.packages = {};
		$scope.runmanager = false;
		$scope.runoutput = '';
		$scope.runpackage = '';
		$scope.runlanguage = '';
		_.each ($scope.LANGUAGES, function (language)
		{
			//console.log ($wydevice.device);
			if (language.packagemanager.enable === true && (!$wydevice.device.capabilities || $wydevice.device.capabilities.l[language.title]))
			{
				debug ('Request package '+language.title);
				$scope.packages[language.title] = [];
				listPackages(language.title);
			}
		});

		var that = this;
		
		var message = function (t, p)
		{
			if (t === 'pm')
			{
				if (p.a === 'p')
				{
					debug ('Receive package for '+p.l);
					if (!p.e)
					{
						$timeout (function ()
						{
							$scope.packages[p.l] = p.p;
							var readonly = [];
							var available = {};
							for (var index = 0; index < $scope.LANGUAGES.length; index++)
							{
								// debug ($scope.LANGUAGES[index].title);
								if ($scope.LANGUAGES[index].title.toLowerCase() === p.l.toLowerCase())
								{
									readonly = $scope.LANGUAGES[index].packagemanager.readonly;
									available = _.clone ($scope.LANGUAGES[index].packagemanager.available);
								}
							}
							// debug (readonly);
							var available_packages = [];
							_.each ($scope.packages[p.l], function (v)
							{
								if (_.indexOf (readonly, v.n)>=0)
								{
									v.readonly = true;
								}
								else
								{
									v.readonly = false;
								}
								v.loading = false;
								var title = v.n.toLowerCase ();
								if (available[title])
								{
									v.d = available[title].description;
									v.w = available[title].website;
									delete available[title];
								}
								// debug (v);
							});
							_.each (available, function (v, n)
							{
								debug (v);
								$scope.packages[p.l].push ({n:n, d:v.description, loading:false, w:v.website});
							});
						});
					}
				}
				else
				if (p.a === 'i')
				{
					if (p.e !== undefined)
					{
						$timeout (function ()
						{
							if (p.e === 0) that.runexit ();
							$scope.runpackage = '';
							listPackages (p.l);
						});
					}
					else
					if (p.err)
					{
						$timeout (function ()
						{
							$scope.runoutput = $scope.runoutput + p.err;
						});
					}
					else
					if (p.out)
					{
						$timeout (function ()
						{	
							$scope.runoutput = $scope.runoutput + p.out;
						});
					}
				}
			}
		};

		$wydevice.on ('message', message);

		this.runexit = function ()
		{
			$scope.runmanager = false;
			$scope.runerror = '';
			$scope.runoutput = '';
		};

		this.install = function (p, l)
		{
			p.loading = true;
			$scope.runmanager = true;
			$scope.runoutput = '';
			$wydevice.send ('pm', {a:'i', p:p.n, l:l});
			$scope.runpackage = p.n;
			$scope.runlanguage = l;
			mixpanel.track ('Package Install',
			{
				category: $wydevice.device.category,
				package: p.n,
				langauge: l
			});
		};

		this.uninstall = function (p, l)
		{
			p.loading = true;
			$scope.runmanager = true;
			$scope.runoutput = '';
			$wydevice.send ('pm', {a:'u', p:p.n, l:l});
			$scope.runpackage = p.n;
			$scope.runlanguage = l;
			mixpanel.track ('Package Uninstall',
			{
				category: $wydevice.device.category,
				package: p.n,
				langauge: l
			});
		};

		this.exit = function ()
		{
			if ($scope.runmanager === true)
			{
				$scope.runmanager = false;
				if ($scope.runpackage !== '')
				{
					$wydevice.send ('pm', {a:'s', p:$scope.runpackage, l:$scope.runlanguage});
				}
				$scope.runpackage = '';
				$scope.runlanguage = '';
			}
			else
			{
				$mdDialog.hide ();
				$wydevice.removeListener ('message', message);
			}
		};
	});
};
