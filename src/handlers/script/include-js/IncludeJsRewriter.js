IncludeJsHandler.Rewriter = class IncludeJsRewriter extends BaseRewriter {

	constructor () {
		super(...arguments);
	}

	rewritePartial (content, ownerResource) {

	}

	rewriteResource (resource) {
		if (resource.getModule() === 'global' && resource && resource.meta && resource.meta.includejs && resource.meta.includejs.hasIncludes) {
			resource.asModules = ['includejs'];
		}
	}

	accepts (type) {
		return type === 'js';
	}
};