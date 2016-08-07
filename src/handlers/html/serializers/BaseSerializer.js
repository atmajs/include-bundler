class BaseSerializer {
	constructor (solution, builder) {
		this.solution = solution;
		this.builder = builder;
	}

	removeDependencies ($) {
		throw new Error('Not implemented');
		return void 0;
	}

	serialize ($, allDependencies) {
		throw new Error('Not implemented');
		return void 0;
	}

	rewrite ($, ownerResource) {
		throw new Error('Not implemented');
		return void 0;	
	}
}