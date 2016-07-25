var CssBuilder;
(function(){
	CssBuilder = {
		buildDependencies (resources, ctx, solution) {
			
		},

		canBuildRoot (resource) {
			return resource.type === 'css';
		},

		buildRoot(resource, dependencies, ctx, solution) {

		}
	}
}());