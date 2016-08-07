class BaseRewriter {
	constructor (solution, handler) {
		assert(solution instanceof Solution, 'Solution expected for Rewriter');		
		assert(handler instanceof BaseHandler, 'BaseHandler expected for the Rewriter');

		this.solution = solution;
		this.handler = handler;
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