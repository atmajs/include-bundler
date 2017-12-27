import { BaseRewriter } from "../base/BaseRewriter";

export class LoadRewriter extends BaseRewriter {

	rewritePartial (content, ownerResource) {

	}

	rewriteResource (resource) {
		
	}

	accepts (type) {
		return type === 'load';
	}
};