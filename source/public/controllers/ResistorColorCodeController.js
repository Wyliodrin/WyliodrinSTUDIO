
"use strict";

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:ResistorColorCodeController');

var mixpanel = require ('mixpanel');

var _ = require ('lodash');

var library = require ('library');

var angular = require ('angular');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller ('ResistorColorCodeController', function ($scope, $mdDialog)
	{
		debug ('Registering');
		

		//Start first page part	
		$scope.colors = ['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet', 'Gray', 'White'];

		$scope.multiplier = [
		{
			color:'Black',
			value: 1
		},
		{
			color:'Brown',
			value: 10
		},
		{
			color:'Red',
			value: 100
		},
		{
			color:'Orange',
			value: 1000
		},
		{
			color:'Yellow',
			value: 10000
		},
		{
			color:'Green',
			value: 100000
		},
		{
			color:'Blue',
			value: 1000000
		},
		{
			color:'Violet',
			value: 10000000
		},
		{
			color:'Gold',
			value:0.1
		},
		{
			color:'Silver',
			value:0.01
		}];

		$scope.tolerance = [
		{
			color:'Black',
			value:0
		},
		{
			color:'Brown',
			value:1
		},
		{
			color:'Red',
			value:2
		},
		{
			color:'Green',
			value:0.5
		},
		{
			color:'Blue',
			value:0.25
		},
		{
			color:'Violet',
			value:0.10
		},
		{
			color:'Gray',
			value:0.05
		},
		{
			color:'Gold',
			value:5
		},
		{
			color:'Silver',
			value:10
		}];

		$scope.value = {
			number: 4,
			color1: 0,
			color2: 0,
			color3: 0,
			color4: 1,
			color5: 0
		};

		$scope.r = 0;
		$scope.u = 0;

		$scope.$watchCollection ('value', function ()
		{
			var value = parseInt($scope.value.color1)*10 + parseInt($scope.value.color2);
			if ($scope.value.number === '5')
			{
				value = value*10 + parseInt($scope.value.color3);
			}
			value = value * parseFloat($scope.value.color4);
			if (value > 1000000)
			{
				value = value / 1000000;
				$scope.u = 'M';
			}
			else
			if (value > 1000)
			{
				value = value / 1000;
				$scope.u = 'K';
			}
			else
			{
				$scope.u = '';
			}
			$scope.r = value;
		});

		//End first page part

		//Start second page part
		//All variables are prefixed by "second"

		mixpanel.track ('Resistor Color Code', {});

		$scope.second={};
		$scope.second.value={};
		
		$scope.second.tolerance = [
		{
			color:0,
			value:"0%"
		},
		{
			color:1,
			value:"1%"
		},
		{
			color:2,
			value:"2%"
		},
		{
			color:5,
			value:"0.5%"
		},
		{
			color:6,
			value:"0.25%"
		},
		{
			color:7,
			value:"0.10%"
		},
		{
			color:8,
			value:"0.05%"
		},
		{
			color:11,
			value:"5%"
		},
		{
			color:22,
			value:"10%"
		}];



		$scope.second.value.number = 220;
		$scope.second.value.stripes = '4';
		$scope.second.value.tolerance= 11; //last stripe


		$scope.second.stripe1 = 2;
		$scope.second.stripe2 = 2;
		$scope.second.stripe3 = 0;
		$scope.second.stripe4 = 0;
		$scope.second.r = 220;
		$scope.second.u = "";

		$scope.$watchCollection ('second.value', function ()
		{
			var value = parseFloat($scope.second.value.number);
			if (isNaN(value) || value > 99999999999 || 
				((value < 0.1) && ($scope.second.value.stripes === '4')) ||
				((value < 1) && ($scope.second.value.stripes !== '4')))
			{
				$scope.second.r = 0; //bad value
				$scope.second.u = "";
				$scope.second.stripe1 = 0;
				$scope.second.stripe2 = 0;
				$scope.second.stripe3 = 0;
				$scope.second.stripe4 = 0;

			}
			else
			{
				value *= 10000; //workaround for float
				var digit1 = 0;
				var digit2 = 0;
				var digit3 = 0;
				var multiplier = 0;
				if ($scope.second.value.stripes === '4')
				{
					while (Math.trunc(value / 100) !== 0)
					{
						multiplier += 1;
						value = Math.trunc(value / 10);
					}

					digit2 = value % 10;
					digit1 = Math.trunc(value / 10);

					multiplier -= 4; //workaround

					$scope.second.r = (digit1 * 10 + digit2) * Math.pow(10,multiplier);
					$scope.second.stripe3 = multiplier;
				}
				else
				{
					while (Math.trunc(value / 1000) !== 0)
					{
						multiplier += 1;
						value = Math.trunc(value / 10);
					}

					digit3 = value % 10;
					value = Math.trunc(value / 10);
					digit2 = value % 10;
					digit1 = Math.trunc(value / 10);

					multiplier -= 4; //workaround

					$scope.second.r = ((digit1 * 10 + digit2) * 10 + digit3) * Math.pow(10,multiplier);
					$scope.second.stripe3 = digit3;
					$scope.second.stripe4 = multiplier;
				}


				$scope.second.stripe1 = digit1;
				$scope.second.stripe2 = digit2;


				//gold and silver stripes name match
				if ($scope.second.stripe3 == -1)
				{
					$scope.second.stripe3 = 11;
				}
				if ($scope.second.stripe3 == -2)
				{
					$scope.second.stripe3 = 22;
				}
				if ($scope.second.stripe4 == -1)
				{
					$scope.second.stripe4 = 11;
				}
				if ($scope.second.stripe4 == -2)
				{
					$scope.second.stripe4 = 22;
				}



				if ($scope.second.r > 1000000)
				{
					$scope.second.r = $scope.second.r / 1000000;
					$scope.second.u = 'M';
				}
				else
				if ($scope.second.r > 1000)
				{
					$scope.second.u = 'K';
				}
				else
				{
					$scope.second.u = '';
				}

			}
			
		});
		//end second page part



		
		this.exit = function ()
		{
			$mdDialog.hide ();
		};
	});
};
