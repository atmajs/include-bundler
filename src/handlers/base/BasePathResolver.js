class BasePathResolver {
	constructor (solution, handler) {
		this.solution = solution;
		this.handler = handler;
	}
	
	resolve (includeData, resource) {
		throw Error('Not implemented');
		return String();
	}

	accepts (type) {
		throw Error('Not implemented');
		return Boolean();
	}
}