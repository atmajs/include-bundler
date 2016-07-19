var Builder;
(function(){
	Builder = {
		build (resources, solution) {
			function onBuildersAreReady(results) {
				return results
					.filter(x => x != null)
					.reduce((aggr, x) => aggr.concat(x), []);
			}
			return async_map(builders, builder => builder.build(resources, solution))
				// flattern
				.then(onBuildersAreReady);
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