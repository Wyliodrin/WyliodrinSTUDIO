
"use strict";

var $ = require ('jquery');

window.jQuery = $;

var angular = require ('angular');
var angular_material = require ('angular-material');
var path = require ('path');
var marked = require ('marked');
var brace = require ('brace');
var angularUiAce = require ('angular-ui-ace');
require('brace/mode/python');
require('brace/mode/markdown');
require('brace/mode/c_cpp');
require('brace/theme/chrome');
require('brace/ext/language_tools');
require('brace/ext/searchbox');
require('brace/ext/settings_menu');
require('./../tools/snippets/python.js');
require('./../tools/snippets/markdown.js');
require('./../tools/snippets/c_cpp.js');

var MAKEFILE = {
  'arduino':'compile:\n\tmkdir /tmp/arduino_$(PROJECTID)_$(FIRMWARE)_$(DEVICE) 2> /dev/null; rm -f .build && ln -s /tmp/arduino_$(PROJECTID)_$(FIRMWARE)_$(DEVICE) .build && ino build -m $(DEVICE)\n\nflash:\n\tino upload -m $(DEVICE) -p $(PORT)\n\nserial:\n\tstty -F $(PORT) speed $(BAUD); socat $(PORT) - >&3\n'
};

var DEVICES = {};
DEVICES[0x2341] = {
  name: 'Arduino',
  type: 'arduino'
};
DEVICES[0x2a03] = {
  name: 'Arduino',
  type: 'arduino'
};
DEVICES[0x2341][0x0001] = 
{
  name: 'Uno',
  type: 'uno'
};
DEVICES[0x2341][0x0010] = {
  name: 'Mega 2560',
  type: 'mega2560'
};
DEVICES[0x2341][0x003f] = 
{
  name:'Mega ADK',
  type: 'mega2560'
};
DEVICES[0x2341][0x0042] = 
{
  name: 'Mega 2560 rev3',
  type: 'mega2560'
};
DEVICES[0x2341][0x0043] = 
{
  name: 'Uno R3',
  type: 'uno'
};
DEVICES[0x2341][0x0044] = 
{
  name: 'Mega ADK rev3',
  type: 'mega2560'
};
DEVICES[0x2341][0x8036] = 
{
  name: 'Leonardo',
  type: 'leonardo'
};
DEVICES[0x2a03][0x0001] = 
{
  name: 'Linino ONE'
};
DEVICES[0x2a03][0x0036] = 
{
  name: 'Leonardo',
  type: 'leonardo'
};
DEVICES[0x2a03][0x0037] = 
{
  name: 'Micro'
};
DEVICES[0x2a03][0x0038] = 
{
  name: 'Robot Control'
};
DEVICES[0x2a03][0x0039] =
{
  name: 'Robot Motor'
};
DEVICES[0x2a03][0x003a] = 
{
  name: 'Micro ADK rev3'
};
DEVICES[0x2a03][0x003c] = 
{
  name: 'Esplora'
};
DEVICES[0x2a03][0x003d] = 
{
  name: 'Due'
};
DEVICES[0x2a03][0x003e] = 
{
  name: 'Due'
};
DEVICES[0x2a03][0x0041] = 
{
  name: 'Yun'
};
DEVICES[0x2a03][0x0042] = 
{
  name: 'Mega 2560 rev3',
  type: 'mega2560'
};
DEVICES[0x2a03][0x0043] = 
{
  name: 'Uno Rev3',
  type: 'uno'
};
DEVICES[0x2a03][0x004d] = 
{
  name: 'Zero Pro'
};
DEVICES[0x2a03][0x8001] = 
{
  name: 'Linino ONE'
};
DEVICES[0x2a03][0x8036] = 
{
  name: 'Leonardo',
  type: 'leonardo'
};
DEVICES[0x2a03][0x8037] = 
{
  name: 'Micro'
};
DEVICES[0x2a03][0x8038] = 
{
  name: 'Robot Control'
};
DEVICES[0x2a03][0x8039] = 
{
  name: 'Robot Motor'
};
DEVICES[0x2a03][0x803a] = 
{
  name: 'Micro ADK rev3'
};
DEVICES[0x2a03][0x803c] = 
{
  name: 'Esplora'
};
DEVICES[0x2a03][0x8041] = 
{
  name: 'Yun'
};
DEVICES[0x2a03][0x804d] = 
{
  name: 'Zero Pro'
};

