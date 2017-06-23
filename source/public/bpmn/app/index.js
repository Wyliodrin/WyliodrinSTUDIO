'use strict';

var fs = require('fs');

var $ = require('jquery'),
    BpmnModeler = require('bpmn-js/lib/Modeler');

var propertiesPanelModule = require('bpmn-js-properties-panel'),
    propertiesProviderModule = require('bpmn-js-properties-panel/lib/provider/camunda'),
    camundaModdleDescriptor = require('camunda-bpmn-moddle/resources/camunda');

var container = $('#js-drop-zone');

var canvas = $('#js-canvas');

var bpmnModeler = new BpmnModeler({
  container: canvas,
  propertiesPanel: {
    parent: '#js-properties-panel'
  },
  additionalModules: [
    propertiesPanelModule,
    propertiesProviderModule
  ],
  moddleExtensions: {
    camunda: camundaModdleDescriptor
  }
});

var newDiagramXML = fs.readFileSync(__dirname + '/../resources/newDiagram.bpmn', 'utf-8');

function createNewDiagram() {
  console.log ('create new diagram');
  openDiagram(newDiagramXML);
}

function openDiagram(xml) {

  bpmnModeler.importXML(xml, function(err) {

    if (err) {
      container
        .removeClass('with-diagram')
        .addClass('with-error');

      container.find('.error pre').text(err.message);

      console.error(err);
    } else {
      container
        .removeClass('with-error')
        .addClass('with-diagram');
    }


  });
}

function saveSVG(done) {
  bpmnModeler.saveSVG(done);
}

function saveDiagram(done) {

  bpmnModeler.saveXML({ format: true }, function(err, xml) {
    done(err, xml);
  });
}

function registerFileDrop(container, callback) {

  function handleFileSelect(e) {
    e.stopPropagation();
    e.preventDefault();

    var files = e.dataTransfer.files;

    var file = files[0];

    var reader = new FileReader();

    reader.onload = function(e) {

      var xml = e.target.result;

      callback(xml);
    };

    reader.readAsText(file);
  }

  function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();

    e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  container.get(0).addEventListener('dragover', handleDragOver, false);
  container.get(0).addEventListener('drop', handleFileSelect, false);
}


////// file drag / drop ///////////////////////

// check file api availability
if (!window.FileList || !window.FileReader) {
  window.alert(
    'Looks like you use an older browser that does not support drag and drop. ' +
    'Try using Chrome, Firefox or the Internet Explorer > 10.');
} else {
  registerFileDrop(container, openDiagram);
}

// bootstrap diagram functions

var device;
var node;
var project;

$(document).on('ready', function() {
  console.log ('ready');
  console.log (window.parent);
  setTimeout (function (){
    var program = window.parent.getProgram();

    program.device = function (runningDevice)
    {
      // console.log (device);
      device = runningDevice;
      //generateSource ();
    };
    
    program.load = function (_project, _node, device) //_project_id
    {
      console.log ('load');
      program.device (device);
      node = _node;
      project = _project;
    };
  }, 1000);

  //var program = window.parent.getProgram ();
  //console.log (program);

  //$('#js-create-diagram').click(function(e) {
    //e.stopPropagation();
   // e.preventDefault();

    createNewDiagram();
  //});

  var downloadLink = $('#js-download-diagram');
  var downloadSvgLink = $('#js-download-svg');

  $('.buttons a').click(function(e) {
    if (!$(this).is('.active')) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  function setEncoded(link, name, data) {
    var encodedData = encodeURIComponent(data);

    if (data) {
      link.addClass('active').attr({
        'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
        'download': name
      });
    } else {
      link.removeClass('active');
    }
  }

  var debounce = require('lodash/function/debounce');

  var exportArtifacts = debounce(function() {

    // saveSVG(function(err, svg) {
    //   setEncoded(downloadSvgLink, 'diagram.svg', err ? null : svg);
    // });
  console.log (project);
    if (project && project.language === 'bpmn')
    {
      saveDiagram(function(err, xml) {
        console.log (xml);
        node.content = xml;
     });
    }
  }, 500);

  bpmnModeler.on('commandStack.changed', exportArtifacts);
});
