
"use strict";

var angular = require ('angular');

var _ = require ('lodash');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:extra');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.directive ('extra', function ($wydevice, $timeout, $wyapp){

		debug ('Registering');

		return {
			restrict: 'E',
			scope:{
				signal: '='
			},
			template: '<iframe src="/public/views/extra.html" style="width:100%; height:250px; border:0px;"></iframe>',
			controller: function ($scope, $element)
			{
				$scope.update = false;
				$scope.value = 0;

				$scope.$watchCollection ('signal.properties', function ()
				{
					$wyapp.emit ('dashboard');
					$element.find('iframe')[0].contentWindow.postMessage ({title: $scope.signal.properties.title, links:$scope.signal.properties.links}, '*');
				});

				$scope.$watchCollection ('signal', function ()
				{
					$wyapp.emit ('dashboard');
				});
			},
			conrollerAs: 'l',
			link: function (scope, element, attrs)
			{
				setTimeout (function ()
				{
					element.find('iframe')[0].contentWindow.postMessage ({title: scope.signal.properties.title, links:scope.signal.properties.links}, '*');
				}, 350);

				var updateData = function ()
				{
					if (scope.update === true)
					{
						scope.update = false;
						element.find('iframe')[0].contentWindow.postMessage (scope.value, '*');
					}
				};

				var dataupdater = setInterval (updateData, 200);

				var update = function (t, values)
				{
					// console.log (scope.signal.title);
					if (t === 'v')
					{
						// console.log (values);
						var v = (values.s?values.s[scope.signal.title]:undefined);
						// console.log (v);
						if (v !== undefined)
						{
							if (!scope.signal.values) 
							{
								$timeout (function ()
								{
									scope.signal.values = true;
								});
							}
							scope.update = true;
							debug ('Signal '+scope.signal.title+' '+v);
							scope.value = v;
							// console.log (values.t+', '+v);
							// console.log (scope.setup.series);
						}
					}
				};

				$wydevice.on ('message', update);

				element.on ('$destroy', function ()
				{
					debug ('Erase extra');
					$wydevice.removeListener ('message', update);
					clearInterval (dataupdater);
				});
			}
		};
	});
};
