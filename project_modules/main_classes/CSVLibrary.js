var fs = require('fs');
var json2csv = require('json2csv');
var fileSystemLibrary = require('./FileSystemLibrary');
var parseByRegExp = require('../parseByRegExp');
var dictionary = require('../dictionary.json');


var fileFormat = '.csv';


var CSVLibrary = function(libraryName) {

	fileSystemLibrary.call(this, libraryName);

};


CSVLibrary.prototype = Object.create(fileSystemLibrary.prototype);
CSVLibrary.prototype.constructor = CSVLibrary;


CSVLibrary.prototype.saveBook = function(book) {

	if (!this.findByName(book.bookName)) {

		var result = 1;
		var pathToLibrary = this.path;

		_writeCsvFile(book, pathToLibrary + '/' + book.bookName + fileFormat);

	};

	return result;

};


CSVLibrary.prototype.issueBook = function(bookId, fio, issuedTill) {

	var pathToBook = this.findById(bookId);

	if (pathToBook) {
		
		var arrayOfBook = this.parseBook(pathToBook);

		if (arrayOfBook.length === 29 && arrayOfBook[23] === 'FREE') {

			updateCsvBook(arrayOfBook, new fileSystemLibrary().currentDate(), issuedTill, fio, pathToBook)
			var result = 1;

		};
		
	};

	return result;

};


CSVLibrary.prototype.passBook = function(bookId) {

	var pathToBook = this.findById(bookId);

	if (pathToBook) {

		var arrayOfBook = this.parseBook(pathToBook);
		/*обновляем книгу только, если массив валиден*/
		arrayOfBook.length === 29 ? updateCsvBook(arrayOfBook, 'FREE', null, null, pathToBook) : null;

	};

};


CSVLibrary.prototype.findByAuthor = function(author, searchType) {

	var foundBooks = [];

	var pathToLibrary = this.path;
	var booksInLibrary = fs.readdirSync(pathToLibrary);

	for (var i = 0; i < booksInLibrary.length; i++) {
		
		var arrayOfBook = this.parseBook(pathToLibrary + '/' + booksInLibrary[i]);

		if (arrayOfBook[17].indexOf(author) === 0) {

			_makeSearchConsideringSearchType(searchType, foundBooks, arrayOfBook, pathToLibrary + '/' + booksInLibrary[i]);

		};

	};

	return foundBooks;

};


CSVLibrary.prototype.findByAuthorAndName = function(author, bookName, searchType) {

	var result;
	var pathToBook = this.findByName(bookName);

	if (pathToBook) {

		var arrayOfBook = this.parseBook(pathToBook);

		if (arrayOfBook[17] === author) {

			if (searchType !== 'freeOnly') {

				result = pathToBook;

			} else {

				if(arrayOfBook[23] === 'FREE') {

					result = pathToBook;

				};

			};

		};

	};

	return result;

};


CSVLibrary.prototype.findById = function(bookId) {

	var pathToLibrary = this.path;
	var booksInLibrary = fs.readdirSync(pathToLibrary);

	for (var i = 0; i < booksInLibrary.length; i++) {
		
		var arrayOfBook = this.parseBook(pathToLibrary + '/' + booksInLibrary[i]);

		if (arrayOfBook[15] === bookId) {

			var pathToBook = pathToLibrary + '/' + booksInLibrary[i];

		};

	};

	return pathToBook;

};


CSVLibrary.prototype.findByFio = function(fio) {//проверить на валидность JSON

	var foundBooks = [];

	var pathToLibrary = this.path;
	var booksInLibrary = fs.readdirSync(pathToLibrary);

	for (var i = 0; i < booksInLibrary.length; i++) {
		
		var arrayOfBook = this.parseBook(pathToLibrary + '/' + booksInLibrary[i]);

		if (arrayOfBook[27] === fio) {

			foundBooks.push(pathToLibrary + '/' + booksInLibrary[i]);

		};

	};

	return foundBooks;

};


function updateCsvBook(arrayOfBook, issuedParam, issuedTillParam, issuedToParam, pathToBook) {

	var updatedBook = {

		id: arrayOfBook[15],
		author: arrayOfBook[17],
		bookName: arrayOfBook[19],
		library: arrayOfBook[21],
		issued: issuedParam,
		issuedTill: parseByRegExp.parseHtml5Date(issuedTillParam),
		issuedTo: issuedToParam

	};

	_writeCsvFile(updatedBook, pathToBook);

};


CSVLibrary.prototype.parseBook = function(pathToBook) {

	var arrayOfBook = fs.readFileSync(pathToBook).toString().split('"');
	/*если длинна массива не 29, значит какого-то свойства книги нет, - файл невалиден */
	arrayOfBook.length !== 29 ? console.log(dictionary.invalidFileOnPath + " " + pathToBook) : null;

	return arrayOfBook;

};

var _writeCsvFile = function(dataToSave, pathToBook) {

	try {

		json2csv({data: dataToSave
		, fields: ['id', 'author', 'bookName', 'library', 'issued', 'issuedTill', 'issuedTo']}
		, function(err, csv) {// readyCsvFile got

			fs.writeFile(pathToBook, csv, function(err) {});//readyCsvFile saved

		});

	} catch(e) {

		throw Error(e);

	}

};


var _makeSearchConsideringSearchType = function(searchType, arrayForResults, arrayOfBook, pathToBook) {

	if (searchType !== 'freeOnly') {

		arrayForResults.push(pathToBook);

	} else {

		if(arrayOfBook[23] === 'FREE') {

			arrayForResults.push(pathToBook);

		};

	};

	return arrayForResults;

};


module.exports = CSVLibrary;
