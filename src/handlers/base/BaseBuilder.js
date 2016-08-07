class BaseBuilder {
	constructor (solution, handler) {
		assert(solution instanceof Solution, 'Solution expected for the Builder');
		assert(handler instanceof BaseHandler, 'BaseHandler expected for the Builder');

		this.solution = solution;
		this.handler = handler;
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