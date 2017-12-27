import { AstUtil } from '../utils/AstUtil';
import { Include } from '../../../class/Include';
import { BaseParser } from "../../base/BaseParser";
import { class_Dfr } from 'atma-utils';
import { IDependency } from '../../../class/IDependency';

export class CommonJsParser extends BaseParser {

	getDependencies (ast, ownerResource) {
		
		var info = {
			dependencies: []
		};

		AstUtil.each(ast, AstUtil.is.commonJsFunction, (node, descend) => {
			var scope = node.scope || ast;
			var deps = this._process(node, scope);
			if (deps) {
				info.dependencies.push(...deps);
			}
			return true;
		});

		info.dependencies.forEach(x => x.module = 'commonjs');
		return new class_Dfr().resolve(info) as PromiseLike<{dependencies: IDependency[]}>;
	}

	_process (node, scope) {
		if (node.args.length !== 1) {
			return null;
		}

		var args = AstUtil.getArguments(node.args, scope);
		var include = new Include();
		var path = args[0];
		if (typeof path !== 'string') {
			throw new Error('Path should be a string: ' + path);
		}
		// if (this._isNodeJsNative(path)) {
		// 	//@TODO: Should we provide the shims for browser bilds?
		// 	return null;
		// }
		var groups = Include.groupByType([ path ], this.solution.opts);
		for(var type in groups) {
			include[type].apply(include, groups[type]);
		}
		return include.includes;
	}
	// _isNodeJsNative (path) {

	// }
};
