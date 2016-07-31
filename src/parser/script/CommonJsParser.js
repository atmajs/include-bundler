var CommonJsParser;
(function() {

	CommonJsParser = {
		parse: function parseIncludes(ast, solution) {
			var info = {
				resources: []
			};
			AstUtil.each(ast, AstUtil.is.commonJsFunction, function(node, descend) {
				var scope = node.scope || ast;
				process(info, node, scope, solution);
				return true;
			});

			info.resources.forEach(x => x.module = 'commonjs');

			return new class_Dfr().resolve(info);
		}
	};

	function process(info, node, scope, solution) {
		if (node.args.length !== 1) {
			return;
		}

		var args = AstUtil.getArguments(node.args, scope);
		var include = new Include();
		var path = args[0];
		if (typeof path !== 'string') {
			throw new Error('Path should be a string: ' + path);
		}
		var groups = Include.groupByType([ path ], solution.opts);
		for(var type in groups) {
			include[type].apply(include, groups[type]);
		}
		info.resources = info.resources.concat(include.includes);
	}
}());
