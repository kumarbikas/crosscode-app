/* var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;

var dynamicProcessDiagram = require('./components/dynamicProcessDiagram.js');
*/
/*var staticProcessDiagram = require('./components/staticProcessDiagram.jsx');
var staticConnectorDiagram = require('./components/staticConnectorDiagram.jsx');
var staticMultipleMachineDiagram = require('./components/staticMultipleMachineDiagram.jsx');
var staticMachineProcessDiagram = require('./components/staticMachineProcessDiagram.jsx');
var dynamicMachineProcessDiagram = require('./components/dynamicMachineProcessDiagram.jsx');
var dynamicMachineDiagram = require('./components/dynamicMachineDiagram.jsx');
var LayeredProcessDiagram = require('./components/LayeredProcessDiagram.jsx');
var LayeredStaticProcessDiagram = require('./components/LayeredStaticProcessDiagram.jsx');
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';
import dynamicProcessDiagram from './components/dynamicProcessDiagram.jsx';
import staticProcessDiagram from './components/staticProcessDiagram.jsx';
import staticConnectorDiagram from './components/staticConnectorDiagram.jsx';
import staticMultipleMachineDiagram from './components/staticMultipleMachineDiagram.jsx';
import staticMachineProcessDiagram from './components/staticMachineProcessDiagram.jsx';
import dynamicMachineProcessDiagram from './components/dynamicMachineProcessDiagram.jsx';
import dynamicMachineDiagram from './components/dynamicMachineDiagram.jsx';
import LayeredProcessDiagram from './components/LayeredProcessDiagram.jsx';
import LayeredStaticProcessDiagram from './components/LayeredStaticProcessDiagram.jsx';

class App extends React.Component {
   render() {
      return (
         <div>
            <ul>
               <li><Link to="/">Home</Link></li>
               <li><Link to="/staticProcessDiagram">Static Architecture Diagram</Link></li>
               <li><Link to="/dynamicProcessDiagram">Dynamic Process Diagram</Link></li>
			   <li><Link to="/staticConnectorDiagram">BiDirectional Architecture Diagram</Link></li>
			   <li><Link to="/staticMultipleMachineDiagram">Static Machine Architecture Diagram</Link></li>
			   <li><Link to="/staticMachineProcessDiagram">Static Machine Process Diagram</Link></li>
			   <li><Link to="/dynamicMachineProcessDiagram">Dynamic Machine Process Diagram</Link></li>
			   <li><Link to="/dynamicMachineDiagram">Dynamic Machine Diagram</Link></li>
			   <li><Link to="/LayeredProcessDiagram">Layered Process Diagram</Link></li>
			   <li><Link to="/LayeredStaticProcessDiagram">Layered Static Process Diagram</Link></li>	

            </ul>
				
           {this.props.children}
         </div>
      )
   }
}

export default App;

class Home extends React.Component {
   render() {
	   var myStyle = {
         fontSize: 50,
         color: '#FF0000',
		 textAlign: 'center'
      }
      return (
         <div>
            <h1 style={myStyle}><b>Welcome to Crosscode</b></h1>
         </div>
      )
   }
}

ReactDOM.render((
   <Router history = {browserHistory}>
      <Route path = "/" component = {App}>
         <IndexRoute component = {Home} />
         <Route path = "home" component = {Home} />
         <Route path = "staticProcessDiagram" component = {staticProcessDiagram} />
         <Route path = "dynamicProcessDiagram" component = {dynamicProcessDiagram} />
		  <Route path = "staticConnectorDiagram" component = {staticConnectorDiagram} />
		  <Route path = "staticMultipleMachineDiagram" component = {staticMultipleMachineDiagram} />
		  <Route path = "staticMachineProcessDiagram" component = {staticMachineProcessDiagram} />
		  <Route path = "dynamicMachineProcessDiagram" component = {dynamicMachineProcessDiagram} />
		  <Route path = "dynamicMachineDiagram" component = {dynamicMachineDiagram} />
		  <Route path = "LayeredProcessDiagram" component = {LayeredProcessDiagram} />
		  <Route path = "LayeredStaticProcessDiagram" component = {LayeredStaticProcessDiagram} />
      </Route>
   </Router>
	
), document.getElementById('app'))