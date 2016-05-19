var solution = null;
var Solution = null;
(function(){

	Solution = class_create({
		constructor: function(path, opts){
			if (opts == null) {
				opts = {};
			}

			this.path = path;
			this.base = getBase(opts);

			this.directory = opts.directory;
			this.outputMain = opts.outputMain;
			this.outputAssets = opts.outputAssets;
		}
	});

	function getBase(opts) {
		var base = opts.base;
		if (base == null) {
			return path_resolveCurrent();
		}
		return path_toAbsolute(base);
	}

}());
