
"use strict";

var angular = require ('angular');

var _ = require ('lodash');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:speedometer');

debug ('Loading');

module.exports = function ()
{
	var app = angular.module ('wyliodrinApp');
	app.directive ('speedometer', function ($wydevice, $timeout, $wyapp){

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
							type: 'gauge',
							plotBackgroundColor: null,
						    plotBackgroundImage: null,
							plotBorderWidth: 0,
							plotShadow: false,	        	
							spacingTop: 0,
							spacingLeft: 0,
							spacingRight: 0,
							spacingBottom: 0
						},
			            pane: {
			             	startAngle: -150,
							endAngle: 150,
							background: [{
								backgroundColor: {
									linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
									stops: [
										[0, '#FFF'],
										[1, '#333']
									]
								},
								borderWidth: 0,
								outerRadius: '109%'
							}, {
								backgroundColor: {
									linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
									stops: [
										[0, '#333'],
										[1, '#FFF']
									]
								},
								borderWidth: 1,
								outerRadius: '107%'
							}, {
								// default background
							}, {
								backgroundColor: '#DDD',
								borderWidth: 0,
								outerRadius: '105%',
								innerRadius: '103%'
							}]
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
							
							minorTickInterval: 'auto',
							minorTickWidth: 1,
							minorTickLength: 10,
							minorTickPosition: 'inside',
							minorTickColor: '#666',

							tickPixelInterval: 30,
							tickWidth: 2,
							tickPosition: 'inside',
							tickLength: 10,
							tickColor: '#666',
							labels: {
								step: 2,
								rotation: 'auto'
							},
							title: {
								text: $scope.signal.properties.units
							},
							plotBands: [{
								from: $scope.signal.properties.minimum_value,
								to: $scope.signal.properties.lowValue,
								color: $scope.signal.properties.lowColor // green
							}, {
								from: $scope.signal.properties.lowValue,
								to: $scope.signal.properties.midValue,
								color: $scope.signal.properties.midColor // yellow
							}, {
								from: $scope.signal.properties.midValue,
								to: $scope.signal.properties.maximum_value,
								color: $scope.signal.properties.highColor // red
							}]        
						},
			            xAxis: {
			                labels: {
			                	enabled: false
			                }
			            },
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
					$scope.setup.options.yAxis.min = $scope.signal.properties.minimum_value;
					$scope.setup.options.yAxis.max = $scope.signal.properties.maximum_value;
					$scope.setup.options.yAxis.title.text = $scope.signal.properties.units;
					$scope.setup.options.yAxis.plotBands[0].from = $scope.signal.properties.minimum_value;
					$scope.setup.options.yAxis.plotBands[0].to = $scope.signal.properties.lowValue;
					$scope.setup.options.yAxis.plotBands[0].color = $scope.signal.properties.lowColor;
					$scope.setup.options.yAxis.plotBands[1].from = $scope.signal.properties.lowValue;
					$scope.setup.options.yAxis.plotBands[1].to = $scope.signal.properties.midValue;
					$scope.setup.options.yAxis.plotBands[1].color = $scope.signal.properties.midColor;
					$scope.setup.options.yAxis.plotBands[2].from = $scope.signal.properties.midValue;
					$scope.setup.options.yAxis.plotBands[2].to = $scope.signal.properties.maximum_value;
					$scope.setup.options.yAxis.plotBands[2].color = $scope.signal.properties.highColor;
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

				var dataupdater = setInterval (updateData, 450);

				var update = function (t, values)
				{
					// console.log (scope.signal.title);
					if (t === 'v')
					{
						var v = (values.s?values.s[scope.signal.title]:undefined);
						// console.log (v);
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
							// var vu = this.log10 (value/(this.parameters.maximum_value.value*0.74))*20;
							// if (vu < -20) vu = -20;
							// if (vu > 6) vu = 6;
							scope.value = v;
							// console.log (values.t+', '+v);
							// console.log (scope.setup.series);
						}
					}
				};

				$wydevice.on ('message', update);

				element.on ('$destroy', function ()
				{
					debug ('Erase speedometer');
					$wydevice.removeListener ('message', update);
					clearInterval (dataupdater);
				});
			}
		};
	});
};
