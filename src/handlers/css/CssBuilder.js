CssHandler.Builder = class CssRewriter extends BaseBuilder {

	constructor () {
		super(...arguments);
	}

	buildRoot (resource, dependencies) {

	}

	accepts (type) {
		return type === 'css';
	}
	
};

