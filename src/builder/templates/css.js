(function(){

	Templates['css'] = class CommonJs extends ITemplate {
		wrapBundle (str) {
			return str
		}

		wrapModule (path, str) {
			return str;
		}
	};

}());