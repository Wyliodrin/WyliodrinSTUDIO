
"use strict";

var angular = require ('angular');

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:lacy:XTermController');

var XTerm = require ('xterm.js');

var mixpanel = require ('mixpanel');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	app.controller ('XTermController', function ($scope, $timeout, $wydevice, $element, $attrs)
	{
		debug ('Registering');
		var shell;
		var cols;
		var rows;

		var write = true;

		$timeout (function (){
			function setSizes ()
			{
				cols = Math.floor(($element.width ())/9);
		  		rows = Math.floor(($element.height()-12)/14);
		  // cols = Math.floor((angular.element('#xterm').width ())/9);
		  		// rows = Math.floor((angular.element('#xterm').height()-12)/14);

		  		// console.log ('cols '+cols+' rows '+rows);

				shell.resize (cols, rows);
				//$wydevice.send ('s', {a:'r', c:cols, r: rows});
			}

			shell = new XTerm ();
			shell.open ($element[0]);
			setSizes ();

			var device = $attrs.id;

			//$wydevice.send ('s', {a:'k', t:'a'});
			
			shell.on ('key', function (key)
			{
				//shell.write (key);
				$wydevice.send ('s', {a:'k', t:key}, device);
			});

			$wydevice.on ('status', function (status, deviceId)
			{
				console.log ('status '+status+' '+deviceId);
				if ((deviceId === device) && (status === 'CONNECTED'))
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

			$wydevice.on ('message', function (t, p, deviceId)
			{
				console.log('xterm on message');
				console.log (p);
				console.log(t);
				if (deviceId === device)
				{
					if (t === 's')
					{
						if (p.a === 'k')
						{
							shell.write (p.t);
						}
						else
						if (p.a === 'e' && p.e === 'noshell')
						{
							$wydevice.send ('s', {a:'o', c:cols, r: rows}, device);
							mixpanel.track ('Shell Open',{
								category: $wydevice.device.category
							});
						}
					}
				}
			});
		});
	});
};
