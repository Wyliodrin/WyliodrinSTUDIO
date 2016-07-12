
"use strict";

var angular = require ('angular');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:FileExplorerController');

var fs = require ('fs');

var mixpanel = require ('mixpanel');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller('FileExplorerController', function($scope, $timeout, $mdDialog, $wydevice){
		debug ('Registering');
		$scope.files = [];
		$scope.cwd = "";
		/*mixpanel.track ('Task Manager', {
			category: $wydevice.device.category
		});*/
		var that = this;


		var message = function (t, p)
		{
			//change dir
			if (t === 'fe1')
			{
				$timeout (function ()
				{
					if (p[0] == "ERROR")
					{
						console.log("NU E BINE UNDE AI INTRAT");
						//poate un mesaj de eroare
						//ne ducem inapoi
						$scope.cwd = $scope.cwd.slice(0,$scope.cwd.lastIndexOf("/"));
						if ($scope.cwd === "")
							//inseamna ca am ajuns la root
						{
							$scope.cwd = "/"; 
						}
					}
					else
					{
						$scope.files = p;
					}	
				});
			}
			//get home
			if (t === 'fe2')
			{
				$timeout (function ()
				{
					$scope.cwd = p;
					//am primit homeul, continui
					$wydevice.send ('fe', {a:'ls',b:$scope.cwd});
				});
			}
			//download
			if (t === 'fe3')
			{
				$timeout (function ()
				{
					p.n = 
					p.f = 
					//am primit homeul, continui
					chrome.fileSystem.chooseEntry(
					{
						type: 'saveFile',
						suggestedName: p.n,
					}, 
					function(fileEntry) 
					{
						fs.writeFile(fileEntry, p.f, function(err) {
						    if(err) {
						        return console.log(err);
						    }

						    console.log("The file was saved!");
						}); 
					});
				});
			}
		};

		$wydevice.on ('message', message);

		$wydevice.send ('fe', {a:'phd'});

		function human_readable(number)
		{
			if (number>1000000000)
			{
				return (Math.round(number/10000000)/100).toString() + " GB";
			}
			else
			{
				if (number>1000000)
				{
					return (Math.round(number/10000)/100).toString() + " MB";
				}
				else
				{
					if (number>1000)
					{
						return (Math.round(number/10)/100).toString() + " KB";
					}
					else
					{
						return (Math.round(number*100)/100).toString() + " B";
					}
				}
			}
		}


		$scope.$watchCollection("files", function(){
			for (var i=0; i<$scope.files.length; i++)
			{
				$scope.files[i].size = human_readable($scope.files[i].size);
			}
		});



		this.cd = function(folder)
		{
			debug ('Changing to folder');
			if ($scope.cwd != "/")
			{
				$scope.cwd=$scope.cwd+"/"+folder;
			}
			else
			{
				$scope.cwd=$scope.cwd+folder;
			}
			$wydevice.send ('fe', {a:'ls',b:$scope.cwd});
		};

		this.up = function ()
		{
			if ($scope.cwd != "/"){

				debug ('Going up');
				//get rid of last folder entered
				$scope.cwd = $scope.cwd.slice(0,$scope.cwd.lastIndexOf("/"));
				if ($scope.cwd === "")
					//inseamna ca am ajuns la root
				{
					$scope.cwd = "/"; 
				}
				$wydevice.send ('fe', {a:'ls',b:$scope.cwd});
			}
		};

		this.download = function(file)
		{
			$wydevice.send ('fe', {a:'down',b:$scope.cwd,c:file});
		};

		this.doubleclick = function(file)
		{
			if (file.isdir)
			{
				this.cd(file.name);
			}
			if (file.isfile || file.islink)
			{
				this.download(file.name);
			}
		};

		this.exit = function ()
		{
			debug ('Exiting');
			$mdDialog.hide ();
			$wydevice.removeListener ('message', message);
		};
	});
};
