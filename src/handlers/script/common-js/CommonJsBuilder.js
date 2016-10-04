CommonJsHandler.Builder = class CommonJsBuilder extends BaseBuilder {

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

		return module === 'commonjs';
	}

	wrapModule (resource) {
		var opts = this.solution.opts;
		if (opts.commonjs == null) {
			opts.commonjs = {
				addHeading: true,
				hasHeading: false
			}
		};

		var body = '';

		if (opts.commonjs.hasHeading === false && opts.commonjs.addHeading === true) {			
			opts.commonjs.hasHeading = true;	

			var mainUrl = this.solution.outputResources.rootInput.url;

			body = Templates
				.Header
				.replace('%ROOT_DIR%', () => mainUrl);
		}

		var {url, content} = resource;

		var module = Templates
			.Module
			.replace('%MODULE_PATH%', () => url)
			.replace('%MODULE%', () => content);
		

		return body + module;
	}

	buildRoot (root, dependencies) {
		dependencies.forEach(x => x.embed = true);


		var body = dependencies
			.map(x => x.content)
			.concat([ root.content ])
			.join('\n');


		body = Templates
			.RootModule
			.replace('%BUNDLE%', () => body);

		var packageOpts = this.solution.opts.package;
		if (packageOpts.moduleWrapper === 'umd') {
			var name = packageOpts.moduleName;
			if (!name) {
				throw Error('`moduleName` option is not set. Should be used for UMD wrapper');
			}
			body = Templates
				.UMD
				.replace('%MODULE%', () => body)
				.replace('%NAME%', () => name)
				;
		}

		root.content = body;
	}
};

var Templates = {
	Module: `
// import ./templates/Module.js
`,
	Header: `
// import ./templates/Header.js
`,
	RootModule: `
// import ./templates/RootModule.js
`,
	UMD: `
// import ./templates/UMD.js
`,
};