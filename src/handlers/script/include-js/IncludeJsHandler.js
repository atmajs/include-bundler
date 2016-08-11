IncludeJsHandler = class IncludeJsHandler extends BaseHandler {
	constructor () {
		super(...arguments);
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

	wrapModule (resource) {
		var opts = this.solution.opts;
		if (opts.includejs == null) {
			opts.includejs = {
				addHeading: true,
				hasHeading: false
			}
		};

		var body = '';

		if (opts.includejs.hasHeading === false && opts.includejs.addHeading === true) {			
			opts.includejs.hasHeading = true;			
			body = Templates.Header;
		}

		var {url, content} = resource;

		var module = Templates
			.Module
			.replace('%MODULE_PATH%', () => url)
			.replace('%MODULE%', () => content);
		

		return body + module;
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
