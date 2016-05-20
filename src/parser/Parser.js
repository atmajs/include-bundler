var Parser;
(function(){
	Parser = {
		getDependencies (resource, content, opts) {
			var fn = Types[resource.type];
			if (fn == null) {
				return new class_Dfr().resolve([]);
			}
			return fn(resource, content, opts);
		}
	};

	var Types = {
		js (resource, content) {
			var opts = {
				filename: resource.filename
			};
			return ScriptParser.getDependencies(content, opts).then(info => {
				return ScriptParser.flatternDependencyInfos(info);
			});
		},
		css (resource, content, opts) {
			AssetsManager.rewriteCss(resource, content, opts);
			return new class_Dfr().resolve([]);
		},
		mask (resource, content, opts) {
			return MaskParser.getDependencies(content, opts).then(info => {
				return MaskParser.flatternDependencies(info);
			});
		},
		load: null,
		ajax: null,
	}
}());