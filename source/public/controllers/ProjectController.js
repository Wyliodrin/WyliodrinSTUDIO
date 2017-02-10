
"use strict";

var angular = require ('angular');
var library = require ('library');

var settings = require ('settings');
var MAKEFILES_V2 = settings.MAKEFILE_V2;
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:ProjectController');

var mixpanel = require ('mixpanel');

var ace = require ('brace');
require('brace/ext/language_tools');
require('brace/ext/searchbox');
require('brace/ext/settings_menu');
require('./../tools/snippets/python.js');
require('./../tools/snippets/c_cpp.js');
require('./../tools/snippets/javascript.js');
require('./../tools/snippets/sh.js');
require('./../tools/snippets/csharp.js');
require('./../tools/snippets/powershell.js');
require('./../tools/snippets/markdown.js');
require('brace/mode/javascript');
require('brace/mode/c_cpp');
require('brace/mode/python');
require('brace/mode/sh');
require('brace/mode/csharp');
require('brace/mode/powershell');
require('brace/mode/markdown');
require('brace/theme/chrome');
var lang = ace.acequire("ace/lib/lang");
var languageTools = ace.acequire ('ace/ext/language_tools');
var ace_ui = require ('angular-ui-ace');
var XTerm = require ('xterm');

var usb_mapping = require('usb_mapping');
var firmware_mapping = require('firmware');

var fs = require ('fs');
var path = require ('path');

var _ = require ('lodash');

var $ = require ('jquery');

var functionsDoc = require ('./../tools/functions_documentation.js');

var red = null;

debug ('Loading');

function removeComments(str) {
    str = ('__' + str + '__').split('');
    var mode = {
        singleQuote: false,
        doubleQuote: false,
        regex: false,
        blockComment: false,
        lineComment: false,
        condComp: false 
    };
    for (var i = 0, l = str.length; i < l; i++) {
 
        if (mode.regex) {
            if (str[i] === '/' && str[i-1] !== '\'') {
                mode.regex = false;
            }
            continue;
        }
 
        if (mode.singleQuote) {
            if (str[i] === "'" && str[i-1] !== '\'') {
                mode.singleQuote = false;
            }
            continue;
        }
 
        if (mode.doubleQuote) {
            if (str[i] === '"' && str[i-1] !== '\'') {
                mode.doubleQuote = false;
            }
            continue;
        }
 
        if (mode.blockComment) {
            if (str[i] === '*' && str[i+1] === '/') {
                str[i+1] = '';
                mode.blockComment = false;
            }
            str[i] = '';
            continue;
        }
 
        if (mode.lineComment) {
            if (str[i+1] === 'n' || str[i+1] === 'r') {
                mode.lineComment = false;
            }
            str[i] = '';
            continue;
        }
 
        if (mode.condComp) {
            if (str[i-2] === '@' && str[i-1] === '*' && str[i] === '/') {
                mode.condComp = false;
            }
            continue;
        }
 
        mode.doubleQuote = str[i] === '"';
        mode.singleQuote = str[i] === "'";
 
        if (str[i] === '/') {
 
            if (str[i+1] === '*' && str[i+2] === '@') {
                mode.condComp = true;
                continue;
            }
            if (str[i+1] === '*') {
                str[i] = '';
                mode.blockComment = true;
                continue;
            }
            if (str[i+1] === '/') {
                str[i] = '';
                mode.lineComment = true;
                continue;
            }
            mode.regex = true;
 
        }
 
    }
    return str.join('').slice(2, -2);
}

