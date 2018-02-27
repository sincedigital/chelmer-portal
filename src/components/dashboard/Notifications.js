import React from 'react';
import { withRouter } from 'react-router';

import { TransactionsIcon, DocumentsIcon} from '../Icons.js';
import DateFormat from '../DateFormat.js';

import './Notifications.css';

const Notifications = props=>{
	
	const date1 = new Date();
	date1.setDate(date1.getDate()-2);
	const date2 = new Date();
	date2.setDate(date2.getDate()-3);
	const date3 = new Date();
	date3.setDate(date3.getDate()-4);
	const data = [
		{
			date: date1,
			type: (<TransactionsIcon transform="translate(1, 2)" className="NotificationsIcon" />),
			text: "Buy order for Contact Energy Ltd Common Stock is now Settled",
			onClick: '/transactions'
		},
		{
			date: date1,
			type: (<TransactionsIcon transform="translate(1, 2)" className="NotificationsIcon" />),
			text: "Buy order for Contact Energy Ltd Common Stock is now Traded",
			onClick: '/transactions'
		},
		{
			date: date2,
			type: (<DocumentsIcon className="NotificationsIcon" />),
			text: "Quarterly Reports are now available for Coca-Cola Amatil (NZ) Ltd, Genesis Energy and Infratil NZ Ltd",
			onClick: '/documents'
		},
		{
			date: date3,
			type: (<TransactionsIcon transform="translate(1, 2)" className="NotificationsIcon" />),
			text: "Buy order for Contact Energy Ltd Common Stock is now Confirmed",
			onClick: '/transactions'
		}

	];
	
	return (
		<div className="Notifications">
		 <h1>Notifications</h1>
			<div className="Entries"> 
		 { data.map((notification, idx)=>(
		<div className="Entry" key={idx}>

		 <div className="TimeLine">
		  	<TimeLineIcon>{notification.type}</TimeLineIcon>
		  </div>
		  <div className="NotificationText clearfix" onClick={()=>props.history.push(notification.onClick)}>
		   <div className="NotificationDate"><DateFormat date={notification.date} /></div><br />
		   <div className="Text">{notification.text}</div>
		  </div>
		</div>)
		 )}
		 </div>
		 </div>
	);
}

const TimeLineIcon = props=>{
	return (<svg width="50" height="50">
		<g>
			<circle cx="25" cy="20" r="15" fill="#3c7069" strokeWidth="0px" />
			<g transform="translate(16,10) scale(.55, .55)">
			{props.children}
			</g>
		</g>
	</svg>);
};

export default withRouter(Notifications);