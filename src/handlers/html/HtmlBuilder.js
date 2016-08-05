HtmlHandler.Builder = class HtmlRewriter extends BaseBuilder {

	constructor () {
		super(...arguments);
	}

	buildRoot (resource, dependencies) {

	}

	accepts (type) {
		return type === 'css';
	}
	
};

