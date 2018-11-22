
jQuery.extend({
    createProcesses: function(graph,x_pos,y_pos,rectWidth,rectHeight,rectXSpace,rectYSpace) {
        var layeredProcesses;
		var processWithIP_arr = {};
		var linkingArray = {};
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
			console.log('keyindex :::: '+hostmachineprocess.hostmachinename);
			
				$.each(hostmachineprocess.processlist,function(index,processobj){
					var hostWithProcessName = hostmachineprocess.hostmachinename+"-"+processobj.process;
				$.setHostWithProcessName(hostWithProcessName,processobj.process,processWithIP_arr)
				var connectionArray = new Array();								
					
				if(processobj.associatedmachineprocesslist!=null){
					$.each(processobj.associatedmachineprocesslist,function(key,associatedmachine){
						//console.log('associatedmachineprocesslist :::' + associatedmachine.hostname + " , "+ //associatedmachine.process);
						var associatedhostWithProcessName = associatedmachine.hostname+"-"+associatedmachine.process;
					$.setHostWithProcessName(associatedhostWithProcessName,associatedmachine.process,processWithIP_arr);
						
					connectionArray.push(associatedhostWithProcessName);					
					
					});

					linkingArray[hostWithProcessName] = connectionArray;
				}
					
					
			   });
		
		   });
		});
		
		console.log(linkingArray);
		var arr = Object.keys( jsEnum ).map(function ( key ) { return jsEnum[key]; });
		var max = Math.max.apply( null, arr );
		console.log('jsEnum length is '+max);
				
		layeredProcesses = new Array(max+1);
		layeredProcesses[0]="";
		layeredProcesses[1]="";
		console.log('layeredProcesses.length :::: '+layeredProcesses.length);
				
		var processArray;
		var maximumElement = 1;
		$.each(processWithIP_arr,function(index,process){
			console.log('process is :::: ' + process);
			
			processArray = null;
			//console.log('jsEnum[process]'+jsEnum[process]);
			
			if(layeredProcesses[$.getColumnLayer(process)] === undefined){
				processArray = new Array();
				processArray.push({key:index,name:process});
				layeredProcesses[$.getColumnLayer(process)] = processArray;
				
			}else{
				processArray = layeredProcesses[$.getColumnLayer(process)];
				processArray.push({key:index,name:process});
				layeredProcesses[$.getColumnLayer(process)] = processArray;
				if(processArray.length > maximumElement){
						maximumElement = processArray.length;
				}
				
			}
		});
		console.log('..........layeredProcesses[jsEnum[process]]'+jsEnum[layeredProcesses[5]]);
		console.log('layeredProcesses :::: ' + layeredProcesses + maximumElement);
		
			var middleLayer = 1* maximumElement/2;
			middleLayer = Math.ceil(middleLayer);
			console.log('middleLayer -----> ' +middleLayer);

			var processBox = {};
			$.each(layeredProcesses,function(index,processes){
				//console.log('processes.length ------ '+ layeredProcesses[index] + ' , '+processes.length);
				//console.log('processes.length ------ ' + index + ','+ processes);
				if(processes != undefined){
				
					var processArrayLength = processes.length;
							
					if(processArrayLength < middleLayer){
						var elementMiddleLayer = middleLayer;
						$.each(processes,function(index,processItem){
						console.log('name :::: '+ processItem.name);
						
						var y = y_pos +(elementMiddleLayer -1)*(rectHeight+rectYSpace);

						var x = x_pos+($.getColumnLayer(processItem.name)*(rectWidth+rectXSpace));
						if(!isNaN(x)){
							
							processBox[processItem.key]=$.createBox(processItem.name,x,y,graph,'#cb76da', '#30d0c6',rectWidth,rectHeight);

							console.log('inside if:: name,x,y'+ processItem.name+ ',' + x + ',' + y);
						}

						elementMiddleLayer = elementMiddleLayer - 1;
						
						});
					}else{
							$.each(processes,function(key,processItem){
							console.log('name :::: '+ processItem.name);
						
							var y = y_pos +key*(rectHeight+rectYSpace);
							var x = x_pos+($.getColumnLayer(processItem.name)*(rectWidth+rectXSpace));
							if(!isNaN(x)){
								processBox[processItem.key]=$.createBox(processItem.name,x,y,graph,'#cb76da', '#30d0c6',rectWidth,rectHeight);
								console.log('inside else:: name,x,y'+ processItem.name+ ',' + x + ',' + y);
							}
						
							});
						}
				}
				
			});

			
			$.each(linkingArray,function(keyprocess,associatedprocesses){
				$.each(associatedprocesses,function(index,process){
					$.link(graph,processBox[keyprocess],processBox[process],[{x: 250, y: 200}]);
				});
				
			});
		
		}
	});

},

