import React, { Component } from 'react';

import { PieChart, Pie, Cell, Legend, Sector } from 'recharts';

import NumberFormat from '../NumberFormat.js';

import './AssetGraph.css';

class AssetGraph extends Component {
	
	state = {}
	
	constructor(props) {
		super(props);
		this.state.innerPie = props.innerPie;
		this.state.outerPie = props.outerPie;

	
		this.activateSegment = this.activateSegment.bind(this);
		this.drawHighlight = this.drawHighlight.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({innerPie: props.innerPie, outerPie: props.outerPie});
	}
	
	activateSegment(data, index) {
		this.setState({"activeSegment": index});
	}
	
	drawHighlight(props) {
		const { cx, cy, innerRadius, outerRadius, startAngle, endAngle,
		    fill, payload, stroke } = props;
		    
		    
		return (<g>
			<Sector 
				cx={cx}
			    cy={cy}
			    startAngle={startAngle}
			    endAngle={endAngle}
			    innerRadius={outerRadius + 6}
			    outerRadius={outerRadius + 10}
			    fill={fill} />
			<Sector 
				cx={cx}
			    cy={cy}
			    startAngle={startAngle}
			    endAngle={endAngle}
			    innerRadius={innerRadius}
			    outerRadius={outerRadius}
			    fill={fill}
				stroke={stroke}
			/>
			<text x={10} y={215} textAnchor="left" fill={fill} style={{"fontSize": "16px"}}>{payload.name}</text>
			<text x={10} y={235} textAnchor="left" fill="black" ><NumberFormat value={payload.percentage} places={1} suffix="%" /> of portfolio</text>
			<text x={10} y={255} textAnchor="left" fill="black" >Current value <NumberFormat value={payload.holdingValue} places={2} prefix="$" /></text>
		</g>);
	}

	render() {
		return 	(
           	<div id="assetgraph">
           	<h1>Asset Allocation</h1>
            <PieChart width={400} height={300}>
             <Pie data={this.state.innerPie} nameKey="name" dataKey="percentage" cx="42%" cy="32%" startAngle={450} endAngle={90} innerRadius={50} outerRadius={60} legendType="square">
              { this.state.innerPie.map((entry, index)=>(
           	   <Cell key={"cell-" + index}	fill={entry.colour} />
              ))}
             </Pie>
             <Pie data={this.state.outerPie} nameKey="name" dataKey="percentage" cx="42%" cy="32%" startAngle={450} endAngle={90} innerRadius={70} outerRadius={80} legendType="none" onMouseEnter={this.activateSegment} activeIndex={this.state.activeSegment} activeShape={this.drawHighlight}>
	           { this.state.outerPie.map((entry, index)=>(
	        	<Cell key={"ocell-" + index} fill={entry.colour} />
	           ))}
	          </Pie>
       	      <Legend layout="vertical" align="right" verticalAlign="top" wrapperStyle={{"top": "10px"}}/>
            </PieChart>
           </div>
		);
	}
};

export default AssetGraph;