class BaseBuilder {
	constructor (solution) {
		this.solution = solution;
	}
	
	buildPage (resource, dependencies) {
		throw Error('Not implemented');
		return void 0;
	}
	
	accepts (type) {
		throw Error('Not implemented');
		return Boolean();
	}
}