createStaticProcesses: function(graph,x_pos,y_pos,rectWidth,rectHeight,rectXSpace,rectYSpace) {
        var layeredProcesses;
		var processWithIP_arr = {};
		var linkingArray = {};
		//var data = {"hostmachinesassociated":[{"hostmachinename":"ip-172-31-28-170.us-west-2.compute.internal","processlist":[{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.62"}],"process":"java"}]},{"hostmachinename":"ip-172-31-41-192.us-west-2.compute.internal","processlist":[{"associatedmachineprocesslist":null,"process":"haproxy"},{"associatedmachineprocesslist":null,"process":"haproxy"}]},{"hostmachinename":"ip-172-31-42-177.us-west-2.compute.internal","processlist":[{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.62"}],"process":"java"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.63"}],"process":"java1"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.64"}],"process":"java2"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.65"}],"process":"java3"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.66"}],"process":"java4"}]}]}
		//var data = {"hostmachinesassociated":[{"hostmachinename":"ip-172-31-28-170.us-west-2.compute.internal","processlist":[{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.62"}],"process":"java"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.62"}],"process":"python"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.62"}],"process":"php"}]},{"hostmachinename":"ip-172-31-41-192.us-west-2.compute.internal","processlist":[{"associatedmachineprocesslist":null,"process":"haproxy"},{"associatedmachineprocesslist":null,"process":"haproxy"}]},{"hostmachinename":"ip-172-31-42-177.us-west-2.compute.internal","processlist":[{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.62"}],"process":"java"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.63"}],"process":"java1"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.64"}],"process":"java2"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.65"}],"process":"java3"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.66"}],"process":"java4"}]}]}
		//var data = {"hostmachinesassociated":[{"hostmachinename":"ip-172-31-28-170.us-west-2.compute.internal","processlist":[{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.62"}],"process":"java"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.62"}],"process":"python"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.62"}],"process":"php"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.63"}],"process":"java"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.64"}],"process":"php"}]},{"hostmachinename":"ip-172-31-41-192.us-west-2.compute.internal","processlist":[{"associatedmachineprocesslist":null,"process":"haproxy"},{"associatedmachineprocesslist":null,"process":"haproxy"}]},{"hostmachinename":"ip-172-31-42-177.us-west-2.compute.internal","processlist":[{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.62"}],"process":"java"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.63"}],"process":"java1"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.64"}],"process":"java2"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.65"}],"process":"java3"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.66"}],"process":"java4"}]}]}
		//var data = {"hostmachinesassociated":[{"hostmachinename":"ip-172-31-28-170.us-west-2.compute.internal","processlist":[{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.62"}],"process":"java"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.62"}],"process":"python"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.62"}],"process":"php"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-3.compute.internal","process":"Database","hostip":"172.31.45.63"}],"process":"java"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-4.compute.internal","process":"Database","hostip":"172.31.45.63"}],"process":"java"}]},{"hostmachinename":"ip-172-31-41-192.us-west-2.compute.internal","processlist":[{"associatedmachineprocesslist":null,"process":"haproxy"},{"associatedmachineprocesslist":null,"process":"haproxy"}]},{"hostmachinename":"ip-172-31-42-177.us-west-2.compute.internal","processlist":[{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.62"}],"process":"java"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.63"}],"process":"java1"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.64"}],"process":"java2"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.65"}],"process":"java3"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.66"}],"process":"java4"}]}]}
		var data = {"hostmachinesassociated":[{"hostmachinename":"ip-172-31-28-170.us-west-2.compute.internal","processlist":[{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.62"}],"process":"java"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.62"}],"process":"python"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.62"}],"process":"php"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-3.compute.internal","process":"Database","hostip":"172.31.45.63"}],"process":"java"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-4.compute.internal","process":"Database","hostip":"172.31.45.63"}],"process":"java"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-5.compute.internal","process":"Database","hostip":"172.31.45.63"}],"process":"java"}]},{"hostmachinename":"ip-172-31-41-192.us-west-2.compute.internal","processlist":[{"associatedmachineprocesslist":null,"process":"haproxy"},{"associatedmachineprocesslist":null,"process":"haproxy"}]},{"hostmachinename":"ip-172-31-42-177.us-west-2.compute.internal","processlist":[{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.62"}],"process":"java"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.63"}],"process":"java1"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.64"}],"process":"java2"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.65"}],"process":"java3"},{"associatedmachineprocesslist":[{"hostname":"ip-172-31-45-62.us-west-2.compute.internal","process":"Database","hostip":"172.31.45.66"}],"process":"java4"}]}]}
		$.each(data, function (key, hostMachine) {
			//console.log('keyindex :::: '+hostMachine.length);
		   $.each(hostMachine,function(keyindex,hostmachineprocess){
			console.log('keyindex :::: '+hostmachineprocess.hostmachinename);
			
				$.each(hostmachineprocess.processlist,function(index,processobj){
					var hostWithProcessName = hostmachineprocess.hostmachinename+"-"+processobj.process;
				$.setHostWithProcessName(hostWithProcessName,processobj.process,processWithIP_arr)
				var connectionArray = new Array();								
					
				if(processobj.associatedmachineprocesslist!=null){
					$.each(processobj.associatedmachineprocesslist,function(key,associatedmachine){
						//console.log('associatedmachineprocesslist :::' + associatedmachine.hostname + " , "+ //associatedmachine.process);
						var associatedhostWithProcessName = associatedmachine.hostname+"-"+associatedmachine.process;
					$.setHostWithProcessName(associatedhostWithProcessName,associatedmachine.process,processWithIP_arr);
						
					connectionArray.push(associatedhostWithProcessName);					
					
					});

					linkingArray[hostWithProcessName] = connectionArray;
				}
					
					
			   });
		
		   });
		});
		
		console.log(linkingArray);
		var arr = Object.keys( jsEnum ).map(function ( key ) { return jsEnum[key]; });
		var max = Math.max.apply( null, arr );
		console.log('jsEnum length is '+max);
				
		layeredProcesses = new Array(max+1);
		layeredProcesses[0]="";
		layeredProcesses[1]="";
		console.log('layeredProcesses.length :::: '+layeredProcesses.length);
				
		var processArray;
		var maximumElement = 1;
		$.each(processWithIP_arr,function(index,process){
			console.log('process is :::: ' + process);
			
			processArray = null;
			//console.log('jsEnum[process]'+jsEnum[process]);
			
			if(layeredProcesses[$.getColumnLayer(process)] === undefined){
				processArray = new Array();
				processArray.push({key:index,name:process});
				layeredProcesses[$.getColumnLayer(process)] = processArray;
				
			}else{
				processArray = layeredProcesses[$.getColumnLayer(process)];
				processArray.push({key:index,name:process});
				layeredProcesses[$.getColumnLayer(process)] = processArray;
				if(processArray.length > maximumElement){
						maximumElement = processArray.length;
				}
				
			}
		});
		//console.log('..........layeredProcesses[jsEnum[process]]'+jsEnum[layeredProcesses[5]]);
		//console.log('layeredProcesses :::: ' + layeredProcesses + maximumElement);
		
			var middleLayer = 1* maximumElement/2;
			middleLayer = Math.ceil(middleLayer);
			console.log('middleLayer -----> ' +middleLayer);

			var processBox = {};
			$.each(layeredProcesses,function(index,processes){
				if(processes != undefined){
					console.log('process.length ------ '+ layeredProcesses[index] + ' , '+processes.length);
				
					var processArrayLength = processes.length;
							
					if(processArrayLength < middleLayer){
						var elementMiddleLayer = middleLayer;
						$.each(processes,function(index,processItem){
						console.log('name :::: '+ processItem.name);
						
						var y = y_pos +(elementMiddleLayer -1)*(rectHeight+rectYSpace);

						var x = x_pos+($.getColumnLayer(processItem.name)*(rectWidth+rectXSpace));
						if(!isNaN(x)){
							
							processBox[processItem.key]=$.createBox(processItem.name,x,y,graph,'#cb76da', '#30d0c6',rectWidth,rectHeight);

							console.log('inside if:: name,x,y'+ processItem.name+ ',' + x + ',' + y);
						}

						elementMiddleLayer = elementMiddleLayer - 1;
						
						});
					}else{
							$.each(processes,function(key,processItem){
							console.log('name :::: '+ processItem.name);
							
								var y = y_pos +key*(rectHeight+rectYSpace);
								var x = x_pos+($.getColumnLayer(processItem.name)*(rectWidth+rectXSpace));
								if(!isNaN(x)){
									processBox[processItem.key]=$.createBox(processItem.name,x,y,graph,'#cb76da', '#30d0c6',rectWidth,rectHeight);
									console.log('inside else:: name,x,y'+ processItem.name+ ',' + x + ',' + y);
								}

							});
						}
				}

				
				
			});

			
			$.each(linkingArray,function(keyprocess,associatedprocesses){
				$.each(associatedprocesses,function(index,process){
					$.link(graph,processBox[keyprocess],processBox[process],[{x: 250, y: 200}]);
				});
				
			});
			
},

