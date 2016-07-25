var ScriptBuilder;
(function(){
	ScriptBuilder = {
		buildDependencies (resources, ctx, solution) {		
			var arr = resources.filter(x => x.type === 'js');
			if (arr.length === 0) {
				return null;
			}
			return buildDependencies(arr, ctx, solution);
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
		
		var resourceUrl = `${ctx.current.page}_${ctx.current.bundle}.js`;
		var resource = new Resource({type: 'js', url: resourceUrl}, null, solution);
		var output = resource.toTarget(solution);

		output.content = out.join('\n');		
		return output;
	}


	var MAIN_BUNDLE = 'index';
}());