import React, { Component } from 'react';

import DateFormat from '../DateFormat.js';
import { DocumentsIcon } from '../Icons.js';

import './DocumentsTable.css';

class DocumentsTable extends Component {
	
	go(url) {
		window.open(url);
	}
	
	render() {
		return (
			<div className="DocumentsTable">
			{this.props.documents.map((doc,idx)=>(
				<div key={idx} className="Document clearfix" onClick={()=>this.go(doc.url)}>
					<div className="DocumentIconWrapper">
					<svg width="50" height="50">
					<g>
					<circle cx="25" cy="20" r="15" className="DocumentIconCircle" />
					<g transform="translate(16,10) scale(.55, .55)">
					<DocumentsIcon className="DocumentIcon" />
					</g>
					</g>
					</svg>
					</div>
					<div className="DocumentDownload"><i className="fg-p fas fa-download"></i></div>
					<div className="DocumentName fg-l">{doc.heading}</div>
					<div className="DocumentDate"><i className="fg-p far fa-calendar"></i><DateFormat date={doc.date} /></div>
					<div className="DocumentCompany"><i className="fg-p far fa-building"></i>{doc.company}</div>
					<div className="DocumentType"><i className="fg-p far fa-file"></i>{doc.type}</div>
				</div>
			))}	
			</div>
		);
	}
}

export default DocumentsTable;