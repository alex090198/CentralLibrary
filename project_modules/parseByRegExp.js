

exports.parseFileName = function(fileName) {

	var pattern = /(\b.+)(\.\w+\b)/,//две группы для мэтчинга
		match,
		tempVarWithFileName = '',
		tempVarWithFormat = '';

		if (match = pattern.exec(fileName)) {

			tempVarWithFileName = match[1];
			tempVarWithFormat = match[2];
		
		}
	
	return [tempVarWithFileName, tempVarWithFormat];

};


exports.parseHtml5Date = function(fileName) {

	var pattern = /(\d\d\d\d)(-)(\d\d)(-)(\d\d)(T)(.+)/,//две группы для мэтчинга
		match,
		year,
		month,
		day,
		time;

	if (match = pattern.exec(fileName)) {

		year = match[1];
		month = match[3];
		day = match[5];
		time = match[7];

	}

	var date = year && month && day && time ? day + '-' + month + '-' + year + 'T' + time : null;
	
	return date;

};


exports.cutSideSpaces = function(string) {

	var pattern = /(\w+.+\w+)/,
		match,
		data;

	if (match = pattern.exec(string)) {

		data = match[1];

	};

	return data;

};