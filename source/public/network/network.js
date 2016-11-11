'use strict';

var joint = require ('jointjs');
var $ = require ('jquery');
var dagre = require('dagre');
var _ = require ('lodash');

global.jQuery = $;
require ('jquery-contextmenu');

console.log ($.loaded);


var NODE_WIDTH = 75;
var NODE_HEIGHT = 75;

var IMG_WIDTH = 44;
var IMG_HEIGHT = 44;

setTimeout (function ()
{
	var networkDevices = [];
	var statusDevices = {};
	var rectangleDevices = {};
  	var network = window.parent.getNetwork ();
  	network.devices = function (devices)
  	{
  		console.log('devices');
  		console.log(devices);
  		var newDevices = _.difference (devices, networkDevices);
  		console.log(newDevices);
  		var missingDevices = _.difference (networkDevices, devices);
  		newDevices.forEach (function (d){statusDevices[d.ip] = 'DISCONNECTED';});
  		missingDevices.forEach (function (d){statusDevices[d.ip] = 'MISSING';});
  		networkDevices = _.union (networkDevices, devices);
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
  		console.log('status');
  		console.log(status);
  		console.log(boardId);

  		statusDevices[boardId] = status;
  		  		console.log(statusDevices);
  		var rect = rectangleDevices[boardId].rect;
  		var links = rectangleDevices[boardId].links;
  		var board = getBoardById (boardId);
  		console.log(board);
  		if (status === 'CONNECTED')
  		{
  			rect.attr({
  				rect: {stroke: 'green'},
  				'.name':{fill: 'green'},
  				'.address': {text: board.ip}});
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

  	networkDevices = network.getDevices();
  	networkDevices.forEach (function (d){statusDevices[d.ip] = 'DISCONNECTED';});

  	function getBoardById (id)
  	{
  		var board = _.find (networkDevices, function (d) {return d.ip === id;});
  		if (board === undefined)
  		{
  			for (var i=0; i<networkDevices.length; i++)
  			{
  				var controllers = networkDevices[i].controllers;
  				if (controllers)
  				{
  					for (var c=0; c< controllers.length; c++)
  					{
  						if (controllers[c].ip === id)
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
			g.setNode(node.ip, {width:NODE_WIDTH, height:NODE_HEIGHT});
			//g.setEdge('router', node.name);

			if (node.controllers)
				for (var c=0; c<node.controllers.length; c++)
				{
					var controller = node.controllers[c];
					g.setNode(controller.name, {width:NODE_WIDTH, height:NODE_HEIGHT});
					g.setEdge(node.ip, controller.name);
				}	
		}
		dagre.layout(g);
	}

	function drawGraph ()
	{
		var rects = [];
		g.nodes().forEach(function (v){
			console.log(v);
			var node = getBoardById (v);
			var rect;

			var boardImage;
			if (node.ip)
			{
				var rectStroke;
				var textFill;
				var dasharray;
				if (statusDevices[v] === 'CONNECTED')
				{
					rectStroke = 'green';
					textFill = 'green';
				}
				else if (statusDevices[v] === 'MISSING')
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

				if (node.category === 'raspberrypi')
					boardImage = '/public/drawable/raspberrypi.png';
				else if (node.category === 'arduinoyun')
					boardImage = '/public/drawable/arduinoyun.png';
				else if (v === 'router')
					boardImage = '/public/drawable/router.png';

				if (dasharray)
					rect = new joint.shapes.basic.embeddedRect ({
					id: node.ip,
					position: {x:node.x, y:node.y},
					attrs: {
							rect: {stroke: rectStroke, 'stroke-dasharray': '5 2'},
							image:{'xlink:href': boardImage},
							'.name': {text: node.name, fill: textFill},
							'.address':{text: node.ip}
						}
					});
				else
					rect = new joint.shapes.basic.embeddedRect ({
					id: node.ip,
					position: {x:node.x, y:node.y},
					attrs: {
							rect: {stroke: rectStroke},
							image:{'xlink:href': boardImage},
							'.name': {text: node.name, fill: textFill},
							'.address':{text: node.ip}
						}
					});
			}
			else
			{
				if (node.type === 'openmote')
					boardImage = '/public/drawable/openmote.png';

				rect = new joint.shapes.basic.controllerRect ({
				id: node.ip,
				position: {x:node.x, y:node.y},
				attrs: {
						image:{'xlink:href': boardImage},
						text: {text: node.name}
					}
				});
			}
			rectangleDevices[node.ip] = {rect: rect, links:[]};
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
		    	status = statusDevices[destNode];
		    	storingNode = destNode;
		    }
		    else
		    {
		    	status = statusDevices[sourceNode];
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
		    rectangleDevices[storingNode.ip].links.push(link);
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
        	console.log (selectedBoard.ip);
        	console.log (statusDevices[selectedBoard.ip]);
        	console.log (statusDevices);
        	if (statusDevices[selectedBoard.ip] === 'CONNECTED' || 
        		statusDevices[selectedBoard.ip] === 'SEPARATOR')
	        	return {
	        		items: {
				        connect: {
				        	name: "Disconnect", 
				        	callback: function(key, opt){
				        		network.disconnectDevice (selectedBoard.ip);
				        	}
				        },
				        shell: {
				        	name: 'Shell',
				        	callback: function (){
				        		network.shell (selectedBoard.ip);
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
		if (selectedBoard)
			$('#graph-holder').contextMenu();
	});
  
}, 1000);


	