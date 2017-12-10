
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

var md5 = require('js-md5');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller('DeployController', function($scope, $timeout, $mdDialog, $wydevice, $translate){

		var that = this;

		$scope.activelogerr=false;
		$scope.activelogout=false;
		$scope.downloadvars={};

		var message = function (t, p)
		{
			if(t === 'fe6')
			{
					console.log(p);
			}
			if (t === 'dep')
			{
				$timeout ( function ()
					{
						console.log("Am primit de pe retea:");
						console.log(p);
						if (p.a === 'ACK')
						{
							console.log ("am primit ack la "+ p.b);
							_.filter($scope.list, {hash:p.b})[0].busy = false;
							//that.retake();
						}
						if (p.a === 'ls')
						{
							$scope.board = p.b;
							//console.log("de pe board am primit");
							//console.log($scope.board);
							$scope.joinLists($scope.local, $scope.board);
						}
						if(p.a === 'errlogcontent')
						{
							$scope.errlogcontent=p.b;
						}
						if(p.a === 'outlogcontent')
							$scope.outlogcontent=p.b;
						if(p.a === 'clearlog')
							window.alert("Fisierul a fost sters cu succes");
						if(p.a === 'errlogpath')
							$scope.errlogpath=p.b;
						if(p.a === 'outlogpath')
							$scope.errlogpath=p.b;
						if(p.a === 'fe3')
						{
							$timeout (function ()
							{
								var temp = new Buffer(p.f);
								if (typeof $scope.downloadvars.c === 'undefined')
								{
									$scope.downloadvars.c = temp;
								}
								else
								{
									$scope.downloadvars.c = Buffer.concat([$scope.downloadvars.c,temp]);
								}
								$scope.downloadvars.d = p.all; //file size on the board
			
								if (typeof $scope.downloadvars.call === 'undefined')
								{
			
									chrome.fileSystem.chooseEntry(
									{
										type: 'saveFile',
										suggestedName: $scope.errlogpath,
									}, 
									function(fileEntry) 
									{
										if(chrome.runtime.lastError) 
										{
			
										}
										if (!fileEntry) 
										{
											 return;
										}
			
										$scope.downloadvars.call=fileEntry;
										$scope.showPopupDownload = 1;
										if (p.end)
										{
											var toArrayBuffer = function(buffer) {
												var ab = new ArrayBuffer(buffer.length);
												var view = new Uint8Array(ab);
												for (var i = 0; i < buffer.length; ++i) {
													view[i] = buffer[i];
												}
												return ab;
											};
											var vasile = toArrayBuffer($scope.downloadvars.c);
			
											$scope.downloadvars.call.createWriter(function(fileWriter) 
											{
												 fileWriter.onerror = function (error)
												 {
													 $scope.contentPopupError = $translate.instant('FEfile_write');
													 $scope.showPopupError = 1;
												 };
												 fileWriter.write (new Blob ([vasile], {type:''}), function (error)
												 {
													 $scope.contentPopupError = $translate.instant('FEfile_write');
													 $scope.showPopupError = 1;
												 });
											 });
											 $scope.showPopupDownload = 0;
											 $scope.downloadvars={};
										}
										else
										{
											that.download('/var/tmp/',$scope.errlogpath,p.i);
										}
			
									});
								}
								else
								{	if($scope.showPopupDownload === 1 )
									{
										if (p.end)
										{
											var toArrayBuffer = function(buffer) {
												var ab = new ArrayBuffer(buffer.length);
												var view = new Uint8Array(ab);
												for (var i = 0; i < buffer.length; ++i) {
													view[i] = buffer[i];
												}
												return ab;
											};
											var vasile = toArrayBuffer($scope.downloadvars.c);
			
											$scope.downloadvars.call.createWriter(function(fileWriter) 
											{
												 fileWriter.onerror = function (error)
												 {
													 $scope.contentPopupError = $translate.instant('FEfile_write');
													 $scope.showPopupError = 1;
												 };
												 fileWriter.write (new Blob ([vasile], {type:''}), function (error)
												 {
													 $scope.contentPopupError = $translate.instant('FEfile_write');
													 $scope.showPopupError = 1;
												 });
											 });
											 $scope.showPopupDownload = 0;
											 $scope.downloadvars={};
										}
										else
										{
											that.download('/var/tmp/',$scope.errlogpath,p.i);
										}
									}
									else
									{
										$scope.downloadvars = {};
									}
								}
							});
						}
					});
			}
		};

		$scope.list=[];

		//list.away -> [{name status}]
		//list.here
		//list. here + away

		//hash ...
		//away TRUE FALSE
		//here TRUE FALSE
		//status RUNNING STOPPED ////////////////////ERROR(!!!!!!!!!!!!!!!!111111) in dau eu
		//busy TRUE FALSE

		$scope.local = [];
		//hash din title id date
		//supervisor_file

		//vedem
		$scope.board = [];

		$scope.getLocal = function(done)
		{
			$scope.listProjects(done);
		};

		$scope.getBoard = function()
		{
			$wydevice.send ('dep', {a:"ls"});
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
					console.log("ce am local");
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
			if (obj.status == "STOPPED" || obj.status == "EXITED" || obj.status == "FATAL")
			{
				return true;
			}
			return false;
		};

		$scope.running = function (obj)
		{
			if (obj.status == "RUNNING" || obj.status == "STARTING" || obj.status == "RUNNING")
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

		$scope.joinLists = function(local, board)
		{
			$scope.list=[];

			$scope.makeHash($scope.local, ["title", "id", "date"]);

			_.each(local, function(local_proj)
			{
				local_proj.here = true;
			});

			_.each(board, function(board_proj)
			{
				board_proj.away = true;
			});

			_.each(local, function(local_proj)
			{
				var board_proj = _.find(board, {'hash': local_proj.hash});
				if (board_proj === undefined)
				{}
				else
				{
					var proj = _.assign({},board_proj, local_proj);
					$scope.list.push(proj);
				}
			});

			var local_rest = _.filter(local, function (local_proj)
			{
				if (_.find(board, {'hash':local_proj.hash}) === undefined){
					return true;
				}
				return false;
			});

			var board_rest = _.filter(board, function (board_proj)
			{
				if (_.find(local, {'hash':board_proj.hash}) === undefined){
					return true;
				}
				return false;
			});

			$scope.list = _.concat($scope.list, local_rest, board_rest);
			console.log("tot");
			console.log($scope.list);


			//////////////////////////////// sorting ceva
		};

		$scope.makeHash = function (list, elem)
		{
			_.each(list, function(proj)
			{
				var str = "";
				_.each(elem, function (e){
					str += proj[e]; //concating all needed
				});

				proj.hash = md5(str);
			});
		};

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
			obj.supervisor_file = {
				user:"pi",
				autostart:"true",
				exitcodes:"255",
				autorestart:"true",
				environment:"NODE_PATH=\"/usr/lib/nodejs:/usr/lib/node_modules:/usr/share/javascript:/usr/local/lib/node_modules\"",
				priority:"40",
				umask: "022"
			};

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

		$scope.logerr=function(obj)
		{
			action(obj, obj, "logerr");
		};

		$scope.logerractive=function(obj)
		{
			$scope.activelogerr=true;
			$scope.thisobject=obj;
		};

		$scope.logoutactive=function(obj)
		{
			$scope.activelogout=true;
			$scope.thisobject=obj;
		};

		$scope.logout=function(obj)
		{
			action(obj, obj, "logout");
		};

		$scope.clearlogerr = function()
		{
			var thisobj= $scope.thisobject;
			action(thisobj, thisobj, "clearlogerr");
			$scope.errlogcontent="";
		};

		$scope.clearlogout = function()
		{
			var thisobj= $scope.thisobject;
			action(thisobj, thisobj, "clearlogout");
			$scope.outlogcontent="";
		};

		$scope.undoerr= function()
		{
			$scope.activelogerr=false;
		};

		$scope.undoout= function()
		{
			$scope.activelogout=false;
		};

		$scope.downloaderr = function()
		{
			var thisobj= $scope.thisobject;
			action(thisobj,thisobj, "downloaderr");
		};
		$scope.downloadout = function()
		{
			var thisobj= $scope.thisobject;
			action(thisobj,thisobj, "downloadout");
		};

		$wydevice.on ('message', message);


		this.exit = function ()
		{
			$wydevice.send ('dep', {a:"exit"});
			$mdDialog.hide ();
		};

		this.download = function(cwd,filename,index=0)
		{
			if (index === 0)
			{
				
			}
			$wydevice.send ('dep', {a:'downloaderr',b:cwd,c:filename,z:index,size:$scope.MAXPACKET});

		};

		this.retake = function ()
		{
			$scope.getLocal($scope.getBoard());
		};

		this.retake();



	});

};
