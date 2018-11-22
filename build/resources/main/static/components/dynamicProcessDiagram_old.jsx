import React from 'react';

class NetworkDiagram2 extends React.Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
    console.log('height is:: '+$('#diagram').height());
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
			router: { name: 'metro' },
			//connector: { name: 'rounded' },
			
			vertices: breakpoints,
			attrs: {
				'.connection': {
					'fill': 'none',
					//'stroke-linejoin': 'round',
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
			var parent;
		$.each($.parseJSON(data), function (key, machine) {
			console.log(key);
			if(key === "machineIp"){
				if(machine !==""){
					parent = member(130,100,'', machine, '#7c68fd', '#30d0c6');
					tooltip( 'IP:'+machine,machine);
				}
			}
			if(key === "processList"){
				
				var y = 20;
			  
				$.each(machine,function(index,process){
					var x = 500;
					//var child = member(x , y ,'', process.name, '', '#7c68fd', '#f1f1f1');
					//tooltip( 'Process:'+process.name,process.name);
					//y = y + 70;
					//link(parent, child, [{x: 250, y: 200}]);	
					//x = 700;
					$.each(process.establish.hostNames,function(hostkey,hostName){
						console.log('hostName ::::: '+hostName);
						var subchild = member(x , y ,'', hostName, '', '#cb76da', '#f1f1f1');
						tooltip( 'Process:'+hostName,hostName);
						y = y + 70;
						//link(child, subchild, [{x: 250, y: 200}]);		
						link(parent, subchild, [{x: 250, y: 200}]);		
					});
					
				});
				
				
			}
			
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

export default NetworkDiagram2;