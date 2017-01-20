
"use strict";

var $ = require ('jquery');

window.jQuery = $;

var angular = require ('angular');
var angular_material = require ('angular-material');

var app = angular.module ("wyliodrinAppNotebook", ['ngMaterial'], function ($provide)
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
