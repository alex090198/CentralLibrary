var fs = require('fs');
var parseByRegExp = require('../parseByRegExp');
var fileSystemLibrary = require('./FileSystemLibrary');
var dictionary = require('../dictionary.json');

var fileFormat = '.txt';


var TXTLibrary = function(libraryName) {

	fileSystemLibrary.call(this, libraryName);

};


TXTLibrary.prototype = Object.create(fileSystemLibrary.prototype);
TXTLibrary.prototype.constructor = TXTLibrary;


TXTLibrary.prototype.saveBook = function(book) {

	if (!this.findByName(book.bookName)) {

		var result = 1;

		_writeTxtFile(this.path + '/' + book.bookName + fileFormat, book);

	}

	return result;// undefined - file with such name already exist and rewritting forbidden
				  //1 - file with such name can be saved

};


TXTLibrary.prototype.issueBook = function(bookId, fio, issuedTill) {//проверит валидность JSON

	var pathToBook = this.findById(bookId);

	if (pathToBook) {
		
		var jsonObjectOfBook = this.parseBook(pathToBook);
	
		if (jsonObjectOfBook && jsonObjectOfBook.issued === 'FREE') {//проверяем, свободна ли книга

			updateTxtBook(jsonObjectOfBook, new fileSystemLibrary().currentDate(), fio, issuedTill, pathToBook);
			var result = 1;//значит, что книга обновлена

		};

	};

	return result;

};


TXTLibrary.prototype.passBook = function(bookId) {

	var pathToBook = this.findById(bookId);

	if (pathToBook) {

		var jsonObjectOfBook = this.parseBook(pathToBook);
		/*Cheching if JSON is valid*/
		jsonObjectOfBook ? updateTxtBook(jsonObjectOfBook, 'FREE', null, null, pathToBook) : null;

	};

};


TXTLibrary.prototype.findByAuthor = function(author, searchType) {

	var foundBooks = [];

	var pathToLibrary = this.path;
	var booksInLibrary = fs.readdirSync(pathToLibrary);

	for (var i = 0; i < booksInLibrary.length; i++) {
		
		var jsonObjectOfBook = this.parseBook(pathToLibrary + '/' + booksInLibrary[i]);

		if (jsonObjectOfBook && jsonObjectOfBook.author.indexOf(author) === 0) {/*Cheching if JSON is valid*/

			_makeSearchConsideringSearchType(searchType, foundBooks, jsonObjectOfBook, pathToLibrary + '/' + booksInLibrary[i]);

		};

	};

	return foundBooks;

};


TXTLibrary.prototype.findByAuthorAndName = function(author, bookName, searchType) {

	var result;
	var pathToBook = this.findByName(bookName);

	if (pathToBook) {

		var jsonObjectOfBook = this.parseBook(pathToBook);

		if (jsonObjectOfBook.author === author) {


			if (searchType !== 'freeOnly') {

				result = pathToBook;

			} else {

				if(jsonObjectOfBook.issued === 'FREE') {

					result = pathToBook;

				};

			};

		};

	};

	return result;

};


TXTLibrary.prototype.findById = function(bookId) {

	var pathToLibrary = this.path;
	var booksInLibrary = fs.readdirSync(pathToLibrary);

	for (var i = 0; i < booksInLibrary.length; i++) {
		
		var jsonObjectOfBook = this.parseBook(pathToLibrary + '/' + booksInLibrary[i]);

		if (jsonObjectOfBook && jsonObjectOfBook.id === bookId) {/*Cheching if JSON is valid*/

			var pathToBook = pathToLibrary + '/' + booksInLibrary[i];

		};

	};

	return pathToBook;

};


TXTLibrary.prototype.findByFio = function(fio) {

	var foundBooks = [];

	var pathToLibrary = this.path;
	var booksInLibrary = fs.readdirSync(pathToLibrary);

	for (var i = 0; i < booksInLibrary.length; i++) {

		var jsonObjectOfBook = this.parseBook(pathToLibrary + '/' + booksInLibrary[i]);

		if (jsonObjectOfBook && jsonObjectOfBook.issuedTo === fio) {/*Cheching if JSON is valid*/

			foundBooks.push(pathToLibrary + '/' + booksInLibrary[i]);

		};
	
	};

	return foundBooks;

};


function updateTxtBook(jsonObjectOfBook, issuedParam, issuedToParam, issuedTillParam, pathToBook) {

	var updatedBook = {

		id: jsonObjectOfBook.id,
		author: jsonObjectOfBook.author,
		bookName: jsonObjectOfBook.bookName,
		library: jsonObjectOfBook.library,
		issued: issuedParam,
		issuedTill: parseByRegExp.parseHtml5Date(issuedTillParam),
		issuedTo: issuedToParam

	};

	_writeTxtFile(pathToBook, updatedBook);

};


TXTLibrary.prototype.parseBook = function(pathToBook) {

	try {

		var jsonObjectOfBook = JSON.parse(fs.readFileSync(pathToBook));

	} catch(e) {

		console.log(dictionary.invalidFileOnPath + ' ' + pathToBook);

	};

	return jsonObjectOfBook;

};


var _writeTxtFile = function(pathToBook, objectToSave) {

	fs.writeFile(pathToBook, JSON.stringify(objectToSave), function(err) {

		if (err) {

			throw Error(err);

		};

	});

};

var _makeSearchConsideringSearchType = function(searchType, arrayForResults, jsonObject, pathToBook) {

	if (searchType !== 'freeOnly') {

		arrayForResults.push(pathToBook);

	} else {

		if(jsonObject.issued === 'FREE') {

			arrayForResults.push(pathToBook); 

		};

	};

};

module.exports = TXTLibrary;
