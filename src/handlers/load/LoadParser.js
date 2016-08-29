LoadHandler.Parser = class LoadParser extends BaseParser {

	constructor () {
		super(...arguments);
	}
	
	getDependencies (content, ownerResource) {
		return null;
	}

	accepts (resource) {
		return false;
	}
};
