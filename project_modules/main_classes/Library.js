var dictionary = require('../dictionary.json');

var Library = function(libraryName) {

	this.name = libraryName;

};


Library.prototype.saveBook = function() {

	throw Error(dictionary.notImplemented);

};


Library.prototype.issueBook = function() {

	throw Error(dictionary.notImplemented);

};


Library.prototype.passBook = function() {

	throw Error(dictionary.notImplemented);

};


Library.prototype.findByName = function(bookName) {

	throw Error(dictionary.notImplemented);

};


Library.prototype.findByAuthor = function(author) {

	throw Error(dictionary.notImplemented);

};


Library.prototype.findByAuthorAndName = function(author) {

	throw Error(dictionary.notImplemented);

};


Library.prototype.findById = function( bookId) {

	throw Error(dictionary.notImplemented);

};


Library.prototype.findByFio = function(fio) {

	throw Error(dictionary.notImplemented);

};


Library.prototype.currentDate = function() {

	var today = new Date();

	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();

	dd < 10 ? dd = '0' + dd : dd = dd;
	mm < 10 ? mm = '0' + mm : mm = mm;

	return dd + '-' + mm + '-' + yyyy;

};




module.exports = Library;
