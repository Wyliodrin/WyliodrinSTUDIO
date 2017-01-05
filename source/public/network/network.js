'use strict';

var joint = require ('jointjs');
var $ = require ('jquery');
var dagre = require('dagre');
var _ = require ('lodash');
var settings = require ('./settings.js');

global.jQuery = $;
require ('jquery-contextmenu');

var NODE_WIDTH = 75;
var NODE_HEIGHT = 75;

var IMG_WIDTH = 44;
var IMG_HEIGHT = 44;

var g;

setTimeout (function ()
{
	var rectangleDevices = {};
  	var network = window.parent.getNetwork ();
  	var action = network.getAction();
  	var devs = network.getDevices();
  	var devicesList = devs.list;
  	var devicesTree = devs.tree;

  	var graph = new joint.dia.Graph();
	var paper = new joint.dia.Paper({
	    el: $('#graph-holder'),
	    width: 1600,
	    height: 500,
	    model: graph,
	    gridSize: 1,
	   	interactive: true
	});

	joint.shapes.basic.routerRect = joint.shapes.basic.Generic.extend({
	    markup: '<g><image/><text class="name"></text><text class="address"></text><rect/></g>',
	    defaults: joint.util.deepSupplement({
	        type: 'basic.Rect',
	        attrs: {
	        	rect:{width:IMG_WIDTH, height:IMG_HEIGHT, x:0, y:0, fill:'none', 'stroke-width': 3},
	            image: {width: IMG_WIDTH, height: IMG_HEIGHT},
	           	'.name': {'font-size': 16, ref: 'image', 'ref-x':23, 'ref-y': -10,'y-alignment': 'middle', 'x-alignment': 'middle'}
	        }
	    }, joint.shapes.basic.Generic.prototype.defaults)
	});
	joint.shapes.basic.embeddedRect = joint.shapes.basic.Generic.extend({
	    markup: '<g><image/><text class="name"></text><text class="address"></text><rect/></g>',
	    defaults: joint.util.deepSupplement({
	        type: 'basic.Rect',
	        attrs: {
	        	rect:{width:IMG_WIDTH, height:IMG_HEIGHT, x:0, y:0, fill:'none', 'stroke-width': 3},
	            image: {width: IMG_WIDTH, height: IMG_HEIGHT},
	           	'.name': {'font-size': 16, ref: 'image', 'ref-x':23, 'ref-y': -22,'y-alignment': 'middle', 'x-alignment': 'middle'},
	           	'.address': {'font-size': 13, fill:'grey', ref: 'image', 'ref-x':23, 'ref-y': -10,'y-alignment': 'middle', 'x-alignment': 'middle'},
	        }
	    }, joint.shapes.basic.Generic.prototype.defaults)
	});
	joint.shapes.basic.controllerRect = joint.shapes.basic.Generic.extend({
	    markup: '<g><image/><text/></g>',
	    defaults: joint.util.deepSupplement({
	        type: 'basic.Rect',
	        attrs: {
	            image: {width: IMG_WIDTH, height: IMG_HEIGHT},
	           	text: {'font-size': 14, fill:'grey', ref: 'image', 'ref-x':23, 'ref-y': -15,'y-alignment': 'middle', 'x-alignment': 'middle'}
	        }
	    }, joint.shapes.basic.Generic.prototype.defaults)
	});


  	network.devices = function (_devicesList, _devicesTree)
  	{
  		console.log ('git devices in network');
  		
  		devicesList = _devicesList;
  		devicesTree = _devicesTree;
  		console.log (devicesList);
		console.log (devicesTree);
  		buildGraph ();
  		drawGraph ();
  	};

  	network.status = function (device)
  	{
  		console.log ('network status');
  		console.log (device);
  		console.log (rectangleDevices);
  		var rect = rectangleDevices[device.id].rect;
  		var links = rectangleDevices[device.id].links;


  		if (device.status === 'CONNECTED')
  		{
  			console.log ('status is connected');
  			rect.attr({
  				rect: {stroke: 'green'},
  				'.name':{fill: 'green'},
  				'.address': {text: device.ip}});
  			links.forEach (function (link){
  				link.attr({'.connection':{stroke:'green'}});
  			});
  		}
  		else if (device.status === 'DISCONNECTED')
  		{
  			rect.attr({
  				rect: {stroke: 'grey'},
  				'.name':{fill: 'black'},
  				'.address': {text: device.ip}
  			});
  			links.forEach (function (link){
  				link.attr({'.connection':{stroke:'grey'}});
  			});
  		}
  		else
  		{
  			rect.attr({
  				rect: {stroke: 'grey'},
  				'.name':{fill: 'black'},
  				'.address': {text: device.status}
  			});
  			links.forEach (function (link){
  				link.attr({'.connection':{stroke:'grey'}});
  			});
  		}
  	};

  	//   	// networkDevices.forEach (function (d){statusDevices[d.ip] = 'DISCONNECTED';});

  	function getDeviceById (id)
  	{
  		var board = devicesTree[id];
  		if (board === undefined)
  		{
  			for (var i=0; i<devicesList.length; i++)
  			{
  				var controllers = devicesList[i].peripherals;
  				if (controllers)
  				{
  					for (var c=0; c< controllers.length; c++)
  					{
  						if (controllers[c].name === id)
  							return controllers[c];
  					}
  				}
  			}
  		}
  		return board;
  	}

	function buildGraph ()
	{
		g = new dagre.graphlib.Graph();
		g.setGraph({});
		g.setDefaultEdgeLabel(function() { return {}; });

		g.setNode ('router', {width:NODE_WIDTH, height:NODE_HEIGHT});
		g.setNode ('computer', {width:NODE_WIDTH, height:NODE_HEIGHT});
		g.setEdge ('router', 'computer');
		for (var i=0; i<devicesList.length; i++)
		{
			var node = devicesList[i];
			console.log ('node is');
			console.log (node);
			g.setNode(node.id, {width:NODE_WIDTH, height:NODE_HEIGHT});
			if (node.uplink === 'local')
				g.setEdge('router', node.id);
			else
				g.setEdge('computer', node.id);

			if (node.peripherals)
				for (var c=0; c<node.peripherals.length; c++)
				{
					var controller = node.peripherals[c];
					g.setNode(controller.id, {width:NODE_WIDTH, height:NODE_HEIGHT});
					g.setEdge(node.id, controller.id);
				}	
		}
		dagre.layout(g);
	}

	function drawGraph ()
	{
		var rects = [];

		g.nodes().forEach(function (v){
			console.log (v);
			var board = getDeviceById (v);
			var node = g.node(v);
			var rect;

			var boardImage;
			if (!board)
			{
				if (v === 'router')
					rect = new joint.shapes.basic.routerRect ({
						id: 'router',
						position: {x:node.x, y:node.y},
						attrs: {
								rect: {stroke: 'green'},
								image:{'xlink:href': '/public/drawable/router.png'},
								'.name': {text: 'Router', fill: 'green'}
							}
					});
				else
					rect = new joint.shapes.basic.routerRect ({
						id: 'computer',
						position: {x:node.x, y:node.y},
						attrs: {
								rect: {stroke: 'green'},
								image:{'xlink:href': '/public/drawable/pc.png'},
								'.name': {text: 'My Computer', fill: 'green'}
							}
					});

			}
			else if (board && board.uplink)
			{
				var rectStroke;
				var textFill;
				var dasharray;
				if (board.status === 'CONNECTED')
				{
					rectStroke = 'green';
					textFill = 'green';
				}
				else if (board.status === 'MISSING')
				{
					rectStroke = 'grey';
					textFill = 'grey';
					dasharray = true;
				}
				else 
				{
					rectStroke = 'grey';
					textFill = 'black';
				}

				// if (board.options.category === 'raspberrypi')
				// 	boardImage = '/public/drawable/raspberrypi.png';
				// else if (board.options.category === 'arduinoyun')
				// 	boardImage = '/public/drawable/arduinoyun.png';
				// else if (v === 'router')
				// 	boardImage = '/public/drawable/router.png';
				boardImage = settings.boards[board.properties.category].picture;
				if (dasharray)
					rect = new joint.shapes.basic.embeddedRect ({
					id: board.id,
					position: {x:node.x, y:node.y},
					attrs: {
							rect: {stroke: rectStroke, 'stroke-dasharray': '5 2'},
							image:{'xlink:href': boardImage},
							'.name': {text: board.name, fill: textFill},
							'.address':{text: board.ip}
						}
					});
				else
					rect = new joint.shapes.basic.embeddedRect ({
					id: board.id,
					position: {x:node.x, y:node.y},
					attrs: {
							rect: {stroke: rectStroke},
							image:{'xlink:href': boardImage},
							'.name': {text: board.name, fill: textFill},
							'.address':{text: board.ip}
						}
					});
				rectangleDevices[board.id] = {rect: rect, links:[]};
			}
			else
			{
				if (board.type === 'vendor')
					boardImage = settings.boards[board.vendor].picture;//'/public/drawable/openmote.png';

				rect = new joint.shapes.basic.controllerRect ({
				id: board.id,
				position: {x:node.x, y:node.y},
				attrs: {
						image:{'xlink:href': boardImage},
						text: {text: board.port}
					}
				});
				rectangleDevices[board.id] = {rect: rect, links:[]};
			}		
			rects.push (rect);
		});

		var links = [];
		var edge;

		g.edges().forEach (function (e){
			var sourceNode = getDeviceById(e.v);
			var destNode = getDeviceById(e.w);
			var storingNode;

			var link = new joint.dia.Link({
		        source: { id: e.v },
		        target: { id: e.w}
		    });

			link.set('router', { name: 'metro' });

		    var status;
		    if ((e.v === 'router' || e.v === 'computer') && 
		    	(e.w === 'router' || e.w === 'computer'))
		    {
		    	status = 'CONNECTED';
		    }
		   	else if (!sourceNode)
	    	{
		    	status = destNode.status;
		    	storingNode = destNode;
		    }
		    else
		    {
		    	status = sourceNode.status;
		    	storingNode = sourceNode;
		    }

		    if (status === 'CONNECTED')
		    {
		    	link.attr({
				    '.marker-source': { display:'none' },
				    '.marker-target': { display:'none' },
				    '.marker-vertices':{display:'none'},
				    '.connection-wrap':{display:'none'},
				    '.link-tools':{display:'none'},
				    '.marker-arrowheads':{display:'none'},
					'.connection':{stroke:'green'}});
		    }
		    else if (status === 'MISSING')
		    {
		    	link.attr({
				    '.marker-source': { display:'none' },
				    '.marker-target': { display:'none' },
				    '.marker-vertices':{display:'none'},
				    '.connection-wrap':{display:'none'},
				    '.link-tools':{display:'none'},
				    '.marker-arrowheads':{display:'none'},
					'.connection':{stroke:'grey', 'stroke-dasharray': '5 2'}});
		    }
		    else
		    {
		    	link.attr({
				    '.marker-source': { display:'none' },
				    '.marker-target': { display:'none' },
				    '.marker-vertices':{display:'none'},
				    '.connection-wrap':{display:'none'},
				    '.link-tools':{display:'none'},
				    '.marker-arrowheads':{display:'none'},
					'.connection':{stroke:'grey'}});
		    }
		    if (storingNode)
		    	rectangleDevices[storingNode.id].links.push(link);
		    links.push(link);
		});
		graph.clear();
		graph.addCells(_.union(rects, links));
	}
	
	var selectedBoard;
	var selectedX;
	var selectedY;

	if (action === 'network')
	{
		$.contextMenu({
		    // define which elements trigger this menu 
		    selector: "#graph-holder", 
	        trigger: 'none',
	        build: function (){
	        	if (selectedBoard.status === 'CONNECTED' || 
	        		selectedBoard.status === 'SEPARATOR')
		        	return {
		        		items: {
					        connect: {
					        	name: "Disconnect",
					        	icon: "disconnect",
					        	callback: function(key, opt){
					        		network.disconnectDevice (selectedBoard);
					        	}
					        },
					        shell: {
					        	name: 'Shell',
					        	icon: "shell",
					        	callback: function (){
					        		network.shell (selectedBoard);
					        	}
					        }
				    	},
				    	position: function(opt, x, y){
			        		opt.$menu.css({top: selectedY, left: selectedX});
			    		} 
		        	};
		        else
		        	return {
		        		items: {
					        connect: {
					        	name: "Connect", 
					        	icon: "connect",
					        	callback: function(key, opt){network.connectDevice (selectedBoard);}
					        }
				    	},
				    	position: function(opt, x, y){
			        		opt.$menu.css({top: selectedY, left: selectedX});
			    		}
		        	};
	        }
		});
	}
	else if (action === 'deploy') 
	{
		var appsCallbackFunction = function (key, opt){
			network.deploy.network[selectedBoard] = key;
		};
		network.getApplications (function (apps){
			$.contextMenu({
			    // define which elements trigger this menu 
			    selector: "#graph-holder", 
		        trigger: 'none',
		        build: function (){
		        	var menu = {
		        		items:{},
		        		position: function(opt, x, y){
			        		opt.$menu.css({top: selectedY, left: selectedX});
			    		} 
		        	};

		        	for (var a=0; a<apps.length; a++)
		        	{
		        		menu.items[apps[a].id] = {
		        			name: apps[a].title,
		        			callback: appsCallbackFunction
		        		};
		        	}
		        	//TODO
		        	// if (selectedBoard.status === 'CONNECTED' || 
		        	// 	selectedBoard.status === 'SEPARATOR')
			        // 	{
			        		
					      //  menu.items.connect=  {
					      //   	name: "Disconnect",
					      //   	icon: "disconnect",
					      //   	callback: function(key, opt){
					      //   		network.disconnectDevice (selectedBoard);
					      //   	}
					      //   };
			        // 	}
			        // else
			        // {
			        // 	menu.items.connect= {
				       //  	name: "Connect", 
				       //  	icon: "connect",
				       //  	callback: function(key, opt){network.connectDevice (selectedBoard);}
				       //  };
			        // }
			        return menu;
		        }
			});
		});
	}

	

	paper.on('cell:pointerclick', function(cellView, evt, x, y) { 
		selectedX = x;
		selectedY = y;
		selectedBoard = getDeviceById (cellView.model.id);
		if (selectedBoard && selectedBoard.id)
			$('#graph-holder').contextMenu();
	});

	buildGraph ();
  	drawGraph ();
  
}, 1000);


	