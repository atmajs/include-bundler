HtmlHandler.PathResolver = class HtmlPathResolver extends BasePathResolver {

	constructor () {
		super(...arguments);
	}
	
	accepts (type) {
		return false;
	}
};
