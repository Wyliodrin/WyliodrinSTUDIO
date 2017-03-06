
"use strict";

var angular = require ('angular');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:FileExplorerController');

var path = require ('path');

var _ = require ('lodash');

var $ = require ('jquery');

var mixpanel = require ('mixpanel');

var library = require ('library');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller('DeployController', function($scope, $timeout, $mdDialog, $wydevice, $translate){

		var that = this;

		var message = function (t, p)
		{
			if (t === 'dep')
			{
				$timeout ( function ()
					{
						if (p.a === 'ACK')
						{
							_.filter($scope.list, {hash:p.b})[0].busy = false;
							that.retake();
						}
						if (p.a === 'ls')
						{
							$scope.joinLists($scope.local, $scope.board);
						}
					});
			}
		};

		$scope.keep_busy = false;

		$scope.list=[];

		//list.away -> [{name status}]
		//list.here
		//list. here + away

		//hash ...
		//away TRUE FALSE
		//here TRUE FALSE
		//status RUNNING STOPPED
		//busy TRUE FALSE

		$scope.local = [];
		//hash din title id date
		//supervisor_file
		//supervisor_name

		//vedem
		$scope.board = [];

		$scope.getLocal = function(done)
		{
			$scope.listProjects(done);
			//$scope.makeHash($scope.local, ["title", "id", "date"]);
		};

		$scope.getBoard = function()
		{
			$wydevice.send ('dep', {a:"ls"});
			//$scope.makeHash($scope.board, []) ////////////////////
		};

		$scope.makeHash = function(arr, fields){
				/////////////////////////////////////////
		};


		$scope.listProjects = function (done)
		{
			library.listProjects (function (err, list)
			{
				if (err)
				{
					debug ('Error list programs '+err);
				}
				else
				{
					$scope.local = list;
					$scope.$apply ();
					console.log(list);
				}
				if (done)
				{
					done(err);
				}
			});
		};

		$scope.stopped = function (obj)
		{
			if (obj.status == "STOPPED")
			{
				return true;
			}
			return false;
		};

		$scope.running = function (obj)
		{
			if (obj.status == "RUNNING")
			{
				return true;
			}
			return false;
		};

		function busy (obj, callback)
		{
			obj.busy = true;
			callback();
			//obj.busy = false;  done async
		}

		function joinLists(list1, list2){
			if ($scope.keep_busy){

			}
			else{

			}
			////////////
		}

		function action (data, obj, act)
		{
			busy(obj, function (){
				$wydevice.send ('dep', {a:act,b:data});
			});
		}

		$scope.stop = function (obj)
		{
			action(obj.hash, obj, "stop");
		};

		$scope.run = function (obj)
		{
			action(obj.hash, obj, "run");
		};

		$scope.restart = function (obj)
		{
			action(obj.hash, obj, "restart");
		};

		$scope.deploy = function (obj)
		{
			action(obj, obj, "deploy");
		};

		$scope.undeploy = function (obj)
		{
			action(obj.hash, obj, "undeploy");
		};

		$scope.redeploy = function (obj)
		{
			action(obj, obj, "redeploy");
		};

		$wydevice.on ('message', message);


		this.exit = function ()
		{
			$mdDialog.hide ();
		};

		this.retake = function ()
		{
			$scope.getLocal($scope.getBoard());
		};

		this.retake();



	});

};
