// import ../node_modules/atma-utils/lib/utils.embed.js

// import ./utils/res.js
// import ./class/Resource.js
// import ./class/Include.js
// import ./parser/ScriptParser.js

module.exports = {
	getResourceTree (path) {
		return new Promise(() => new Resource());
	},
	getResources (path) {
		return new Promise(() => [new Resource()]);
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
	}
};