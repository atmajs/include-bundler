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
			this.base = path_toAbsolute(opts.base || path_resolveCurrent());
			this.output = new Output(this, opts);
		},

		toTargetAsset: function(resource) {
			var resource = new Resource(resource.type);
			resource.filename = path_combine(opts.outputMain, opts.outputAssets, resource.url);
			resource.directory = path_getDir(this.filename);
		}
	});

	var Output = class_create({
		constructor: function(solution, opts){
			this.base = path_toAbsolute(opts.outputBase || path_resolveCurrent());
		}
	});

	function getBase(base) {
		if (base == null) {
			return path_resolveCurrent();
		}
		return path_toAbsolute(base);
	}

}());
