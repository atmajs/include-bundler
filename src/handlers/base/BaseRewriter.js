class BaseRewriter {
	constructor (solution) {
		this.solution = solution;
	}
	
	rewritePartial (content, ownerResource) {
		throw Error('Not implemented');
		return content;
	}

	rewriteResource (resource) {
		throw Error('Not implemented');
		return void 0;
	}

	accepts (type) {
		throw Error('Not implemented');
		return Boolean();
	}
}