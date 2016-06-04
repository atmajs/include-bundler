(function () {
	var __register;

	(function(){
		var __global = typeof global !== 'undefined' && global ? global : window;
		var __nativeRequire = __global.require;
		var __originalRequire = function (path_) {
			var location = this.location;
			var path = path_resolve(path, location);

			if (modules[path]) {
				return modules[path].exports;
			}

			return nativeRequire(path_);
		};

		__register = function (path, factory) {
			var __filename = path,
				__dirname = path_getDir(path),
				module = new Module(path),
				require = __originalRequire.bind({ location: __dirname }),
				exports = module.exports;

			factory(
				require, 
				module, 
				exports, 
				__filename, 
				__dirname);
		};

		var modules = {};
		var Module = function(path){
			modules[path] = this;
			this.exports = {};
		};

	}());


	__register('/main.js', function(require, module, exports, __filename, __dirname){

		///// SOURCE

	});
}());