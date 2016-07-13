var Loader;
(function(){

	Loader = {
		load (type, path, opts) {
			var includeData = { type: type, url: path };
			return ResourceLoader
				.load(includeData, null, opts)
				.then(loader => loader.resource);
		},
		clearCache () {
			ResourceLoader.clearCache();
			return this;
		}
	};

	var ResourceLoader;
	(function(){
		ResourceLoader = {
			load (includeData, parent, opts) {
				var resource = new Resource(includeData, parent);
				var loader = __loaders[resource.filename];
				if (loader) {
					return loader;
				}
				loader = __loaders[resource.filename] = new TreeLoader(resource, opts);
				loader.process();
				return loader;
			},
			clearCache () {
				__loaders = {};
				return ResourceLoader;
			}
		};
		var TreeLoader = class_create(class_Dfr, {
			constructor: function(resource, opts) {
				this.resource = resource;
				this.opts = opts;
			},
			process () {
				io.File.readAsync(this.resource.filename, this.opts).done(content => {
					this.resource.content = content;
					this.processChildren()
				}).fail(error => this.reject(error));
			},
			processChildren () {
				var content = this.resource.content;
				var opts = this.opts;
				Parser
					.getDependencies(this.resource, content, opts)
					.then(deps => this.loadChildren(deps), error => this.reject(error));
			},
			loadChildren: function (deps) {
				async_map(deps, dep => {
					return ResourceLoader
						.load(dep, this.resource, this.opts)
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