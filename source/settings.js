
"use strict";

var fs = require ('fs');

var example = require ('./config/example.js');

var translate = require ('./config/languages.js');

var settings = {
	debug: require ('./config/debug.js')
};

settings.LABEL = {
	'board':
	{
		'software':'Software',
		'firmware':'Firmware',
		text: 'Embedded Linux'
	},
	'raspberrypi':
	{
		'software':'Raspberry Pi',
		'firmware':'Arduino',
		text: 'Raspberry Pi',
		usename: 'pi',
		password: 'raspberry'
	},
	'udooneo':
	{
		'software':'UDOO Neo',
		'firmware':'Arduino',
		text: 'UDOO Neo',
		username: 'udooer',
		password: 'udooer'
	},
	'arduinoyun':
	{
		'software':'Arduino Yun',
		'firmware':'Arduino',
		text: 'Arduino Yun',
		username: 'root',
		password: 'doghunter'
	},
	'beagleboneblack':
	{
		'software':'BeagleBone Black',
		'firmware':'',
		text: 'BeagleBone Black',
		username: 'udooer',
		password: 'udooer'
	},
};

settings.STYLE_NAMES = {
	'line': 'Line',
	// 'pie': 'Pie',
	// 'bar': 'Bar',
	'thermometer': 'Thermometer',
	'speedometer': 'Speedometer',
	'vumeter': 'Vumeter',
	'gauge': 'Gauge',
	// 'googlemap': 'Google maps',
	'extra': 'Extra',
	'switch': 'Switch',
	'slider': 'Slider'
};

settings.FIRMWARES = {
	'raspberrypi':
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
	},
	'udooneo':
	{
		'm4':'Arduino M4'
	},
	'arduinoyun':
	{
		'arduino':'Arduino'
	}
};

settings.LICENSE = fs.readFileSync (__dirname+'/../LICENSE').toString();

settings.VERSION = JSON.parse(fs.readFileSync (__dirname+'/../manifest.json').toString()).version;

settings.SENDER = 6000;

settings.MAKEFILE_STOARGE = {
	nodejs: fs.readFileSync (__dirname+'/embedded/Makefile.nodejs').toString(),
	python: fs.readFileSync (__dirname+'/embedded/Makefile.python').toString(),
	shell: fs.readFileSync (__dirname+'/embedded/Makefile.shell').toString(),
	visual: fs.readFileSync (__dirname+'/embedded/Makefile.visual').toString()
};

settings.EXAMPLE = example;

settings.TRANSLATE = translate;

settings.MAKE_FIRMWARE = {
	'raspberrypi':function (projectid, firmware, port)
	{
		var parameters = '-m '+firmware;
		if (port != 'auto') parameters += ' -p '+port;
		return 'mkdir /tmp/arduino_'+projectid+'_'+firmware+'; cd Arduino && rm -f .build && ln -s /tmp/arduino_'+projectid+'_'+firmware+' .build && ino build -m '+firmware+' && ino upload '+parameters;
	},
	'udooneo':function (projectid, firmware, port)
	{
		return 'timeout 120 xvfb-run /usr/bin/arduino -v --upload Arduino/Arduino.ino';
	},
	'arduinoyun':function (projectid, firmware, port)
	{
		return 'cd Arduino && make && run-avrdude Arduino.hex';
	}
};

settings.INTERVAL_MDNS = 10*1000;

