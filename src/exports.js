// import ../node_modules/atma-utils/lib/utils.embed.js

// import ./utils/res.js
// import ./utils/path.js
// import ./utils/async.js

// import ./class/Resource.js
// import ./class/Include.js
// import ./class/Solution.js

// import ./assets/AssetsManager.js

// import ./parser/Parser.js

// import ./loader/Loader.js
// import ./builder/Builder.js

module.exports = {
	clearCache() {
		Loader.clearCache();
		AssetsManager.clearCache();
		return this;
	},
	getResourceTree (path, opts) {
		var solution = new Solution(path, opts);
		var type = Loader.getTypeFromPath(path);
		return Loader.load(type, path, opts, solution).then(x => x.toJSON());
	},
	getResources (path, opts) {
		var solution = new Solution(path, opts);
		var type = Loader.getTypeFromPath(path);
		return Loader.load(type, path, opts, solution).then(resource => {
			return res_flattern(resource).map(x => x);
		});
	},
	build (path, opts) {
		var solution = new Solution(path, opts);
		var type = Loader.getTypeFromPath(path);
		return Loader
			.load(type, path, opts, solution)
			.then(resource => res_flattern(resource).map(x => x))
			.then(resources => Builder.build(resources, solution))
			;
	},
	Parser: {
		getDependencies (content, type = 'js') {
			return ScriptParser.getDependencies(content);
		}
	},
	AssetsManager: AssetsManager,
	Resource: Resource
};