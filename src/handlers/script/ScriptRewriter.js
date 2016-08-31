ScriptHandler.Rewriter = class ScriptRewriter extends BaseRewriter {

	constructor () {
		super(...arguments);

		this.rewriters =  [
			new IncludeJsHandler.Rewriter(this.solution, this.handler)			
		];
	}

	rewritePartial (content, ownerResource) {

	}

	rewriteResource (resource) {
		this.rewriters.forEach(rewriter => {
			rewriter.rewriteResource(resource);
		});
	}

	accepts (type) {
		return type === 'js';
	}
};