import { BaseParser } from "../../base/BaseParser";
import { AstUtil } from "../utils/AstUtil";
import { class_Dfr } from "atma-utils";
import { IDependency } from "../../../class/IDependency";
import { Include } from "../../../class/Include";

export class AmdJsParser extends BaseParser {

	
	getDependencies (ast, ownerResource) {
		
		let info = {
			dependencies: []
		};

		AstUtil.each(ast, AstUtil.is.amdFunction, (node, descend) => {
			let scope = node.scope || ast;
			let deps = this._process(node, scope);
			if (deps) {
				info.dependencies.push(...deps);
			}
			return true;
		});

		return new class_Dfr().resolve(info) as PromiseLike<{dependencies: IDependency[]}>;

	}

	_process (node, scope) {
		if (node.args.length < 2) {
			return;
		}

		let args = AstUtil.getArguments(node.args, scope);
		let res = new Include();
		let dependencies = args.find(x => Array.isArray(x));
		if (dependencies == null) {
			return;
		}

		let groups = Include.groupByType(dependencies, this.solution.opts);
		for(let type in groups) {
			res[type].apply(res, groups[type]);
		}
		res.includes.forEach(x => x.module = 'amd');

		let ignore = [ 'exports', 'require' ];
		res.includes = res.includes.filter(x => ignore.indexOf(x.url) === -1);
		return res.includes;
	}

};
