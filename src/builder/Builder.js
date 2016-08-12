var Builder;
(function(){
	Builder = {
		build (resources, solution) {

			return _middlewares
				.run('buildResources', resources, solution)
				.then(arr => {							
					resources = arr || resources;

					solution.outputResources.prepair(resources);
	
					return _middlewares
						.run('rewriteDependencies', resources, solution)
						.then(() => rewriteDependenciesInternal(resources))
						.then(buildOutputItems)
						.then(rewriteRoot)
						.then(() => solution.outputResources.getAll());
				});
			
			function rewriteDependenciesInternal (resources) {
				var dfrs = resources.map(resource => {
					var ext = path_getExtension(resource.url);
					var handler = solution.handlers.find(x => 
						x.rewriter.accepts(resource.type) || x.rewriter.accepts(ext)
					);
					if (handler == null) {
						throw Error('Rewriter not found for the resource: ' + resource.url);
					}
					return handler.rewriter.rewriteResource(resource);
				});
				return async_whenAll(dfrs);
			}

			function buildOutputItems () {
				var items = solution.outputResources.items;
				return async_map(items, item => {
					var otherOutputItems = items.filter(x => {
						if (x === item) return false;
						if (x.page != item.page) return false;
						if (x.bundle != item.bundle) return false;
						return true;
					});
					return buildBundle(item, otherOutputItems);
				});
			}
			function buildBundle (outputItem, otherOutputItems) {
				return _middlewares
					.run('buildBundle', outputItem, otherOutputItems)
					.then(buildBundleInternal)
			}
			function buildBundleInternal (outputItem, otherOutputItems) {
				if (outputItem.resource.content) {
					return;
				}
				var ext = path_getExtension(outputItem.resource.url);
				var handler = solution.handlers.find(x => x.builder.accepts(outputItem.type) || x.builder.accepts(ext))
				if (handler == null)
					throw Error(`Unknown builder for type ${outputItem.type}`)

				return handler.builder.createModule(outputItem, otherOutputItems);
			}
			function rewriteRoot () {
				var main = solution.outputResources.root;
				var dependencies = solution.outputResources.getForPage(solution.opts.mainPage);
				var ext = path_getExtension(main.url);
				var handler = solution.handlers.find(x => x.builder.accepts(main.type) || x.builder.accepts(ext))				
				if (handler == null || handler.builder.rewriteRoot == null) {
					throw new Error(`RootBuilder is not found for a resource ${main.url} and type ${main.type}`);
				}
							
				return handler.builder.rewriteRoot(main, dependencies, solution);
			}					
		}
	};

}());