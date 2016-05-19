var ScriptParser;
(function(){
	// import ./script/AstUtil.js
	// import ./script/IncludeParser.js
	// import ./script/AmdParser.js
	// import ./script/CommonJsParser.js
	// import ./script/IncludeReducer.js

	ScriptParser = {
		getIncludesInfo (resource, directory, variables) {
			var ast = AstUtil.parse(resource.content, {
				filename: path_toLocalFile(resource.filename)
			});
			return IncludeParser.parse(ast, resource);
		},
		getDependencies (content, opts) {
			opts = opts || {
				filename: ''
			};
			var ast = AstUtil.parse(content, opts);
			var info = {
				commonjs: null,
				include: null,
				amd: null,
			};
			var a = IncludeParser.parse(ast).then(includeInfo => info.include = includeInfo);
			var b = AmdParser.parse(ast).then(amdInfo => info.amd = amdInfo);
			var c = CommonJsParser.parse(ast).then(commonJsInfo => info.commonjs = commonJsInfo);
			var dfr = new class_Dfr;
			Promise.all([a, b, c]).then(x => dfr.resolve(info), error => dfr.reject(error));
			return dfr;
		},
		flatternDependencyInfos (info) {
			var arr = [];
			arr.push(...info.commonjs.resources);
			arr.push(...info.include.resources);
			arr.push(...info.amd.resources);
			return arr;
		}
	};

}());
