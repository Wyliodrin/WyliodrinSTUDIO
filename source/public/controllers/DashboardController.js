
"use strict";

var angular = require ('angular');
var library = require ('library');

var Highcharts = require ('highcharts/highstock');

var highcharts_htmlitem = require ('highcharts-ng');

var mixpanel = require ('mixpanel');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:DashboardController');

var _ = require ('lodash');

var $ = require ('jquery');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller('DashboardController', function($scope, $element, $wyapp, $wydevice, $timeout, $wysignalproperties, $mdDialog, $filter){
		debug ('Registering');
		$scope.project = 
		{
			dashboard: []
		};

		$scope.values = {};

		$scope.$watchCollection ('project.dashboard', function ()
		{
			$wyapp.emit ('dashboard');
		});

		$wyapp.on ('dashboard', function ()
		{
			if ($scope.project.id)
			{
				library.storeDashboard ($scope.project.id, $scope.project.dashboard);
			}
			$timeout (function ()
			{
				$(window).trigger ('resize');
			}, 500);
		});

		$scope.stylenames = settings.STYLE_NAMES;
		
		function graphResize (){
			var windowSizeWidth = $(window).width();
			var windowSizeHeight = $(window).height();
			$('.graph-signal').width(windowSizeWidth - 194 + 'px');
			$('.graph-signal').height(windowSizeHeight - 138 + 'px');
		}
		
		$(window).resize (function ()
		{
			graphResize ();
			
		});
		
		graphResize ();

		$scope.styles = [];

		_.each (settings.STYLE_NAMES, function (name, style)
		{
			$scope.styles.push (style);
		});

		this.colspan = function (signal)
		{
			if (signal.style === 'line') return 3;
			else
			if (signal.style === 'vumeter' || signal.style === 'extra') return 2;
			else return 1;
		};

		this.rowspan = function (signal)
		{
			if (signal.style === 'switch' || signal.style === 'slider') return 1;
			else
			if (signal.style === 'thermometer') return 3;
			else return 2;
		};
	
		this.left = function (signal)
		{
			var pos = _.indexOf ($scope.project.dashboard, signal);
			if (pos > 0)
			{
				var s = $scope.project.dashboard[pos-1];
				$scope.project.dashboard[pos-1] = signal;
				$scope.project.dashboard[pos] = s;
				$timeout (function ()
				{
					$(window).trigger ('resize');
				}, 500);
			}
		};

		this.right = function (signal)
		{
			var pos = _.indexOf ($scope.project.dashboard, signal);
			if (pos < $scope.project.dashboard.length-1)
			{
				var s = $scope.project.dashboard[pos+1];
				$scope.project.dashboard[pos+1] = signal;
				$scope.project.dashboard[pos] = s;
				$timeout (function ()
				{
					$(window).trigger ('resize');
				}, 500);
			}
		};

		this.erase = function (signal)
		{
			var message = $mdDialog.confirm()
		          .title(($filter('translate')('want_to_delete'))+' '++signal.title)
		          // .textContent('All of the banks have agreed to forgive you your debts.')
		          // .ariaLabel('Lucky day')
		          // .targetEvent(ev)
		          .ok(($filter('translate')('YES')))
		          .cancel(($filter('translate')('NO')));
		    $mdDialog.show(message).then(function() {
		    	var pos = _.indexOf($scope.project.dashboard, signal);
		    	mixpanel.track ('Dashboard Erase',
				{
					language: $scope.project.language,
					type: $scope.project.dashboard[pos].style
				});
				if (pos >= 0) $scope.project.dashboard.splice (pos, 1);
				$timeout (function ()
				{
					$(window).trigger ('resize');
				}, 500);
		    }, function() {
		    	// 
		    });
		};

		function addSignal (signal)
		{
			if ($scope.project.dashboard === undefined) $scope.project.dashboard = [];
			$scope.project.dashboard.push (signal);
			$timeout (function ()
			{
				$(window).trigger ('resize');
			}, 500);
		}

		var s = $scope;

		this.add = function (style)
		{
			mixpanel.track ('Dashboard Add',
			{
				language: $scope.project.language,
				type: style
			});

			var signal = {
				title: '',
				color: '#e54225',
				properties: {},
				style: style
			};

			_.each (settings.SIGNAL_PROPERTIES[style], function (propertyValue, property)
			{
				// console.log (property);
				signal.properties[property] = propertyValue.value;
			});

			$wysignalproperties.show (signal, addSignal);
		};

		$wyapp.on ('load', function (project)
		{
			console.log (project);
			$timeout (function ()
			{
				$scope.project = project;
				$scope.signals = {};
				$timeout (function ()
				{
					$(window).trigger ('resize');
				}, 500);
			});
		});
	});

	app.directive ('dashboardViewer', function ($timeout, $wysignalproperties)
	{
		return {
			restrict: 'E',
			templateUrl: 'dashboard-viewer.html',
			scope: {
				signal: '=',
				language: '=',
				erase: '&',
				left: '&',
				right: '&'
			},
			controller: function ($scope)
			{
				this.reset = function ()
				{
					
				};

				this.setup = function ()
				{
					$wysignalproperties.show ($scope.signal, null);
				};
			},

			controllerAs: 'd',
			replace: true,
			link: function (scope, element, attrs)
			{
				// console.log (element.text);
				// var chart = new highcharts.Chart({
			 //        chart: {
			 //          renderTo: element.find('#viewer')[0],
			 //          plotBackgroundColor: null,
			 //          plotBorderWidth: null,
			 //          plotShadow: true
			 //        },
			 //        title: {
			 //          text: scope.signal.title
			 //        },
			 //        plotOptions: {
			          
			 //        },
			 //        series: [{
			 //          type: 'spline',
			 //          name: scope.signal.title,
			 //          data: [4,5,245,23,4,45,23,532,53245],
			 //          color: scope.signal.color
			 //        }]
			 //      });
				// scope.$watch("value", function (newValue) {
			 //        chart.series[0].setData(newValue, true);
			 //      }, true);
			}
		};
	});
	
};
