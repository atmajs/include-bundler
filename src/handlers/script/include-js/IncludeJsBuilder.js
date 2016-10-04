IncludeJsHandler.Builder = class IncludeJsBuilder extends BaseBuilder {

	constructor () {
		super(...arguments);
	}

	wrapModule (resource, outputItem, otherOutputItems) {
		var opts = this.solution.opts;
		if (opts.includejs == null) {
			opts.includejs = {
				addHeading: true,
				hasHeading: false,
				lastItem: null
			}
		};

		var builderOpts = opts.includejs;
		var body = '';

		if (builderOpts.hasHeading === false && builderOpts.addHeading === true) {			
			builderOpts.hasHeading = true;			
			body = this._createHeading(builderOpts, resource, outputItem, otherOutputItems);
		}

		var content = resource.content,
			url = resource.toTargetUrl(this.solution);


		body += `include.setCurrent({ url: '${url}' });\n`
		body += content;
		body += `\ninclude.getResourceById('${url}', 'js').readystatechanged(3);`

		if (builderOpts.hasHeading && builderOpts.lastItem === resource) {
			body += `\ninclude.resumeStack();`
		}

		return body;
	}

	buildRoot (resource, dependencies) {

	}

	accepts (resource) {
		if (resource.type !== 'js') {
			return false;
		}
		var module = resource.getModule();	
		
		return module === 'includejs';
	}


	_createHeading (builderOpts, resource, outputItem, otherOutputItems) {
		var outputItems = [outputItem, ...otherOutputItems];
		var allResources = arr_flattern(outputItems.map(x => x.resources));

		var jsResources = allResources.filter(x => this.accepts(x));
		var cssResources = allResources.filter(x => x.type === 'css');
		var loadResources = allResources.filter(x => x.type === 'load');




		builderOpts.lastItem = jsResources[jsResources.length - 1];

		var jsRegister = this._serializeRegister(jsResources, 'js');
		var cssRegister = this._serializeRegister(cssResources, 'css');
		var loadRegister = this._serializeRegister(loadResources, 'load');
		
		var heading = `
		include.pauseStack();
		${jsRegister}
		${cssRegister}
		${loadRegister}
		`;


		return heading;
	}
	_serializeRegister (resources, type) {
		var paths = resources
			.filter(x => x.type === type)
			.map(x => {
				return { 
					type: type, 
					url: x.toTargetUrl(this.solution) 
				};
			});

		if (paths.length === 0) {
			return '';
		}
		var json = JSON.stringify({
			[type]: paths
		});
		return `
			include.register(${json});
		`;
	}
	
};

