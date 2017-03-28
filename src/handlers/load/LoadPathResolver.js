LoadHandler.PathResolver = class LoadPathResolver extends BasePathResolver {

	constructor () {
		super(...arguments);
	}
	
	accepts (type) {
		return false;
	}
};
