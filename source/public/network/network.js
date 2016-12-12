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

setTimeout (function ()
{
	var rectangleDevices = {};
  	var network = window.parent.getNetwork ();
  	var networkDevices = network.getDevices();
  	network.devices = function (devices)
  	{
  		networkDevices = devices;
  		buildGraph ();
  		paper = new joint.dia.Paper({
		    el: $('#graph-holder'),
		    width: 1600,
		    height: 500,
		    model: graph,
		    gridSize: 1,
		   	interactive: true
		});
		drawGraph ();
  	};

  	network.status = function (boardId, status)
  	{
  		var rect = rectangleDevices[boardId].rect;
  		var links = rectangleDevices[boardId].links;
  		var board = getBoardById (boardId);
  		console.log(rect);

  		if (status === 'CONNECTED')
  		{
  			console.log ('status is connected');
  			rect.attr({
  				rect: {stroke: 'green'},
  				'.name':{fill: 'green'},
  				'.address': {text: board.options.address}});
  			links.forEach (function (link){
  				link.attr({'.connection':{stroke:'green'}});
  			});
  		}
  		else if (status === 'DISCONNECTED')
  		{
  			rect.attr({
  				rect: {stroke: 'grey'},
  				'.name':{fill: 'black'},
  				'.address': {text: board.ip}
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
  				'.address': {text: status}
  			});
  			links.forEach (function (link){
  				link.attr({'.connection':{stroke:'grey'}});
  			});
  		}
  	};

  	//   	// networkDevices.forEach (function (d){statusDevices[d.ip] = 'DISCONNECTED';});

  	function getBoardById (id)
  	{
  		var board = _.find (networkDevices, function (d) {return d.id === id;});
  		if (board === undefined)
  		{
  			for (var i=0; i<networkDevices.length; i++)
  			{
  				var controllers = networkDevices[i].controllers;
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

  // 	var boards = [{name:'board_1', type:'raspberrypi', status:'online', address:'192.168.10.2', controllers:[{name:'my_openmote', type:'openmote'},{name:'board', type:'openmote'}]}, 
		// {name:'board 2', type:'raspberrypi', status:'offline', address:'192.168.10.10', controllers:[{name:'mote_1', type:'openmote'}]}];

	var g = new dagre.graphlib.Graph();
	g.setGraph({});
	g.setDefaultEdgeLabel(function() { return {}; });

	//g.setNode ('router', {width:NODE_WIDTH, height:NODE_HEIGHT, type:'router', name:'Network', address: '192.168.10.1'});

	function buildGraph ()
	{
		for (var i=0; i<networkDevices.length; i++)
		{
			var node = networkDevices[i];
			g.setNode(node.id, {width:NODE_WIDTH, height:NODE_HEIGHT});
			//g.setEdge('router', node.name);

			if (node.controllers)
				for (var c=0; c<node.controllers.length; c++)
				{
					var controller = node.controllers[c];
					g.setNode(controller.name, {width:NODE_WIDTH, height:NODE_HEIGHT});
					g.setEdge(node.id, controller.name);
				}	
		}
		dagre.layout(g);
	}

	function drawGraph ()
	{
		var rects = [];
		g.nodes().forEach(function (v){
			var board = getBoardById (v);
			var node = g.node(v);
			var rect;

			var boardImage;
			if (board.options.address)
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
				boardImage = settings.boards[board.options.category].picture;
				if (dasharray)
					rect = new joint.shapes.basic.embeddedRect ({
					id: board.id,
					position: {x:node.x, y:node.y},
					attrs: {
							rect: {stroke: rectStroke, 'stroke-dasharray': '5 2'},
							image:{'xlink:href': boardImage},
							'.name': {text: board.options.name, fill: textFill},
							'.address':{text: board.options.ip}
						}
					});
				else
					rect = new joint.shapes.basic.embeddedRect ({
					id: board.id,
					position: {x:node.x, y:node.y},
					attrs: {
							rect: {stroke: rectStroke},
							image:{'xlink:href': boardImage},
							'.name': {text: board.options.name, fill: textFill},
							'.address':{text: board.options.address}
						}
					});
				rectangleDevices[board.id] = {rect: rect, links:[]};
			}
			else
			{
				if (board.type === 'openmote')
					boardImage = settings.boards[board.type].picture;//'/public/drawable/openmote.png';

				rect = new joint.shapes.basic.controllerRect ({
				id: board.name,
				position: {x:node.x, y:node.y},
				attrs: {
						image:{'xlink:href': boardImage},
						text: {text: board.name}
					}
				});
				rectangleDevices[board.name] = {rect: rect, links:[]};
			}		
			rects.push (rect);
		});

		var links = [];
		var edge;

		g.edges().forEach (function (e){
			var sourceNode = getBoardById(e.v);
			var destNode = getBoardById(e.w);
			var storingNode;

			var link = new joint.dia.Link({
		        source: { id: e.v },
		        target: { id: e.w}
		    });

			link.set('router', { name: 'metro' });

		    var status;
		    if (sourceNode.category === 'router')
	    	{
		    	status = sourceNode.status;
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
		    rectangleDevices[storingNode.id].links.push(link);
		    links.push(link);
		});
		graph.addCells(_.union(rects, links));
	}

	var graph = new joint.dia.Graph();
	var paper = new joint.dia.Paper({
	    el: $('#graph-holder'),
	    width: 1600,
	    height: 500,
	    model: graph,
	    gridSize: 1,
	   	interactive: true
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

	
	var selectedBoard;
	var selectedX;
	var selectedY;

//	console.log(networkDevices);

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
				        		network.disconnectDevice (selectedBoard.id);
				        	}
				        },
				        shell: {
				        	name: 'Shell',
				        	icon: "shell",
				        	callback: function (){
				        		network.shell (selectedBoard.id);
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

	buildGraph ();
	drawGraph ();

	paper.on('cell:pointerclick', function(cellView, evt, x, y) { 
		selectedX = x;
		selectedY = y;
		selectedBoard = getBoardById (cellView.model.id);
		console.log(networkDevices);
		if (selectedBoard && selectedBoard.id)
			$('#graph-holder').contextMenu();
	});
  
}, 1000);


	