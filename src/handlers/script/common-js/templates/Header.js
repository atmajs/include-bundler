var __register, __require, require;

(function(){

	// import ./path.js

	var __global = typeof global !== 'undefined' && global ? global : window;
	var __nativeRequire = __global.require;
	var __originalRequire = function (path_) {
		var location = this.location;
		var path = path_resolveUrl(path_, location);

		if (modules[path]) {
			return modules[path].runOnce();
		}

		return __nativeRequire(path_);
	};

	__register = function (path, factory) {
		var filename = path_resolveUrl(path);	
		modules[filename] = new Module(filename, factory);			
	};

	__require =__originalRequire.bind({ location: path_getDir(path_resolveUrl('%ROOT_DIR%')) });

	var modules = {};
	var Module = function(filename, factory){	
		this.filename = filename;
		this.dirname = path_getDir(filename);
		this.factory = factory;
		this.exports = null;
	};
	Module.prototype.runOnce = function(){
		if (this.exports != null) {
			return this.exports;
		}
		var require = __originalRequire.bind({ 
			location: this.dirname 
		});
		this.exports = {};
		this.factory(
			require, 
			this, 
			this.exports, 
			this.filename, 
			this.dirname
		);
		return this.exports;
	};
	
	require = __require;

	if (__nativeRequire == null) {
		__global.require = __require;
	}
}());