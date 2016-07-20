var Parser;
(function(){
	
	// import ./ScriptParser.js
	// import ./MaskParser.js
	// import ./HtmlParser.js

	Parser = {
		getDependencies (resource, content, opts, solution) {
			var fn = Types[resource.type];
			if (fn == null) {
				return new class_Dfr().resolve([]);
			}
			return fn(resource, opts, solution);
		}
	};

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