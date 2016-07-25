var Builder;
(function(){
	Builder = {
		build (resources, solution) {

			var pages = res_groupByPage(resources);
			var ctx = {
				current: {
					page: '',
					bundle: '',
				}
			};

			function buildPage(name, resources) {

				var arr = resources.slice();
				var main = arr.pop();

				ctx.current = Object.create(ctx.current);
				ctx.current.page = name;

				var bundles = res_groupByBundle(arr);				
				return async_map(Object.keys(bundles), bundleName => {
					ctx.current = Object.create(ctx.current);
					ctx.current.bundle = bundleName;

					return buildBundle(ctx, bundles[bundleName]);
				}).then(resources => {
					return buildPageRoot(main, resources)
				});
			}

			function buildBundle (ctx, resources) {

				return async_map(builders, builder => builder.buildDependencies(resources, ctx, solution))
					// flattern
					.then(arr_flattern);
			}

			function buildPageRoot (main, resources) {
				var dependencies = arr_flattern(resources);
				var builder = builders.find(x => x.canBuildRoot(main));
				if (builder == null) {
					throw new Error('RootBuilder is not found for a resource ' + main.url);
				}
				

				return builder.buildRoot(main, dependencies, ctx, solution);
			}
			
			return async_map(Object.keys(pages), pageName => {
				return buildPage(pageName, pages[pageName]);
			}).then(arr_flattern);
		}
	};

	// import ./templates/exports.js
	// import ./ScriptBuilder.js
	// import ./MaskBuilder.js
	// import ./HtmlBuilder.js
	// import ./CssBuilder.js

	var builders = [
		ScriptBuilder,
		MaskBuilder,
		HtmlBuilder,
		CssBuilder
	];

}());