import { Templates } from '../common-js/templates/Templates';
import { Include } from '../../../class/Include';
import { IncludeJsParser } from './IncludeJsParser';
import { IncludeJsBuilder } from './IncludeJsBuilder';
import { BaseHandler } from "../../base/BaseHandler";
import { IncludeJsRewriter } from "./IncludeJsRewriter";

export class IncludeJsHandler extends BaseHandler {
	static Parser = IncludeJsParser
	static Rewriter = IncludeJsRewriter
	static Builder = IncludeJsBuilder
	static PathResolver = null

	constructor (solution) {
		super(solution);

		// if (this.solution.opts.package.module === 'includejs') {
		// 	this.registerMappings_();
		// }
	}

	accepts (resource) {
		if (resource.type !== 'js') {
			return false;
		}
		var module = resource.getModule();	
		if (module == null || module === 'root') 
			module = this.solution.opts.package.module;

		return module === 'includejs';
	}

	

	rewriteRoot (root, dependencies) {
		dependencies.forEach(x => x.embed = true);


		var body = dependencies
			.map(x => x.content)
			.concat([ root.content ])
			.join('\n');

		body = Templates.RootModule.replace('%BUNDLE%', () => body);

		root.content = body;
	}

	resolvePath (includeData, parent) {
		return Include
			.PathResolver
			.resolveBasic(includeData.url, includeData.type, parent);
	}
};
