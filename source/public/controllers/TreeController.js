'use strict';

var angular = require ('angular');
var settings = require ('settings');
var library = require ('library');

require ('debug').enable (settings.debug);

var debug = require ('debug')('wyliodrin:lacy:treecontroller');

var _ = require ('lodash');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller('TreeController', function($scope){
		debug ('Registering');

		$scope.caa='5';
		$scope.r=600;

		$scope.$watchCollection ('caa', function ()
		{
			if ($scope.caa === '5')
			{
				$scope.r=600;
			}
			else{
				$scope.r=300;
			}
		});



        $scope.treeOptions = {
    accept: function(sourceNodeScope, destNodesScope, destIndex) {
      return true;
    },
  };

  $scope.list = [
  {
    "id": 1,
    "title": "1. dragon-breath",
    "items": []
  },
  {
    "id": 2,
    "title": "2. moiré-vision",
    "items": [
      {
        "id": 21,
        "title": "2.1. tofu-animation",
        "items": [
          {
            "id": 211,
            "title": "2.1.1. spooky-giraffe",
            "items": []
          },
          {
            "id": 212,
            "title": "2.1.2. bubble-burst",
            "items": []
          }
        ]
      },
      {
        "id": 22,
        "title": "2.2. barehand-atomsplitting",
        "items": []
      }
    ]
  },
  {
    "id": 3,
    "title": "3. unicorn-zapper",
    "items": []
  },
  {
    "id": 10,
    "title": "4. romantic-transclusion",
    "items": []
  }
];

console.log($scope.list);

  










































       


	});
};