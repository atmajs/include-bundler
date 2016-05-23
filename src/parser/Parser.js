var Parser;
(function(){
	Parser = {
		getDependencies (resource, content, opts) {
			var fn = Types[resource.type];
			if (fn == null) {
				return new class_Dfr().resolve([]);
			}
			return fn(resource, opts);
		}
	};

	var Types = {
		js (resource) {
			var opts = {
				filename: resource.filename
			};
			return ScriptParser.getDependencies(resource.content, opts).then(info => {
				return ScriptParser.flatternDependencyInfos(info);
			});
		},
		css (resource, opts) {
			AssetsManager.rewriteCss(resource, opts);
			return new class_Dfr().resolve([]);
		},
		mask (resource, opts) {
			return MaskParser.getDependencies(resource.content, opts).then(info => {
				return MaskParser.flatternDependencies(info);
			});
		},
		load: null,
		ajax: null,
	}
}());