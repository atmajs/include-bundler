GlobalJsHandler.Rewriter = class GlobalJsRewriter extends BaseRewriter {

	constructor () {
		super(...arguments);
	}

	rewritePartial (content, ownerResource) {

	}

	rewriteResource (resource) {

	}

	accepts (type) {
		return type === 'mask';
	}
};