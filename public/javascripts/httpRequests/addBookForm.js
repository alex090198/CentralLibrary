(function() {
	
	var http = new HttpRequest();

	var libraryNameValue;


	addBookForm.onsubmit = function() {

		http.post('/storageManagement/addBook', JSON.stringify({

			author: this.elements.author.value,
			bookName: this.elements.bookName.value,
			libraryName: libraryNameValue
		
		}), function(result) {

			var p = document.createElement('p');
			p.textContent = result;
			additionResult.appendChild(p);

			setTimeout(function() {

				additionResult.removeChild(p);

			}, 4000);

		});

		this.elements.author.value = '';
		this.elements.bookName.value = '';
		document.getElementById('libraryNameInAddBookForm').options[0].selected = true;

		return false;
			
	};


	document.getElementById('libraryNameInAddBookForm').onchange = function() {

		libraryNameValue = this.value;

	};


})();