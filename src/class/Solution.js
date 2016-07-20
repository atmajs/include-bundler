var solution = null;
var Solution = null;
(function(){
	// import ./SolutionOpts.js

	Solution = class_create({
		constructor: function(path, opts){
					
			this.path = path;
			this.opts = new SolutionOpts(this, opts || {});
			this.assetsManager = new AssetsManager(this);
		}
	});

}());
