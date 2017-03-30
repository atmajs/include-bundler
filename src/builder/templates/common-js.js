(function(){

Templates['commonjs'] = class CommonJs extends ITemplate {
	
	wrapModule (resource, solution) {
		if (solution.opts.commonjs == null) {
			solution.opts.commonjs = {
				addHeading: true,
				hasHeading: false
			}
		};

		var body = '';

		if (solution.opts.commonjs.hasHeading === false && solution.opts.commonjs.addHeading === true) {			
			solution.opts.commonjs.hasHeading = true;
			body = Heading;
		}

		return body + wrapModule(resource);
	}

	rewriteRoot (root, dependencies, solution) {
		
		var body = dependencies
			.map(x => x.content)
			.concat([ root.content ])
			.join('\n');

		dependencies.filter(x => x.type !== 'css').forEach(x => x.embed = true);
		root.content = wrapRootModule(body);		
	}
};

function wrapRootModule (str, resources) {
	return RootModule.replace('%BUNDLE%', () => str);
}

function wrapModule (resource) {
	var {url, content} = resource;
	return Module
		.replace('%MODULE_PATH%', () => url)
		.replace('%MODULE%', () => content)
		;
}

let Heading = `
	var __register, __require, require;

	(function(){

		// import ./utils/path.js

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

		__require =__originalRequire.bind({ location: path_resolveCurrent() });

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
			global.require = __require;
		}
	}());
`

let RootModule = `
(function(){
	
	%BUNDLE%

}());
`;

let Module = `
__register("%MODULE_PATH%", function(require, module, exports, __filename, __dirname){
	%MODULE%
});
`;

}());