(function() {
	var http = new HttpRequest();


searchBookByFioForm.onsubmit = function() {

	http.post('/search/searchBookByFio', JSON.stringify({

		fio: this.elements.fio.value

	}), function(result) {


		var p = document.createElement('p');
		p.textContent = result;
		searchingBookByFioResult.appendChild(p);

	});

	this.elements.fio.value = '';
	
	return false;

};


})();