
"use strict";

var angular = require ('angular');
var library = require ('library');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:NotebookController');

var mixpanel = require ('mixpanel');
var _ = require ('lodash');

var $ = require ('jquery');

debug ('Loading');


module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller ('NotebookController', function ($scope, $element, $timeout, $mdDialog, $filter, $wyapp, $wydevice, $translate)
	{
		debug ('Registering');

		var notebook = $('#notebook')[0];

		var id = null;

		window.addEventListener ('message', function (message)
		{
			try
			{
				var parsedmessage = message.data;
				if (parsedmessage.type === 'wydevice-message')
				{
					$wydevice.send (parsedmessage.t, parsedmessage.d);
				}
				else
				if (parsedmessage.type === 'notebook')
				{
					library.storeNotebook (id, parsedmessage.d);
				}
				else
				if (parsedmessage.type === 'file')
				{
					if (parsedmessage.t === 'load')
					{
						chrome.fileSystem.chooseEntry(
					    {
					      type: 'openFile', accepts:parsedmessage.d.f 
					    }, 
					    function(fileEntry) {
					      if(chrome.runtime.lastError) 
					      {

					      }
					      if (!fileEntry) {
					        return;
					      }
					      fileEntry.file(function(file) 
					      {
					        var fileReader = new FileReader ();
					        fileReader.onload = function (value)
					        {
					          console.log ('load');
					          notebook.contentWindow.postMessage ({type: 'file', d:{
					          	l: parsedmessage.d.l,
					          	f: parsedmessage.d.d,
					          	d: value.target.result,
					          	n: file.name
					          }}, '*');
					        };
					        fileReader.onerror = function (err)
					        {
					        	console.log (err);
					        };
					        if (parsedmessage.d.e === 'url')
					        {
					        	console.log ('read');
					        	fileReader.readAsDataURL (file);
					        }
					      });
					    });
					}
				}
				else
				if (parsedmessage.type === 'print')
				{
					notebook.contentWindow.print ();
				}
			}
			catch (e)
			{
				console.log (e.stack);
			}
		});

		$wyapp.on ('load', function (project)
		{
			id = project.id;
			notebook.contentWindow.postMessage ({type: 'notebook', d:project.notebook}, '*');
		});

		$wydevice.on ('message', function (t, d)
		{
			notebook.contentWindow.postMessage ({type: 'wydevice-message', t: t, d:d}, '*');
		});

		$wydevice.on ('status', function (s)
		{
			notebook.contentWindow.postMessage ({type: 'wydevice-status', s:s}, '*');
		});
	});
};