var FIRMWARE_TYPES = {
    'arduino':
    {
      name: 'Arduino',
      source: 'src/Arduino.ino',
      devices:
      {
        'uno':'Arduino Uno',
        'atmega328':'Arduino Duemilanove w/ ATmega328',
        'diecimila':'Arduino Diecimila or Duemilanove w/ ATmega168',
        'nano328':'Arduino Nano w/ ATmega328',
        'nano':'Arduino Nano w/ ATmega168',
        'mega2560':'Arduino Mega 2560 or Mega ADK',
        'mega':'Arduino Mega (ATmega1280)',
        'leonardo':'Arduino Leonardo',
        'mini328':'Arduino Mini w/ ATmega328',
        'mini':'Arduino Mini w/ ATmega168',
        'ethernet':'Arduino Ethernet',
        'fio':'Arduino Fio',
        'bt328':'Arduino BT w/ ATmega328',
        'bt':'Arduino BT w/ ATmega168',
        'lilypad328':'LilyPad Arduino w/ ATmega328',
        'lilypad':'LilyPad Arduino w/ ATmega168',
        'pro5v328':'Arduino Pro or Pro Mini (5V, 16 MHz) w/ ATmega328',
        'pro5v':'Arduino Pro or Pro Mini (5V, 16 MHz) w/ ATmega168',
        'pro328':'Arduino Pro or Pro Mini (3.3V, 8 MHz) w/ ATmega328',
        'pro':'Arduino Pro or Pro Mini (3.3V, 8 MHz) w/ ATmega168',
        'atmega168':'Arduino NG or older w/ ATmega168',
        'atmega8':'Arduino NG or older w/ ATmega8'
      }
    },
    'openmote':
    {
      name: 'Open Mote',
      source: 'main.c',
      devices:
      {
        'openmote':'Open Mote'
      }
    }
  };

var _ = require ('lodash');
var EventEmitter = require ('events').EventEmitter;
var uuid = require ('uuid');

var ITEM_SNIPPETS = {
  'markdown': '## New Item',
  'code':'print \'New Item\'',
  'arduino':'// firmata'
};
var wyliodrin = null;

var aceEdit = null;

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

