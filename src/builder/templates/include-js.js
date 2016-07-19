(function(){

Templates['includejs'] = class CommonJs extends ITemplate {
	wrapBundle (str) {
		return str;
	}

	wrapModule (resource) {
		
	}
};


var MODULE_BEFORE = `
include.setCurrent({ namespace: '#{namespace}', url: '#{url}'});
`;

var MODULE_AFTER = `
include.setCurrent({ namespace: '#{namespace}', url: '#{url}'});
`;


}());
