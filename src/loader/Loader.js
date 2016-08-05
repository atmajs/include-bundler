var Loader;
(function(){

	Loader = {
		load (type, path, opts, solution) {
			var includeData = { type: type, url: path, module: 'root' };
			return ResourceLoader
				.load(includeData, null, opts, solution)
				.then(loader => loader.resource);
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
				if (loader) {
					return loader;
				}
				loader = __loaders[resource.filename] = new TreeLoader(resource, opts, solution);
				loader.process();
				return loader;
			},
			clearCache () {
				__loaders = {};
				return ResourceLoader;
			}
		};
		var TreeLoader = class_create(class_Dfr, {
			constructor: function(resource, opts, solution) {
				this.solution = solution;
				this.resource = resource;
				this.opts = opts;
			},
			process () {
				io.File.readAsync(this.resource.filename, this.opts).done(content => {					
					this.resource.content = content;
					this.processChildren();
				}).fail(error => this.reject(error));
			},
			processChildren () {
				Parser
					.getDependencies(this.resource, this.solution)
					.then(result => this.loadChildren(result), error => this.reject(error));
			},
			loadChildren: function (result) {
				assert(Array.isArray(result.dependencies), `Expects array of dependencies for ${this.resource.url}`);
				
				this.resource.meta = result.meta;

				var deps = result.dependencies;
				async_map(deps, dep => {
					return ResourceLoader
						.load(dep, this.resource, this.opts, this.solution)
						.then(loader => loader.resource);
				})
				.fail(error => this.reject(error))
				.done(resources => {
					this.resource.resources = resources;
					this.resolve(this);
				});
			}
		});

		var __loaders = {};
	}());

}());