AmdJsHandler.Parser = class AmdJsParser extends BaseParser {

	constructor () {
		super(...arguments);
	}
	
	getDependencies (ast, ownerResource) {
		
		var info = {
			dependencies: []
		};

		AstUtil.each(ast, AstUtil.is.amdFunction, (node, descend) => {
			var scope = node.scope || ast;
			var deps = this._process(node, scope);
			if (deps) {
				info.dependencies.push(...deps);
			}
			return true;
		});

		return new class_Dfr().resolve(info);

	}

	_process (node, scope) {
		if (node.args.length < 2) {
			return;
		}

		var args = AstUtil.getArguments(node.args, scope);
		var include = new Include();
		var dependencies = args.find(x => Array.isArray(x));
		if (dependencies == null) {
			return;
		}

		var groups = Include.groupByType(dependencies, this.solution.opts);
		for(var type in groups) {
			include[type].apply(include, groups[type]);
		}
		include.includes.forEach(x => x.module = 'amd');
		return include.includes;
	}

};
