import React, { Component } from 'react';

import NumberFormat from '../NumberFormat.js';

import './AllocationGraph.css';

class AllocationGraph extends Component {

	constructor(props) {
		super(props);
	}

	segmentPosition(x, y, r, perc) {

		return {
			x: x,
			y: y
		};

	}

	render() {
		const x = 200;
		const y = 160;
		var r = 150;

		var angle = Math.PI / 180. * 1.8 * this.props.mandate;

		var sx = x - Math.cos(angle) * r;
		var sy = y - Math.sin(angle) * r;

		var growth = "M" + x + " " + y
				+ " L" + (x-r) + " " + y
				+ " A" + r + " " + r + " 0 0 1 " + sx + " " + sy
				+ "Z";

		var income = "M" + x + " " + y
			+ " L" + sx + " " + sy
			+ " A" + r + " " + r + " 0 0 1 " + (x+r) + " " + y
			+ "Z";

		r = 140;
		angle = Math.PI / 180. * 1.8 * this.props.actual;
		sx = x - Math.cos(angle) * r;
		sy = y - Math.sin(angle) * r;

		var actual = "M" + (x-10) + " " + (y-2)
			+ "L" + sx + " " + sy
			+ "L" + (x+10) + " " + (y-2)
			+ "Z";

		return (
			<div className="AllocationGraph">
				<div>
				<h1>Risk Profile</h1>
				<svg width="400" height="180">
					<path stroke="#eeeeee" strokeWidth="4px" fill="#385e9d" d={growth} />
					<path stroke="#eeeeee" strokeWidth="4px" fill="#bae1df" d={income} />
					<path strokeWidth="0px" fill="#182944" d={actual} />
					<text x="65" y="145" fill="#000" stroke="none">GROWTH</text>
					<text x="335" y="145" fill="#000" stroke="none" style={{textAnchor: "end"}}>INCOME</text>
				</svg>
		         <div className="dashboard-table">
		          <div>Target Allocation</div>
		          <div><NumberFormat places={1} value={this.props.mandate} suffix="%" /> / <NumberFormat places={1} value={100-this.props.mandate} suffix="%" /></div>
		         </div>
		         <div className="dashboard-table clearfix">
		          <div>Current Allocation</div>
		          <div><NumberFormat places={1} value={this.props.actual} suffix="%" /> / <NumberFormat places={1} value={100-this.props.actual} suffix="%" /></div>
		         </div>
		      	</div>
			</div>
		);
	}
}

export default AllocationGraph;
