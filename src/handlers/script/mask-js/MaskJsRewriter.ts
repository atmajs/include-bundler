import { BaseRewriter } from "../../base/BaseRewriter";
import { Resource } from "../../../class/Resource";

export class MaskJsRewriter extends BaseRewriter {

	rewriteRoot(resourceInput: Resource, resourceOutput: Resource): void {

	}
	rewritePartial (content, ownerResource) {

	}

	rewriteResource (resource) {

	}

	accepts (type) {
		return type === 'mask';
	}
};