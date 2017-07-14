var CommonJsBuilderSimplified;
(function(){
	CommonJsBuilderSimplified = {
		wrapModule (resource) {
			
			var varId = getVarId(resource);
			var content = resource.content;
			
			content = replaceWithVarIds(content, resource, this.solution);			
			return Templates
				.ModuleSimplified
				.replace(/%VAR_ID%/g, () => varId)
				.replace(/%MODULE%/g, () => content)
				;
			
		},

		getRootContent (root) {
			var rootInput = this.solution.outputResources.rootInput,
				content = replaceWithVarIds(root.content, rootInput, this.solution);
			
			return content;
		},
		getHeaderContent () {
			var resources = this
				.solution
				.outputResources
				.items
				.map(x => x.resources)
				.reduce((aggr, x) => aggr.concat(x), []);
			
			return getModuleVars(resources);
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
	function getModuleVars (resources) {
		return resources.map(getVarId).sort().map(x => `var ${x} = {};`).join('\n') + '\n';
	}
}());