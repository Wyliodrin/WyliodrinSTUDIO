'use strict';

var joint = require ('jointjs');
//var dagre = require('dagre');
//var _ = require ('lodash');
//var sigma = require ('sigma');

var WIDTH = 55;
var HEIGHT = 55;
var OFFSET = 55/2;


	// // 	// Create a new directed graph 
	// // var g = new dagre.graphlib.Graph();

	// // // Set an object for the graph label
	// // g.setGraph({});

	// // // Default to assigning a new object as a label for each new edge.
	// // g.setDefaultEdgeLabel(function() { return {}; });

	// // var boards = [{name:'board 1', type:'raspberrypi', status:'online'}, 
	// // 	{name:'board 2', type:'raspberrypi', status:'offline'},
	// // 	{name:'bbbb', type:'arduino', link:'board 1'}];

	// // for (var i=0; i<boards.length; i++)
	// // {
	// // 	var node = boards[i];
	// // 	g.setNode(node.name, {width:WIDTH, height:HEIGHT});

	// // 	if (node.link)
	// // 	{
	// // 		g.setEdge (node.link, node.name);
	// // 	}
	// // }

	// // dagre.layout(g);

	// var graph = new joint.dia.Graph();

	//     var paper = new joint.dia.Paper({
	//         el: $('#graph-holder'),
	//         width: 1600,
	//         height: 500,
	//         model: graph,
	//         gridSize: 1,
	//        // interactive:false
	//     });

	// var rects = [];
	// g.nodes().forEach( function(v){
	// 	var node = g.node(v);
	// 	var rect = new joint.shapes.basic.Rect ({
	// 		position: {x:node.x, y:node.y},
	// 		attrs:{ rect: { fill: 'blue' ,width:node.width, height: node.height}, 
	// 				text: { text: v, fill: 'white' } }
	// 	});
	// 	console.log ({ rect: { fill: 'blue' ,width:node.width, height: node.height}, 
	// 				text: { text: v, fill: 'white' } });
	// 	rects.push(rect);
	// });

	// // var links = [];
	// // var edge;
	// // g.edges().forEach (function (e){
	// // 	edge = g.edge(e);
	// // 	//var link = new joint.dia.Link ({

	// // 	// });
	// // 	// var edge = g.edge(e);
	// // 	// var link = new joint.dia.Link({
	// //  //        source: { id: rects[0].id },
	// //  //        target: { id: rects[2].id }
	// //  //    });
	// // });

	// // var link = new joint.dia.Link({
 // //        source: { id: rects[0].id },
 // //        target: { id: rects[2].id },
 // //        attr: {events:'none'}
 // //    });

 // //   // link.set ('vertices', edge.points);

	// //  //    //paper.$el.css('pointer-events', 'none');



	// //     paper.on('cell:pointerclick', function(cellView, evt, x, y) { 
	// // 	    console.log('pointerdown on a blank area in the paper.');
	// // 	    console.log (cellView);
	// // 	    console.log (evt);
	// // 	    console.log (x);
	// // 	    console.log (y);
	// // 	});


	   // var rect = new joint.shapes.basic.Rect({
	    //     position: { x: 10, y: 80 },
	    //     attrs: { rect: { fill: 'blue' ,width:100, height: 30}, text: { text: 'my box', fill: 'white' } }
	    // });

	    // var rect2 = new joint.shapes.basic.Rect({
	    //     position: { x: 140, y: 130 },
	    //     attrs: { rect: { fill: 'blue' ,width:100, height: 30}, text: { text: 'my second box', fill: 'white' } }
	    // });

	// //  //    joint.shapes.basic.myRect = joint.shapes.basic.Generic.extend({
	// // 	//     markup: '<g class="rotatable"><g class="scalable"><image/></g><text/></g>',

	// // 	//     defaults: joint.util.deepSupplement({
	// // 	//         type: 'basic.Rect',
	// // 	//         attrs: {
	// // 	//             'image': {'follow-scale': true, width: 80, height: 40 },
	// // 	//             'text': {'font-size': 14, ref: 'image',}
	// // 	//         }
	// // 	//     }, joint.shapes.basic.Generic.prototype.defaults)
	// // 	// });

	// // 	// var rect3 = new joint.shapes.basic.myRect ({
	// // 	// 	position: {x: 120, y:100},
	// // 	// 	attrs: {
	// // 	// 		image:{
	// // 	// 			'xlink:href':'/public/drawable/arduinoyun.png'
	// // 	// 		},
	// // 	// 		text: {text: 'test', fill: 'black', 'ref-x':10, 'ref-y': 10}
	// // 	// 	}
	// // 	// });


	// //     // var rect2 = rect.clone();
	// //     // rect2.translate(300);

	    // var link = new joint.dia.Link({
	    //     source: { id: rect.id },
	    //     target: { id: rect2.id }
	    // });

	// //  //    //link.set('router', { name: 'manhattan' });

	// //    // link.set('manhattan', true);
	// //     link.attr({
 // //    '.marker-source': { display:'none' },
 // //    '.marker-target': { display:'none' },
 // //    '.marker-vertices':{display:'none'},
 // //    '.connection-wrap':{display:'none'},
 // //    '.link-tools':{display:'none'},
 // //    '.marker-arrowheads':{display:'none'}

	// // });
	// //     rects.push(link);
	// //  graph.addCells(rects);

	var graph = new joint.dia.Graph();

    var paper = new joint.dia.Paper({
        el: $('#graph-holder'),
        width: 600,
        height: 200,
        model: graph,
        gridSize: 1
    });

    var rect = new joint.shapes.basic.Rect({
        position: { x: 100, y: 30 },
        size: { width: 100, height: 30 },
        attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
    });

    var rect2 = rect.clone();
    rect2.translate(300);

    var link = new joint.dia.Link({
        source: { id: rect.id },
        target: { id: rect2.id }
    });

    graph.addCells([rect, rect2, link]);
	