LoadHandler.Rewriter = class LoadRewriter extends BaseRewriter {

	constructor () {
		super(...arguments);
	}

	rewritePartial (content, ownerResource) {

	}

	rewriteResource (resource) {
		
	}

	accepts (type) {
		return type === 'load';
	}
};