var ScriptParser;
(function(){
	// import ./script/AstUtil.js
	// import ./script/IncludeParser.js
	// import ./script/AmdParser.js
	// import ./script/IncludeReducer.js

	ScriptParser = {
		getIncludesInfo (resource, directory, variables) {
			var ast = AstUtil.parse(resource.content, {
				filename: resource.uri.toLocalFile()
			});
			return IncludeParser.parse(ast, resource);
		},
		getDependencies (content, opts) {
			opts = opts || {
				filename: ''
			};
			var ast = AstUtil.parse(content, opts);
			var info = {
				include: null,
				amd: AmdParser.parse(ast)
			};
			var a = IncludeParser.parse(ast).then(includeInfo => info.include = includeInfo);
			var b = AmdParser.parse(ast).then(amdInfo => info.amd = amdInfo);
			return Promise.all([a, b]).then(x => info);
		}
	};

}());
