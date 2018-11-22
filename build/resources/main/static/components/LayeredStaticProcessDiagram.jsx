import React from 'react';

class LayeredStaticProcessDiagram extends React.Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
    
	var x_pos = 130;
	var y_pos = 180;
	var rectHeight = 70;
	var rectWidth = 70;
	var rectXSpace = 10;
	var rectYSpace = 10;
	var graph = new joint.dia.Graph();
        var paper = new joint.dia.Paper({
			el: $('#diagram'),
			height: $('#diagram').height(),
			width: $('#diagram').width(),
			gridSize: 1,
			model: graph,
			perpendicularLinks: true,
			restrictTranslate: true,
			smooth: true
		});
	
	$.createStaticProcesses(graph,x_pos,y_pos,rectWidth,rectHeight,rectXSpace,rectYSpace);
	
	//console.log("jsEnum['java'] ::: " + jsEnum['java']);
	
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

export default LayeredStaticProcessDiagram;