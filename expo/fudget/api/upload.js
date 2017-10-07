const Vision = require('@google-cloud/vision');

const vision = Vision();

module.exports = function(base64){
	// mongoose.connect() 

	// request CV
	const request = {
		image:{
			content: base64
		}
	}

	vision.labelDetection(request).then((results) => {
		const labels = results[0].labelAnnotations;
		console.log('Labels:');
		labels.forEach((label) => console.log(label.description));

		//send to custom api
		var options = {
			hostname: 'localhost',
			port: '3000',
			path: '/items',
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
		req.write(JSON.stringify(fileName));
		req.on('error', (err) => {
			console.error(err);
		});
		req.end();
	}).catch((err) => {
		console.error('Error: ', err);
	});

	// mongoose.g
}