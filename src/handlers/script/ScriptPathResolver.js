ScriptHandler.PathResolver = class ScriptPathResolver extends BasePathResolver {

	constructor () {
		super(...arguments);
		this.resolvers = [
			new CommonJsHandler.PathResolver(this.solution, this.handler)
		];
	}
	
	accepts (includeData) {
		if (includeData.type !== 'js') {
			return false;
		}
		var resolver = this._getInnerResolver(includeData);
		return resolver != null;
	}

	resolve (includeData) {
		var resolver = this._getInnerResolver(includeData);		
		return resolver.resolve(includeData);
	}

	_getInnerResolver (includeData) {
		return this.resolvers.find(x => x.accepts(includeData));
	}
};
