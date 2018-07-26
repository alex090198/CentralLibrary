var HttpRequest = (function () {//самовызывающаяся функция. Будет вызвана всего один раз. При подключении к html


	function HttpRequest() {

	}


	HttpRequest.prototype.post = function(url, body, onLoad, onError) {
		
		var xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.send(body);
		xhr.onreadystatechange = function() {

			if (this.readyState === 4 && this.status === 200) {

				onLoad(this.responseText);

			};

		};

	};

	var _createXHR = function _createXHR() {//для того, чтобы сделать эту 
		//функцию privat, обернули класс в функцию(самовызывающуюся к тому же)

	};


	return HttpRequest;//возвращаем конструктор, чтобы создавать объекты этого класса

})();