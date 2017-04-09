var CommonJsBuilderSimplified;
(function(){
	CommonJsBuilderSimplified = {
		wrapModule (resource) {
			
			var varId = getVarId(resource);
			var content = resource.content;
			var rgx_EXPORTS = /module\.\s*exports/g;
			var rgx_REQUIRE = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

			content = content.replace(rgx_EXPORTS, () => varId);
			content = replaceWithVarIds(content, resource, this.solution);

			return Templates
				.ModuleSimplified
				.replace('%VAR_ID%', () => varId)
				.replace('%MODULE%', () => content)
				;
			
		},

		getRootContent (root) {
			var content = root.content,
				rootInput = this.solution.outputResources.rootInput;

			return replaceWithVarIds(content, rootInput, this.solution);
		}
	};

	function replaceWithVarIds(content, resource, solution) {
		var rgx_REQUIRE = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

		return content.replace(rgx_REQUIRE, (full, path) => {
			var res = new Resource({ url: path, type: 'js'}, resource, solution);
			var current = resource.resources.find(x => x.url === res.url);
			if (current == null) {
				return full;
			}
			return getVarId(current);
		});
	}
	function getVarId (resource) {
		var str = resource.url.replace(/\.\w+$/, '');
		return str.replace(/[^\w\d]/g, '_');
	}
}());