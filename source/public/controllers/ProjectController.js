
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
require('brace/mode/javascript');
require('brace/mode/c_cpp');
require('brace/mode/python');
require('brace/mode/sh');
require('brace/mode/csharp');
require('brace/theme/chrome');
var lang = ace.acequire("ace/lib/lang");
var languageTools = ace.acequire ('ace/ext/language_tools');
var ace_ui = require ('angular-ui-ace');
var XTerm = require ('xterm.js');

var fs = require ('fs');

var _ = require ('lodash');

var functionsDoc = require ('./../tools/functions_documentation.js');

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

	app.controller ('ProjectController', function ($scope, $element, $timeout, $mdDialog, $filter, $wyapp, $wydevice)
	{
		debug ('Registering');
		this.scope = {
			running: '='
		};

		$scope.project = 
		{
			id: -1,
			main: ''
		};

		$scope.showXterm = false;

		var shell;

		var cols;
		var rows;

		var softwareEditor;
		var firmwareEditor;

		$scope.showhidecode = false;

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
				library.storeMain ($scope.project.id, $scope.project.main);
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
			program.device ($wydevice.device);
			if (status === 'CONNECTED')
			{
				$timeout (function ()
				{
					setSizes ();
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
			if (project.language === "csharp")
			{
				softwareEditor.getSession().setMode ('ace/mode/csharp');
			}
			$timeout (function ()
			{
				$scope.project = project;
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
			function run (firmware, port)
			{
				var makefile = settings.MAKEFILE_STOARGE[$scope.project.language]+'firmware:\n\t';
				var runmessage = {a:'start', l:$scope.project.language, p:$scope.project.main};
				if (firmware && port)
				{
					runmessage.f = $scope.project.firmware;
					makefile = makefile + settings.MAKE_FIRMWARE[$scope.device.category]('app_project', firmware, port);
					$scope.device.firmware = firmware;
					$scope.device.port = port;
					mixpanel.track ('Project Run',
					{
						category: $wydevice.device.category,
						language: $scope.project.language,
						flash: true
					});
				}
				else
				{
					makefile = makefile+'\n';
					mixpanel.track ('Project Run',
					{
						category: $wydevice.device.category,
						language: $scope.project.language,
						flash: false
					});
				}
				runmessage.m = makefile;
				shell.reset ();
				$wydevice.send ('p', runmessage);
				$timeout (function ()
				{
					$scope.showXterm = true;
					$timeout (function ()
					{
						$(window).trigger ('resize');
					});
				});
			}


			// console.log ($scope.device);

			if (!$scope.device.capabilities || $scope.device.capabilities.l[$scope.project.language])
			{
				if ($scope.project.firmware && removeComments ($scope.project.firmware).trim().length>0)
				{
					var label = $scope.label;
					var device = $scope.device;
					$mdDialog.show({
				      controller: function ($scope)
				      {

				      	$scope.firmwares = settings.FIRMWARES;

						// console.log ($scope.device);

						$scope.label = label;
						$scope.device = device;
						if (!$scope.device.firmware) $scope.firmware = _.keys ($scope.firmwares[$scope.device.category])[0];
						else $scope.firmware = $scope.device.firmware;
						// console.log ($scope.firmware);
						if (!$scope.device.port) $scope.port = 'auto';
						else $scope.port = $scope.device.port;

				      	this.runAndFlash = function ()
				      	{
				      		run ($scope.firmware, $scope.port);
				      		$mdDialog.hide ();
				      	};

				      	this.run = function ()
				      	{
				      		run ();
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
					run ();
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
