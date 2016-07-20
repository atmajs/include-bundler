var Parser;
(function(){
	
	// import ./ScriptParser.js
	// import ./MaskParser.js
	// import ./HtmlParser.js

	Parser = {
		getDependencies (resource, opts, solution) {
			var dfr = new class_Dfr;
			
			getDependenciesInternal(resource, opts, solution)
				.done(_runMiddlewares)
				.fail(error => dfr.reject(error))
				;

			function _runMiddlewares (deps) {
				getDependenciesExternal(deps, resource, opts, solution)
					.done(deps => dfr.resolve(deps))
					.fail(error => dfr.reject(error))
					;
			}			
			return dfr;
		}
	};

	function getDependenciesInternal(resource, opts, solution) {
		var fn = Types[resource.type];
		if (fn == null) {
			return new class_Dfr().resolve([]);
		}
		return fn(resource, opts, solution);
	}
	function getDependenciesExternal(deps, resource, opts, solution) {
		var dfr = new class_Dfr;
		_middlewares
			.run('parseDependencies', resource, opts, solution)
			.done(arr => {
				if (arr) deps.push(...arr);
				dfr.resolve(arr)
			})
			.fail(error => dfr.reject(error))
			;

		return dfr;
	}

	var Types = {
		js (resource, opts, solution) {
			var opts = {
				filename: resource.filename
			};
			return ScriptParser.getDependencies(resource.content, opts).then(info => {
				return ScriptParser.flatternDependencyInfos(info);
			});
		},
		css (resource, opts, solution) {
			solution.assetsManager.rewriteCss(resource, opts);
			return new class_Dfr().resolve([]);
		},
		mask (resource, opts) {
			return MaskParser.getDependencies(resource.content, opts).then(info => {
				return MaskParser.flatternDependencies(info);
			});
		},
		html (resource, opts) {
			return HtmlParser.getDependencies(resource.content, opts);
		},
		load: null,
		ajax: null,
	}
}());