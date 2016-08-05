MaskHandler.Builder = class MaskRewriter extends BaseBuilder {

	constructor () {
		super(...arguments);
	}

	buildRoot (resource, dependencies) {

	}

	accepts (type) {
		return type === 'mask';
	}
	
};

