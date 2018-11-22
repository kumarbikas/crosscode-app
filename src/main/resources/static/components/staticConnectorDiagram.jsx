import React from 'react';

class NetworkDiagram1 extends React.Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
    
    var graph1 = new joint.dia.Graph();
        var paper1 = new joint.dia.Paper({
	    el: $('#diagram'),
	    width: 800,
	    height: 600,
	    gridSize: 1,
	    model: graph1,
	    perpendicularLinks: true,
	    restrictTranslate: true,
		smooth: true
	});

    var member = function(x, y, rank, name, image, background, textColor) {

		textColor = textColor || "#000";
	
		var cell = new joint.shapes.basic.Rect({
		position: { x: x, y: y }, size: { width: 100, height: 40 },
			attrs: {
				rect: { id:name,'stroke-width': '3', 'stroke-opacity': .7, stroke: 'black', rx: 3, ry: 3, fill: background, 'fill-opacity': .5 },
				text: { text: name, 'font-size': 10, style: { 'text-shadow': '1px 1px 1px lightgray' } }
			}
		});
		
		
		graph1.addCell(cell);
		return cell;
	};
	
	function tooltip(text,id) {
	
	console.log('rectangle id is ' + id);
	var title = document.createElementNS("http://www.w3.org/2000/svg","title")
	title.textContent = text
	title.setAttribute("class","tooltip");
	document.getElementById(id).appendChild(title)
  
	}
	function link(source, target, breakpoints) {
		
		var cell = new joint.shapes.org.Arrow({
			source: { id: source.id },
			target: { id: target.id },
			//router: { name: 'metro' },
			//connector: { name: 'rounded' },
			
			//vertices: breakpoints,
			attrs: {
				'.connection': {
					'fill': 'none',
					'stroke-linejoin': 'round',
					'stroke-width': '2',
					'stroke': '#4b4a67'
				},
				'.marker-target': {
					fill: '#333333',
					d: 'M 10 0 L 0 5 L 10 10 z'
				}
			}

		});
		
		graph1.addCell(cell);
		return cell;
	}
	var data = { "machineid": "1234", "machinename": "Crosscode1", "ipAddress": "10.133.144.167", "processList": [ { "processid": "process-1", "processname": "process-1", "established":[ "process-2","process-3" ], "listen":[ "process-4","process-5" ] }, { "processid": "process-2", "processname": "process-2", "established":[ "process-1","process-3" ], "listen":[ "process-4","process-5" ] }, { "processid": "process-3", "processname": "process-3", "established":[ "process-2","process-1" ], "listen":[ "process-4","process-5" ] }, { "processid": "process-4", "processname": "process-4", "established":[], "listen":[ "process-1","process-5" ] }, { "processid": "process-5", "processname": "process-5", "established":[ "process-3","process-4" ], "listen":[ "process-1","process-2" ] } ] }
	
	
	var parent;
	var child_arr = {};
	var posIndex = 0
	$.each(data, function (key, machine) {

	   if(key == "ipAddress"){
					
			if(machine!=""){
				parent = member(130,180,'', machine, '#7c68fd', '#30d0c6');
				tooltip( 'IP:'+machine,machine);
			}
	   }
	   if(key == "processList"){      
		var x = 250;
		var y = 20;
		   $.each(machine,function(index,process){
		   if(posIndex%2==0){
			x = 250;
			
		   }else{
			x = 500;
		   }
		   posIndex = posIndex + 1;
		   
			var child = member(x , y ,'', process.processname, '', '#7c68fd', '#f1f1f1');
			child_arr[process.processname] = child;
			tooltip( 'Process:'+process.processname,process.processname);
			y = y + 90;
			link(parent, child, [{x: 250, y: 200}]);

								
			}); 
		}
	});

	$.each(data.processList,function(key,connection){
		console.log(data.processList[key])
		console.log("connection::::: "+connection.established.length);
		if(connection.established.length>0){
			$.each(connection.established,function(index,estItem){
				
				link(child_arr[connection.processid], child_arr[estItem], [{x: 250, y: 200}]);
				
			});
		}
		if(connection.listen.length>0){
			$.each(connection.listen,function(index,lstItem){
				
				link(child_arr[connection.processid], child_arr[lstItem], [{x: 250, y: 200}]);
			});
		}
	});
	

}

    render() {
        return <div id="diagram"></div>;
    }
}

export default NetworkDiagram1;