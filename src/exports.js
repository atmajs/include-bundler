(function () {

	var mask = require('maskjs');
	var assert = require('assert');
			

	// import ../node_modules/atma-utils/lib/utils.embed.js

	// import ./utils/res.js
	// import ./utils/arr.js
	// import ./utils/path.js
	// import ./utils/async.js
	// import ./utils/file.js

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
	// import ./builder/Builder.js
	// import ./handlers/

	module.exports = class Bundler {
		static clearCache() {
			Loader.clearCache();
			return Bundler;
		}
		static get Config () {
			return _config;
		}

		constructor (path, opts) {
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
				path = solution.path;
			
			return Loader
				.load(type, path, opts, solution)
				.then(resource => res_flattern(resource))
				.then(resources => Builder.build(resources, solution))
				;
		}

		static build (path, opts) {
			return new Bundler(path, opts).build(opts);
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

		static get AssetsManager () { return AssetsManager }
		static get Resource () { return Resource }
		static get Solution () { return Solution }		
	};

}());