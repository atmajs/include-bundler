import { BaseRewriter } from "../../base/BaseRewriter";

export class GlobalJsRewriter extends BaseRewriter {

	rewritePartial (content, ownerResource) {

	}

	rewriteResource (resource) {

	}

	accepts (type) {
		return type === 'mask';
	}
};