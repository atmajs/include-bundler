var Builder;
(function(){
	Builder = {
		build (resources, solution) {

			return _middlewares
				.run('buildResources', resources, solution)
				.then(arr => {							
					resources = arr || resources;

					solution.outputResources.prepair(resources);

					solution.emit('rewriteDependencies', resources, solution);					
					return _middlewares
						.run('rewriteDependencies', resources, solution)
						.then(buildOutputItems)
						.then(rewriteRoot)
						.then(() => solution.outputResources.getAll());
				});

			function buildOutputItems () {
				var items = solution.outputResources.items;
				return async_map(items, buildBundle);
			}
			function buildBundle (outputItem) {
				return _middlewares
					.run('buildBundle', outputItem)
					.then(buildBundleInternal)
			}
			function buildBundleInternal (outputItem) {
				if (outputItem.resource.content) {
					return;
				}
				var builder = Builders[outputItem.type];
				if (builder == null)
					throw Error(`Unknown builder for type ${outputItem.type}`)

				return builder.buildDependencies(outputItem, solution);
			}
			function rewriteRoot () {
				var main = solution.outputResources.root;
				var dependencies = solution.outputResources.getForPage(solution.opts.mainPage);
				var builder = Builders[main.type];
				if (builder == null) {
					builder = Builders[path_getExtension(main.url)];
				}
				if (builder == null || builder.rewriteRoot == null) {
					throw new Error(`RootBuilder is not found for a resource ${main.url} and type ${main.type}`);
				}
							
				return builder.rewriteRoot(main, dependencies, solution);
			}					
		}
	};

	// import ./templates/exports.js
	// import ./ScriptBuilder.js
	// import ./MaskBuilder.js
	// import ./HtmlBuilder.js
	// import ./CssBuilder.js

	var Builders = {
		js: ScriptBuilder,
		mask: MaskBuilder,
		css: CssBuilder,
		html: HtmlBuilder
	};

}());