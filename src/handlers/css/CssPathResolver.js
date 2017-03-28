CssHandler.PathResolver = class CssPathResolver extends BasePathResolver {

	constructor () {
		super(...arguments);
	}
	
	accepts (type) {
		return false;
	}
};
