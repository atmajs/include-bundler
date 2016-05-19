var CommonJsParser;
(function() {

	CommonJsParser = {
		parse: function parseIncludes(ast, resource) {
			var info = {
				resources: []
			};
			AstUtil.each(ast, AstUtil.is.commonJsFunction, function(node, descend) {
				var scope = node.scope || ast;
				process(info, node, scope, resource);
				return true;
			});

			return new Promise(resolve => resolve(info));
		}
	};

	function process(info, node, scope, currentResource) {
		if (node.args.length !== 1) {
			return;
		}

		var args = AstUtil.getArguments(node.args, scope);
		var include = new Include(currentResource);
		var path = args[0];
		if (typeof path !== 'string') {
			throw new Error('Path should be a string: ' + path);
		}
		var groups = Include.groupByType([ path ]);
		for(var type in groups) {
			include[type].apply(include, groups[type]);
		}
		info.resources = info.resources.concat(include.includes);
	}
}());
