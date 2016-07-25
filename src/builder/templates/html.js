(function(){

	Templates['html'] = class CommonJs extends ITemplate {
		wrapBundle (str) {
			return str
		}

		wrapModule (path, str) {
			return Module
				.replace('%MODULE_PATH%', path)
				.replace('%MODULE%', str)
				;
		}
	};

	let Module = `
	module path="%MODULE_PATH%" {
		%MODULE%
	}
	`;

}());