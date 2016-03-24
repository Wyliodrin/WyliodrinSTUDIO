
"use strict";

var angular = require ('angular');

var _ = require ('lodash');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:thermometer');

debug ('Loading');

module.exports = function ()
{
	var app = angular.module ('wyliodrinApp');

	app.directive ('thermometer', function ($wydevice, $timeout, $wyapp){

		debug ('Registering');

		return {
			restrict: 'E',
			scope:{
				signal: '='
			},
			template: '<highchart config="setup" style="width:150px; height: 400px;"></highchart>',
			controller: function ($scope)
			{
				$scope.update = false;
				$scope.setup = {
					options:
					{
			            chart: {
			                type: 'column',
			                marginBottom: 55,
			                marginLeft: 59,
			                marginRight: 39
			            },
			            credits: {
			                enabled: false
			            },
			            legend: {
			                enabled: false
			            },
			            column:{
			            	stacking: 'true'
			            },
			            exporting: {
			                enabled: false   
			            },
			            tooltip: {
							formatter: function() 
							{
								return this.series.name+': <b>' + (this.y+$scope.signal.properties.minAxisValue) + '</b>';
							}
						},
			            yAxis: [{
			                min: $scope.signal.properties.minAxisValue,
			                max: $scope.signal.properties.maxAxisValue,
			                title: $scope.signal.properties.axisName,
			                align: 'right',
			            }, {
			            	min: 0,
			                max: $scope.signal.properties.maxAxisValue - $scope.signal.properties.minAxisValue,
			                align: 'right',
			                lineColor: 'transparent',
       						tickLength: 0,
			                gridLineWidth: 0,
  							minorGridLineWidth: 0,
  							labels:{
  								enabled: false
  							}
			            }],
			            xAxis: {
			                labels: {
			                	enabled: false
			                }
			            }
					},
					title:
					{
						text: $scope.signal.properties.title
					},
					series: [{
						name: $scope.signal.title,
						color: $scope.signal.color,
						yAxis: 1,
						data: []
					}],
					loading: false,
					func: function (chart)
					{
						chart.renderer.image('/public/drawable/thermometer.svg',50, 0, 200, 400).add(); 
						chart.reflow ();
					}
				};

				$scope.$watchCollection ('signal.properties', function ()
				{
					debug ('Signal setup');
					$wyapp.emit ('dashboard');
					// console.log ('signal');
					// console.log ($scope.signal);
					// console.log ($scope.signal.properties);
					// $scope.setup.options.chart.type = $scope.signal.type;
					// $scope.setup.series =
					// [{
					// 	title: $scope.signal.title,
					// 	color: $scope.signal.color,
					// 	data: []
					// }];

					// $scope.setup.title.text = $scope.signal.title;

					$scope.setup.options.yAxis[0].min = $scope.signal.properties.minAxisValue;
					$scope.setup.options.yAxis[0].max = $scope.signal.properties.maxAxisValue;
					$scope.setup.options.yAxis[0].title = $scope.signal.properties.axisName;
					// $scope.setup.options.yAxis[0].min = $scope.signal.properties.minAxisValue;
					$scope.setup.options.yAxis[1].max = $scope.signal.properties.maxAxisValue - $scope.signal.properties.minAxisValue;
					$scope.setup.title.text = $scope.signal.properties.title;
				});

				$scope.$watchCollection ('signal', function (vnew, vold)
				{
					debug ('Signal');
					$wyapp.emit ('dashboard');
					$scope.setup.series[0].name = $scope.signal.title;
					$scope.setup.series[0].color = $scope.signal.color;
				});
			},
			conrollerAs: 'l',
			link: function (scope, element, attrs)
			{
				var updateData = function ()
				{
					if (scope.update === true)
					{
						scope.setup.series[0].data = [scope.value - scope.signal.properties.minAxisValue];
						$timeout (function ()
						{
						});
						scope.update = false;
					}
				};

				var dataupdater = setInterval (updateData, 350);

				var update = function (t, values)
				{
					// console.log (scope.signal.title);
					if (t === 'v')
					{
						var v = values.s[scope.signal.title];
						// console.log (v);
						if (v !== undefined)
						{
							scope.value = v;
							debug ('Signal '+scope.signal.title+' '+v);
							if (!scope.signal.values) 
							{
								$timeout (function ()
								{
									scope.signal.values = true;
								});
							}
							scope.update = true;
							// console.log (values.t+', '+v);
							// console.log (scope.setup.series);
						}
					}
				};

				$wydevice.on ('message', update);

				element.on ('$destroy', function ()
				{
					debug ('Erase thermometer');
					$wydevice.removeListener ('message', update);
					clearInterval (dataupdater);
				});
			}
		};
	});
};
