IncludeJsHandler = class IncludeJsHandler extends BaseHandler {
	constructor () {
		super(...arguments);

		if (this.solution.opts.package.module === 'includejs') {
			this.registerMappings_();
		}
	}

	accepts (resource) {
		if (resource.type !== 'js') {
			return false;
		}
		var module = resource.getModule();	
		if (module == null || module === 'root') 
			module = this.solution.opts.package.module;

		return module === 'includejs';
	}

	

	rewriteRoot (root, dependencies) {
		dependencies.forEach(x => x.embed = true);


		var body = dependencies
			.map(x => x.content)
			.concat([ root.content ])
			.join('\n');

		body = Templates.RootModule.replace('%BUNDLE%', () => body);

		root.content = body;
	}

	
};
