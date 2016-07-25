(function(){

	Templates['global'] = class CommonJs extends ITemplate {
		
		buildDependencies (resources, ctx, solution) {
			var body = resources.map(resource => {
				return resource.content;
			}).join('\n');

			var resourceUrl = `${ctx.page}_${ctx.bundle}.js`;
			var resource = new Resource({type: 'js', url: resourceUrl}, null, solution);
			var output = resource.toTarget(solution);

			output.content = body;
			return output;
		}

		wrapModule (resource, ctx, solution) {
			return resource.content;
		}

		buildRoot (resource, dependencies, ctx, solution) {
			
			var body = dependencies.map(x => x.content).join('\n');
			body += '\n' + resource.content;

			var output = resource.toTarget(solution);
			output.content = body;
			return output;
		}
	};

}());