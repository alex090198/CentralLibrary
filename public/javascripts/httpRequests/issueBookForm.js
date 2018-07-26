(function() {
	var http = new HttpRequest();


issueBookForm.onsubmit = function() {

	http.post('/issueAndPass/issueBook', JSON.stringify({

		bookId: this.elements.bookId.value,
		fio: this.elements.fio.value,
		till: this.elements.till.value
	
	}), function(result) {

		var p = document.createElement('p');
		p.textContent = result;
		issueResult.appendChild(p);

		setTimeout(function() {

			issueResult.removeChild(p);

		}, 4000);

	});
	

	this.elements.bookId.value = '';
	this.elements.fio.value = '';
	this.elements.till.value = '';
	

	return false;
};


})();