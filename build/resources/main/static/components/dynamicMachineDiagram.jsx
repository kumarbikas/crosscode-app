import React from 'react';

class dynamicMachineDiagram extends React.Component {
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

	var IP_arr = {};
	var r1_x = 130;
	var r1_y = 180;
	var r1;
    var hostRect = function(x, y, name, background, textColor) {

		textColor = textColor || "#000";
	
		var text = joint.util.breakText(name,{width:100-2*5},{'font-size':12});
		
		var cell = new joint.shapes.basic.Rect({
		position: { x: x, y: y }, size: { width: 100, height: 100 },
			attrs: {
				rect: { id:name,'stroke-width': '3', 'stroke-opacity': .7, stroke: 'black', rx: 3, ry: 3, fill: background, 'fill-opacity': .5 },
				text: { text: text, 'font-size': 10, style: { 'text-shadow': '1px 1px 1px lightgray' } }
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
	
	function createMachine(hostMachineName){
		if(IP_arr[hostMachineName] === undefined){
		//console.log(':::::::::::::::: hostMachineName ::::::::::: ' + hostMachineName);
			r1 = hostRect(r1_x,r1_y,hostMachineName, '#30d0c6', '#30d0c6');
			IP_arr[hostMachineName] = r1;
					
			r1_x = r1_x + 150;
			r1_y = r1_y + 210;
		}else{
		
			r1 = IP_arr[hostMachineName];
			
		}
						
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
	
	$.ajax({
		type: 'GET', 
		url: 'https://f5tbsp1k79.execute-api.us-west-2.amazonaws.com/local/getprocesses', 
		data: {}, 
		dataType: 'json',
		success: function (data) { 
			console.log('inside success');
		
		var data = $.parseJSON(data);
		$.each(data, function (key, hostMachine) {
			console.log('keyindex :::: '+hostMachine.length);
		   $.each(hostMachine,function(keyindex,hostmachineprocess){
			console.log('keyindex :::: '+hostmachineprocess.hostmachinename);
			var temp_r1_y = r1_y;
			createMachine(hostmachineprocess.hostmachinename);
				var temp_r1 = r1;	
				var temp_r1_x = r1_x;
				
				$.each(hostmachineprocess.processlist,function(index,processobj){
								console.log('inside processlist'+index);
					if(processobj.associatedmachineprocesslist!=null){
						$.each(processobj.associatedmachineprocesslist,function(key,associatedmachine){
							console.log('associatedmachineprocesslist :::' + associatedmachine.hostname + " , "+ associatedmachine.process);
						
						createMachine(associatedmachine.hostname);
							
						link(IP_arr[hostmachineprocess.hostmachinename], IP_arr[associatedmachine.hostname], [{x: 250, y: 200}]); 
						});
					}
					r1 = temp_r1;
					r1_x = temp_r1_x;
					
			   });
			   r1_y = temp_r1_y;
		   });
		});
		}
	});

}

    render() {
        return <div id="diagram"></div>;
    }
}

export default dynamicMachineDiagram;