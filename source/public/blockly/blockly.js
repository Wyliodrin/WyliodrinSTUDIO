
"use strict";

/* blockly core/field_variable.js
Blockly.FieldVariable.dropdownChange = function(text) {
  function promptName(promptText, defaultText, done) {
    Blockly.hideChaff();
    window.prompt(promptText, defaultText, function (newVar)
      {
        // Merge runs of whitespace.  Strip leading and trailing whitespace.
        // Beyond this, all names are legal.
        if (newVar) {
          newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
          if (newVar == Blockly.Msg.RENAME_VARIABLE ||
              newVar == Blockly.Msg.NEW_VARIABLE) {
            // Ok, not ALL names are legal...
            newVar = null;
          }
        }
        done (newVar);
      });
  }
  var workspace = this.sourceBlock_.workspace;
  if (text == Blockly.Msg.RENAME_VARIABLE) {
    var oldVar = this.getText();
    promptName(Blockly.Msg.RENAME_VARIABLE_TITLE.replace('%1', oldVar),
                      oldVar, function (vtitle)
                      {
                        console.log ('oldvar '+oldVar);
                        console.log ('vtitle '+vtitle);
                        if (vtitle) {
                          Blockly.Variables.renameVariable(oldVar, vtitle, workspace);
                        }
                        return null;
                      });
    return oldVar;
  } else if (text == Blockly.Msg.NEW_VARIABLE) {
    promptName(Blockly.Msg.NEW_VARIABLE_TITLE, '', function (vtitle)
      {
        // Since variables are case-insensitive, ensure that if the new variable
        // matches with an existing variable, the new case prevails throughout.
        if (vtitle) {
          Blockly.Variables.renameVariable(text, vtitle, workspace);
        }    
      });
    
    return undefined;
  }
  return undefined;
};


*/

var $ = require ('jquery');
var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:projectvisual');

var sweetalert = require ('sweetalert');

var versions = [];

var pendingUndo = false;

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
          console.log (inputValue);
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
        // Blockly.HSV_VALUE = 0.78;
        Blockly.inject(document.body,
            {path: 'blockly/', readOnly: readOnly, maxBlocks: getParameterByName ('blocks') ,trashcan: true, zoom: {controls: true, wheel: false, startScale: 1.0}, toolbox: toolbox});
        // Let the top-level application know that Blockly is ready.
        var nrfile = getParameterByName('nrfile');

       // debug ('Load visual for project with nr '+nrfile);

        setTimeout (function ()
        {
          program = window.parent.getProgram ();
          // console.log (program);
          program.load = function (_project)
          {
            project = _project;
            // console.log (project);
            debug ('Load project '+project.title+', loading project visual');
            Blockly.mainWorkspace.clear ();
            try
            {
             versions = [];
              versions.push (project.visualproject);
              var xml = Blockly.Xml.textToDom(project.visualproject);
              Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);  
              Blockly.mainWorkspace.zoomReset ();
            }
            catch (e)
            {
              console.log (e);
            }
          };
        }, 1000);

        // if (window.parent.getProject)
        // {
        //   project = window.parent.getProject (); 
        //   // console.log (project);
        //   if (project && project.language === 'visual')
        //   {
        //       debug ('Project found '+project.title+', loading project visual');
        //       try
        //       {
        //         versions.push (project.main);
        //         var xml = Blockly.Xml.textToDom(project.main);
        //         Blockly.mainWorkspace.clear ();
        //         Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);  
        //       }
        //       catch (e)
        //       {

        //       }
        //   }
        // }

        Blockly.mainWorkspace.addChangeListener (function ()
        {
          debug ('Visual program changes, store '+project);
          if (project && project.language === 'visual')
          {
            debug ('Storing program for project with id '+project.id);
            var source = Blockly.Python.workspaceToCode (Blockly.mainWorkspace);
            var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
            project.visualproject = Blockly.Xml.domToText (xml);
            project.main = source;
           if (pendingUndo===false)
           {
              versions.push (project.visualproject);
            }
            else
            {
              pendingUndo = false;
            }
            // console.log (versions);
            program.storeProject ();
          }
        });

        // try
        // {
        //   window.parent.blocklyLoaded(Blockly, nrfile);
        // }
        // catch (e)
        // {
        //   console.log (e);
        // }



        // if (!display)
        // {
        //   try
        //   {
        //     window.parent.blocklyLoaded(Blockly, nrfile);
        //   }
        //   catch (e)
        //   {
        //     console.log (e);
        //   }
        // }
        // else
        // {
        //   try
        //   {
        //     var filename = Base64.decode(display);
        //     var projectid = filename.substr (0, filename.indexOf ('/'));
        //     var sourcename = filename.substr (filename.indexOf('/')+1);
        //     jsonRequest ('/projects/readsource', {projectid:projectid, sourcename:sourcename}, function (err, data)
        //     {
        //       if (!err)
        //       {
        //         var xml = Blockly.Xml.textToDom(data.sourcelines);
        //         console.log (xml);
        //         Blockly.mainWorkspace.clear ();
        //         Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml); 
        //       }
        //     });

        //     mixpanel.track ('Share Snippet', {
        //       projectid:projectid,
        //       sourcename: sourcename
        //     });
        //   }
        //   catch (e)
        //   {
        //     console.log (e);
        //   }
        // }
        // if (display)
        // {
        //   $('#codestatus').hide ();
        // }
        // if (readOnly)
        // {
        //   $('#undo-btn').hide ();
        //   $('#import-btn').hide ();
        // }
        // if (nrfile == "toolbox")
        // {
        //   $('#import-btn').hide ();
        // }
        $("#codestatus").on ('click', function (e)
        {
          e.preventDefault ();
          $('#codestatus').attr ('class', 'codestatus '+program.showHideCode ());
        });

        $("#undo-btn").on ('click', function (e){
          e.preventDefault ();
          undo();
        });

        // $("#import-btn").on ('click', function (){
        //   window.parent.loadsave('blockly', nrfile);
        // });

        // trigger undo from wyliodio.js
        $(document).keydown(function(e){
            if( e.which === 90 && e.ctrlKey ){
            undo();
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
          // console.log (xmlversion);
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