class BaseParser {

	constructor (solution, handler) {
		assert(solution instanceof Solution, 'Solution expected for Parser');		
		assert(handler instanceof BaseHandler, 'BaseHandler expected for the Parser');

		this.solution = solution;
		this.handler = handler;
	}

	getDependencies (content, ownerResource) {
		var IDependency = {
			url: 'string', 
			type: 'string', 
			page: 'string?',
			bundle: 'string?'
		};

		return [ IDependency ];
		return new Promise(resolve => resolve( [IDependency] ));
	}

	accepts (type) {
		return Boolean();
	}
};