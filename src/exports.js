(function () {

	var mask = require('maskjs');
	var assert = require('assert');
	var logger = require('atma-logger');
	var io = global.io || require('atma-io');
	
	// import ../node_modules/atma-utils/lib/utils.embed.js

	// import ./utils/res.js
	// import ./utils/arr.js
	// import ./utils/path.js
	// import ./utils/tree.js
	// import ./utils/async.js

	// import ./class/Resource.js
	// import ./class/ResourceInfo.js
	// import ./class/ResourceMapping.js
	// import ./class/Include.js
	// import ./class/Solution.js
	// import ./class/Middlewares.js

	// import ./config/

	// import ./assets/AssetsManager.js

	// import ./parser/Parser.js

	// import ./loader/Loader.js
	// import ./loader/Watcher.js
	// import ./builder/Builder.js
	// import ./handlers/

	module.exports = class Bundler extends mask.class.EventEmitter {
		static clearCache() {
			Loader.clearCache();
			return Bundler;
		}
		static get Config () {
			return _config;
		}

		constructor (path, opts) {
			super();
			this.solution = new Solution(path, opts);
		}

		getResourceTree (opts) {
			var solution = this.solution,
				type = solution.opts.type,
				path = solution.path;
				
			return Loader
				.load(type, path, opts, solution)
				.then(x => x.toJSON());
		}

		static getResourceTree(path, opts) {
			return new Bundler(path, opts).getResourceTree();
		}

		getResources (opts) {
			var solution = this.solution,
				type = solution.opts.type,
				path = solution.path;
			
			return Loader.load(type, path, opts, solution).then(resource => {
				return res_flattern(resource).map(x => x);
			});
		}
		static getResources(path, opts) {
			return new Bundler(path, opts).getResources();
		}

		build (opts) {
			var solution = this.solution,
				type = solution.opts.type,
				path = solution.path,
				shouldRebuild = false,
				isBuilding = false,
				isRebuilding = false,
				rootResource = null,
				self = this;


			function build(resource) {
				isBuilding = true;
				var resources = res_flattern(resource);				
				return tree_async({
					resources,
					reporter: solution.reporter,
					action: () => Builder.build(resources, solution),
					message: (treeInfo, seconds) => 
						`Created bold<yellow<${treeInfo.count}>> files in bold<yellow<${seconds}>> sec.`.color
				}).done(buildComplete);
			}
			function buildComplete (resources) {
				isBuilding = false;
				if (shouldRebuild) {
					shouldRebuild = false;
					isRebuilding = true;
					build(rootResource);
					return;
				}
				if (isRebuilding) {
					isRebuilding = false;
					self.emit('rebuild', resources);
				}
			}
			function rebuild() {
				if (isBuilding) {
					shouldRebuild = true;
					return;
				}
				isRebuilding = true;
				build(rootResource);
			}
			
			return Loader
				.load(type, path, opts, solution)
				.then(resource => {
					rootResource = resource;
					if (opts && opts.watch === true) {
						Watcher
							.watch(resource, solution)
							.on('changed', rebuild);
					}
					return build(resource);
				});
		}

		static build (path, opts) {
			return new Bundler(path, opts).build(opts);
		}

		static process (path, opts) {
			var bundler = new Bundler(path, opts);
			var solution = bundler.solution;

			function builderComplete (resources) {
				resources.forEach(res => {
					io.File.write(res.filename, res.content);
				});
				return solution
					.assetsManager
					.flush()
					.then(() => {
						return solution 
					});
			}
			if (opts && opts.watch === true) {
				bundler.on('rebuild', builderComplete);
			}			
			return bundler
				.build(opts)
				.then(builderComplete);
		}

		defineMiddleware (name, fn) {
			_middlewares.define(name, fn);
		}

		static get Parser () {
			return { 
				getDependencies (content, opts = { type : 'js'}) {
					if (typeof opts === 'string') opts = { type: opts };

					var solution = new Solution('', opts);
					var resource = new Resource({ type: opts.type, content: content}, null, solution);
					return Parser.getDependencies(resource, solution);
				}
			}
		}

		static get io () {
			return io;
		}

		static get AssetsManager () { return AssetsManager }
		static get Resource () { return Resource }
		static get Solution () { return Solution }		
	};

}());