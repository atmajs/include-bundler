import { IncludeJsHandler } from './include-js/IncludeJsHandler';
import { BaseRewriter } from '../base/BaseRewriter';
import { BaseHandler } from '../base/BaseHandler';
import { Solution } from '../../class/Solution';

export class ScriptRewriter extends BaseRewriter {

	rewriters =  [
		new IncludeJsHandler.Rewriter(this.solution, this.handler)			
	]	

	rewritePartial (content, ownerResource) {

	}

	rewriteResource (resource) {
		this.rewriters.forEach(rewriter => {
			rewriter.rewriteResource(resource);
		});
	}

	accepts (type) {
		return type === 'js';
	}
};