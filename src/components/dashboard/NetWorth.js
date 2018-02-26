import React from 'react';

import NumberFormat from '../NumberFormat.js';

import './NetWorth.css';

const NetWorth = props=>{
	
	return (
        <div id="networthOuter">
        <div id="networth">
         <h1>Net Worth</h1>
         <h2>Today</h2>
         <div className="headline"><NumberFormat places={2} value={props.total} prefix="$" /></div>
         <div className="dashboard-table">
          <div>This Month</div>
          <div>{props.thisMonthProfitLoss}</div>
          <div>{props.thisMonthPercentage}</div>
         </div>
         <div className="dashboard-table">
          <div>YTD</div>
          <div>{props.thisYearProfitLoss}</div>
          <div>{props.thisYearPercentage}</div>
         </div>
        </div>
        </div>
	)
}

export default NetWorth;