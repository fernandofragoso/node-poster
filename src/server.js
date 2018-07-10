const request = require('request');
const fs = require('fs');
const path = require('path');

const URL = 'http://localhost:3333';
const FILEPATH = path.join(__dirname, '../file.json');

let readFile = function(file, callback) {
	fs.readFile(file, 'utf8', (err, data) => {
		if (err) throw err;
		callback(data);
	});
}

let sendRequest = function(url, body) {
	let options = {
		url,
		headers: {
			'client_id': '284c39a822ee43ed87cf4f1c12075f26',
			'client_secret': 'fe6dCcb6FDBd4AC993d2d36203c4c160',
			'Content-Type': 'application/json'
		},
		body
	}
	request.post(
		options,
		function (error, response, body) {
			if (!error && response.statusCode === 200) {
				console.log('Success: ' + body);
			} else {
				console.log('Error: ' + error);
			}
		}
	);
}

console.log('SENDING REQUESTS:');
readFile(FILEPATH, function(data) {
	JSON.parse(data).forEach(function(item, index) {
		console.log(`Sending ${index+1}...`);
		sendRequest(URL, JSON.stringify([item]));
	});
	console.log('Sent!');
});