ScriptHandler.Rewriter = class ScriptRewriter extends BaseRewriter {

	constructor () {
		super(...arguments);
	}

	rewritePartial (content, ownerResource) {

	}

	rewriteResource (resource) {

	}

	accepts (type) {
		return type === 'js';
	}
};