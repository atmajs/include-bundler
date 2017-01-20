CssHandler.Parser = class CssParser extends BaseParser {

	constructor () {
		super(...arguments);
	}
	
	getDependencies (content, ownerResource) {		
		return async_resolve({ dependencies: [] });
	}

	accepts (type) {
		return type === 'css';
	}
};
