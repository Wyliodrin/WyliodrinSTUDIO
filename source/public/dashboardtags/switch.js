
"use strict";

var angular = require ('angular');

var _ = require ('lodash');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:switch');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.directive ('switch', function ($wydevice, $timeout, $wyapp){

		debug ('Registering');

		return {
			restrict: 'E',
			scope:{
				signal: '='
			},
			template: '<md-switch ng-model="value" ng-false-value="0" ng-true-value="1" aria-label="{{signal.properties.title}}">{{signal.properties.title}}</md-switch>',
			controller: function ($scope, $element)
			{
				$scope.value = '1';
				$scope.update = false;

				$scope.$watch ('value', function ()
				{
					debug ($scope.signal.title+' '+$scope.value);
					$wydevice.send ('v', {s:$scope.signal.title, v:$scope.value});
				});

				$scope.$watchCollection ('signal.properties', function ()
				{
					$wyapp.emit ('dashboard');
				});

				$scope.$watchCollection ('signal', function ()
				{
					$wyapp.emit ('dashboard');
				});
			},
			conrollerAs: 'l',
			link: function (scope, element, attrs)
			{

				var update = function (t, values)
				{
					if (t === 'v')
					{
						var v = (values.s?values.s[scope.signal.title]:undefined);
						if (v !== undefined)
						{
							
							scope.update = true;
							debug ('Signal '+scope.signal.title+' '+v);
							$timeout (function ()
							{
								scope.value = v;
							});
						}
					}
				};

				$wydevice.on ('message', update);

				element.on ('$destroy', function ()
				{
					debug ('Erase switch');
					$wydevice.removeListener ('message', update);
				});
			}
		};
	});
};