settings.SIGNAL_PROPERTIES = {
	'line':
	{
		style:
		{
			text: 'Style',
			type: 'list',
			values: [{
						text: 'Straight',
						value: 'line'
					},
					{
						text: 'Spline',
						value: 'spline'
					},
					{
						text: 'Step',
						value: 'step'
					}],
			value: 'line'
		},

		title:
		{
			type: 'string',
			text: 'Name',
			value: ''
		},

		hideLegend:
		{
			type: 'boolean',
			text: 'Hide legend',
			value: false
		},

		fixedAxis:
		{
			type: 'boolean',
			text: 'Fix axes values',
			value: false
		},

		logarithmic:
		{
			type: 'boolean',
			text: 'Logarithmic axes',
			value: false
		},

		timeseries:
		{
			type: 'boolean',
			text: 'Time series',
			value: true
		},

		minAxisValue:
		{
			type:'double',
			text: 'Minimum axes value',
			value: 0

		},

		maxAxisValue:
		{
			type:'double',
			text: 'Maximum axes value',
			value: 1000

		},

		showPoints:
		{
			type:'boolean',
			text: 'Show points',
			value: false

		},

		maxPoints:
		{
			type:'number',
			text: 'Maximum points to show (0 means show all)',
			value: 10

		},

		axisName:
		{
			type: 'string',
			text: 'Axis name',
			value: ''
		},

		showOverview:
		{
			type: 'boolean',
			text: 'Show overview',
			value: false
		},

		showScrollbar:
		{
			type: 'boolean',
			text: 'Show scrollbar',
			value: false
		}
	},
	'thermometer':
	{
		title:
		{
			type: 'string',
			text: 'Name',
			value: ''
		},
		minAxisValue:
		{
			type:'double',
			text: 'Minimum value',
			value: 0

		},

		maxAxisValue:
		{
			type:'double',
			text: 'Maximum value',
			value: 1000

		},
		axisName:
		{
			type: 'string',
			text: 'Axis name',
			value: ''
		}
	},
	'speedometer':{
		title:
		{
			type: 'string',
			text: 'Name',
			value: ''
		},
		lowColor:
		{
			type:'color',
			text:'Low color',
			value: '#00ff00'
		},

		lowValue:
		{
			type:'double',
			text:'Low value',
			value: 50
		},

		midColor:
		{
			type:'color',
			text:'Mid color',
			value: '#ffff00'
		},

		midValue:
		{
			type:'double',
			text:'Mid value',
			value: 90
		},

		highColor:
		{
			type:'color',
			text:'High color',
			value: '#ff0000'
		},

		minimum_value:
		{
			type: 'number',
			value: 0,
			text: 'Minumum value'
		},
		maximum_value:
		{
			type: 'number',
			value: 100,
			text: 'Maximum value'
		},
		
		units:
		{
			type: 'list',
			values: [
				{
					text: 'Miles',
					value: 'mp/h'
				},
				{
					text: 'Kilometers',
					value: 'km/h'
				}
			],
			text: 'Measurement units',
			value: 'km/h'
		}
	},
	'vumeter':{
		title:
		{
			type: 'string',
			text: 'Name',
			value: ''
		},
		maximum_value:
		{
			type: 'number',
			value: 100,
			text: 'Maximum value'
		},
	},
	'gauge':{
		title:
		{
			type: 'string',
			text: 'Name',
			value: ''
		},
		lowColor:
		{
			type:'color',
			text:'Low color',
			value: '#00ff00'
		},

		lowValue:
		{
			type:'double',
			text:'Low value',
			value: 50
		},

		midColor:
		{
			type:'color',
			text:'Mid color',
			value: '#ffff00'
		},

		midValue:
		{
			type:'double',
			text:'Mid value',
			value: 90
		},

		highColor:
		{
			type:'color',
			text:'High color',
			value: '#ff0000'
		},

		minimum_value:
		{
			type: 'number',
			value: 0,
			text: 'Minumum value'
		},
		maximum_value:
		{
			type: 'number',
			value: 100,
			text: 'Maximum value'
		},
		
		units:
		{
			type: 'string',
			text: 'Measurement units',
			value: ''
		}
	},
	'extra':{
		title:
		{
			type: 'string',
			text: 'Name',
			value: ''
		},
		links:
        {
            type:'array',
            text:'Links (one image link per row)<br>if signal = 0, image from row 1<br>if signal = 1, image from row 2<br>if signal = 2, image from row 3',
            value: ''
        },
	},
	'switch':{
		title:
		{
			type: 'string',
			text: 'Name',
			value: ''
		},
		push:
		{
			type: 'boolean',
			value: false,
			text: 'Push'
		}
	},
	'slider':{
		title:
		{
			type: 'string',
			text: 'Name',
			value: ''
		},
		minimum_value:
		{
			type: 'number',
			value: 0,
			text: 'Minimum value'
		},

		maximum_value:
		{
			type: 'number',
			value: 100,
			text: 'Maximum value'
		},

		step:
		{
			type: 'number',
			value: 1,
			text: 'Step'
		}
	}
};

