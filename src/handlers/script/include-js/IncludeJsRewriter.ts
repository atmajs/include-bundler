import { BaseRewriter } from "../../base/BaseRewriter";
import { Resource } from "../../../class/Resource";

export class IncludeJsRewriter extends BaseRewriter {

	rewritePartial (content, ownerResource) {

	}

	rewriteResource (resource: Resource) {
		if (resource.getModule() === 'global' && resource && resource.meta && resource.meta.includejs && resource.meta.includejs.hasIncludes) {
			resource.asModules = ['includejs'];
		}
	}

	accepts (type) {
		return type === 'js';
	}
};