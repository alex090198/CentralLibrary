var express = require('express');
var router = express.Router();
var path = require('path');
var commonFunc = require('../project_modules/commonFunc');
var LibrariesService = require('../project_modules/main_classes/LibrariesService');
var dictionary = require('../project_modules/dictionary.json');
var parseByRegExp = require('../project_modules/parseByRegExp');



router.post('/addBook', function(req, res, next) {

	commonFunc.handlePOST(req, res, function(body) {

		var library = new LibrariesService();
		var libs = library.showAllLibraries();

		var author = parseByRegExp.cutSideSpaces(body.author);
		var bookName = parseByRegExp.cutSideSpaces(body.bookName);
		var libraryName = parseByRegExp.cutSideSpaces(body.libraryName);

		if (author && bookName && libraryName && commonFunc.checkLibrary(libs, libraryName)) {

			try {

				library.addBook(author, bookName, libraryName) 
					? res.send(dictionary.bookAdded) : res.send(dictionary.fileAleadyExist);

			} catch(e) {

				res.send(dictionary.errorWhileSaving);

			}

		} else {

			res.send(dictionary.allFieldsMustBeFilledAndExistingLibsAre + ' "grsu_text", "karbysheva_csv" and "lenina_csv"');

		};
		
	});

});


module.exports = router;