setHostWithProcessName:function (hostWithProcessName,process,processWithIP_arr){
	if(processWithIP_arr[hostWithProcessName] === undefined){
						processWithIP_arr[hostWithProcessName] = process;
						console.log(hostWithProcessName);
	}
},
getColumnLayer:function(name){
	return (jsEnum[name]===undefined?jsEnum['others']:jsEnum[name]);
},
createBox:function(name,x,y,graph,background, textColor,rectWidth,rectHeight){

		textColor = textColor || "#000";
	
		var text = joint.util.breakText(name+" ",{width:rectWidth-2*5},{'font-size':12});
		
		var cell = new joint.shapes.basic.Rect({
		position: { x: x, y: y}, size: { width: rectWidth, height: rectHeight },
			attrs: {
				rect: { id:name,'stroke-width': '3', 'stroke-opacity': .7, stroke: 'black', rx: 3, ry: 3, fill: background, 'fill-opacity': .5 },
				text: { text: text, 'font-size': 10, style: { 'text-shadow': '1px 1px 1px lightgray' } }
			}
		});
		
		
		graph.addCell(cell);
	return cell;
		
},

link:function(graph,source, target, breakpoints) {
		
		var cell = new joint.shapes.org.Arrow({
			source: { id: source.id },
			target: { id: target.id },
			router: { name: 'manhattan' },
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
		
		graph.addCell(cell);
		
	}
	
	


});

