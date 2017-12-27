import { BaseRewriter } from "../base/BaseRewriter";

export class HtmlRewriter extends BaseRewriter {

	rewritePartial (content, ownerResource) {

	}

	rewriteResource (resource) {

	}

	accepts (type) {
		return type === 'html';
	}
};