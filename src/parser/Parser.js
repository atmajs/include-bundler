var Parser;
(function(){
	Parser = {
		getDependencies (type, content, opts) {
			var fn = Types[type];
			if (fn == null) {
				return new class_Dfr().resolve([]);
			}
			return fn(content, opts);
		}
	};

	var Types = {
		js (content, opts) {
			return ScriptParser.getDependencies(content, opts).then(info => {
				return ScriptParser.flatternDependencyInfos(info);
			});
		},
		css (content, opts) {
			AssetsManager.rewriteCss(content, opts);
			return new class_Dfr().resolve([]);
		},
		mask (content, opts) {
			return MaskParser.getDependencies(content, opts).then(info => {
				return MaskParser.flatternDependencies(info);
			});
		},
		load: null,
		ajax: null,
	}
}());