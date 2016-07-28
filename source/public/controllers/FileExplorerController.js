
"use strict";

var angular = require ('angular');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:FileExplorerController');

var fs = require ('fs');
var path = require ('path');

var _ = require ('lodash');

var mixpanel = require ('mixpanel');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller('FileExplorerController', function($scope, $timeout, $mdDialog, $wydevice){
		debug ('Registering');
		$scope.files = [];
		$scope.cwd = "";
		$scope.treeData = [];
		$scope.showHidden = false;
		$scope.selectedRight = {};

		$scope.showPopupDelete = 0;
		$scope.showPopupRename = 0;
		$scope.showPopupNewFolder = 0;
		$scope.showPopupError = 0;
		$scope.contentPopupRename = "";
		$scope.contentPopupNewFolder = "";
		$scope.contentPopupError = "";


		mixpanel.track ('File Explorer', {
			category: $wydevice.device.category
		});
		var that = this;



		var message = function (t, p)
		{
			//change dir
			if (t === 'fe1')
			{
				$timeout (function ()
				{
					$scope.selectedRight = {}; //force deselectation

					if (p[0] == "ERROR")
					{
						$scope.contentPopupError = "You have entered in an inexistent folder.";
						$scope.showPopupError = 1;
						//ne ducem inapoi
						$scope.cwd = $scope.cwd.slice(0,$scope.cwd.lastIndexOf("/"));
						if ($scope.cwd === "")
							//inseamna ca am ajuns la root
						{
							$scope.cwd = "/"; 
						}
						$wydevice.send ('fe', {a:'ls',b:$scope.cwd});
					}
					else
					{
						if ($scope.cwd != "/")
						{
							$scope.files = [{'name':'.. (Go up)','isup':true,'isdir':false,'isfile':false,'islink':false}];
							$scope.files = $scope.files.concat(p);
						}
						else
						{
							$scope.files = p;
						}
						//make the right side be the same as the left
						var treeHeight = $('.tree-classic').height();
        				$('.on-the-right').css('height', treeHeight);  
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
					that.refresh();
				});
			}
			//download
			if (t === 'fe3')
			{
				$timeout (function ()
				{	
					if (p.f[0]=="ERROR")
					{
						$scope.contentPopupError = "You don't have read permissions here.";
						$scope.showPopupError = 1;
					}
					else
					{
						chrome.fileSystem.chooseEntry(
						{
							type: 'saveFile',
							suggestedName: p.n,
						}, 
						function(fileEntry) 
						{
							if(chrome.runtime.lastError) 
							{
								
							}
							if (!fileEntry) 
							{
								debug ('File missing');
						 		return;
							}
						 	fileEntry.createWriter(function(fileWriter) 
						 	{

						 		
					 			fileWriter.onerror = function (error)
						 		{
						 			$scope.contentPopupError = "Writing file to disk failed.";
						 			$scope.showPopupError = 1;
						 			//console.log ('Filewriter error ' + error);
						 		};
						 		fileWriter.write (new Blob ([p.f], {type:''}), function (error)
					 			{
					 				$scope.contentPopupError = "Writing file to disk failed.";
					 				$scope.showPopupError = 1;
					 				//console.log ('Error on write '+ error);
					 			});
						 	});
						});
					}
				});
			}
			//tree and tree forced from right
			if (t === 'fe4' || t === 'fe5')
			{
				$timeout (function ()
				{


					function search_tree (loc)
					{
						var list_loc = that.splitPath(loc);
						return search_tree_aux(list_loc,$scope.treeData);
					}

					function search_tree_aux (list_loc,tree)
					{

						var current = list_loc.shift();
						var result = tree.find(function (child)
						{
							return (child.name == current && child.d == 1);
						});

						if (list_loc.length === 0){
							return result;
						}
						else{
							return search_tree_aux(list_loc,result.children);
						}
					}

					function check_children (lista, place)
					{
						var final=[];

						lista.forEach (function (child)
						{
							child.name = path.basename(child.p);

							var real_place;
							if (place != "/")
							{
								real_place = place.children.find(function(sub)
								{
									return (sub.name == child.name);
								});
							}

							if (place == "/" || 
								place.children[0].isunvisited === true || 
								real_place === undefined)
							{
								child.visited = 0;

								if (child.d === false)
								{
									child.children=[];
								}
								else
								{
									child.children=[{'name':'Loading . . .','children':[],'isspecial':true, 'isunvisited':true }]; //fara d si p
								}
							}
							else
							{
								child.visited = real_place.visited;

								if (child.d === false)
								{
									child.children=[];
								}
								else
								{
									child.children=real_place.children;
								}
							}
							final.push(child);

						});
						return final;
					}



					if (p.a[0] == "ERROR")
					{
						//nu ai drepturi de a accesa
						search_tree(p.p).children=[{'name':'Empty folder','children':[],'isspecial':true}];
					}
					else
					{
						if (p.a.length === 0)
						{
							//folderul e gol
							search_tree(p.p).children=[{'name':'Empty folder','children':[],'isspecial':true}];
						}
						else
						{
							if (p.p == "/")
							{
								$scope.treeData = check_children(p.a,"/"); //put it directly
							}
							else
							{
								var place = search_tree(p.p);
								place.children = check_children(p.a,place);
								$scope.selected_node.visited = 1;
								if (t === 'fe5') //forced by right-side to go to there
								{
									$scope.expanded_nodes.push(place);
									$scope.selected_node = place;
								}
							}

						}
					}
				});
			}
			//error messages from newfolder del rename
			if (t === 'fe6')
			{
				$timeout (function ()
				{
					if (p.a === 'newf')
					{
						$scope.contentPopupError = "Creating a new folder failed. ";
						if (p.e === 'EEXIST')
						{
							$scope.contentPopupError += "Another file/folder with the same name exists here.";
						}
						else if (p.e === 'EACCES')
						{
							$scope.contentPopupError += "You do not have permissions to write here.";
						}
						else
						{
							$scope.contentPopupError += "Unknown error.";
						}
					}
					else if (p.a === 'del')
					{
						$scope.contentPopupError = "Deleting failed. ";
						if (p.e === 'EACCES')
						{
							$scope.contentPopupError += "You do not have permissions to delete here.";
						}
						else
						{
							$scope.contentPopupError += "Unknown error.";
						}
					}
					else if (p.a === 'ren')
					{
						$scope.contentPopupError = "Renaming failed. ";
						if (p.e === 'EEXIST')
						{
							$scope.contentPopupError += "Another file/folder with the same name exists here.";
						}
						else if (p.e === 'ENOENT')
						{
							$scope.contentPopupError += "The file/folder does not exists anymore.";
						}
						else if (p.e === 'EACCES')
						{
							$scope.contentPopupError += "You do not have permissions to rename here.";
						}
						else
						{
							$scope.contentPopupError += "Unknown error.";
						}
					}
					else if (p.a === 'up')
					{
						$scope.contentPopupError = "Uploading Failed. ";
						if (p.e === 'EACCES')
						{
							$scope.contentPopupError += "You do not have permissions to write here.";
						}
					}
					else
					{
						$scope.contentPopupError = "Unknown error.";
					}


					$scope.showPopupError = 1;
				});
			}
			if (t === 'fe7')
			{
				that.refresh();
			}
		};

		this.splitPath = function(loc)
		{
			var list_loc=[];
			//unshift is oposite of push
			while (loc != "/")
			{
				list_loc.unshift(path.basename(loc));
				loc = path.dirname(loc);
			}
			return list_loc;
		};

		
		this.getChildren = function(node, expanded)
		{
			//if (node.visited === 0)
			if (expanded == 1)
			{
				$wydevice.send ('fe', {a:'tree',b:node.p});
			}
		};

		this.absolutecd = function(node)
		{
			if (node.d)
			{
				$scope.cwd = node.p;
				this.list();
			}
			else
			{
				if (!node.isspecial)
				{
					this.download(path.dirname(node.p),node.name);
				}
			}
		};

		$scope.expanded_nodes = [];
		$scope.selected_node = {};
		$scope.treeOptions = {
		    nodeChildren: "children",
		    dirSelectable: true,
		    injectClasses: {
		        ul: "a1",
		        li: "a2",
		        liSelected: "a7",
		        iExpanded: "a3",
		        iCollapsed: "a4",
		        iLeaf: "a5",
		        label: "a6",
		        labelSelected: "a8"
		    }
		};


		$wydevice.on ('message', message);

		$wydevice.send ('fe', {a:'phd'});
		$wydevice.send ('fe', {a:'tree',b:'/'});

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


		this.hide = function(file)
		{
			if ($scope.showHidden)
			{
				return true;
			}
			else
			{
				if (file.isup)
				{
					return true;
				}
				if (file.name.startsWith("."))
				{
					return false;
				}
				else
				{
					return true;
				}
			}
		};



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
			//$scope.cwd = path.join($scope.cwd,folder)

			this.refresh();

		};

		this.list = function ()
		{
			//let only up be on screen
			$scope.files = [{'name':'.. (Go up)','isup':true,'isdir':false,'isfile':false,'islink':false}];
			$wydevice.send ('fe', {a:'ls',b:$scope.cwd});
		};

		this.refresh = function()
		{
			this.list();
			//tree part
			var list_loc = this.splitPath($scope.cwd);
			$wydevice.send ('fe', {a:'treeforce',b:list_loc});
			
		};

		this.up = function ()
		{
			if ($scope.cwd != "/"){

				debug ('Going up');
				//get rid of last folder entered
				$scope.cwd = $scope.cwd.slice(0,$scope.cwd.lastIndexOf("/"));
				if ($scope.cwd === "")
				{
					//reached root, only select, on tree
					$scope.cwd = "/"; 
					$scope.selected_node = {};
					this.list();
				}
				else
				{
					//not root, get tree for left
					this.refresh();
				}
			}
		};

		this.doubleclick = function(file)
		{
			if (file.isup)
			{
				this.up();
			}
			if (file.isdir)
			{
				this.cd(file.name);
			}
			if (file.isfile)
			{
				//download
				this.download($scope.cwd,file.name);
			}
		};


		this.click = function(file)
		{
			$scope.selectedRight = file;
		};

		this.isSelected = function(file)
		{
			if (file.isdir == $scope.selectedRight.isdir &&
				file.isfile == $scope.selectedRight.isfile &&
				file.islink == $scope.selectedRight.islink &&
				file.name == $scope.selectedRight.name &&
				file.size == $scope.selectedRight.size)

			{
				return true;
			}
			return false;
		};

		this.download = function(cwd,filename)
		{
			$wydevice.send ('fe', {a:'down',b:cwd,c:filename});
		};

		this.upload = function()
		{
			chrome.fileSystem.chooseEntry(
			{
				type: 'openFile'
			}, 
			function(fileEntry) {
				if(chrome.runtime.lastError) 
				{

				}
				if (!fileEntry) {
					debug ('File missing');
					return;
			 	}

			 	fileEntry.file(function(file) 
			 	{
					var fileReader = new FileReader ();
					fileReader.onload = function (value)
					{
						var rawData = value.target.result;
						$wydevice.send ('fe', {a:'up',b:$scope.cwd,c:file.name,d:rawData});


					};
					fileReader.onerror = function (err)
					{
						debug (err);
						$scope.contentPopupError = "You do not have read permissions for that file on your disk.";
						$scope.showPopupError = 1;
					};
					fileReader.readAsBinaryString (file);
			 	});
			});
		};


		this.renameButton = function()
		{
			if(!_.isEmpty($scope.selectedRight))
			{
				$scope.contentPopupRename=$scope.selectedRight.name;
				$scope.showPopupRename=1;
			}
		};
		this.rename = function(name)
		{
			$wydevice.send ('fe', {a:'ren',b:$scope.cwd,c:$scope.selectedRight.name,d:$scope.contentPopupRename});
			$scope.showPopupRename = 0;
		};


		this.deleteButton = function()
		{
			if(!_.isEmpty($scope.selectedRight))
			{
				$scope.showPopupDelete=1;
			}
		};
		this.delete = function()
		{
			$wydevice.send ('fe', {a:'del',b:$scope.cwd,c:$scope.selectedRight.name});
			$scope.showPopupDelete = 0;
		};


		this.newFolderButton = function()
		{
			$scope.contentPopupNewFolder='New Folder';
			$scope.showPopupNewFolder=1;
		};
		this.newFolder = function()
		{
			$wydevice.send ('fe', {a:'newf',b:$scope.cwd,c:$scope.contentPopupNewFolder});
			$scope.showPopupNewFolder = 0;
		};


		this.exit = function ()
		{
			debug ('Exiting');
			$mdDialog.hide ();
			$wydevice.removeListener ('message', message);
		};
	});
};