app.factory ('$wydevice', function ($timeout)
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
    else
    if (message.data.type === 'file')
    {
      if (message.data.d.f === 'image')
      {
        $timeout (function ()
        {
          aceEdit.insert ('!['+message.data.d.n+']('+message.data.d.d+')');
        });
      }
      else
      if (message.data.d.f === 'arbitrary')
      {
        $timeout (function ()
        {
          var s = message.data.d.d;
          if (s.indexOf ('data:;')===0)
          {
            s = 'data:application/octet-stream'+s.substring (4);
          }
          aceEdit.insert ('['+message.data.d.n+']('+s+')'); 
        });
      }
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

app.config( [
    '$compileProvider',
    function( $compileProvider )
    {   
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]);

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
    $scope.activeLabel = null;
    $scope.editLabel = null;
    $scope.evaluatingLabel = null;
    $scope.flashingLabel = null;
    // setTimeout (function ()
    // {
    //   $('a').each (function ()
    //     {
    //       var l = $(this);
    //       if (l.attr ('href').startsWith ('data:application/octet-stream'))
    //       {
    //         l.attr ('download', l.text());
    //       }
    //       l.attr ('target', '_blank');
    //     });
    // }, 500);
  }

  $scope.connected = false;

  $scope.ports = [];
  $scope.firmwareTypes = FIRMWARE_TYPES;

  $scope.status = 'STOPPED';

  $scope.serialinput = '';

  // hotkeys.bindTo($scope).add({
  //   combo: 'ctrl+enter',
  //   description: 'Run or flash',
  //   callback: function() {
  //     console.log ('hotkey');
  //     var item = findLabel ($scope.activeLabel);
  //     if (item)
  //     {
  //       if (item.type === 'code') that.evaluate ($scope.activeLabel);
  //       else
  //       if (item.type === 'firmware') that.flash ($scope.activeLabel);
  //     }
  //   }
  // });

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
    _editor.commands.addCommand({
      name: "evaluate",
      bindKey: {win: "shift-enter", mac: "shift-enter"},
      exec: function(editor) {
          console.log ('hotkey');
          var item = findLabel ($scope.activeLabel);
          if (item)
          {
            if (item.type === 'code') that.evaluate ($scope.activeLabel);
            else
            if (item.type === 'firmware') that.flash ($scope.activeLabel);
          }
        }
      });
  };
  $scope.aceCodeChanged = function ()
  {
    store ();
  };
  $scope.aceEditLoaded = function (_editor)
  {
    aceEdit = _editor;
    _editor.$blockScrolling = Infinity;
    _editor.getSession().setTabSize (2);
    _editor.getSession().setUseSoftTabs (true);
  };
  $scope.aceEditChanged = function (_editor)
  {
    // setTimeout (function ()
    // {
    //   $('a').each (function ()
    //     {
    //       var l = $(this);
    //       console.log (l.attr ('href'));
    //       if (l.attr ('href').startsWith ('data:application/octet-stream'))
    //       {
    //         l.attr ('download', l.text());
    //       }
    //       l.attr ('target', '_blank');
    //     });
    // }, 500);
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
      store ();
    }
  };

  this.down = function (index)
  {
    if (index < $scope.items.length-1)
    {
      var item = $scope.items[index];
      $scope.items[index] = $scope.items[index+1];
      $scope.items[index+1] = item;
      store ();
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

  this.link = function (label)
  {
    $timeout (function ()
    {
      aceEdit.insert ('[text](http://...)');
    });
  };

  this.numbered = function (label)
  {
    $timeout (function ()
    {
      aceEdit.insert ('\n1. Item\n2. Item \n3. Item');
    });
  };

  this.points = function (label)
  {
    $timeout (function ()
    {
      aceEdit.insert ('\n* Item\n* Item \n* Item');
    });
  };

  this.heading1 = function (label)
  {
    $timeout (function ()
    {
      aceEdit.insert ('\n# Title');
    });
  };

  this.heading2 = function (label)
  {
    $timeout (function ()
    {
      aceEdit.insert ('\n## Title');
    });
  };

  this.heading3 = function (label)
  {
    $timeout (function ()
    {
      aceEdit.insert ('\n### Title');
    });
  };

  this.source = function (label)
  {
    $timeout (function ()
    {
      aceEdit.insert ('\n```language\nsource\n```');
    });
  };

  this.bold = function (label)
  {
    $timeout (function ()
    {
      aceEdit.insert ('**text**');
    });
  };

  this.italics = function (label)
  {
    $timeout (function ()
    {
      aceEdit.insert ('*italics*');
    });
  };

  this.image = function (label)
  {
    wyliodrin.postMessage ({ type: 'file',
      t:'load',
      d:
      {
        f:[{mimeTypes:['image/*']}],
        e:'url',
        d:'image',
        l: label
      }
    }, '*');
  };

  this.imagelink = function (label)
  {
    $timeout (function ()
    {
      aceEdit.insert ('\n![image](http://...)');
    });
  };

  this.arbitraryfile = function (label)
  {
    wyliodrin.postMessage ({ type: 'file',
      t:'load',
      d:
      {
        f:[{mimeTypes:['*/*']}],
        e:'url',
        d:'arbitrary',
        l: label
      }
    }, '*');
  };

  this.insert = function (index)
  {
    var item = {
      type: $scope.items[index].type,
      text: ITEM_SNIPPETS[$scope.items[index].type],
      label: uuid.v4 (),
      port: {
        type: ($scope.items[index].type==='firmware'?'arduino/uno':'')
      }
    };
    $scope.items.splice (index+1, 0, item);
    $scope.activeIndex = index+1;
    $scope.editIndex = index+1;
    store ();
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
            store ();
          }, function() {
          });
    }
  };

  this.deletestderr = function (label)
  {
    var item = findLabel (label);
    if (item) item.stderr = '';
  };

  this.deletestdout = function (label)
  {
    var item = findLabel (label);
    if (item) item.stdout = '';
  };

  this.evaluate = function (label)
  {
      var item = findLabel(label);
      if (item && item.type === 'code' && $scope.connected)
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

  this.flash = function (label)
  {
    var item = findLabel (label);
    if (item && $scope.connected)
    {
      var typedevice = item.port.type.split ('/');
      var type = typedevice[0];
      var device = typedevice[1];
      $wydevice.send ('note', {
        a:'f',
        l: label,
        f: item.text,
        s: FIRMWARE_TYPES[type].source,
        d: device,
        p: item.port.path,
        m: MAKEFILE[type],
        b: 9600
      });
      item.response = '';
      item.hasErrors = false;
      item.stdout = '';
      item.stderr = '';
      $scope.flashingLabel = label;
    }
  };

  this.stopflash = function (label)
  {
    $wydevice.send ('note', {
      a:'f',
      f:''
    });
    $scope.flashingLabel = null;
  };

  this.serialinput = function (label)
  {
    $wydevice.send ('note', {
      a:'f',
      s:$scope.serialinput,
      l:label
    });
    $scope.serialinput = '';
  };

  this.itemType = function (label)
  {
    store ();
  };

  this.reset = function ()
  {
    $wydevice.send ('note', {
      a: 'reset'
    });
  };

  this.firmwareType = function (label)
  {
    store ();
  };

  this.port = function (label, port)
  {
    console.log ('port');
    var type = findFirmwareType (port.vid, port.pid);
    console.log (type);
    if (type)
    {
      var item = findLabel (label);
      if (item)
      {
        item.port.type = type;
        item.port.path = port.p;
      }
    }
    store ();
  };

  function findLabel (label)
  {
    return _.find ($scope.items, function (item)
    {
      // console.log (item);
      return item.label === label;
    });
  }

  function firmwareName (port)
  {
    var portName = port.s;
    // console.log (port);
    // console.log (DEVICES[port.vid]);
    // console.log (DEVICES[port.vid][port.pid]);
    if (port.vid)
    {
      if (DEVICES[port.vid]) portName = DEVICES[port.vid].name;
    }
    if (port.vid && port.pid && DEVICES[port.vid] && DEVICES[port.vid][port.pid])
    {
      // console.log (port);
      portName = portName+' '+DEVICES[port.vid][port.pid].name;
    }
    return portName + ' ('+path.basename (port.p)+')';
  }

  function findFirmwareType (vid, pid)
  {
    var type = null;
    if (DEVICES[vid] && DEVICES[vid][pid])
    {
      type = DEVICES[vid].type+'/'+DEVICES[vid][pid].type;
    }
    return type;
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
      if (p.a === 'status')
      {
        if (p.r === 'r')
        {
          $timeout (function ()
          {
            if (p.l) 
            {
              $scope.evaluatingLabel = p.l;
              $scope.status = 'PROCESSING';
            }
            else
            {
              $scope.evaluatingLabel = null;
              $scope.status = 'READY';
            }
          });
        }
        if (p.r === 's')
        {
          $timeout (function ()
          {
            $scope.evaluatingLabel = null;
            $scope.status = 'STOPPED';
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
      else
      if (p.a === 'f')
      {
        // item = findLabel ($scope.flashingLabel);
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
        else
        if (p.s === 'r')
        {
          if (item) $timeout (function ()
          {
            item.hasErrors = false;
            item.response = item.response + p.d;
            store ();
          });
        }
        else
        if (p.s === 'f')
        {
          $timeout (function ()
          {
            if (!item.response || item.response.length === 0) item.hasErrors = true;
            $scope.flashingLabel = null;
          });
        }
      }
    }
    else
    if (t === 'i')
    {
      $timeout (function ()
      {
        if (p.pf && $scope.ports.length !== p.pf.length) 
        {
          $scope.ports = p.pf;
          _.each ($scope.ports, function (port)
          {
            try
            {
              port.vid = parseInt (port.vid, 16);
              port.pid = parseInt (port.pid, 16);
            }
            catch (e)
            {

            }
            port.s = firmwareName (port);
          });
        }
      });
    }
  });
  $wydevice.on ('status', function (status)
  {
    $timeout (function ()
    {
      $scope.connected = (status === 'CONNECTED');
      if (status === 'CONNECTED')
      {
        $wydevice.send ('note', {
          a:'status'
        });
      }
      else if (status === 'DISCONNECTED')
      {
        $scope.evaluatingLabel = null;
      }
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
      smartypants: false,
      highlight: function (code) {
        console.log (code);
        return require('highlight.js').highlightAuto(code).value;
      },
      link: function (href, title, text)
      {
        /*jshint scripturl:true*/
        if (this.options.sanitize) {
          var prot = '';
          try {
            prot = decodeURIComponent(window.unescape(href))
              .replace(/[^\w:]/g, '')
              .toLowerCase();
          } catch (e) {
            return '';
          }
          if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
            return '';
          }
        }
        var download = '';
        if (href.startsWith ('data:application/octet-stream'))
        {
          download = 'download="'+text+'"';
        }
        var out = '<a href="' + href + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += ' target="_blank"';
        out += ' '+download;
        out += '>' + text + '</a>';
        return out;
      }
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