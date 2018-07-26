var fs = require('fs');

exports.sendFile = function(fileName, res) {
	
	var fileStream = fs.createReadStream(fileName);
	fileStream
		.on('error', function(err) {
			console.log('Oops');
			res.statusCode = 404;
			res.end('File not found');
		})
		.pipe(res);

		res.on('close', function() {
			fileStream.destroy();
		});
};
