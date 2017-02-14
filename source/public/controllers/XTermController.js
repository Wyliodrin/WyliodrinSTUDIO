
"use strict";

var angular = require ('angular');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:XTermController');

var XTerm = require ('xterm');

var $ = require ('jquery');

var mixpanel = require ('mixpanel');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller ('XTermController', function ($scope, $element, $timeout, $wydevice, $wyapp)
	{
		debug ('Registering');
		var shell;
		var cols;
		var rows;

		var write = true;

		function setSizes ()
		{
			cols = Math.floor(($element.width ())/9);
	  		rows = Math.floor(($element.height()-12)/14);

	  		// console.log ('cols '+cols+' rows '+rows);

			shell.resize (cols, rows);
			$wydevice.send ('s', {a:'r', c:cols, r: rows});
		}

		shell = new XTerm ();
		shell.open ($element[0]);
		setSizes ();

		$wydevice.on ('status', function (status)
		{
			if (status === 'CONNECTED')
			{
				$timeout (function ()
				{
					setSizes ();
					if (write === true)
					{
						write = false;
						shell.write ('Press any key to start the shell\r\n');
					}
				}, 500);
			}
		});

		$wydevice.on ('message', function (t, p)
		{
			// console.log (p);
			if (t === 's')
			{
				if (p.a === 'k')
				{
					shell.write (p.t);
				}
				else
				if (p.a === 'e' && p.e === 'noshell')
				{
					$wydevice.send ('s', {a:'o', c:cols, r: rows});
					mixpanel.track ('Shell Open',{
						category: $wydevice.device.category
					});
				}
			}
		});

		$wyapp.on ('shell', function ()
		{
			console.log ('focus');
			setTimeout (function ()
			{
				shell.focus ();
			});
		});

		$(window).resize (function ()
		{
			setSizes ();
			// console.log ($element.width ());
			// console.log ($element.height ());
		});
		shell.on ('key', function (key)
		{
			// xterm.write (key);
			$wydevice.send ('s', {a:'k', t:key});
		});
	});
};
