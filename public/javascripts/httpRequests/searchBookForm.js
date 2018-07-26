(function() {
	var http = new HttpRequest();

	var libraryNameValue;

	searchBookForm.onsubmit = function() {

		http.post('/search/searchBook', JSON.stringify({

			author: this.elements.author.value,
			bookName: this.elements.bookName.value,
			libraryWhereToSearch: libraryNameValue,
			searchType: this.elements.searchType.value
		
		}), function(result) {

				var li = document.createElement('li');
				li.textContent = result;
				searchingResult.appendChild(li);

		});

		this.elements.author.value = '';
		this.elements.bookName.value = '';
		libraryNameValue = null;
		document.getElementById('libraryNameInSearchBookForm').options[0].selected = true;

		return false;

	};


	document.getElementById('libraryNameInSearchBookForm').onchange = function() {

		libraryNameValue = this.value;

	};


})();
