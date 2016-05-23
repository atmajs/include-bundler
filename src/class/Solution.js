var solution = null;
var Solution = null;
(function(){
	// import ./SolutionOpts.js

	Solution = class_create({
		constructor: function(path, opts){
			if (opts == null) {
				opts = {};
			}

			this.path = path;
			this.opts = new SolutionOpts(this, opts);
		},

		toTargetAsset: function(resource) {
			var resource = new Resource(resource.type);
			resource.filename = path_combine(opts.outputMain, opts.outputAssets, resource.url);
			resource.directory = path_getDir(this.filename);
		}
	});

}());
