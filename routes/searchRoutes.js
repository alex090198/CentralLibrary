var express = require('express');
var router = express.Router();
var path = require('path');
var commonFunc = require('../project_modules/commonFunc');
var sendFileModule = require('../project_modules/sendFileModule');//for creating fileStream 
var LibrariesService = require('../project_modules/main_classes/LibrariesService');
var dictionary = require('../project_modules/dictionary.json');
var parseByRegExp = require('../project_modules/parseByRegExp');

require('events').EventEmitter.prototype._maxListeners = 100;

router.post('/searchBookByFio', function(req, res, next) {

	commonFunc.handlePOST(req, res, function(body) {

		var fio = parseByRegExp.cutSideSpaces(body.fio);

		if (fio) {

			var pathsToFiles = new LibrariesService().findBookByFio(fio);
			findAndSend(pathsToFiles, res);

		} else { res.send(dictionary.emptyFieldForbidden); };

	});

});



router.post('/searchBook', function(req, res, next) {

	commonFunc.handlePOST(req, res, function(body) {

		var author = parseByRegExp.cutSideSpaces(body.author);
		var bookName = parseByRegExp.cutSideSpaces(body.bookName);

		if (bookName || author) {


			switch(author && !bookName && !body.libraryWhereToSearch 
				|| !author && bookName && !body.libraryWhereToSearch
				|| author && bookName && !body.libraryWhereToSearch 
				|| author && !bookName && body.libraryWhereToSearch
				|| !author && bookName && body.libraryWhereToSearch 
				|| author && bookName && body.libraryWhereToSearch ) {

				case author && !bookName && !body.libraryWhereToSearch :

					var pathsToFiles = new LibrariesService().findBookByAuthor(author, body.searchType);
					findAndSend(pathsToFiles, res);

					break;

				case !author && bookName && !body.libraryWhereToSearch:

					var pathsToFiles = new LibrariesService().findBookByName(bookName, body.searchType);
					findAndSend(pathsToFiles, res);
					
					break;

				case author && bookName && !body.libraryWhereToSearch:

					var pathsToFiles = new LibrariesService().findBookByAuthorAndName(author, bookName, body.searchType);
					findAndSend(pathsToFiles, res);

					break;

				case author && !bookName && body.libraryWhereToSearch:

					var pathsToFiles = new LibrariesService().findBookByAuthorAndLibrary(author, body.libraryWhereToSearch, body.searchType);
					findAndSend(pathsToFiles, res);

					break;

				case !author && bookName && body.libraryWhereToSearch:

					var pathsToFiles = new LibrariesService().findBookByNameAndLibrary(bookName
						, body.libraryWhereToSearch, body.searchType);
					findAndSend(pathsToFiles, res);

					break;

				case author && bookName && body.libraryWhereToSearch:

					var pathToFile = new LibrariesService().findBookByAuthorAndNameAndLibrary(author, bookName
						, body.libraryWhereToSearch, body.searchType);
					pathToFile ? sendFileModule.sendFile(pathToFile, res) : res.send(dictionary.notFound);

					break;

				default:

					throw Error('Error in switch. searchRoutes.js');
					
					break;

			}

		} else { res.send(dictionary.emptyFieldForbidden + ': at least BookName'); };
		
	});

});




function findAndSend(pathsToFiles, res) {

	if (pathsToFiles.length !== 0) {

		for (var i = 0; i < pathsToFiles.length; i++) {

			sendFileModule.sendFile(pathsToFiles[i], res);

		};

	} else { res.end(dictionary.notFound); };

};




module.exports = router;