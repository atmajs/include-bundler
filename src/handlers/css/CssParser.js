CssHandler.Parser = class CssParser extends BaseParser {

	constructor () {
		super(...arguments);
	}
	
	getDependencies (content, ownerResource) {
		
		this.solution.assetsManager.rewriteCss(ownerResource, this.solution);
		return async_resolve({ dependencies: [] });
	}

	accepts (type) {
		return type === 'css';
	}
};
