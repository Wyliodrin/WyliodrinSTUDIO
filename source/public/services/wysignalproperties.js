
"use srict";

var angular = require ('angular');

var _ = require ('lodash');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:wysignalproperties');

debug ('Loading');

var app = angular.module ('wyliodrinApp');

app.factory ('$wysignalproperties', function ($mdDialog)
{
	debug ('Registering');
	return {
		show: function (signal, addSignal)
		{
			if (!signal) signal = {
				title:'',
				type:'line',
				color:'#496968',
				properties: {}
			};
			$mdDialog.show({
		      controller: function ($scope)
		      {

		      	$scope.stylenames = settings.STYLE_NAMES;

		      	$scope.signal = signal;
		      	$scope.addSignal = addSignal!==null;
		      	this.add = function ()
		      	{
		      		addSignal ($scope.signal);
		      		$mdDialog.hide ();
		      	};

		      	this.style = function (style)
		      	{
		      		$scope.signal.style = style;
		      		$scope.properties = settings.SIGNAL_PROPERTIES[style];
		      	};

		      	this.close = function ()
		      	{
		      		$mdDialog.hide ();
		      	};

		      	$scope.styles = [
					'line',
					'pie',
					'bar',
					'thermometer',
					'vumeter',
					'gauge',
					'googlemap',
					'extra'
				];

				$scope.properties = settings.SIGNAL_PROPERTIES[$scope.signal.style];
		      },
		      controllerAs: 's',
		      templateUrl: 'signal-properties.html',
		      // parent: $element,
		      // targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: false
		    });
		}
	};
});
