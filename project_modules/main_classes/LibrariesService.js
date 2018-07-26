var Book = require('../../models/book');
var TXTLibrary = require('./TXTLibrary');
var CSVLibrary = require('./CSVLibrary');
var fs = require('fs');
var dictionary = require('../dictionary.json');


var LibrariesService = function() {};


var libraries = [new TXTLibrary('grsu_text')
	, new CSVLibrary('karbysheva_csv')
	, new CSVLibrary('lenina_csv')];


/*функция не используется. Написана на перспективу*/
LibrariesService.prototype.initLibrary = function(libraryName, storageFormat) {

	switch (storageFormat) {
		
		case 'txt':
			
			libraries.push(Object.create(TXTLibrary).constructor(libraryName));
			break;
		
		case 'csv':
			
			libraries.push(Object.create(CSVLibrary).constructor(libraryName));
			break;
		
		default:
		
			console.log(dictionary.unsupportedStorageFormat);
			break;
	
	};

};


/*функция не используется. Написана на перспективу*/
LibrariesService.prototype.showAllLibraries = function() {

	return libraries;

};


LibrariesService.prototype.addBook = function(author, bookName, libraryName) {

	var result;
	
	var book = new Book(author, bookName, libraryName);
	
	_saveBook(book, book.library)  ? result = 1 : null;

	return result;
};


LibrariesService.prototype.issueBook = function(bookId, fio, issuedTill) {

	var result;
	
	libraries.forEach(function(library) {

		var temp = library.issueBook(bookId, fio, issuedTill);//undefined = книга не свободан и не может быть отдана &&  1 = книга была свободна и отдана
		temp === 1 ? result = temp : null;
	});

	return result;

};


LibrariesService.prototype.passBook = function(bookId) {

	libraries.forEach(function(library) {

		library.passBook(bookId);

	});

};


LibrariesService.prototype.findBookByName = function(bookName, searchType) {

	var listOfPaths = [];

	libraries.forEach(function(library) {

		var pathToBook = library.findByName(bookName, searchType);
		pathToBook ? listOfPaths.push(pathToBook) : null;

	});

	return listOfPaths;

};


LibrariesService.prototype.findBookByAuthor = function(author, searchType) {

	var listOfPaths = [];

	libraries.forEach(function(library) {

		var pathToBook = library.findByAuthor(author, searchType);

		if (pathToBook.length !== 0) {

			for (var i = 0; i < pathToBook.length; i++) {
				
				listOfPaths.push(pathToBook[i]);
			
			};

		};

	});

	return listOfPaths;

};


LibrariesService.prototype.findBookByNameAndLibrary = function(bookName, libraryName, searchType) {

	var listOfPaths = [];

	libraries.forEach(function(library) {

		if(library.name === libraryName) {

			var pathToBook = library.findByName(bookName,searchType);
			pathToBook ? listOfPaths.push(pathToBook) : null;

		};

	});

	return listOfPaths;

};


LibrariesService.prototype.findBookByAuthorAndLibrary = function(author, libraryName, searchType) {

	var result;

	libraries.forEach(function(library) {

		if (library.name === libraryName) {

			var  pathsToBooks = library.findByAuthor(author, searchType);
			pathsToBooks ? result = pathsToBooks : null;

		};

	});

	return result;

};


LibrariesService.prototype.findBookByAuthorAndName = function(author, bookName, searchType) {

	var listOfPaths = [];

	libraries.forEach(function(library) {

		var pathToBook = library.findByAuthorAndName(author, bookName, searchType);
		pathToBook ? listOfPaths.push(pathToBook) : null;

	});

	return listOfPaths;

};


LibrariesService.prototype.findBookByAuthorAndNameAndLibrary = function(author, bookName, libraryName, searchType) {

	var result;

	libraries.forEach(function(library) {

		if (library.name === libraryName) {

			var pathToBook = library.findByAuthorAndName(author, bookName, searchType);
			pathToBook ? result = pathToBook : null;

		};

	});

	return result;

};


LibrariesService.prototype.findBookById = function(bookId) {

	var result;

	libraries.forEach(function(library) {

		var path = library.findById(bookId);
		path ? result = path : null;

	});

	return result;//if nothing found, path = undefined and result = undefined

};


LibrariesService.prototype.findBookByFio = function(fio) {

	var listOfPaths = [];

	libraries.forEach(function(library) {

		var pathToBook = library.findByFio(fio);

		if (pathToBook.length !== 0) {

			var tempArr = pathToBook.slice(',');
			
			for (var i = 0; i < tempArr.length; i++) {

				listOfPaths.push(tempArr[i]);
				
			};

		};

	});

	return listOfPaths;

};


function _saveBook(book, libraryName) {

	var result;

	libraries.forEach(function(library) {

		if (library.name === libraryName) {

			library.saveBook(book) ? result = 1 : null;

		};

	});

	return result;

};




module.exports = LibrariesService;