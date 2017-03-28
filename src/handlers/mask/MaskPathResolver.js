MaskHandler.PathResolver = class MaskPathResolver extends BasePathResolver {

	constructor () {
		super(...arguments);
	}
	
	accepts (type) {
		return false;
	}
};
