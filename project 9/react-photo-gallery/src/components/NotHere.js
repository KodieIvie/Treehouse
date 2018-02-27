import React from 'react';

const NotHere = () => {
	const broken = 'https://cdn.mos.cms.futurecdn.net/028d451065601bcd5319d007eaccc8bb-650-80.jpg';
	return (
		<div className="page-container">
        	<div className="bg" style={{ backgroundImage: 'url(' + broken + ')'}}></div>
        	<h1 className="title">404</h1>
      	</div>
	)
};

export default NotHere;