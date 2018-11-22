import React from 'react';

class dynamicMachineProcessDiagram extends React.Component {
    constructor(props) {
        super(props);
	}
	
    componentDidMount() {
  	
    var graph1 = new joint.dia.Graph();
        var paper1 = new joint.dia.Paper({
	    el: $('#diagram'),
	     height: $('#diagram').height(),
		width: $('#diagram').width(),
	    gridSize: 1,
	    model: graph1,
	    perpendicularLinks: true,
	    restrictTranslate: true,
		smooth: true
	});
	
	graph1.on('change:position', function(cell) {

    var parentId = cell.get('parent');
    if (!parentId) return;

    var parent = graph1.getCell(parentId);
    var parentBbox = parent.getBBox();
    var cellBbox = cell.getBBox();

    if (parentBbox.containsPoint(cellBbox.origin()) &&
        parentBbox.containsPoint(cellBbox.topRight()) &&
        parentBbox.containsPoint(cellBbox.corner()) &&
        parentBbox.containsPoint(cellBbox.bottomLeft())) {

        // All the four corners of the child are inside
        // the parent area.
        return;
    }

    // Revert the child position.
    cell.set('position', cell.previous('position'));
});

	
	var hostRect = function(x, y, name, background, textColor) {

		textColor = textColor || "#000";
	
		var cell = new joint.shapes.basic.Rect({
		position: { x: x, y: y }, size: { width: 200, height: 200 },
			attrs: {
				rect: { id:name,'stroke-width': '3', 'stroke-opacity': .7, stroke: 'black', rx: 3, ry: 3, fill: background, 'fill-opacity': .5 },
				text: { text: name, 'font-size': 10, style: { 'text-shadow': '1px 1px 1px lightgray' } }
			}
		});
		
		
		graph1.addCell(cell);
		return cell;
	};
	
	var processRect = function(x, y, name, background, textColor) {

		textColor = textColor || "#000";
	
		var cell = new joint.shapes.basic.Rect({
		position: { x: x, y: y }, size: { width: 50, height: 50 },
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
			router: { name: 'metro' },
			connector: { name: 'rounded' },
			
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
	
	var IP_arr = {};
	var processWithIP_arr = {};
	
	var r1_x = 130;
	var r1_y = 180;
	var r1,r2;
	var r2_x = r1_x + 10;
	var r2_y = r1_x + 10;
	var r2_x_startPoint = r2_x;
	var machine_width = 200;
	function createMachine(hostMachineName){
		if(IP_arr[hostMachineName] === undefined){
		console.log(':::::::::::::::: hostMachineName ::::::::::: ' + hostMachineName);
			r1 = hostRect(r1_x,r1_y,hostMachineName, '#30d0c6', '#30d0c6');
			IP_arr[hostMachineName] = r1;
					
			r2_x = r1_x+10;
			r2_y = r1_y+10;
			r1_x = r1_x + 210;
			r1_y = r1_y + 210;
		}else{
		console.log(':::::::::::::::: hostMachineName available ::::::::::: ' + hostMachineName + r1_x +' , '+ r1_y);
			r1 = IP_arr[hostMachineName];
			//r2_x = r1_x+10;
			r2_y = r1_y+10;
		}
						
	}
	function createProcess(hostWithProcessName,processName){
		if(processWithIP_arr[hostWithProcessName] === undefined){
					
					console.log('hostWithProcessName difference of r1_x,r1_y and r2_x,r2_y ------------> ' +hostWithProcessName + ' , '+r1_x + ' , ' + r1_y + ' , ' + r2_x + ' , '+ r2_y + '----' + ((r1_x-210)+200));
					
					
					/*if(r2_x >= ((r1_x)-20)){
					//r2_x = (r1_x - (210 -10));
					r2_x = (r1_x + (60+(r2_x-r1_x)));
					//r2_y = r2_y + 60;
					r2_y = r1_y + 230 ;
					}*/
					
					/*if(r2_x > r1_x){
						if((r2_x-r1_x)<=60){
							r2_x = r2_x+60;
						}
						r2_y = r1_y + 220 ;
					}*/
					
					var r2 = processRect(r2_x,r2_y,processName, '#cb76da', '#30d0c6');

					//console.log('inside child :::: '+hostWithProcessName);
					processWithIP_arr[hostWithProcessName] = r2;
					
					r1.embed(r2);
					
				
					r2_x = r2_x + 60;
				
					
					}
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

		   $.each(hostMachine,function(keyindex,hostmachineprocess){
			console.log('keyindex :::: '+hostmachineprocess.hostmachinename);
			var temp_r1_y = r1_y;
			createMachine(hostmachineprocess.hostmachinename);
				
				$.each(hostmachineprocess.processlist,function(index,processobj){
					console.log('processobj.process :::: ' + processobj.process);
					
					createProcess(hostmachineprocess.hostmachinename+"-"+processobj.process,processobj.process);
					var temp_x = r2_x;
					var temp_y = r2_y;
					var temp_r1 = r1;
					var temp_r1_x = r1_x;
					console.log('processobj.associatedmachineprocesslist '+processobj.associatedmachineprocesslist);
					if(processobj.associatedmachineprocesslist!=null){
						$.each(processobj.associatedmachineprocesslist,function(key,associatedmachine){
							//console.log('associatedmachineprocesslist :::' + associatedmachine.hostname + " , "+ //associatedmachine.process);
							
						createMachine(associatedmachine.hostname);
							
						createProcess(associatedmachine.hostname+"-"+associatedmachine.process,associatedmachine.process);
							link(processWithIP_arr[hostmachineprocess.hostmachinename+"-"+processobj.process], processWithIP_arr[associatedmachine.hostname+"-"+associatedmachine.process], [{x: 250, y: 200}]); 
						});
					}
					r2_x = temp_x;
					r2_y = temp_y;
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
        var myStyle = {
		 width:'2000px',
		 height:'2000px',
		 overflow:'auto'
      }
        return <div id="diagram" style={myStyle}></div>;
    }
	
	
}

export default dynamicMachineProcessDiagram;