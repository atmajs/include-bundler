var CssBuilder;
(function(){
	CssBuilder = {
		buildDependencies (resources, ctx, solution) {
			var out = resources
				.filter(x => x.type === 'css')
				.map(res => res.content);

			if (out.length === 0) {
				return null;
			}
			
			var resourceUrl = `${ctx.current.page}_${ctx.current.bundle}.css`;
			var resource = new Resource({type: 'css', url: resourceUrl}, null, solution);
			var output = resource.toTarget(solution);

			output.content = out.join('\n');		
			return output;
		},

		canBuildRoot (resource) {
			return resource.type === 'css';
		},

		buildRoot(resource, dependencies, ctx, solution) {

		}
	}
}());