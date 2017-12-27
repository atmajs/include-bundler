import { BaseRewriter } from "../../base/BaseRewriter";

export class CommonJsRewriter extends BaseRewriter {

	rewritePartial (content, ownerResource) {

	}

	rewriteResource (resource) {

	}

	accepts (type) {
		return type === 'mask';
	}
};