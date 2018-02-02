import React, { Component } from 'react';
import NumberFormat from '../NumberFormat.js';

import './HoldingPerformance.css';

class HoldingPerformance extends Component {
	state = {		
			performance: {}
	}
	
	constructor(props) {
		super(props);
		//Set the initial state in case it wasn't expanded (then it won't get prop updates)

		this.state.performance = props.performance;

	}
	
	componentWillReceiveProps(props) {
		this.setState({"performance": props.performance});
	}


	render() {
		return (<span className="Performance">
			<Performance label="1m" holding={this.props.holding.name} performance={this.state.performance.one} />
			<Performance label="3m" holding={this.props.holding.name} performance={this.state.performance.three} />
			<Performance label="6m" holding={this.props.holding.name} performance={this.state.performance.six} />
			<Performance label="1y" holding={this.props.holding.name} performance={this.state.performance.twelve} />
			<Performance label="2y" holding={this.props.holding.name} performance={this.state.performance.twentyfour} />
			<Performance label="3y" holding={this.props.holding.name} performance={this.state.performance.thirtysix} />
			<Performance label="5y" holding={this.props.holding.name} performance={this.state.performance.sixty} />
		</span>);
	}
}

class Performance extends Component {
	state = {}

	constructor(props) {
		super(props);
		//Set the initial state in case it wasn't expanded (then it won't get prop updates)
		this.state.performance = props.performance;
	}
	
	componentWillReceiveProps(props) {
		this.setState({"performance": props.performance});
	}

	render() {
		const holding = this.props.holding;
		
		const performance = this.state.performance;
		var iconClass = "fas fa-circle-notch fa-spin";
		var text = "";
		if (performance) {
			var datum = null;
			for (var i=0; i<performance.length; i++) {
				if (performance[i].assetName == holding) {
					datum = performance[i];
					break;
				}
			}
			if (datum == null) {
				iconClass = "fas fa-exclamation";
			} else {
				const percentage = datum.returnsValues.SIMPLE1 * 100;

				if (percentage >= 0) {
					iconClass = "fas fa-level-up-alt";
				} else {
					iconClass = "fas fa-level-down-alt";
				}
				text = NumberFormat({value: percentage, places: 2, suffix: "%"});
			}
		}
		return (
			<div><div>{this.props.label}</div><div><i className={iconClass}></i> {text}</div></div>
		);
	}
}


export default HoldingPerformance;