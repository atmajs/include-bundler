var Builder;
(function(){
	Builder = {
		build (resources, solution) {

			var pages = res_groupByPage(resources);

			function buildPage(name, resources) {
				var ctx = { page: name };
				var arr = resources.slice();
				var main = arr.pop();

				return async_map(builders, builder => builder.buildDependencies(arr, ctx, solution))
					// flattern
					.then(results => {
						var dependencies = results
							.filter(x => x != null)
							.reduce((aggr, x) => aggr.concat(x), []);

						var builder = builders.find(x => x.canBuildRoot(main));
						if (builder == null) {
							throw new Error('RootBuilder is not found for a resource ' + main.url);
						}

						return builder.buildRoot(main, dependencies, ctx, solution);
					});
			}			
			
			var promises = Object.keys(pages).map(name => {
				return buildPage(name, pages[name]);
			});

			return async_whenAll(promises).then((results) => {
				return arr_flattern(results);
			});
		}
	};

	// import ./templates/exports.js
	// import ./ScriptBuilder.js
	// import ./HtmlBuilder.js
	// import ./CssBuilder.js

	var builders = [
		ScriptBuilder,
		HtmlBuilder,
		CssBuilder
	];

}());