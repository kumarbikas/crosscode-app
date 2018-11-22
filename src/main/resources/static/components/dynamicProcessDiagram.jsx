var React = require('react');

class dynamicProcessDiagram extends React.Component {
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

	var processWithIP_arr = {};
	var r2_x = 130;
	var r2_y = 180;
	var matchedProcessCount = 0;
	var processRect = function(x, y, name, background, textColor) {

		textColor = textColor || "#000";
	
		var text = joint.util.breakText(name+" ",{width:100-2*5},{'font-size':12});
		
		var cell = new joint.shapes.basic.Rect({
		position: { x: x, y: y }, size: { width: 70, height: 70 },
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
	
	function createProcess(hostWithProcessName,processName){

		if(processWithIP_arr[hostWithProcessName] === undefined){
					
					var r2 = processRect(r2_x,r2_y,processName, '#cb76da', '#30d0c6');

					//console.log('inside child :::: '+hostWithProcessName);
					processWithIP_arr[hostWithProcessName] = r2;
					
					r2_x = r2_x + 60;
					r2_y = r2_y + 100;
					
					}else{
						matchedProcessCount = matchedProcessCount+ 1;
						console.log('matchedProcessCount :::: ' + matchedProcessCount)
						if(matchedProcessCount === 2){
							r2_x = r2_x + 60;
						}
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
			//console.log('keyindex :::: '+hostMachine.length);
		   $.each(hostMachine,function(keyindex,hostmachineprocess){
			//console.log('keyindex :::: '+hostmachineprocess.hostmachinename);
				
				$.each(hostmachineprocess.processlist,function(index,processobj){
								
					var temp_r2_x = r2_x;
					createProcess(hostmachineprocess.hostmachinename+"-"+processobj.process,processobj.process);
					matchedProcessCount = 0;
					if(processobj.associatedmachineprocesslist!=null){
						$.each(processobj.associatedmachineprocesslist,function(key,associatedmachine){
							//console.log('associatedmachineprocesslist :::' + associatedmachine.hostname + " , "+ //associatedmachine.process);
						createProcess(associatedmachine.hostname+"-"+associatedmachine.process,associatedmachine.process);
						link(processWithIP_arr[hostmachineprocess.hostmachinename+"-"+processobj.process], processWithIP_arr[associatedmachine.hostname+"-"+associatedmachine.process], [{x: 250, y: 200}]); 
						
						});
					}
					r2_x = temp_r2_x;
					
			   });
		
		   });
		});
		}
	});

}

    render() {
        return <div id="diagram"></div>;
    }
}

export default dynamicProcessDiagram;