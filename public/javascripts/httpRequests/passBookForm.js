

(function() {

	var http = new HttpRequest();


	passBookForm.onsubmit = function() {

		http.post('/issueAndPass/searchPassingBook', JSON.stringify({

			bookId: this.elements.passingBookId.value
		
		}), function(result) {

			var p = document.createElement('p');
			p.textContent = result;
			passingBookResult.appendChild(p);

		});

		this.elements.passingBookId.value = '';

		return false;

	};


	document.getElementById('btnPassBook').onclick = function() {

		var passBookOrder = '';
		var r = confirm('Are you sure you want to PASS this book?');
		r === true ? passBookOrder = 1 : passBookOrder = 0;


		http.post('/issueAndPass/passBook', JSON.stringify({

			bookId: passBookForm.elements.passingBookId.value,
			passBookOrder: passBookOrder 
		
		}), function(result) {

			var p = document.createElement('p');
			p.textContent = result;
			passingBookResult.appendChild(p);

		});

		passBookForm.elements.passingBookId.value = '';

		return false;

	};


})();