var AmdParser;
(function() {

	AmdParser = {
		parse: function parseIncludes(ast, solution) {
			var info = {
				resources: []
			};
			AstUtil.each(ast, AstUtil.is.amdFunction, function(node, descend) {
				var scope = node.scope || ast;
				process(info, node, scope, solution);
				return true;
			});

			return new class_Dfr().resolve(info);
		}
	};

	function process(info, node, scope, solution) {
		if (node.args.length < 2) {
			return;
		}

		var args = AstUtil.getArguments(node.args, scope);
		var include = new Include();
		var dependencies = args.find(x => Array.isArray(x));
		if (dependencies == null) {
			return;
		}

		var groups = Include.groupByType(dependencies, solution.opts);
		for(var type in groups) {
			include[type].apply(include, groups[type]);
		}
		include.includes.forEach(x => x.module = 'amd');
		info.resources = info.resources.concat(include.includes);
	}
}());
