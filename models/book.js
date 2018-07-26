'use strict'

var Book = function(author, bookName, libraryName){
	this.id = guid();  
	this.author = author;
	this.bookName = bookName;
	this.library = libraryName;
	this.issued = 'FREE';
	this.issuedTill = null;
	this.issuedTo = null;
};

var guid = function(){
		function s4(){
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	};



module.exports = Book;

