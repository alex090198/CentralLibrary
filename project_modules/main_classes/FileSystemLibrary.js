var fs = require('fs');
var parseByRegExp = require('../parseByRegExp');
var dictionary = require('../dictionary.json');
var Library = require('./Library');

var FileSystemLibrary = function(libraryName) {

	Library.call(this, libraryName);
	this.path = 'public/libraries/' + libraryName;

};


FileSystemLibrary.prototype.addBook = function() {

	throw Error(dictionary.notImplemented);

};


FileSystemLibrary.prototype.issueBook = function() {

	throw Error(dictionary.notImplemented);

};


FileSystemLibrary.prototype.passBook = function() {

	throw Error(dictionary.notImplemented);

};


FileSystemLibrary.prototype.findByName = function(bookName, searchType) {

	var pathToFile;
	var files = fs.readdirSync(this.path);

	for (var i = 0; i < files.length; i++) {
		
		/*разбиваем 'fileName.txt' на 'fileName' и '.txt'*/
		var parsedFileName = parseByRegExp.parseFileName(files[i]);

		if (parsedFileName[0] === bookName) {

			if (searchType !== 'freeOnly') {

				pathToFile = this.path + '/' + files[i];

			} else {

				var parsedBook = this.parseBook(this.path + '/' + files[i]);
				if(parsedBook.issued === 'FREE' || parsedBook[23] === 'FREE') {

					pathToFile = this.path + '/' + files[i];

				};

			};

		};

	};

	return pathToFile;

};


FileSystemLibrary.prototype.findByAuthor = function(author) {

	throw Error(dictionary.notImplemented);

};


FileSystemLibrary.prototype.findByAuthorAndName = function(author, bookName) {

	throw Error(dictionary.notImplemented);

};


FileSystemLibrary.prototype.findById = function( bookId) {

	throw Error(dictionary.notImplemented);

};


FileSystemLibrary.prototype.findByFio = function(fio) {

	throw Error(dictionary.notImplemented);

};




module.exports = FileSystemLibrary;