
"use strict";

var settings = require ('settings');

// var debug = require ('debug');

require ('debug').enable (settings.debug);

var debug = require ('debug')('wyliodrin:lacy');

var _ = require ('lodash');

var $ = require ('jquery');

// TODO another way to do this (shim?)
window.jQuery = $;

var angular = require ('angular');
require ('angular-sanitize');
require ('angular-translate');
require ('angular-translate-loader-static-files');
require ('angular-tree-control');
var angular_material = require ('angular-material');

// console.log (makefile);

/* escape key */
window.onkeydown = window.onkeyup = function(e) { if (e.keyCode == 27 /* ESC */) { e.preventDefault(); } };

var app = angular.module ("wyliodrinApp", ['ui.ace', 'ngSanitize', 'highcharts-ng', 'ngMaterial', 'pascalprecht.translate','treeControl'], function ($provide)
{
	$provide.decorator('$window', function($delegate) 
	{
      try
      {
        $delegate.history = null;
      }
      catch (e)
      {
        
      }
      return $delegate;
    });
});

app.config([
  '$compileProvider',
  function ($compileProvider) {
      $compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/);
  }
]);


app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('red');
});

//require ('./translate.js')();

function startup ()
{
  require ('./controllers/TranslateController.js')();

  require ('./controllers/AppController.js')();
  require ('./controllers/DashboardController.js')();
  require ('./controllers/LibraryController.js')();
  require ('./controllers/PackageManagerController.js')();
  require ('./controllers/ProjectController.js')();
  require ('./controllers/TaskManagerController.js')();
  require ('./controllers/SchematicsController.js')();
  require ('./controllers/UpdateController.js')();
  require ('./controllers/BoardController.js')();
  require ('./controllers/FirmwareExampleController.js')();
  require ('./controllers/SerialPortController.js')();
  require ('./controllers/NotebookController.js')();
  require ('./controllers/ResistorColorCodeController.js')();
  require ('./controllers/InstallController.js')();
  require ('./controllers/SoftwareExampleController.js')();
  require ('./controllers/GitHubExampleController.js')();
  require ('./controllers/NetworkController.js')();
  require ('./controllers/ToolbarController.js')();
  require ('./controllers/XTermController.js')();
  require ('./controllers/FileExplorerController.js')();
  require ('./services/wyapp.js');
  require ('./services/wydevice.js');
  require ('./services/wydevices.js');
  require ('./services/wysignalproperties.js');

  require ('./dashboardtags/line.js')();
  require ('./dashboardtags/thermometer.js')();
  require ('./dashboardtags/speedometer.js')();
  require ('./dashboardtags/vumeter.js')();
  require ('./dashboardtags/slider.js')();
  require ('./dashboardtags/switch.js')();
  require ('./dashboardtags/gauge.js')();
  require ('./dashboardtags/extra.js')();

}

console.log (settings);

if (settings.platform.CHROME)
{
  chrome.runtime.getPlatformInfo(function (system)
  {
    settings.system = system;
    startup ();
  });
}
else
{
  startup ();
}

if (nodeRequire)
{
  $(document).click (function (event)
  {
    if ($(event.target).is ('a'))
    {
      console.log (event.target);
      var ui = nodeRequire ('nw.gui');
      ui.Shell.openExternal ($(event.target).attr ('href'));
      event.stopPropagation ();
      event.preventDefault ();
    }
  });
}

