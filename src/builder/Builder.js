var Builder;
(function(){
	Builder = {
		build (resources, solution) {
			return async_map(builders, builder => builder.build(resources, solution))
				// flattern
				.then(results => results.reduce((aggr, x) => aggr.concat(x), []));
		}
	};

	// import ./ScriptBuilder.js
	// import ./HtmlBuilder.js
	// import ./CssBuilder.js

	var builders = [
		ScriptBuilder,
		HtmlBuilder,
		CssBuilder
	];

}());