
"use strict";

var angular = require ('angular');

var _ = require ('lodash');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:gauge');

debug ('Loading');

module.exports = function ()
{
	var app = angular.module ('wyliodrinApp');

	app.directive ('gauge', function ($wydevice, $timeout, $wyapp){

		debug ('Registering');

		return {
			restrict: 'E',
			scope:{
				signal: '='
			},
			template: '<highchart config="setup" style="width:100%"></highchart>',
			controller: function ($scope)
			{
				$scope.update = false;
				$scope.setup = {
					options:
					{
			            chart: {
							type: 'solidgauge',
			 				spacingTop: 0,
				           		spacingLeft: 0,
							spacingRight: 0,
							spacingBottom: 0
						},
			            pane: {
							center: ['50%', '90%'],
							startAngle: -90,
							endAngle: 90,
							background: {
								backgroundColor: '#EEE',
								innerRadius: '60%',
								outerRadius: '100%',
								shape: 'arc',
								borderColor: 'transparent'
							}
						},
			            credits: {
			                enabled: false
			            },
			            legend: {
			                enabled: false
			            },
			            exporting: {
			                enabled: false   
			            },
			            yAxis: {
							min: $scope.signal.properties.minimum_value,
							max: $scope.signal.properties.maximum_value,
							stops: [
								[parseFloat($scope.signal.properties.minimum_value)/$scope.signal.properties.maximum_value, $scope.signal.properties.lowColor], // green
								[parseFloat($scope.signal.properties.lowValue)/$scope.signal.properties.maximum_value, $scope.signal.properties.midColor], // yellow
								[parseFloat($scope.signal.properties.midValue)/$scope.signal.properties.maximum_value, $scope.signal.properties.highColor], // red
							],
							lineWidth: 0,
							minorTickInterval: null,
							tickPixelInterval: 400,
							tickWidth: 0,
							title: {
								text: $scope.signal.properties.title,
								y: -70
							},
							labels: {
								y: 16
							}        
						},
			            xAxis: {
			                labels: {
			                	enabled: false
			                }
			            },
			            plotOptions: {
							solidgauge: {
								dataLabels: {
									y: -30,
									borderWidth: 0,
									useHTML: true
								}
							}
						},
						tooltip: {
				            valueSuffix: $scope.signal.properties.units
				        }
					},
					title:
					{
						text: $scope.signal.properties.title
					},
					size:
					{
						height: 250
					},
					series: [{
						name: $scope.signal.title,
						color: $scope.signal.color,
						data: []
					}],
					loading: false,
					func: function (chart)
					{
						$timeout(function() 
						{
							chart.reflow();
						}, 0);
					}
				};

				$scope.$watchCollection ('signal.properties', function ()
				{
					debug ('Signal setup');
					$wyapp.emit ('dashboard');
					$scope.setup.options.yAxis.min = $scope.signal.properties.minimum_value;
					$scope.setup.options.yAxis.max = $scope.signal.properties.maximum_value;
					$scope.setup.options.yAxis.title.text = $scope.signal.properties.units;
					$scope.setup.options.yAxis.stops[0] = [parseFloat($scope.signal.properties.minimum_value)/$scope.signal.properties.maximum_value, $scope.signal.properties.lowColor];
					$scope.setup.options.yAxis.stops[1] = [parseFloat($scope.signal.properties.lowValue)/$scope.signal.properties.maximum_value, $scope.signal.properties.midColor];
					$scope.setup.options.yAxis.stops[2] = [parseFloat($scope.signal.properties.midValue)/$scope.signal.properties.maximum_value, $scope.signal.properties.highColor];
					$scope.setup.options.tooltip.valueSuffix = $scope.signal.properties.units;
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
						scope.setup.series[0].data = [scope.value];
						$timeout (function ()
						{
						});
						scope.update = false;
					}
				};

				var dataupdater = setInterval (updateData, 350);

				var update = function (t, values)
				{
					if (t === 'v')
					{
						var v = (values.s?values.s[scope.signal.title]:undefined);
						if (v !== undefined)
						{
							scope.update = true;
							debug ('Signal '+scope.signal.title+' '+v);
							if (!scope.signal.values) 
							{
								$timeout (function ()
								{
									scope.signal.values = true;
								});
							}
							scope.value = v;
						}
					}
				};

				$wydevice.on ('message', update);

				element.on ('$destroy', function ()
				{
					debug ('Erase gauge');
					$wydevice.removeListener ('message', update);
					clearInterval (dataupdater);
				});
			}
		};
	});
};
