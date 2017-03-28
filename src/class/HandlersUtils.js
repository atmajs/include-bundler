let HandlersUtils = {
	findPathResolver (includeData) {
		var handler = this.find(x => x.pathResolver && x.pathResolver.accepts && x.pathResolver.accepts(includeData));
		return handler && handler.pathResolver;
	}
}