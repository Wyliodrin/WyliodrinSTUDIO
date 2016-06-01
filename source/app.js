
"use strict";

var settings = require ('settings');
var debug = require ('debug');

debug.enable (settings.debug);

import WyliodrinDevice from './WyliodrinDevice';

var Devices = require ('./Devices.js');

global.WyliodrinDevice = WyliodrinDevice;
global.Devices = Devices;

var log = debug ('wyliodrin:background');
chrome.app.runtime.onLaunched.addListener(function(launchData) {
	log ('onLaunched');
	log (launchData);
	chrome.app.window.create('public/views/wyliodrin.html', {
		id: 'wyliodrin-studio',
		frame: { type: "none" },
		innerBounds: {
			width: 1180,
			height: 800,
			minWidth: 1150,
			minHeight: 700
		}
	},
	function (w)
	{
		log (w);
		w.onClosed.addListener (function ()
		{
			log ('closed');
			WyliodrinDevice.disconnectDevices ();
		});
	});

	// chrome.app.window.onClosed.addListener (function (data)
	// {
	// 	debug ('closed');
	// 	debug (data);
	// });
});

chrome.serial.getConnections (function (connectionsInfo)
{
	console.log (connectionsInfo);
});

chrome.app.runtime.onRestarted.addListener(function() {
  log ('onRestarted');
});

chrome.runtime.onStartup.addListener(function() {
  log ('onStartup');
});

chrome.runtime.onInstalled.addListener(function() {
  log ('onInstalled');
});

chrome.runtime.onRestartRequired.addListener(function() {
  log ('onRestartRequired');
});

chrome.runtime.onUpdateAvailable.addListener(function() {
  log ('onUpdateAvailable');
});

chrome.runtime.onSuspend.addListener(function() {
  log ('onSuspend');
});
