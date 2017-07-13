var solution = null;
var Solution = null;
(function(){

	// import ./VarDefinitions.js
	// import ./SolutionOpts.js
	// import ./OutputResources.js
	// import ./Reporter.js
	// import ./HandlersUtils.js

	Solution = class Solution extends class_EventEmitter {
		constructor (path, opts) {
			super();

			this.path = path;
			this.opts = new SolutionOpts(this, opts || {});
			this.assetsManager = new AssetsManager(this);
			this.outputResources = new OutputResources(this);
			this.reporter = IReporter.create(this.opts);

			this.handlers = Handlers.map(Ctor => new Ctor(this));
			Object.assign(this.handlers, HandlersUtils);	
		}

		getOptionsForResource (resource) {
			var files = this.opts.files;
			if (files == null) {
				return null;
			}
			// @TODO support settings for a resource
		}

		isMainResource (resource) {
			return this.outputResources.rootInput === resource;
		}

		runScripts (name) {
			return async_run(() => {
				let arr = this.opts[name];
				if (arr == null || arr.length === 0) {
					return;
				}
				return async_waterfall(arr, function(path) {
					let mix = require(class_Uri.combine(process.cwd(), path));
					if (mix && mix.process) {
						return mix.process();
					}
				});
			})
		}
	};

}());
