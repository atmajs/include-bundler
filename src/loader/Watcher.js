var Watcher;
(function(){

	Watcher = {
		watch (resource, solution) {
			return new WatcherFactory(resource, solution);
		}
	};

	var WatcherFactory = mask.class.create(mask.class.EventEmitter, {
		constructor (resource, solution) {
			this.solution = solution;
			this.rootResource = resource;
			this.watchers = {};
			this.changeId = 0;
			this.bind(resource);
		},

		bind (resource) {
			var toWatch = res_flattern(resource)
				.map(x => x.filename)
				.filter(filename => (filename in this.watchers) === false);

			
			toWatch.forEach(filename => this.watchers[filename] = new FileWatcher(filename, this));
			this.solution.reporter.info(`Watching bold<cyan<${toWatch.length}>> files`.color);
		},

		changed (filename) {
			this.solution.reporter.info(`File changed bold<cyan<${path_getFile(filename)}>>`.color);			
			var changeId = ++this.changeId;

			Loader.removeCached(filename);

			io.File.clearCache(filename);

			var resource = res_find(this.rootResource, (res) => res.filename === filename);
			if (resource == null)
				throw Error('Resource not found ' + filename);

			Loader
				.loadResource(resource)
				.then((resource) => {
					this.bind(resource);

					if (this.changeId === changeId) {
						this.emit('changed');
					}
				});
		}
	});


	var FileWatcher = mask.class.create({
		constructor (filename, factory) {
			this.filename = filename;
			this.factory = factory;

			new io.File(filename).watch(() => this.factory.changed(filename));
		}
	});
}());