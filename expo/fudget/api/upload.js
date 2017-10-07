var React = require('react-native');

const mongoose = require('mongoose');
const Vision = require('@google-cloud/vision');

const vision = Vision();

module.exports = function(fileName){
	// mongoose.connect() 

	// request CV
	const request = {
		source: {
			fileName: fileName
		}
	}

	vision.labelDetection(request).then((results) => {
		const labels = results[0].labelAnnotations;
		console.log('Labels:');
		labels.forEach((label) => console.log(label.description));

		//send to custom api
		var options = {
			hostname: process.env.DB_HOST,
			port: '',
			path: process.env.DB_PATH,
			method: 'POST',
		}

		var req = http.request(options, (res) =>{
			res.on('error', (err) => {
				console.log('error');
			});
			// expect a response
			res.on('data', (data) => {
				console.log(data);
				// proceed to home page, can request data from db now
				var dataJSON = JSON.parse(data);
				if(dataJSON != null){
					if(dataJSON.fail == false){
						return true;
					}
				}
			});
		});
		req.on('error', (err) => {
			console.error(err);
		});
		req.end();
	}).catch((err) => {
		console.error('Error: ', err);
	});

	// mongoose.g
}