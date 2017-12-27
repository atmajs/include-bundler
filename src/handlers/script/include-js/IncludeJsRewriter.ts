import { BaseRewriter } from "../../base/BaseRewriter";

export class IncludeJsRewriter extends BaseRewriter {

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