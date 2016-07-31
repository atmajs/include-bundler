var ScriptBuilder;
(function(){
	ScriptBuilder = {
		buildDependencies (outputItem, solution) {
			return buildDependencies(outputItem.resource, outputItem.resources, solution);
		},
		rewriteRoot (root, dependencies, solution) {
			var template = Templates.resolveForType('js', solution);
			
			return template.rewriteRoot(root, dependencies, solution);			
		}
	};

	// ctx: {bundle, page}
	function buildDependencies(resource, resources, solution) {

		var out = resources.map(res => {
			var template = Templates.resolveForResource(res, solution);

			return template.wrapModule(res, solution);
		});
		
		resource.content = out.join('\n');
		return resource;		
	}

}());