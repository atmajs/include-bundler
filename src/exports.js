// import ../node_modules/atma-utils/lib/utils.embed.js

// import ./utils/res.js
// import ./utils/path.js
// import ./utils/async.js

// import ./class/Resource.js
// import ./class/Include.js
// import ./class/Solution.js

// import ./assets/AssetsManager.js

// import ./parser/ScriptParser.js
// import ./parser/MaskParser.js
// import ./parser/Parser.js

// import ./loader/Loader.js

module.exports = {
	getResourceTree (path, opts) {
		solution = new Solution(path, opts);
		return Loader.load('js', path, opts).then(x => x.toJSON());
	},
	getResources (path, opts) {
		solution = new Solution(path, opts);
		return Loader.load('js', path, opts).then(resource => {
			return res_flattern(resource).map(x => x.toJSON(false));
		});
	},
	build (resource, targetDir) {
		return new Promise(resolve => {
			resolve({
				script: '',
				style: '',
				html: '',
				resourceManager: null
			});
		});
	},
	Parser: {
		getDependencies (content, type = 'js') {
			return ScriptParser.getDependencies(content);
		}
	},
	AssetsManager: AssetsManager
};