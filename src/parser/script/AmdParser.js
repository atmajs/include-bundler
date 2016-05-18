var AmdParser;
(function() {

	AmdParser = {
		parse: function parseIncludes(ast, resource) {
			var info = {
				resources: []
			};
			AstUtil.each(ast, AstUtil.is.amdFunction, function(node, descend) {
				var scope = node.scope || ast;
				process(info, node, scope, resource);
				return true;
			});

			return new Promise(resolve => resolve(info));
		}
	};

	function process(info, node, scope, currentResource) {
		if (node.args.length < 2) {
			return;
		}

		var args = AstUtil.getArguments(node.args, scope);
		var include = new Include(currentResource);
		var dependencies = args.find(x => Array.isArray(x));
		if (dependencies == null) {
			return;
		}
		var groups = Include.groupByType(dependencies);
		for(var type in groups) {
			include[type].apply(include, groups[type]);
		}
		info.resources = info.resources.concat(include.includes);
	}
}());
