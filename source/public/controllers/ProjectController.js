
"use strict";

var angular = require ('angular');
var library = require ('library');

var settings = require ('settings');
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
require('brace/mode/javascript');
require('brace/mode/c_cpp');
require('brace/mode/python');
require('brace/mode/sh');
require('brace/mode/csharp');
require('brace/mode/powershell');
require('brace/theme/chrome');
var lang = ace.acequire("ace/lib/lang");
var languageTools = ace.acequire ('ace/ext/language_tools');
var ace_ui = require ('angular-ui-ace');
var XTerm = require ('xterm.js');

var fs = require ('fs');

var _ = require ('lodash');

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
		$scope.showEditor = false;

		$scope.translatevars={};
		$scope.translatevars.new_folder = $translate.instant('New_folder');
		$scope.translatevars.new_file = $translate.instant('New_file');
		$scope.translatevars.new_firmware = $translate.instant('New_firmware');


		$scope.tree = {};


		$scope.tree.contentPopupNewFolder="";
		$scope.tree.showPopupNewFolder = 0;

		$scope.tree.contentPopupNewFile="";
		$scope.tree.showPopupNewFile = 0;

		$scope.tree.showPopupDelete = 0;

		$scope.tree.contentPopupError="";
		$scope.tree.showPopupError=0;

		$scope.tree.firmwares={};

		$scope.tree.contentPopupNewFirmware={};
		$scope.tree.contentPopupNewFirmware.type="";
		$scope.tree.contentPopupNewFirmware.text="";
		$scope.tree.showPopupNewFirmware=0;


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

		function nodeEqual(n1,n2){
			if (n1.$$hashKey === n2.$$hashKey){
				return true;
			}
			return false;
		}

		function dataToTree(data){
			checkEmptyFolders(data[0]);

			data[0].children.forEach( function (node){
				if (node.issoftware){
					node.children.forEach( function (node2){
						if ((!node2.isdir) && (!node2.isspecial) && node2.name == "main"){
							$scope.tree.selectednode = node2;
							$scope.showEditor = true;
						}
					});
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
			}
			else{
				$scope.showEditor = true;
			}
		};

		function checkEmptyFolders(x){
			if (x.isspecial){
				return;
			}
			if (x.isdir){
				if (x.children.length === 0){
					x.children = [{name:'Empty Folder', isdir:false, isspecial:true}];
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

		this.newFolderButton = function(){
			$scope.tree.contentPopupNewFolder=$scope.translatevars.new_folder;
			$scope.tree.showPopupNewFolder=1;
		};
		this.newFileButton = function(){
			$scope.tree.contentPopupNewFile=$scope.translatevars.new_file;
			$scope.tree.showPopupNewFile=1;
		};
		this.deleteButton = function(){
			$scope.tree.showPopupDelete=1;
		};
		this.newFirmwareButton = function(){
			$scope.tree.firmwares=settings.FIRMWARES[$scope.device.category];

			$scope.tree.contentPopupNewFirmware.type="";
			$scope.tree.contentPopupNewFirmware.text=$scope.translatevars.new_firmware;
			$scope.tree.showPopupNewFirmware=1;
		};

		this.newFolder = function(){
			var obj = {name:$scope.tree.contentPopupNewFolder,isdir:true,children:[]};
			this.newSomething(obj,$scope.tree.selectednode);
		};

		this.newFile = function(){
			var obj = {name:$scope.tree.contentPopupNewFile,isdir:false,content:''};
			this.newSomething(obj,$scope.tree.selectednode);
		};

		this.newFirmware = function(){
			//////////////////////////poate fa-i si un copil
			var obj = {name:$scope.tree.contentPopupNewFirmware.text,isdir:true,isfirmware:true,ftype:$scope.tree.contentPopupNewFirmware.type,fport:"auto",children:[]};
			this.newSomething(obj,$scope.project.tree[0]);
			checkEmptyFolders($scope.project.tree[0]);
			$scope.tree.showPopupNewFirmware = 0;
		};

		this.newSomething = function(obj,parent){
			if (!hasDirectChild(obj.name, parent)){
				parent.children.push(
					obj
				);
				//folder gol
				checkSpecial($scope.project.tree[0]);
				checkEmptyFolders($scope.project.tree[0]);
			}
			else{
				$scope.tree.contentPopupError = $translate.instant('TREEsame_name');
				$scope.tree.showPopupError = 1;
			}
			$scope.tree.showPopupNewFolder = 0;
		};

		this.delete = function(){
			if ($scope.tree.selectednode.isspecial){
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
			else{
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
			$scope.tree.showPopupDelete = 0;
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
				if ((!tree.children[i].isspecial) && name == tree.children[i].name){
					return true;
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
				library.storeVisualProject ($scope.project.id, $scope.project.visualproject);
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
				library.storeMain ($scope.project.id, $scope.project.tree.main, $scope.project.tree);
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
			if (t === 'p')
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
			$wydevice.send ('p', {a:'k', t:key});
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
				program.load (project, $wydevice.device);
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
								var parsedmessage = message.data;
								console.log (parsedmessage);
								console.log ($scope.project.id);
								if (parsedmessage.type === 'flow' && parsedmessage.projectId === $scope.project.id)
								{
									// console.log ('store');
									$scope.project.main = parsedmessage.flow;
									library.storeMain ($scope.project.id,parsedmessage.flow,$scope.project.tree);
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
								// console.log ($scope.project);
								red.contentWindow.postMessage ($scope.project, '*');	
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
			function run (tree, withFirmware)
			{

				if (typeof withFirmware === 'undefined') { withFirmware = false; }

				//fac makefileul
				var makefile = settings.MAKEFILE_STOARGE[$wydevice.device.platform][$scope.project.language];//+(firmwareAvailable?'firmware:\n\t':'');
				
				tree.children[0].m = makefile; //sigur exista software si facem makefile pt el

				//de transmis
				var runmessage = {a:'start', l:$scope.project.language, t:tree};


				mixpanel.track ('Project Run',
				{
					category: $wydevice.device.category,
					language: $scope.project.language,
					flash: withFirmware
				});

				if (withFirmware)
				{
					//makefile part 2
					//makefile = makefile + settings.MAKE_FIRMWARE[$scope.device.category]('app_project', firmware, port);	
					//bagi in runmessage.fm (firmware makefile)
				}
				else
				{
					makefile = makefile+'\n';
				}
				//adaug makefile la mesaj de transmis
				runmessage.m = makefile;
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

				      	this.runAndFlash = function ()
				      	{
				      		run ($scope.tree, true);
				      		$mdDialog.hide ();
				      	};

				      	this.run = function ()
				      	{
				      		run ($scope.tree, false);
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
					run ($scope.tree,false);
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
			$wydevice.send ('p', {a:'stop'});
			mixpanel.track ('Project Stop', {
				category: $wydevice.device.category,
				language: $scope.project.language
			});
		});
	});
};
