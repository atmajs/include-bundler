class BaseBuilder {
	constructor (solution) {
		assert(solution instanceof Solution, 'Solution expected for the Builder');
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