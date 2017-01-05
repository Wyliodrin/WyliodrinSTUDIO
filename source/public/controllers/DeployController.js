
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

	app.controller ('DeployController', function ($scope, $filter, $mdDialog, $wyapp, $wydevices)
	{
		debug ('Registering');
		var that = this;

		$scope.deploy = {
			network:{},
			dashboard:{}
		};
		this.saveDeploy = function ()
		{
			library.addDeployment ('depl', $scope.deploy, function (err, id){
				if (!err)
					$mdDialog.hide();
			});
			
		};

		this.deleteDeploy = function ()
		{
			
		};
		this.cancel = function ()
		{
			$mdDialog.hide();
		};
	});
};
