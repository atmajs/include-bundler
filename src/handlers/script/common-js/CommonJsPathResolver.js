CommonJsHandler.PathResolver = class CommonJsPathResolver extends BasePathResolver {

	constructor () {
		super(...arguments);
	}
	
	accepts (includeData) {
		if (includeData.type !== 'js' || includeData.module !== 'commonjs') {
			return false;
		}
		return /^[\w\-]+$/.test(includeData.url);
	}

	resolve (includeData) {
		console.log(includeData.url.cyan);
		return null;
	}

};
