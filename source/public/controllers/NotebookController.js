
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

		window.addEventListener ('message', function (message)
		{
			console.log (message.data);
			try
			{
				var parsedmessage = message.data;
				if (parsedmessage.type === 'wydevice-message')
				{
					$wydevice.send (parsedmessage.t, parsedmessage.d);
				}
			}
			catch (e)
			{

			}
		});

		$wydevice.on ('message', function (t, d)
		{
			// console.log (p);
			notebook.contentWindow.postMessage ({type: 'wydevice-message', t: t, d:d}, '*');
		});

		$wydevice.on ('status', function (s)
		{
			// console.log (p);
			notebook.contentWindow.postMessage ({type: 'wydevice-status', s:s}, '*');
		});
	});
};
