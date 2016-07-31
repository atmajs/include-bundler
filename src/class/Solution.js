var solution = null;
var Solution = null;
(function(){
	// import ./SolutionOpts.js
	// import ./OutputResources.js

	Solution = class_create({
		constructor: function(path, opts){
					
			this.path = path;
			this.opts = new SolutionOpts(this, opts || {});
			this.assetsManager = new AssetsManager(this);
			this.outputResources = new OutputResources(this);
		},

		getOptionsForResource (resource) {
			var files = this.opts.files;
			if (files == null) {
				return null;
			}
			// @TODO support settings for a resource
		}
	});

}());
