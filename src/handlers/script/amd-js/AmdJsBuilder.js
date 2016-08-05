AmdJsHandler.Builder = class AmdJsBuilder extends BaseBuilder {

	constructor () {
		super(...arguments);
	}

	buildRoot (resource, dependencies) {

	}

	accepts (type) {
		return type === 'mask';
	}
	
};

