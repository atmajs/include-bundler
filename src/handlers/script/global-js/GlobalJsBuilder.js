GlobalJsHandler.Builder = class GlobalJsBuilder extends BaseBuilder {

	constructor () {
		super(...arguments);
	}
	wrapModule (resource) {
		return resource.content;
	}
	
	accepts (resource) {		
		return resource.type === 'js' && resource.getModule() === 'global';
	}
	
};

