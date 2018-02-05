import React, { Component } from 'react';

import './DataTable.js';

/*
 * Props:
 * id: id for table
 * className: classes for the table
 * data: array of objects
 * columns: array of column objects where:
 * 	column.header: header strings
 *  column.headerClassName : [optional] header class name
 *  column.headerStyle : [optional] header style object
 *  column.sortable: booleans
 *  column.displayFunction: function from object to column value (string)
 *  column.sorter: [optional] function to sort objects
 *  column.style: [optional] style object
 *  column.className: [optional] className for the cells
 *  column.initialSorted: boolean true if this is the initial sort of the data
 *  column.clickFunction: [optional] function (taking object) to run when column clicked on
 */
class DataTable extends Component {
	
	state = {};
	
	constructor(props) {
		super(props);
		
		this.props.columns.map(column =>{
			if (column.initialSorted) {
				this.props.data.sort(column.sorter);
			}
			//Also set the initial sort order....
			column.sortForward = true;
			return null;
		});
		
		this.state.data = this.props.data;
		this.setSorting = this.setSorting.bind(this);
	}

	setSorting(index) {
		const column = this.props.columns[index];
		const data = this.state.data;
		data.sort(column.sorter);
		if (column.initialSorted) {
			//Already sorted so we reverse it
			if (column.sortForward) {
				//Sorted forward, so we'll backward it
				data.reverse();
			}
			column.sortForward = !column.sortForward;
		} else {
			this.props.columns.map(column=>column.initialSorted = false);
			column.initialSorted = true;
			column.sortForward = true;
		}
		this.setState({"data": data});
	}
	
	render() {
		return (
			<table style={{"width": "100%"}} role="grid" id={this.props.id} className={this.props.className}>
			<thead>
				<tr role="row">
					{ this.props.columns.map((column, index) => {
						return (<th className={ column.headerClassName + (column.sortable ? (" " + (column.initialSorted ? (column.sortForward ? "sorting_asc" : "sorting_desc") : "sorting")) : "")} style={column.headerStyle} key={column.header} onClick={ column.sortable ? (e)=>this.setSorting(index) : null}>{column.header}</th>);
					})}
				</tr>
			</thead>
			<tbody>
				{ this.state.data.map((row, index) => {
					return (
						<tr role="row" key={index}>
						{ this.props.columns.map((column, index) =>{
							return (
								<td onClick={() => {column.clickFunction && column.clickFunction(row)}} className={column.className} key={index} style={column.style}>{column.displayFunction(row)}</td>	
							);
						})}
						</tr>
					);
				})}
			</tbody>
			</table>
		);
	}
}

export default DataTable;