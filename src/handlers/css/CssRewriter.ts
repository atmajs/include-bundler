import { BaseRewriter } from "../base/BaseRewriter";

export class CssRewriter extends BaseRewriter {

	rewritePartial (content, ownerResource) {

	}

	rewriteResource (resource) {

	}

	accepts (type) {
		return type === 'css';
	}
};