module.exports = function ()
{

var app = angular.module ('wyliodrinApp');

	app.controller ('ProjectController', function ($scope, $element, $timeout, $mdDialog, $filter, $wyapp, $wydevice, $translate)
	{
		debug ('Registering');
		this.scope = {
			running: '='
		};

		$scope.project = 
		{
			id: -1,
			tree:[]
		};

		$scope.showXterm = false;

		var shell;

		var cols;
		var rows;

		var softwareEditor;
		var firmwareEditor;

		$scope.showhidecode = false;

		//tree part
		$scope.showTree = true;

		$scope.showEditor = false;
		$scope.showVisual = false;
		$scope.showStreams = false;

		$scope.tree = {};


		//$scope.tree.data=[]; used before now $scope.project.tree
		$scope.tree.selectednode={};
		$scope.tree.options={
		    nodeChildren: "children",
		    dirSelectable: true,
		    multiSelection: false,
		    allowDeselect: false,
		    equality: nodeEqual,
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
		$scope.tree.expanded = [];
		$scope.tree.firmware_mapping = firmware_mapping; //openmote -> Open Mote

		function nodeEqual(n1,n2){
			if (angular.equals(n1,n2))
			{
				return true;
			}
			return false;
		}

		function rand(min, max) {
			return Math.random() * (max - min) + min;
		}

		function makeID(tree){
			var a = rand(10,10000);
			while (checkID(tree,a)){
				a = rand(10,10000);
			}
			return a;
		}

		function checkID(tree, a){

			for (var i=0; i<tree.children.length;i++){
				var x = tree.children[i];
				if (x.id === a){
					return true;
				}
				if (x.isdir){
					var ret = checkID(x, a);
					if (ret === true){
						return ret;
					}
				}
			}
			return false;
		}

		this.showTreeButton = function(){
			$scope.showTree = true;
		};

		this.hideTreeButton = function(){
			$scope.showTree = false;
		};

		function dataToTree(data){
			$scope.tree.expanded = [];
			checkEmptyFolders(data[0]);
			data[0].children.forEach( function (node){
				if (node.issoftware){
					node.children.forEach( function (node2){
						if ((!node2.isdir) && (!node2.isspecial) && (node2.ismain)){
							$scope.tree.selectednode = node2;
							$scope.showEditor = true;
							if ($scope.project.language == "visual"){
								program.load ($scope.project, node2, $wydevice.device);
								$scope.showVisual = true;
							}
							else{
								$scope.showVisual = false;
							}
							if ($scope.project.language == "streams"){
								//chestii de streams de load
								$scope.showStreams = true;
							}
							else{
								$scope.showStreams = false;
							}
						}
					});
					$scope.tree.expanded.push(node);
				}
			});
		}


		function checkSpecial(x){
			if (x.isdir){
				for (var i = 0; i<x.children.length;i++){
					if (x.children[i].isspecial){
						x.children.splice(i,1);
						i--;
					}
				}
				
				x.children.forEach( function (y){
					checkSpecial(y);
				});
			}
		}

		this.treeSelect = function(node){
			if (node.isspecial || node.isdir){
				$scope.showEditor = false;
				$scope.showVisual = false;
				$scope.showStreams = false;
			}
			else{
				$scope.showEditor = true;

				if (hasDeepChild(node,$scope.project.tree[0].children[0])){
					if ($scope.project.language == "visual"){
						$scope.showVisual = true;
					}
					else{
						$scope.showVisual = false;
					}
					if ($scope.project.language == "streams"){
						$scope.showStreams = true;
						red.contentWindow.postMessage ({projectid:$scope.project.id,content:$scope.tree.selectednode.content}, '*');
						red.reload();
					}
					else{
						$scope.showStreams = false;
					}

					softwareEditor.language = $scope.project.language;
					if ($scope.project.language === "nodejs")
					{
						softwareEditor.getSession().setMode ('ace/mode/javascript');
					}
					else
					if ($scope.project.language === "python")
					{
						softwareEditor.getSession().setMode ('ace/mode/python');
					}
					else
					if ($scope.project.language === "shell")
					{
						softwareEditor.getSession().setMode ('ace/mode/sh');
					}
					else
					if ($scope.project.language === "visual")
					{
						program.load ($scope.project, node, $wydevice.device);
					}
					else
					if ($scope.project.language === "csharp")
					{
						softwareEditor.getSession().setMode ('ace/mode/csharp');
					}
					else
					if ($scope.project.language === "powershell")
					{
						softwareEditor.getSession().setMode ('ace/mode/powershell');
					}
					softwareEditor.getSession().setTabSize (2);
					softwareEditor.getSession().setUseSoftTabs (true);
					//if it's software type file
				}
				else{
					//if it's firmware type file
					$scope.showVisual = false;
					$scope.showStreams = false;
					if (node.name.toLowerCase() == "makefile"){
						//makefile
						console.log("e makefile");
						softwareEditor.getSession().setTabSize (4);
						softwareEditor.getSession().setUseSoftTabs (false);
					}
					else{
						//simple files
						softwareEditor.getSession().setMode ('ace/mode/c_cpp');
						softwareEditor.language = "c_cpp";
						softwareEditor.getSession().setTabSize (2);
						softwareEditor.getSession().setUseSoftTabs (true);
					}
				}
			}
		};

		function checkEmptyFolders(x){
			if (x.isspecial){
				return;
			}
			if (x.isdir){
				if (x.children.length === 0){
					x.children = [{name:'Empty Folder', id:makeID($scope.project.tree[0]) ,isdir:false, isspecial:true}];
				}
				else{
					x.children.forEach( function (y){
						checkEmptyFolders(y);
					});
				}
			}
		}

		var that = this;

		this.getTree = function(){
			return $scope.project.tree[0];
		};
		this.getTranslateVars = function(){
			return $scope.translatevars;
		};
		this.getSelected = function(){
			return $scope.tree.selectednode;
		};

		this.newFolderButton = function(){

			$mdDialog.show({
				controller: function ($scope)
				{
					$scope.contentPopupNewFolder = "";

					this.ok = function (keyEvent)
					{
						if ($scope.contentPopupNewFolder.length !== 0)
						{	
							$mdDialog.hide ();
							that.newFolder($scope.contentPopupNewFolder);
						}
					};

					this.cancel = function ()
					{
						$mdDialog.hide ();
					};
				},
				controllerAs: 'dialogFolder',
				templateUrl: '/public/views/dialogs/new-folder.html',
				      // parent: $element,
				      // targetEvent: ev,
				      clickOutsideToClose:false,
				      fullscreen: false
			});
		};
		this.newFileButton = function(){

			$mdDialog.show({
				controller: function ($scope)
				{
					$scope.contentPopupNewFile = "";

					this.ok = function (keyEvent)
					{
						if ($scope.contentPopupNewFile.length !== 0)
						{	
							$mdDialog.hide ();
							that.newFile($scope.contentPopupNewFile);
						}
					};

					this.cancel = function ()
					{
						$mdDialog.hide ();
					};
				},
				controllerAs: 'dialogFile',
				templateUrl: '/public/views/dialogs/new-file.html',
				      // parent: $element,
				      // targetEvent: ev,
				      clickOutsideToClose:false,
				      fullscreen: false
			});
		};
		this.deleteButton = function(){
			$mdDialog.show({
				controller: function ($scope)
				{
					$scope.selected = that.getSelected();
					this.ok = function ()
					{
						$mdDialog.hide ();
						that.delete();
					};

					this.cancel = function ()
					{
						$mdDialog.hide ();
					};
				},
				controllerAs: 'dialogDelete',
				templateUrl: '/public/views/dialogs/delete.html',
				      // parent: $element,
				      // targetEvent: ev,
				      clickOutsideToClose:false,
				      fullscreen: false
			});
		};
		this.renameButton = function(){

			$mdDialog.show({
				controller: function ($scope)
				{
					$scope.selected = _.cloneDeep(that.getSelected().name);
					$scope.contentPopupRename = $scope.selected;

					this.ok = function (keyEvent)
					{
						if ($scope.contentPopupRename.length !== 0)
						{	
							$mdDialog.hide ();
							that.rename($scope.contentPopupRename);
						}
					};

					this.cancel = function ()
					{
						$mdDialog.hide ();
					};
				},
				controllerAs: 'dialogRename',
				templateUrl: '/public/views/dialogs/rename.html',
				      // parent: $element,
				      // targetEvent: ev,
				      clickOutsideToClose:false,
				      fullscreen: false
			});
		};
		this.rename = function(arg){
			var parent = findParent($scope.tree.selectednode, $scope.project.tree[0]);

			var ok = true;

			_.each(parent.children, function(child){
				if (child.id != $scope.tree.selectednode.id){
					if (child.name == arg){
						ok = false;
					}
				}
			});

			if (ok){
				$scope.tree.selectednode.name = arg;
				$scope.aceSoftwareChanged();
			}
			else{
				this.errorDialog($translate.instant('TREEsame_name'));
			}
		};
		this.newFirmwareButton = function(){

			$mdDialog.show({
				controller: function ($scope)
				{
					$scope.firmwares=firmware_mapping;

					$scope.contentPopupNewFirmware={};
					$scope.contentPopupNewFirmware.text="";
					$scope.contentPopupNewFirmware.type="";

					this.ok = function (keyEvent)
					{
						if ($scope.contentPopupNewFirmware.text && $scope.contentPopupNewFirmware.type)
						{	
							$mdDialog.hide ();
							that.newFirmware($scope.contentPopupNewFirmware);
						}
					};

					this.cancel = function ()
					{
						$mdDialog.hide ();
					};
				},
				controllerAs: 'dialogFirmware',
				templateUrl: '/public/views/dialogs/new-firmware.html',
				      // parent: $element,
				      // targetEvent: ev,
				      clickOutsideToClose:false,
				      fullscreen: false
			});

		};

		this.errorDialog = function(arg){
			$mdDialog.show({
				controller: function ($scope)
				{
					$scope.contentPopupError = arg;

					this.ok = function ()
					{
						$mdDialog.hide ();
					};
				},
				controllerAs: 'dialogError',
				templateUrl: '/public/views/dialogs/error.html',
				      // parent: $element,
				      // targetEvent: ev,
				      clickOutsideToClose:false,
				      fullscreen: false
			});
		};

		this.newFolder = function(arg){
			var obj = {name:arg,id:makeID($scope.project.tree[0]),isdir:true,children:[]};
			this.newSomething(obj,$scope.tree.selectednode);
		};

		this.newFile = function(arg){
			var obj = {name:arg,id:makeID($scope.project.tree[0]),isdir:false,content:''};
			this.newSomething(obj,$scope.tree.selectednode);
		};

		this.newFirmware = function(arg){
			var obj = {name:arg.text,id:makeID($scope.project.tree[0]),isdir:true,isfirmware:true,ftype:arg.type,fport:"auto",children:[]};
			this.newSomething(obj,$scope.project.tree[0]);
			checkEmptyFolders($scope.project.tree[0]);
		};

		this.newSomething = function(obj,parent){
			if (parent.isdir){
				if (!hasDirectChild(obj.name, parent)){
					parent.children.push(
						obj
					);
					//folder gol
					checkSpecial($scope.project.tree[0]);
					checkEmptyFolders($scope.project.tree[0]);
				}
				else{
					this.errorDialog($translate.instant('TREEsame_name'));
				}
			}
			else{
				var upper_parent = findParent(parent, $scope.project.tree[0]);
				if (!hasDirectChild(obj.name, upper_parent)){
					upper_parent.children.push(
						obj
					);
					//folder gol
					checkSpecial($scope.project.tree[0]);
					checkEmptyFolders($scope.project.tree[0]);
				}
				else{
					this.errorDialog($translate.instant('TREEsame_name'));
				}
			}
			$scope.aceSoftwareChanged();
		};

		this.delete = function(){
			/*if ($scope.tree.selectednode.isspecial){
				$scope.tree.contentPopupError = $translate.instant('TREEdelete_special');
				$scope.tree.showPopupError = 1;
			}
			else if($scope.tree.selectednode.isroot){
				$scope.tree.contentPopupError = $translate.instant('TREEdelete_root');
				$scope.tree.showPopupError = 1;
			}
			else if($scope.tree.selectednode.issoftware){
				$scope.tree.contentPopupError = $translate.instant('TREEdelete_software');
				$scope.tree.showPopupError = 1;
			}
			else{*/
			if (true){
				var parent = findParent($scope.tree.selectednode, $scope.project.tree[0]);
				for (var i = 0; i<parent.children.length;i++){
					if (angular.equals(parent.children[i],$scope.tree.selectednode)){
						parent.children.splice(i,1);
						break;
					}
				}
				checkEmptyFolders($scope.project.tree[0]);
				$scope.tree.selectednode = parent;
			}
			$scope.aceSoftwareChanged();
		};

		

		function findParent(node, tree){

			for (var i=0; i<tree.children.length;i++){
				var x = tree.children[i];
				if (angular.equals(node,x)){
					return tree;
				}
				if (x.isdir){
					var ret = findParent(node, x);
					if (ret !== null){
						return ret;
					}
				}
			}
			return null;
		}

		function hasDirectChild(name, tree){
			for (var i=0; i<tree.children.length;i++){
				//checks for name only, do not change
				if ((!tree.children[i].isspecial) && name == tree.children[i].name){
					return true;
				}
			}
			return false;
		}

		function hasDeepChild(node, tree){
			for (var i=0; i<tree.children.length;i++){
				if (node.id == tree.children[i].id){
					return true;
				}
				if (tree.children[i].isdir){
					if (hasDeepChild(node,tree.children[i])){
						return true;
					}
				}
			}
			return false;
		}

		var program = {
			device: function (device)
			{

			},

			load: function (project)
			{

			},

			storeProject: function ()
			{
				//library.storeVisualProject ($scope.project.id, $scope.project.tree);
				library.storeTree ($scope.project.id, $scope.project.tree);
				$timeout (function ()
				{

				});
			},

			showHideCode: function ()
			{
				$scope.showhidecode = !$scope.showhidecode;
				$timeout (function ()
				{
				});
				if ($scope.showhidecode === false) return 'show';
				else return 'hide';
			},
		};

		// window.getProject = function ()
		// {
		// 	return $scope.project;
		// };

		// window.storeProject = function (data)
		// {
		// 	$scope.project.main = data;
		// 	library.storeMain ($scope.project.id, $scope.project.main);
		// };

		window.getProgram = function ()
		{
			debug ('Loading working project');
			library.retrieveWorkingProject (function (projectid)
			{
				if (!projectid)
				{
					debug ('Working project is missing');
					$wyapp.emit ('welcome');
				}
				else library.retrieveProject (projectid, function (project)
				{
					if (project) $wyapp.emit ('load', project);
					else
					{
						debug ('Working project '+projectid+' is missing');
						$wyapp.emit ('library');
					}
				});
			});
			return program;
		};

		this.showHideXterm = function ()
		{
			if ($scope.showXterm === false) $scope.showXterm = true;
			else $scope.showXterm = false;
			$timeout (function ()
			{
				$(window).trigger ('resize');
			});
		};

		this.firmwareexample = function ()
		{
			$mdDialog.show({
		      controller: 'FirmwareExampleController',
		      controllerAs: 'f',
		      templateUrl: '/public/views/firmware-example.html',
		      // parent: $element,
		      // targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: false
		    });
		};

		function setSizes ()
		{
			var $xterm = $element.find('#xterm');
			cols = Math.floor(($xterm.width ())/9);
	  		rows = Math.floor(($xterm.height()-12)/15);

	  		// console.log ('cols '+cols+' rows '+rows);

			shell.resize (cols, rows);
			$wydevice.send ('r', {a:'r', c:cols, r: rows});

			var $divred = $element.find('#divred');
			var $red = $element.find ('#red');
			$red.width ($divred.width());
			$red.height ($divred.height());
		}

		$scope.aceSoftwareLoaded = function (_editor)
		{
			softwareEditor = _editor;
			softwareEditor.$blockScrolling = Infinity;

			softwareEditor.getSession().setTabSize (2);
			softwareEditor.getSession().setUseSoftTabs (true);

			debug ('Loading languages');

			  var wyliodrinFunctions = {};
			  _.each (settings.LANGUAGES, function (language)
			  {
			  	debug ('Loading '+language.title);
			  	  wyliodrinFunctions[language.title] = [];
			  	  for (var i = 0; i < functionsDoc[language.title].length; i ++)
		          {
		            var wyliodrinFunction = functionsDoc[language.title][i];
	        		wyliodrinFunction.snippet = wyliodrinFunction.name+' (';
	        		for (var p=0; p<wyliodrinFunction.params.length; p++)
	        		{
	        			wyliodrinFunction.snippet = wyliodrinFunction.snippet+'${'+(p+1)+':'+wyliodrinFunction.params[p].name+'}'+(p === wyliodrinFunction.params.length-1?'':', ');
	        		}
	        		wyliodrinFunction.snippet = wyliodrinFunction.snippet+')';
		        	// wyliodrinFunction.score = -45;
		        	// console.log (wyliodrinFunction);
		            wyliodrinFunctions[language.title].push ({snippet:wyliodrinFunction.snippet, caption:wyliodrinFunction.name, type:"libwyliodrin", description:wyliodrinFunction});

		          }
			  });

			  // TODO make it for all firmwares available
			  debug ('Loading arduino');
			  	  wyliodrinFunctions.c_cpp = [];
			  	  for (var i = 0; i < functionsDoc.arduino.length; i ++)
		          {
		            var wyliodrinFunction = functionsDoc.arduino[i];
		            wyliodrinFunction.snippet = wyliodrinFunction.name+' (';
	        		for (var p=0; p<wyliodrinFunction.params.length; p++)
	        		{
	        			wyliodrinFunction.snippet = wyliodrinFunction.snippet+'${'+(p+1)+':'+wyliodrinFunction.params[p].name+'}'+(p === wyliodrinFunction.params.length-1?'':', ');
	        		}
	        		wyliodrinFunction.snippet = wyliodrinFunction.snippet+')';
		        	// wyliodrinFunction.score = -45;
		            wyliodrinFunctions.c_cpp.push ({snippet:wyliodrinFunction.snippet, caption:wyliodrinFunction.name, type:"libwyliodrin", description:wyliodrinFunction});

		          }

			var snippetCompleter = {
		        getCompletions: function (editor, session, pos, prefix, callback) 
		        {
		          callback (null, wyliodrinFunctions[editor.language]);
		        },
		        getDocTooltip: function (item) 
		        {
		          if (item.type === 'libwyliodrin')
		          {
		            var f = item.description;
		            var params = f.params;
		            var title = f.name + " (";
		            var argsDescription = "";
		            for (var i = 0; i < params.length; i ++)
		            {
		              var param = params[i];
		              if (param.optional)
		              {
		                title = title + "[";
		                title = title + param.name + "=" + param.defaultValue + "], ";
		              }
		              else
		              {
		                title = title + param.name + ", ";
		              }
		              argsDescription = argsDescription + "<li><b>" + lang.escapeHTML (param.name) + "</b>" + lang.escapeHTML(" : " +param.description) + "</li>";
		            }

		            if (params.length > 0)
		              title = title.substring (0, title.length-2) + ")";
		            else
		              title = title + ")";

		            item.docHTML = "<b>" + lang.escapeHTML (title) + "</b><br>" + lang.escapeHTML (f.description) + 
		                                "<br>" + argsDescription;
		          }
		       },
		       updateArgsHints: function (item)
		       {
		       	
		       }
		    };

		    languageTools.addCompleter (snippetCompleter);
		};

		$scope.aceSoftwareChanged = function ()
		{
			// console.log ($scope.project);
			// console.log (softwareEditor.$blockScrolling);
			if ($scope.project.id > 0)
			{
				library.storeTree ($scope.project.id, $scope.project.tree);
			}
		};

		$scope.aceShowLoaded = function (_editor)
		{
			_editor.setReadOnly (true);
			_editor.$blockScrolling = Infinity;
		};

		$scope.aceFirmwareLoaded = function (_editor)
		{
			firmwareEditor = _editor;
			firmwareEditor.getSession().setMode ('ace/mode/c_cpp');
			firmwareEditor.getSession().setTabSize (2);
			firmwareEditor.getSession().setUseSoftTabs (true);
			firmwareEditor.$blockScrolling = Infinity;
			firmwareEditor.language = "c_cpp";
		};

		//i think not needed anymore
		$scope.aceFirmwareChanged = function ()
		{
			// console.log ($scope.project);
			if ($scope.project.id > 0)
			{
				library.storeFirmware ($scope.project.id, $scope.project.firmware);
			}
		};

		$(window).resize (function ()
		{
			setSizes ();
		});

		$wydevice.on ('status', function (status)
		{
			if (status === 'CONNECTED')
			{
				$timeout (function ()
				{
					setSizes ();
				});
			}
			if ($scope.project.language === 'visual')
			{
				process.nextTick (function ()
				{
					program.device ($wydevice.device);
				});
			}
		});

		$wydevice.on ('message', function (t, p)
		{
			if (t === 'tp')
			{
				if (p.a === 'k') shell.write (p.t);
			}
			else
			if (t === 'v')
			{
				// console.log (p);
			}
			else
			if (t === 'i')
			{
				if ($scope.project.language === 'visual')
				{
					process.nextTick (function ()
					{
						program.device ($wydevice.device);
					});
				}
			}
		});

		shell = new XTerm ();
		shell.open ($element.find ('#xterm')[0]);
		$timeout (function ()
		{
			setSizes (); 
		});

		shell.on ('key', function (key)
		{
			// xterm.write (key);
			$wydevice.send ('tp', {a:'k', t:key});
		});

		$wyapp.on ('load', function (project)
		{
			debug ('Load');
			mixpanel.track ('Project Load', {
				language:project.language
			});
			library.storeWorkingProject (project.id);
			softwareEditor.language = project.language;
			setSizes ();
			if (project.language === "nodejs")
			{
				softwareEditor.getSession().setMode ('ace/mode/javascript');
			}
			else
			if (project.language === "python")
			{
				softwareEditor.getSession().setMode ('ace/mode/python');
			}
			else
			if (project.language === "shell")
			{
				softwareEditor.getSession().setMode ('ace/mode/sh');
			}
			else
			if (project.language === "visual")
			{
				//program.load (project, $wydevice.device);
			}
			else
			if (project.language === "csharp")
			{
				softwareEditor.getSession().setMode ('ace/mode/csharp');
			}
			else
			if (project.language === "powershell")
			{
				softwareEditor.getSession().setMode ('ace/mode/powershell');
			}
			$timeout (function ()
			{
				$scope.project = project;
				dataToTree($scope.project.tree);

				if (red === null)
				{
					red = $element.find ('#red')[0];
					// console.log (red);
					if (red)
					{
						window.addEventListener ('message', function (message)
						{
							// console.log (message);
							try
							{
								// console.log(message);
								var parsedmessage = message.data;
								// console.log (parsedmessage);
								// console.log ($scope.project.id);
								if (parsedmessage.type === 'flow')// && parsedmessage.projectId === $scope.project.id)
								{
									// console.log ('store');
								// here put the new stream nodes \|/
									$scope.tree.selectednode.content = parsedmessage.flow;
									library.storeTree ($scope.project.id, $scope.project.tree);
								}
							}
							catch (e)
							{

							}
						});
						// red.addEventListener ('consolemessage', function (message)
						// {
						// 	console.log (message);
						// 	try
						// 	{
						// 		var parsedmessage = JSON.parse (message.message);
						// 		console.log (parsedmessage);
						// 		console.log (project.id);
						// 		if (parsedmessage.type === 'flow' && parsedmessage.projectId === project.id)
						// 		{
						// 			console.log ('store');
						// 			library.storeMain (project.id,parsedmessage.flow);
						// 		}
						// 	}
						// 	catch (e)
						// 	{

						// 	}
						// });
						red.addEventListener ('contentload', function ()
						{
							console.log ('contentload');
							if ($scope.project.language === 'streams')
							{
								// here put when streams load \|/
								console.log($scope.tree.selectednode.content);
								red.contentWindow.postMessage ({projectid:project.id,content:$scope.tree.selectednode.content}, '*');
							}
						});
					}
				}
				// console.log ($scope.project.language);
				if (red && $scope.project.language === 'streams')
				{
					red.reload ();
				}
			});
		});

		$wyapp.on ('firmware', function (firmware)
		{
			debug ('Firmware');
			$timeout (function ()
			{
				$scope.project.firmware = firmware;
			});
			mixpanel.track ('Project Load Firmware',
			{
				langauge: $scope.project.language,
			});
		});

		$wyapp.on ('library_setup', function ()
		{
			debug ('Library Setup');
			if ($scope.project.id === -1) $wyapp.emit ('library');
		});

		$wyapp.on ('send', function ()
		{
			debug ('Run');
			function run (tree, ports, withFirmware)
			{

				if (typeof withFirmware === 'undefined') { withFirmware = false; }

				//do the software makefile
				//example for [linux][python]
				var makefileSoft = settings.MAKEFILE_STOARGE[$wydevice.device.platform][$scope.project.language];

				//100% there exists a software folder
				tree.children[0].m = makefileSoft;

				console.log(ports);

				var runmessage = {a:'start', l:$scope.project.language, t:tree, onlysoft:(!withFirmware)};

				//add wyliodrin firmware makefile
				if (withFirmware)
				{
					_.each (tree.children, function (child)
					{
						if (child.isfirmware)
						{
							child.fport = [];
							if ( _.filter(ports, { 'pick' : child.name } ).length === 0){
								child.enable = false;
								return;
								//no more code
							}
							else{
								child.enable = true;
								//code runs below
							}

							var found = _.filter(ports, { 'pick' : child.name } );

							_.each (found, function (port)
							  {
							  	child.fport.push(port.p);
							  	child.fakesubtype = port.pid;
							  	child.faketype = port.vid;
							  });

							var m = {};
							var make_os = MAKEFILES_V2[$wydevice.device.platform];

							if (make_os.compileHere && make_os.compileHere[$wydevice.device.category] && make_os.compileHere[$wydevice.device.category][child.ftype])
							{
								//if make compile here exists
								m.ch = make_os.compileHere[$wydevice.device.category][child.ftype];
								m.ca = make_os.compileAway[child.ftype];
								m.s = null;
							}
							else
							{
								m.ch = null;
								m.ca = make_os.compileAway[child.ftype];
								m.s = make_os.send[child.ftype];
							}
							m.f = make_os.flash[$wydevice.device.category][child.ftype];

							child.m = m;
								/*settings.MAKE_FIRMWARE[$wydevice.device.category][tree.children[i].ftype](
									'app_project',
									null,
									tree.children[i].fport
								);*/
						}
					});
				}


				mixpanel.track ('Project Run',
				{
					category: $wydevice.device.category,
					language: $scope.project.language,
					flash: withFirmware
				});

				shell.reset ();
				$wydevice.send ('tp', runmessage);
				$timeout (function ()
				{
					$scope.showXterm = true;
					$timeout (function ()
					{
						$(window).trigger ('resize');
					});
				});
			}


			var firmwareAvailable = [];
			for (var i=0; i<$scope.project.tree[0].children.length;i++){
				if ($scope.project.tree[0].children[i].isfirmware){
					firmwareAvailable.push(i);
				}
			}


			//var firmwareAvailable = $scope.project.firmware && removeComments ($scope.project.firmware).trim().length>0;
			if (!$scope.device.capabilities || $scope.device.capabilities.l[$scope.project.language])
			{
				if (firmwareAvailable.length !== 0)
				{
					var label = $scope.label;
					var device = $scope.device;
					$mdDialog.show({
				      controller: function ($scope)
				      {

				      	$scope.tree = that.getTree();
				      	$scope.map = usb_mapping; //code to Board Name

				      	$scope.ports = _.cloneDeep($wydevice.device.peripherals);
				      	//$scope.ports=[{"vid":"0x10c4","pid":"0xea60","p":"/dev/ttyUSB0"}];
				      	for (var i =0;i<$scope.ports.length;i++){
				      		var pid = parseInt($scope.ports[i].pid);
				      		var vid = parseInt($scope.ports[i].vid);

				      		if (!$scope.map[vid]){
				      			$scope.ports[i].vid = $scope.map[0x0000];
				      			$scope.ports[i].pid = $scope.map[0x0000][0x0000];
				      		}
				      		else{
				      			$scope.ports[i].vid = $scope.map[vid];
				      			if (!$scope.map[vid][pid]){
				      				$scope.ports[i].pid = $scope.map[0x0000][0x0000];
				      			}
				      			else{
				      				$scope.ports[i].pid = $scope.map[vid][pid];
				      			}
				      		}

				      	}

				      	//workaround for NO FIRMWARE default
				      	$scope.EMPTY = make_empty($scope.tree);

				      	function rand(min, max) {
							return Math.random() * (max - min) + min;
						}
						function make_empty(tree){
							var a = rand(10,10000).toString();
							while (checkID(tree,a)){
								a = rand(10,10000).toString();
							}
							return a;
						}
						function check_empty(tree, a){

							for (var i=0; i<tree.children.length;i++){
								var x = tree.children[i];
								if (x.name === a){
									return true;
								}
							}
							return false;
						}

				      	$scope.check = function( criteria ) {
						  return function( item ) {
						  	if (item.isfirmware){
						  		if (criteria == "unknown"){
						  			return true;
						  		}
						  		if (item.ftype == criteria){
						  			return true;
						  		}
						  	}
						  	return false;
						  };
						};
				      	
				      	$scope.path = path;

				      	/*this.runAndFlash = function ()
				      	{
				      		run ($scope.tree, $scope.ports, true);
				      		$mdDialog.hide ();
				      	};*/

				      	this.run = function ()
				      	{
				      		run ($scope.tree, $scope.ports, true);
				      		$mdDialog.hide ();
				      	};
				      },
				      controllerAs: 'f',
				      templateUrl: '/public/views/flash-firmware.html',
				      // parent: $element,
				      // targetEvent: ev,
				      clickOutsideToClose:true,
				      fullscreen: false
				    });
				}
				else
				{
					run (that.getTree(),false);
				}
			}
			else
			{
				var message = $mdDialog.confirm()
			          .title($filter('translate')('PROJECT_no_language_capability'))
			          // .textContent('All of the banks have agreed to forgive you your debts.')
			          // .ariaLabel('Lucky day')
			          // .targetEvent(ev)
			          .ok($filter('translate')('PROJECT_library'))
			          .cancel($filter('translate')('OK'));
			    $mdDialog.show(message).then(function() {
			    	$mdDialog.hide ();
			    	$wyapp.emit ('library');
			    }, function() {
			     	$mdDialog.hide ();
			    });
			}
		});

		$wyapp.on ('stop', function ()
		{
			debug ('Stop');
			$wydevice.send ('tp', {a:'stop'});
			mixpanel.track ('Project Stop', {
				category: $wydevice.device.category,
				language: $scope.project.language
			});
		});
	});
};
