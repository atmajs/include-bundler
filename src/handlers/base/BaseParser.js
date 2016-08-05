class BaseParser {

	constructor (solution) {
		assert(solution instanceof Solution, 'Solution expected for Parser');		
		this.solution = solution;
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