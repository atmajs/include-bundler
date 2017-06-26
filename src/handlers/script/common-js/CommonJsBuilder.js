CommonJsHandler.Builder = class CommonJsBuilder extends BaseBuilder {

	constructor () {
		super(...arguments);

		var opts = this.solution.opts.package.commonjs;
		if (opts && opts.output === 'simplified') {
			this.wrapModule = CommonJsBuilderSimplified.wrapModule;
			this.getRootContent = CommonJsBuilderSimplified.getRootContent;
		}
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

		var content = this.getRootContent(root);
		var body = dependencies
			.map(x => x.content)
			.concat([ content ])
			.join('\n');


		var wrapper = this.solution.opts.package.moduleWrapper;
		switch (wrapper) {
			case 'iif':
				body = this.wrapWithIIF(body);
				break;
			case 'umd':
				body = this.wrapWithUMD(body);
				break;
			case 'script':
				break;
			default:
				throw new Error('Uknown module wrapper: ' + wrapper);
		}		

		root.content = body;
	}

	getRootContent (root) {
		return  root.content;
	}

	wrapWithIIF (body) {
		return Templates
			.RootModule
			.replace('%BUNDLE%', () => body);
	}
	
	wrapWithUMD (body) {
		var opts = this.solution.opts.package;
		var name = opts.moduleName;
		if (!name) {
			throw Error('`moduleName` option is not set. Should be used for UMD wrapper');
		}
		return Templates
			.UMD
			.replace('%MODULE%', () => body)
			.replace('%NAME%', () => name)
			;
	}
};

var Templates = {
	Module: `
// import ./templates/Module.js
`,
	ModuleSimplified: `
// import ./templates/ModuleSimplified.js
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