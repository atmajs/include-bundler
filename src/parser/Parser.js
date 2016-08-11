var Parser;
(function(){
	
	var assert = require('assert');

	// import ./ScriptParser.js
	// import ./MaskParser.js
	// import ./HtmlParser.js

	Parser = {
		getDependencies (resource, solution) {
			assert(resource != null, 'Resource is empty');
			assert(solution instanceof Solution, 'Solution is not passed');
			
			var dfr = new class_Dfr;
			
			getDependenciesInternal(resource, solution)
				.done(_runMiddlewares)
				.fail(error => dfr.reject(error))
				;

			function _runMiddlewares (deps) {
				getDependenciesExternal(deps, resource, solution)
					.done(deps => dfr.resolve(deps))
					.fail(error => dfr.reject(error))
					;
			}			
			return dfr;
		}
	};

	function getDependenciesInternal(resource, solution) {
		assert(typeof resource.url === 'string', 'Path is expected');

		var ext = path_getExtension(resource.url);
		var handler = solution.handlers.find(x => x.parser.accepts(resource.type) || x.parser.accepts(ext))
		if (handler == null) {
			console.warn('GetDependenciesInternal: Skip uknown resource type', resource.type);
			return async_resolve({dependencies: []});
		}

		return handler.parser.getDependencies(resource.content, resource);
	}
	function getDependenciesExternal(deps, resource, solution) {
		return _middlewares
			.run('parseDependencies', resource, deps, solution)
			.then(() => deps)
			;
	}
}());