import React from 'react';

const vision = require('react-cloud-vision-api');
vision.init({ auth: 'AIzaSyCScDq8xvUnb1x4JDyt9zRHawD-imeyzuE'});

module.exports = function(base64Img){
	const req = new vision.Request({
		image: new vision.Image({
			base64: base64Img
		}),
		features: [
			new vision.Feature('TEXT_DETECTION', 10)
		]
	});	

	vision.annotate(req).then(async (res) => {
		const response = await fetch('http://localhost:3000/receipt', {
			method: 'POST',
			body: JSON.stringify(res.response),
		});
		return JSON.stringify(res.response);
	}, (e) => {
		console.log('Error: ', e);
	});
}