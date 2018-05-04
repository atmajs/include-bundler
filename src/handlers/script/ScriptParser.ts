import { AstUtil } from './utils/AstUtil';
import { async_reject, async_whenAll } from '../../utils/async';
import { ResourceInfo } from '../../class/ResourceInfo';
import { arr_flattern } from '../../utils/arr';
import { CommonJsHandler } from './common-js/CommonJsHandler';
import { AmdJsHandler } from './amd-js/AmdJsHandler';
import { IncludeJsHandler } from './include-js/IncludeJsHandler';
import { BaseParser } from "../base/BaseParser";

export class ScriptParser extends BaseParser {
	parsers = [
		new CommonJsHandler.Parser(this.solution, this.handler),
		new AmdJsHandler.Parser(this.solution, this.handler),
		new IncludeJsHandler.Parser(this.solution, this.handler),
	];

	
	getDependencies (content, ownerResource) {
		var opts = {
			filename: ownerResource.filename
		};
		var ast;
		try {
			ast = AstUtil.parse(content, opts);
		} catch (error) {
			if (/^throw\s+(new\s+)?Error/i.test(content)) {
				var error = new Error(content);
				error.filename = ownerResource.filename;
				throw error;
			}
			if (error.filename == null) {
				error.filename = ownerResource.filename
			}
			return async_reject(error);
		}

		var dfrs = this.parsers.map(parser => parser.getDependencies(ast, ownerResource));
		return async_whenAll(dfrs).then(results => {
			let arr = arr_flattern(results);
			return ResourceInfo.merge(...arr);
		}) as PromiseLike<{dependencies: ResourceInfo[]}>;
	}

	accepts (type) {
		return type === 'js';
	}
};
