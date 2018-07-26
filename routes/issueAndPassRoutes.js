var express = require('express');
var router = express.Router();
var path = require('path');
var sendFileModule = require('../project_modules/sendFileModule');
var commonFunc = require('../project_modules/commonFunc');
var LibrariesService = require('../project_modules/main_classes/LibrariesService');
var dictionary = require('../project_modules/dictionary.json');
var parseByRegExp = require('../project_modules/parseByRegExp');


router.post('/issueBook', function(req, res, next) {

	commonFunc.handlePOST(req, res, function(body) {

		var bookId = parseByRegExp.cutSideSpaces(body.bookId);
		var fio = parseByRegExp.cutSideSpaces(body.fio);

		console.log(bookId + fio + body.till);

		if (bookId && fio && body.till) {

			try {

				// состояние свойства 'book.issuedTo'
				var result = new LibrariesService().issueBook(bookId, fio, body.till);

				if (result === 1) {//if (true) --> book's free and can be isseud to the client

					res.send(dictionary.bookIssued);

				} else {

					res.send(dictionary.bookNotFreeOrWrongId);
				}

			} catch(e) {

				res.send(dictionary.errorWhileSaving);
			}			

		} else {

			res.send(dictionary.emptyFieldsForbidden);

		};

	});

});


/*поиск книги по id в бизнес-процессе 'PassBook'*/
router.post('/searchPassingBook', function(req, res, next) {

	commonFunc.handlePOST(req, res, function(body) {

		var bookId = parseByRegExp.cutSideSpaces(body.bookId);

		var pathToBook = new LibrariesService().findBookById(bookId);//возвращает массив путей
			
		if (pathToBook) {//если массив пустой, значит книга с таким id не найдена и id неверный

			sendFileModule.sendFile(pathToBook, res);
			
		} else {

			res.send(dictionary.notFound + ' ' + dictionary.wrongId);

		};

	});

});


/*приём книги и зануление полей*/
router.post('/passBook', function(req, res, next) {

	commonFunc.handlePOST(req, res, function(body) {

		var bookId = parseByRegExp.cutSideSpaces(body.bookId);

		if (bookId && body.passBookOrder) {

			try {

				new LibrariesService().passBook(bookId);

				res.send(dictionary.bookPassed);

			} catch(e) {

				res.send(dictionary.errorWhileSaving);

			};

		} else {

			res.send(dictionary.emptyFieldForbidden);

		};
		
	});

});


module.exports = router;