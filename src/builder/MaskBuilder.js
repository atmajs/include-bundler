var MaskBuilder;
(function(){
	MaskBuilder = {
		buildDependencies (resources, ctx, solution) {
			var out = resources
				.filter(x => x.type === 'mask')
				.map(wrapModule);

			if (out.length === 0) {
				return null;
			}
			
			var resourceUrl = `${ctx.current.page}_${ctx.current.bundle}.mask`;
			var resource = new Resource({type: 'mask', url: resourceUrl}, null, solution);
			var output = resource.toTarget(solution);

			output.content = out.join('\n');		
			return output;
		},

		canBuildRoot (resource) {
			return resource.type === 'mask';
		},

		buildRoot(resource, dependencies, ctx, solution) {
			var body = dependencies.map(x => x.content).join('\n');
			body += '\n' + resource.content;


			var output = resource.toTarget(solution);
			output.content = body;
			return output;
		}
	};


	function wrapModule (resource) {
		var body = `module path="${resource.url}" { 
			${resource.content}
		}`;

		return body;
	}
}());