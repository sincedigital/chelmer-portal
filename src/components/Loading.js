import React from 'react';

const Loading = (props) => {
  return (
  	<div id="loading" className="fg-n">
		<i className="fg-n fas fa-circle-notch fa-spin fa-3x fa-fw"></i>
		<span className="sr-only fg-n">Loading...</span>
  	</div>
  );
};

export default Loading;