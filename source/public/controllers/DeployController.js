
"use strict";

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:DeployController');

var _ = require ('lodash');

var library = require ('library');

var angular = require ('angular');
var mixpanel = require ('mixpanel');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller ('DeployController', function ($scope, $filter, $mdDialog, $wyapp, $wydevices, deploy, showDashboard)
	{
		debug ('Registering');
		var that = this;
		var nr = 0;

		if (showDashboard)
			$scope.deployTab = 1;
		else
			$scope.deployTab = 0;

		if (deploy)
		{
			$scope.deploy = deploy;
		}
		else
		{
			$scope.deploy = 
			{
				network:{},
				dashboard:[]
			};
		}
		
		this.saveDeploy = function ()
		{
			library.addDeployment ('depl'+nr, $scope.deploy, function (err, id){
				if (!err)
					$mdDialog.hide();
			});
			nr++;
			
		};

		this.cancel = function ()
		{
			$mdDialog.hide();
		};
	});
};
