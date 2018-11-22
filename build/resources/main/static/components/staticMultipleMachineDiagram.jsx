import React from 'react';

class staticMultipleMachineDiagram extends React.Component {
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
	var data = { "machineid": "1234", "machinename": "Crosscode1", "ipAddress": "ip-172-31-41-192", "machineList": [{ "hostName": "ip-172-31-42-177", "established": ["ip-172-31-45-62"] }, { "hostName": "ip-172-31-28-170", "established": ["ip-172-31-45-62"] }] }
	
	/*$.ajax({
		type: 'GET', 
		url: 'https://f5tbsp1k79.execute-api.us-west-2.amazonaws.com/local/getprocesses', 
		data: {}, 
		dataType: 'json',
		success: function (data) { 
			console.log('inside success');
			var parent;
	var child_arr = {};
	
	var data = $.parseJSON(data);
	$.each(data, function (key, machine) {

	   if(key == "ipAddress"){
					
			if(machine!=""){
				parent = member(130,180,'', machine, '#7c68fd', '#30d0c6');
				tooltip( 'IP:'+machine,machine);
			}
	   }
	   if(key == "machineList"){      
		var x = 250;
		var y = 140;
		   $.each(machine,function(index,hosts){
		   		   
			var child = member(x , y ,'', hosts.hostName, '', '#7c68fd', '#f1f1f1');
			child_arr[hosts.hostName] = child;
			tooltip( 'Hosts:'+hosts.hostName,hosts.hostName);
			y = y + 90;
			link(parent, child, [{x: 250, y: 200}]);

								
			}); 
		}
	});

	var estChild_array = {};
	var estbX = 500;
	var estbY = 200;
	$.each(data.machineList,function(key,connection){
		console.log(data.machineList[key])
		console.log("connection::::: "+connection.established.length);
		if(connection.established.length>0){
			$.each(connection.established,function(index,estItem){
				console.log('estChild_array[estItem]  :::: ' + estChild_array[estItem] + estItem);
				if(estChild_array[estItem] === undefined){
					var child = member(estbX , estbY ,'', estItem, '', '#7c68fd', '#f1f1f1');
					estChild_array[estItem] = child;
				}
				console.log('estChild_array[estItem] :::: ' + estChild_array[estItem]);
				link(child_arr[connection.hostName], estChild_array[estItem], [{x: 250, y: 200}]);
				
			});
			
			estbY = estbY + 20;
		}
		
	});
		
			
		}
	});
	
	*/
	
	var parent;
	var child_arr = {};
	
	$.each(data, function (key, machine) {

	   if(key == "ipAddress"){
					
			if(machine!=""){
				parent = member(130,180,'', machine, '#7c68fd', '#30d0c6');
				tooltip( 'IP:'+machine,machine);
			}
	   }
	   if(key == "machineList"){      
		var x = 250;
		var y = 140;
		   $.each(machine,function(index,hosts){
		   		   
			var child = member(x , y ,'', hosts.hostName, '', '#7c68fd', '#f1f1f1');
			child_arr[hosts.hostName] = child;
			tooltip( 'Hosts:'+hosts.hostName,hosts.hostName);
			y = y + 90;
			link(parent, child, [{x: 250, y: 200}]);

								
			}); 
		}
	});

	var estChild_array = {};
	var estbX = 500;
	var estbY = 200;
	$.each(data.machineList,function(key,connection){
		console.log(data.machineList[key])
		console.log("connection::::: "+connection.established.length);
		if(connection.established.length>0){
			$.each(connection.established,function(index,estItem){
				console.log('estChild_array[estItem]  :::: ' + estChild_array[estItem] + estItem);
				if(estChild_array[estItem] === undefined){
					var child = member(estbX , estbY ,'', estItem, '', '#7c68fd', '#f1f1f1');
					estChild_array[estItem] = child;
				}
				console.log('estChild_array[estItem] :::: ' + estChild_array[estItem]);
				link(child_arr[connection.hostName], estChild_array[estItem], [{x: 250, y: 200}]);
				
			});
			
			estbY = estbY + 20;
		}
		
	});
	

}

    render() {
        return <div id="diagram"></div>;
    }
}

export default staticMultipleMachineDiagram;