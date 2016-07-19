(function(){


Templates['commonjs'] = class CommonJs extends ITemplate {
	wrapBundle (str) {
		return Bundle
			.replace('%BUNDLE%', () => str)
			;
	}

	wrapModule (path, str) {
		return Module
			.replace('%MODULE_PATH%', () => path)
			.replace('%MODULE%', () => str)
			;
	}
};

let Utils = [
	// import:string ./utils/path.js
][0];

let Bundle = `
(function () {
	var __register, __require;

	(function(){
		var __global = typeof global !== 'undefined' && global ? global : window;
		var __nativeRequire = __global.require;
		var __originalRequire = function (path_) {
			var location = this.location;
			var path = path_resolveUrl(path_, location);

			if (modules[path]) {
				return modules[path].exports;
			}

			return __nativeRequire(path_);
		};

		__register = function (path, factory) {
			var __filename = path_resolveUrl(path),
				__dirname = path_getDir(__filename),
				module = new Module(__filename),
				require = __originalRequire.bind({ location: __dirname }),
				exports = module.exports;

			factory(
				require, 
				module, 
				exports, 
				__filename, 
				__dirname);
		};

		__require = __originalRequire.bind({ location: 'file://' + __dirname });

		var modules = {};
		var Module = function(path){
			modules[path] = this;
			this.exports = {};
		};

		// import ./utils/path.js

	}());


	(function(require){

		%BUNDLE%

	}(__require));
}());
`;

let Module = `
__register("%MODULE_PATH%", function(require, module, exports, __filename, __dirname){
	%MODULE%
});
`;

}());