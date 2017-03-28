class BasePathResolver {
	constructor (solution, handler) {
		this.solution = solution;
		this.handler = handler;
	}	
	accepts (type) {
		throw Error('Not implemented');
		return Boolean();
	}
}