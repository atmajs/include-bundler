import { AstUtil } from '../utils/AstUtil';
import { Include } from '../../../class/Include';
import { BaseParser } from "../../base/BaseParser";
import { class_Dfr } from 'atma-utils';
import { IDependency, IDependencies } from '../../../class/IDependency';

export class CommonJsParser extends BaseParser {

	getDependencies (ast, ownerResource) {
		
		let info = {
			dependencies: []
		};

		AstUtil.each(ast, AstUtil.is.commonJsFunction, (node, descend) => {
			let scope = node.scope || ast;
			let deps = this._process(node, scope);
			if (deps) {
				info.dependencies.push(...deps);
			}
			return true;
		});

		info.dependencies.forEach(x => x.module = 'commonjs');
		return new class_Dfr().resolve(info) as PromiseLike<IDependencies>;
	}

	_process (node, scope) {
		if (node.args.length !== 1) {
			return null;
		}

		let args = AstUtil.getArguments(node.args, scope);
		let include = new Include();
		let path = args[0];
		if (typeof path !== 'string') {
			throw new Error('Path should be a string: ' + path);
		}
		if (this._isNodeJsNative(path)) {
			//@TODO: Should we provide the shims for browser bilds?
			return null;
		}
		let groups = Include.groupByType([ path ], this.solution.opts);
		for(let type in groups) {
			include[type].apply(include, groups[type]);
		}
		let includes = include.includes;
		includes.forEach((x, i) => {
			let arg = node.args[i];

			x.pos = arg.start.pos;
		})
		return include.includes;
	}

	_isNodeJsNative (path) {
		return false;
	}
};
