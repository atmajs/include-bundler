var Loader;
(function(){

	Loader = {
		load (type, path, opts, solution) {
			var includeData = { type: type, url: path, module: 'root', page: solution.opts.mainPage };
			var start = Date.now();
			return ResourceLoader
				.load(includeData, null, opts, solution)
				.then(loader => {
					var end = Date.now();
					var seconds = ((end - start) / 1000).toFixed(2);
					var treeInfo = res_getTreeInfo(loader.resource);
					var reporter = solution.reporter;
					reporter
						.info(`Loaded bold<yellow<${treeInfo.count}>> files in bold<yellow<${seconds}>> sec.`.color);
					reporter
						.info(treeInfo.treeString);
					return loader.resource;
				});
		},
		clearCache () {
			ResourceLoader.clearCache();
			return this;
		},
		getTypeFromPath (path) {
			var ext = path_getExtension(path);
			var type = Object.keys(types).find(type => {
				return types[type].indexOf(` ${ext} `) !== -1
			});
			if (type == null) {
				throw new Error('Resource type can`t be resolve from path ' + path);
			}
			return type;
		}
	};

	var types = {
		'js': ' es6 js ',
		'mask': ' mask ',
		'html': ' html ',
		'css': ' css scss less '
	};

	var ResourceLoader;
	(function(){
		ResourceLoader = {
			load (includeData, parent, opts, solution) {				
				var resource = new Resource(includeData, parent, solution);
				var loader = __loaders[resource.filename];
				if (loader == null) {
					loader = __loaders[resource.filename] = new TreeLoader(resource, opts, solution);
					loader.process();
				}
				if (includeData.page) {
					loader.done(() => {
						this.definePageForAll(includeData.page, loader.resource);
					});
				}
				
				return loader;
			},
			clearCache () {
				__loaders = {};
				return ResourceLoader;
			},
			definePageForAll (name, resource) {				
				res_walk(resource, res => {
					if (res.page) return false;

					var arr = res.inPages;
					if (arr.indexOf(name) !== -1)
						return;

					res.inPages.push(name);
				});
			}
		};
		var TreeLoader = class_create(class_Dfr, {
			constructor: function(resource, opts, solution) {
				this.solution = solution;
				this.resource = resource;
				this.opts = opts;
			},
			process () {
				this
					.solution
					.reporter
					.print('Load ' + toMessage(this.resource.url));

				function toMessage(path) {
					var parts = path.replace(/^\/+/, '').split('/');
					var name = parts.pop();
					parts = parts.map(x => `bold<${x}>`.color);
					name = `green<${name}>`.color;
					parts.push(name);
					return parts.join('/');
				}
				
				var start = Date.now();	
				var reader = _config.get('readFile');
				reader(this.resource.filename, this.opts).done(content => {			
					var end = Date.now();
					this.solution.reporter.print(` cyan<${end - start}> ms \n`.color);
					this.resource.content = content;
					this.processChildren();
				}).fail(error => this.reject(error));
			},
			processChildren () {
				if (this.shouldSkipChildren()) {
					this.resolve(this);
					return;
				}
				Parser
					.getDependencies(this.resource, this.solution)
					.then(result => this.loadChildren(result), error => this.reject(error));
			},
			loadChildren: function (result) {
				assert(Array.isArray(result.dependencies), `Expects array of dependencies for ${this.resource.url}`);
				
				this.resource.meta = obj_extend(this.resource.meta, result.meta);

				var deps = result.dependencies;
				async_waterfall(deps, dep => {
					return ResourceLoader
						.load(dep, this.resource, this.opts, this.solution)
						.then(loader => loader.resource);
				})
				.fail(error => this.reject(error))
				.done(resources => {
					this.resource.resources = resources;
					this.resolve(this);
				});
			},
			shouldSkipChildren () {
				if (/\.min\./.test(this.resource.filename)) {
					return true;
				}
				if (/\/bower_components\//.test(this.resource.filename)) {
					return true;
				}
				if (/\/node_modules\//.test(this.resource.filename)) {
					return true;
				}

				var meta = this.resource.meta;
				if (meta && meta.skipDependencies) {
					return true;
				}
				return false;
			}
		});

		var __loaders = {};
	}());

}());