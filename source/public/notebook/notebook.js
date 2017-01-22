
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

var _ = require ('lodash');
var EventEmitter = require ('events').EventEmitter;
var uuid = require ('uuid');

var ITEM_SNIPPETS = {
  'markdown': '## New Item',
  'code':'print \'New Item\'',
  'arduino':'// firmata'
};
var wyliodrin = null;

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

app.factory ('$wydevice', function ()
{
  window.addEventListener ('message', function (message)
  {
    console.log (message.data);
    wyliodrin = message.source;
    if (message.data.type === 'wydevice-message')
    {
      deviceService.emit ('message', message.data.t, message.data.d);
    }
    else
    if (message.data.type === 'wydevice-status')
    {
      deviceService.emit ('status', message.data.s);
    }
  });

  var deviceService = 
  {
    send: function (t, d)
    {
      if (wyliodrin)
      {
        wyliodrin.postMessage ({type:'wydevice-message', t:t, d:d}, '*');
      }
    }
  };
  deviceService = _.assign (new EventEmitter(), deviceService);
  return deviceService;
});

app.controller ('NotebookController', function ($scope, $timeout, $mdDialog, $wydevice)
{
  function store ()
  {
    if (wyliodrin) wyliodrin.postMessage ({type:'notebook', d:$scope.items}, '*');
  }

  function load (items)
  {
    $scope.items = items;
    if ($scope.items.length === 0)
    {
      $scope.items.push ({
        type:'markdown',
        text:'',
        label: uuid.v4 ()
      });
    }
    $scope.activeLabel = ($scope.items[0]?$scope.items[0].label:null);
    $scope.editLabel = null;
    $scope.evaluatingLabel = null;
  }

  $scope.connected = false;

  load ([]);

  var that = this;

  window.addEventListener ('message', function (message)
  {
    if (message.data.type === 'notebook')
    {
      that.reset ();
      $timeout (function ()
      {
        var items = message.data.d;
        _.each (items, function (item)
        {
          if (!item.label)
          {
            item.label = uuid.v4 ();
          }
        });
        load (items);
      });
    }
  });

  $scope.aceCodeLoaded = function (_editor)
  {
    _editor.$blockScrolling = Infinity;
    _editor.getSession().setTabSize (2);
    _editor.getSession().setUseSoftTabs (true);
    _editor.setOptions ({minLines:6, maxLines: Infinity});
  };
  $scope.aceCodeChanged = function ()
  {
    store ();
  };
  $scope.aceEditLoaded = function (_editor)
  {
    _editor.$blockScrolling = Infinity;
    _editor.getSession().setTabSize (2);
    _editor.getSession().setUseSoftTabs (true);
  };
  $scope.aceEditChanged = function (_editor)
  {
    store ();
  };

  this.activate = function (label)
  {
    if ($scope.activeLabel !== label)
    {
      $scope.activeLabel = label;
      $scope.editLabel = null;
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

  this.edit = function (label)
  {
    if ($scope.editLabel !== label)
    {
      $scope.editLabel = label;
    }
    else
    {
      $scope.editLabel = null;
    }
  };

  this.insert = function (index)
  {
    var item = {
      type: $scope.items[index].type,
      text: ITEM_SNIPPETS[$scope.items[index].type],
      label: uuid.v4 ()
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

  this.evaluate = function (label)
  {
    var item = findLabel(label);
    if (item && item.type === 'code')
    {
      item.response = null;
      item.exception = '';
      item.stdout = '';
      item.stderr = '';
      $wydevice.send ('note', {
        a: 'r',
        l: item.label,
        s: item.text
      });
      $scope.evaluatingLabel = label;
    }
  };

  this.stop = function (label)
  {
    $wydevice.send ('note', {
      a:'s'
    });
  };

  this.reset = function ()
  {
    $wydevice.send ('note', {
      a: 'reset'
    });
  };

  function findLabel (label)
  {
    return _.find ($scope.items, function (item)
    {
      // console.log (item);
      return item.label === label;
    });
  }

  $wydevice.on ('message', function (t, p)
  {
    var item = null;
    // console.log (t);
    // console.log (p);
    if (t === 'note')
    {
      if (p.l) item = findLabel (p.l);
      // console.log (item);
      if (p.a === 'i')
      {
        if (p.r === 's')
        {
          $timeout (function ()
          {
            $scope.evaluatingLabel = null;
          });
        }
      }
      else
      if (p.a === 'r')
      {
        if (p.t === 's')
        {
          if (p.s === 'o')
          {
            if (item) $timeout (function ()
              {
                item.stdout = item.stdout + p.d;
                store ();
              });
          }
          else
          if (p.s === 'e')
          {
            if (item) $timeout (function ()
              {
                item.stderr = item.stderr + p.d;
                store ();
              });
          }
        }
        else
        if (p.t === 'd')
        {
          if (item) $timeout (function ()
            {
              $scope.evaluatingLabel = null;
            });
        }
        else
        if (p.t === 'e')
        {
          if (item) $timeout (function ()
            {
              item.exception = p.d.buf;
              store ();
            });
        }
        else
        if (p.t === 'r')
        {
          if (item) $timeout (function ()
            {
              item.response = p.d;
              store ();
            });
        }
      }
    }
  });
  $wydevice.on ('status', function (status)
  {
    $timeout (function ()
    {
      $scope.connected = (status === 'CONNECTED');
    });
  });
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

app.filter ('renderHtml', function ($sce)
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
    return $sce.trustAsHtml(item);
  };
});

app.directive ('response', function ($timeout)
  {
    return {
      restrict: 'E',
      // templateNamespace: 'svg',
      scope: {
        value: '=',
      },
      controller: function ($scope, $element)
      {
        $scope.wider = false;
        $scope.$watch ('value', function ()
        {
          // debug ('View schematics');
          console.log ($scope.value);
          if ($scope.value && $scope.value.type)
          {
            var format = $scope.value.type.f;
            var str = $scope.value.type.s;
            if (format === 'format')
            {
              $element[0].innerHTML = $scope.value.buf;
            }
            else
            {
              $element[0].innerHTML = '<pre>'+$scope.value.buf+'</pre>';
            }
          }
          else
          {
            $element[0].innerHTML = '';
          }
          // $timeout (function ()
          // {
          //   try
          //   {
          //     var box = $('schematics svg')[0].getBBox ();
          //     if (box.width > box.height) $scope.wider = true;
          //     else $scope.wider = false;
          //   }
          //   catch (e)
          //   {

          //   }
          // });
          
        });
      },

      controllerAs: 's',
      replace: true,
    };
  });