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
		}
	});

}());
