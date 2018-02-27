import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import windowSize from 'react-window-size';

import DateFormat from './components/DateFormat.js';

import PageWrap from './components/PageWrap.js';
import Remote from './components/Remote.js';

import DateFilters from './components/DateFilters.js';

import NoDocuments from './components/documents/NoDocuments.js';
import DocumentsTable from './components/documents/DocumentsTable.js';

import './DocumentsPage.css';

class DocumentsPage extends Component {

	state = {
			loading: false,
			loginRequired: false
	};
	
	constructor(props) {
		super(props);
		
		var date = new Date();
		date.setMonth(date.getMonth()-6);
		this.state.startDate = date;
		this.state.endDate = new Date();
		
		date = new Date();
		date.setDate(date.getDate()-3);
		
		this.state.filteredDocuments = [
			{
				heading: "CCA Report October-December 2017",
				date: date,
				type: "Quarterly Report",
				company: "Coca-Cola Amatil (NZ) Ltd",
				url: "http://sincedigital.jumbletree.com/static/docs/a.pdf"
			},
			{
				heading: "Genesis Energy Second Quarter Report FY 2018",
				date: date,
				type: "Quarterly Report",
				company: "Genesis Energy",
				url: "http://sincedigital.jumbletree.com/static/docs/b.pdf"
			},
			{
				heading: "Infratil NZ Ltd Year To Date December 2017",
				date: date,
				type: "Quarterly Report",
				company: "Infratil NZ Ltd",
				url: "http://sincedigital.jumbletree.com/static/docs/a.pdf"
			},
		];
		
		this.toggleDates = this.toggleDates.bind(this);
	}
	
	toggleDates() {
		this.setState({"showDates": !this.state.showDates});
	}

  render() {
	  if (this.state.loginRequired) {
		  return (<Redirect to={this.props.match.url} />);
	  }

    return (
   	  <PageWrap url={this.props.match.url} loading={this.state.loading === true && this.state.timeout === false} onPortfolioChanged={this.portfolioChanged} timeout={this.state.timeout}>
          <div className="hero-wrap">
          <div className="main-content">
            <p className="subhead-1"><strong className="bold-text"><span id="date"><DateFormat fullMonthName={true} date={this.state.startDate} /> - <DateFormat fullMonthName={true} date={this.state.endDate} /></span> <i id="dateHandler" className="far fa-calendar-alt padding10l" aria-hidden="true" onClick={this.toggleDates}></i></strong> </p>
            <DateFilters hide={this.toggleDates} showing={this.state.showDates} selectHeader="Or select range" onRelative={this.toRelativeDate} onAbsolute={this.toDate} range={true} relativePrefix="last " header="View documents for" />
            { this.state.filteredDocuments.length === 0 ? <NoDocuments /> : <DocumentsTable documents={this.state.filteredDocuments} />}
          </div>
        </div>
    </PageWrap>
    );
  }
}

export default windowSize(DocumentsPage);