var ScriptBuilder;
(function(){
	ScriptBuilder = {
		buildDependencies (resources, ctx, solution) {		
			var arr = resources.filter(x => x.type === 'js');
			var bundleHash = arr.reduce((aggr, x) => {
				aggr[x.bundle] = 1;
				return aggr;
			}, {});

			return Object.keys(bundleHash).map(name => {

				var _ctx = Object.create(ctx);
				_ctx.bundle = name;
				return buildDependencies(arr.filter(x => x.bundle === name), _ctx, solution);
			});
		},
		canBuildRoot (resource) {
			return resource.type === 'js';
		},
		buildRoot (resource, dependencies, ctx, solution) {
			var template = Templates.resolveForType('js', solution);
			
			return template.buildRoot(resource, dependencies, ctx, solution);			
		}
	};

	// ctx: {bundle, page}
	function buildDependencies(resources, ctx, solution) {

		var out = resources.map(res => {
			var template = Templates.resolveForResource(res, solution);

			return template.wrapModule(res, ctx, solution);
		});
		
		var resourceUrl = `${ctx.page}_${ctx.bundle}.js`;
		var resource = new Resource({type: 'js', url: resourceUrl}, null, solution);
		var output = resource.toTarget(solution);

		output.content = out.join('\n');		
		return output;
	}


	var MAIN_BUNDLE = 'index';
}());