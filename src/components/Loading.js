import React from 'react';

const Loading = (props) => {
  return (
  	<div id="loading">
		<i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
		<span className="sr-only">Loading...</span>
  	</div>
  );
};

export default Loading;