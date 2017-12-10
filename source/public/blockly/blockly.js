
"use strict";

var $ = require ('jquery');
var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:projectvisual');

var sweetalert = require ('sweetalert');

var versions = [];

var pendingUndo = false;

var node;
var project;

var program = null;

      function getParameterByName(name) {
          name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
          var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
             results = regex.exec(location.search);
          return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
      }

      window.prompt = function (title, text, done)
      {
        sweetalert({
          title: "",   
          text: title,   
          type: "input",   
          showCancelButton: true,   
          closeOnConfirm: true,   
          animation: "slide-from-top",   
          inputValue: text 
        }, function(inputValue){ 
          done (inputValue);
        });
      };

      function init() {
       var readOnly = false;
        
        var toolbox = null;
       if (readOnly)
        {
          toolbox = document.getElementById('toolbox_readonly');
        }
        else
        {
          toolbox = document.getElementById('toolbox')
        }


        Blockly.visual = {
          prefix_init: ''
        };

        if (nrfile == "toolbox")
        {
          Blockly.visual.prefix_init = 'context.';
          var toolsbox = $(toolbox);
          toolsbox.find ('category[name="Functions"]').remove();
          toolsbox.find ('category[name="Social"]').remove();
          toolsbox.find ('category[name="Embedded"]').remove();
          toolsbox.find ('category[name="Internet"]').remove();
          toolsbox.find ('category[name="Multimedia"]').remove();
         toolsbox.find ('category[name="Pi Camera"]').remove();
          toolsbox.find ('category[name="Bitcoins"]').remove();
          toolsbox.prepend ($("#toolbox_visual").children());
        }

        var toolsbox = $(toolbox);
        toolsbox.append ($("#toolbox_data_in_motion").children());

       Blockly.HSV_SATURATION = 0.75;
        Blockly.inject(document.body,
            {path: 'blockly/', readOnly: readOnly, maxBlocks: getParameterByName ('blocks') ,trashcan: true, zoom: {controls: true, wheel: false, startScale: 1.0}, toolbox: toolbox});
        // Let the top-level application know that Blockly is ready.
        var nrfile = getParameterByName('nrfile');

       var device = null;

        setTimeout (function ()
        {
          program = window.parent.getProgram ();
          program.device = function (runningDevice)
          {
            device = runningDevice;
            if (device && device.category === 'chrome')
            {
              toolbox = document.getElementById('toolbox_chrome')
              Blockly.mainWorkspace.updateToolbox (toolbox);
            }
            else
            {
              toolbox = document.getElementById('toolbox')
              Blockly.mainWorkspace.updateToolbox (toolbox);
            }
            generateSource ();
          },
          program.load = function (_project, _node, device)
          {
            program.device (device);
            node = _node;
            project = _project;
            debug ('Load project '+project.title+', loading project visual');
            Blockly.mainWorkspace.clear ();
            try
            {
             versions = [];
              versions.push (node.visual);
              var xml = Blockly.Xml.textToDom(node.visual);
              Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);  
              Blockly.mainWorkspace.zoomReset ();
            }
            catch (e)
            {
              console.log (e);
            }
          };
        }, 1000);

        function generateSource ()
        {
          if (project)
          {
            debug ('Storing program for project with id '+project.id);
            var source = '';
            try
            {
              if (device && (device.category === 'chrome' || device.platform === 'windows'))
              {
                source = Blockly.JavaScript.workspaceToCode (Blockly.mainWorkspace);
              }
              else
              {
                source = Blockly.Python.workspaceToCode (Blockly.mainWorkspace);
              }
              var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
              node.visual = Blockly.Xml.domToText (xml);
              node.content = source;
             if (pendingUndo===false)
             {
                versions.push (node.visual);
              }
              else
              {
                pendingUndo = false;
              }
            }
            catch (e)
            {
              debug (e.stack);
            }
            program.storeProject ();
          }
        }

        Blockly.mainWorkspace.addChangeListener (function ()
        {
          debug ('Visual program changes, store '+project);
          if (project && project.language === 'visual')
          {
            generateSource ();
          }
        });
        $("#codestatus").on ('click', function (e)
        {
          e.preventDefault ();
          $('#codestatus').attr ('class', 'codestatus '+program.showHideCode ());
        });

        $("#undo-btn").on ('click', function (e){
          undo ();
        });
        $(document).keydown(function(e){
            if( e.which === 90 && e.ctrlKey ){
            undo ();
            }          
        });
      }

      function undo ()
      {
        debug ('Undo request for visual');
        if (versions.length > 1) 
        {
          versions.pop ();
          var xmlversion = versions[versions.length-1];
          pendingUndo = true;
          try
          {
            var xml = Blockly.Xml.textToDom(xmlversion);
            Blockly.mainWorkspace.clear ();
            Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);  
          }
          catch (e)
          {
            debug ('Undo error while load '+e);
          }
        }
        else
        {
          debug ('Already at the first iteration');
        }
      }

      $(document).ready (function ()
      {
      	init ();
      });