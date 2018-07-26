var dictionary = require('./dictionary.json');

exports.sendResMessage = function(arrayOfClients, statusCode, endMessage) {

	arrayOfClients.forEach(function(res) {
	
		res.statusCode = statusCode;
		res.end(endMessage);
	
	});

};


exports.checkLibrary = function(libraries, libraryName) {

	var result = 0;
	
	for (var i = 0; i < libraries.length; i++) {	

		if (libraries[i].name === libraryName) {

			result = 1;

		};

	};

	return result;
	
};


exports.handlePOST = function(req, res, callback) {

	var body = '';

	req
		.on('readable', function() {

			body += req.read();

		})
		.on('end', function() {

			try {
				body = JSON.parse(body.map(item => item != null));
    
			} catch(e) {
				res.statusCode = 400;
				res.end(dictionary.badRequest);

			};

			callback(body);

		});

};