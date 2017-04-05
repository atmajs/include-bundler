HtmlHandler.PathResolver = class HtmlPathResolver extends BasePathResolver {

	constructor () {
		super(...arguments);
	}
	resolve (includeData, resource) {
		return (resource.source || resource).cdUrl(includeData.url);
	}
	accepts (includeData) {
		return includeData.module === 'html';
	}
};