settings.LANGUAGES = [
	{
		title: 'visual',
		text: 'Visual',
		packagemanager: 
		{
			enable: false
		}
	},
	{
		title: 'nodejs',
		text: 'Javascript',
		packagemanager: 
		{
			enable: true,
			readonly: ['npm', 'serialport', 'wyliodrin'],
			available: {
				express:
				{
					description:'Fast, unopinionated, minimalist web framework'
				},
				request:
				{
					description:'Simplified HTTP request client.'
				},
				underscore:
				{
					description:'JavaScript\'s functional programming helper library.'
				},
				jade:
				{
					description:'A clean, whitespace-sensitive template language for writing HTML.'
				},
				bleno:
				{
					description:'A Node.js module for implementing BLE (Bluetooth Low Energy) peripherals'
				},
				noble:
				{
					description:'A Node.js BLE (Bluetooth Low Energy) central library.'
				},
				'johnny-five':
				{
					description:'The JavaScript Robotics and Hardware Programming Framework. Use with: Arduino (all models), Electric Imp, Beagle Bone, Intel Galileo &amp; Edison, Linino One, Pinoccio, pcDuino3, Raspberry Pi, Particle/Spark Core &amp; Photon, Tessel 2, TI Launchpad and more!'
				},
				mathjs:
				{
					description:'Math.js is an extensive math library for JavaScript and Node.js. It features a flexible expression parser and offers an integrated solution to work with numbers, big numbers, complex numbers, units, and matrices.'
				},
				mongoose:
				{
					description:'Mongoose MongoDB ODM'
				},
				nodemailer:
				{
					description:'Easy as cake e-mail sending from your Node.js applications'
				},
				redis:
				{
					description:'Redis client library'
				},
				mysql:
				{
					description:'A node.js driver for mysql. It is written in JavaScript, does not require compiling, and is 100% MIT licensed.'
				},
				async:
				{
					description:'Higher-order functions and common patterns for asynchronous code'
				},
				fb:
				{
					description:'NodeJS Library for Facebook'
				},
				'twitter-ng':
				{
					description:'Asynchronous Twitter REST/stream/search client API for node.js.'
				},
				twilio:
				{
					description:'A Twilio helper library'
				},
				serialport:
				{
					description:'Node.js package to access serial ports for reading and writing OR Welcome your robotic JavaScript overlords. Better yet, program them!'
				},
				ubidots:
				{
					description:'Node.js API Client for Ubidots'
				}
			}
		}
	},
	{
		title: 'python',
		text: 'Python',
		packagemanager: 
		{
			enable: true,
			readonly: ['pip', 'setuptools', 'supervisor', 'wyliodrin', 'pyserial', 'pybass', 'pyFirmata', 'BrickPi', 'ino', 'Jinja2', 'RPi.GPIO', 'smbus'],
			available:{
				requests: {
					description:'Requests is the only Non-GMO HTTP library for Python, safe for human consumption.'
				},
				scrappy:
				{
					description:'An open source and collaborative framework for extracting the data you need from websites.'
				},
				numpy:
				{
					description:'NumPy is the fundamental package for scientific computing with Python.'
				},
				matplot:
				{
					description:'matplotlib is a python 2D plotting library which produces publication quality figures in a variety of hardcopy formats and interactive environments across platforms.'
				},
				nltk:
				{
					description:'Natural Language Toolkit'
				},
				flask:
				{
					description:'Flask is a microframework for Python based on Werkzeug, Jinja 2 and good intentions. And before you ask: It\'s BSD licensed!'
				},
				django:
				{
					description:'The web framework for perfectionists with deadlines.'
				},
				sqlalchemy:
				{
					description:'The Python SQL Toolkit and Object Relational Mapper'
				},
				pyfirmata:
				{
					description: 'Python interface for the Firmata (http://firmata.org/) protocol.',
					website: 'https://github.com/tino/pyFirmata'
				},
				scipy:
				{
					description:'SciPy (pronounced “Sigh Pie”) is a Python-based ecosystem of open-source software for mathematics, science, and engineering.'
				},
				sympy:
				{
					description:'SymPy is a Python library for symbolic mathematics. It aims to become a full-featured computer algebra system (CAS) while keeping the code as simple as possible in order to be comprehensible and easily extensible. SymPy is written entirely in Python and does not require any external libraries.'
				},
				redis:
				{
					description:'The Python interface to the Redis key-value store.'
				},
				mysqldb:
				{
					description:'MySQLdb is an interface to the popular MySQL database server for Python.'
				},
				pymongo:
				{
					description:'PyMongo is a Python distribution containing tools for working with MongoDB, and is the recommended way to work with MongoDB from Python. This documentation attempts to explain everything you need to know to use PyMongo.'
				},
				'facebook-sdk':
				{
					description:'Facebook SDK for Python'
				},
				bluepy:
				{
					description:'Python interface to Bluetooth LE on Linux'
				},
				tweepy:
				{
					description:'Twitter for Python!'
				},
				twilio:
				{
					description:'The Twilio Python Helper Library'
				},
				pyserial:
				{
					description:'Python Serial Port Extension for Win32, OSX, Linux, BSD, Jython, IronPython'
				},
				ubidots:
				{
					description:'A python API client for Ubidots'
				}
			}
		}
	},
	{
		title: 'shell',
		text: 'Shell Script',
		packagemanager: 
		{
			enable: false
		}
	},
];

settings.MIXPANEL = require ('./config/mixpanel.js');

module.exports = settings;
