
"use strict";

var angular = require ('angular');

var _ = require ('lodash');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:vumeter');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.directive ('vumeter', function ($wydevice, $timeout, $wyapp){

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
					        plotBorderWidth: 1,
					        plotBackgroundColor: {
					        	linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					        	stops: [
					        		[0, '#FFF4C6'],
					        		[0.3, '#FFFFFF'],
					        		[1, '#FFF4C6']
					        	]
					        },
					        plotBackgroundImage: null,
					        height: 200
			            },
			            pane: [{
					        startAngle: -45,
					        endAngle: 45,
					        background: null,
					        center: ['50%', '145%'],
					        size: 300
					    }],
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
					        min: -20,
					        max: 6,
					        minorTickPosition: 'outside',
					        tickPosition: 'outside',
					        labels: {
					        	rotation: 'auto',
					        	distance: 20
					        },
					        plotBands: [{
					        	from: 0,
					        	to: 6,
					        	color: '#C02316',
					        	innerRadius: '100%',
					        	outerRadius: '105%'
					        }],
					        title: {
					        	text: 'VU<br/><span style="font-size:8px">'+$scope.signal.title+'</span>',
					        	y: -40
					        }
					    },
			            xAxis: {
			                labels: {
			                	enabled: false
			                }
			            },
			            plotOptions: {
					    	gauge: {
					    		dataLabels: {
					    			enabled: false
					    		},
					    		dial: {
					    			radius: '100%'
					    		}
					    	}
					    },
					},
					title:
					{
						text: $scope.signal.properties.title
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

					$scope.setup.options.yAxis.title = $scope.signal.properties.axisName;
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
				function log10 (x)
				{
					return Math.log(x) / Math.LN10;
				}

				var updateData = function ()
				{
					if (scope.update === true)
					{
						var vu = log10 (scope.value/(scope.signal.properties.maximum_value*0.74))*20;
						if (vu < -20) vu = -20;
						if (vu > 6) vu = 6;
						scope.setup.series[0].data = [vu];
						$timeout (function ()
						{
						});
						scope.update = false;
					}
				};

				var dataupdater = setInterval (updateData, 200);

				var update = function (t, values)
				{
					// console.log (scope.signal.title);
					if (t === 'v')
					{
						var v = values.s[scope.signal.title];
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
					debug ('Erase vumeter');
					$wydevice.removeListener ('message', update);
					clearInterval (dataupdater);
				});
			}
		};
	});
};
