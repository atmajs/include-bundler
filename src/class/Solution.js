var solution = null;
var Solution = null;
(function(){
	// import ./SolutionOpts.js
	// import ./OutputResources.js
	// import ./Reporter.js

	Solution = class Solution extends class_EventEmitter {
		constructor (path, opts) {
			super();

			this.path = path;
			this.opts = new SolutionOpts(this, opts || {});
			this.assetsManager = new AssetsManager(this);
			this.outputResources = new OutputResources(this);
			this.reporter = IReporter.create();

			this.handlers = Handlers.map(Ctor => new Ctor(this));			
		}

		getOptionsForResource (resource) {
			var files = this.opts.files;
			if (files == null) {
				return null;
			}
			// @TODO support settings for a resource
		}
	};

}());
