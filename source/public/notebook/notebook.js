
"use strict";

var $ = require ('jquery');

window.jQuery = $;

var angular = require ('angular');
var angular_material = require ('angular-material');
var marked = require ('marked');
var brace = require ('brace');
var angularUiAce = require ('angular-ui-ace');
require('brace/mode/python');
require('brace/mode/markdown');
require('brace/theme/chrome');
require('brace/ext/language_tools');
require('brace/ext/searchbox');
require('brace/ext/settings_menu');
require('./../tools/snippets/python.js');
require('./../tools/snippets/markdown.js');

var ITEM_SNIPPETS = {
  'markdown': '## New Item',
  'code':'print \'New Item\''
};


var app = angular.module ("wyliodrinAppNotebook", ['ngMaterial', 'ui.ace'], function ($provide)
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

app.controller ('NotebookController', function ($scope, $mdDialog)
{
  $scope.activeIndex = 0;
  $scope.items = [
  {
    type: 'markdown',
    text: `## Welcome to the Temporary Notebook (tmpnb) service!

        This Notebook Server was **launched just for you**. It's a temporary way for you to try out a recent development version of the IPython/Jupyter notebook.

        <div class="alert alert-warning" role="alert" style="margin: 10px">
        <p>**WARNING**</p>

        <p>Don't rely on this server for anything you want to last - your server will be *deleted after 10 minutes of inactivity*.</p>
        </div>

        Your server is hosted thanks to [Rackspace](http://bit.ly/tmpnbdevrax), on their on-demand bare metal servers, [OnMetal](http://bit.ly/onmetal).`
  },
  {
    type: 'code',
    text: ''
  }];
  $scope.editIndex = -1;
  $scope.aceCodeLoaded = function (_editor)
  {
    _editor.$blockScrolling = Infinity;
    _editor.getSession().setTabSize (2);
    _editor.getSession().setUseSoftTabs (true);
  };
  $scope.aceEditLoaded = function (_editor)
  {
    _editor.$blockScrolling = Infinity;
    _editor.getSession().setTabSize (2);
    _editor.getSession().setUseSoftTabs (true);
  };

  this.activate = function (index)
  {
    if ($scope.activeIndex !== index)
    {
      $scope.activeIndex = index;
      $scope.editIndex = -1;
    }
  };

  this.up = function (index)
  {
    if (index > 0)
    {
      var item = $scope.items[index];
      $scope.items[index] = $scope.items[index-1];
      $scope.items[index-1] = item;
    }
  };

  this.down = function (index)
  {
    if (index < $scope.items.length-1)
    {
      var item = $scope.items[index];
      $scope.items[index] = $scope.items[index+1];
      $scope.items[index+1] = item;
    }
  };

  this.edit = function (index)
  {
    if ($scope.editIndex !== index)
    {
      $scope.editIndex = index;
    }
    else
    {
      $scope.editIndex = -1;
    }
  };

  this.insert = function (index)
  {
    var item = {
      type: $scope.items[index].type,
      text: ITEM_SNIPPETS[$scope.items[index].type]
    };
    $scope.items.splice (index+1, 0, item);
    $scope.activeIndex = index+1;
    $scope.editIndex = index+1;
  };

  this.delete = function (index)
  {
    if ($scope.items.length > 1)
    {
      $mdDialog.hide ();
        var that = this;
        var message = $mdDialog.confirm()
                .title('Erase Item')
                .textContent('Are you sure you want to erase this item?')
                // .ariaLabel('Lucky day')
                // .targetEvent(ev)
                .ok('YES')
                .cancel('NO');
          $mdDialog.show(message).then(function() {
            $scope.items.splice (index, 1);
            $scope.activeIndex = -1;
            $scope.editIndex = -1;
          }, function() {
          });
    }
  };

});

app.filter ('markdown', function ($sce)
{
  marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });

  return function (item)
  {
    return $sce.trustAsHtml(marked (item));
  };
});