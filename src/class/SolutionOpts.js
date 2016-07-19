var SolutionOpts;
(function(){
	SolutionOpts = class_create({
		defaults: {
			build: 'release',
			type: '',
			base: '',
			outputBase: '',
			outputMain: '{filename}.{build}.{ext}',
			outputSources: 'build/{build}',
			outputAssets: 'build/{build}/assets',
			package: {
				module: 'commonjs', 
				modules: ['commonjs', 'includejs', 'global'],

				type: 'module',
				types: [ 'module', 'bundle']
			}
		},
		resolvers: {
			base (basePath) {
				return basePath
					? path_toAbsolute(basePath)
					: path_resolveCurrent();
			},
			outputBase (outputBase, opts) {
				return outputBase
					? path_toAbsolute(outputBase)
					: opts.base;
			},
			outputMain: prepairPath,
			outputSources: prepairPath,
			outputAssets: prepairPath,
			package: function(packageOpts) {
				if (packageOpts == null) {
					return this.package;
				}
				var opts = Object.create(this.package);
				return Object.assign(opts, packageOpts);
			}
		},
		constructor: function(solution, opts_){
			this.paths = [ solution.path ];
			var opts = opts_ || {};
			for (var key in this.defaults) {
				var val = opts[key] || this.defaults[key];
				this[key] = val;
			}
			for (var key in this.resolvers) {
				this[key] = this.resolvers[key].call(this, this[key], this);
			}
		},
		getOutputFolder (type) {
			if (type === 'asset') {
				return this.outputAssets;
			}
			return this.outputSources;
		},		
		isSameBase () {
			return this.base === this.outputBase;
		}
	});

	function prepairPath(path, opts) {
		return interpolateStr(path, opts);
	}
	function interpolateStr(str, opts) {
		return str.replace(/{(\w+)}/g, (full, name) => {
			var x = opts[name];
			if (x != null) {
				return x;
			}
			switch (name) {
				case 'filename':
					var path = opts.paths[0];
					var match = /([^/\\]+)\.\w+$/.exec(path);
					if (match) {
						return match[0];
					}
					throw new Error('Filename can`t be parsed from: ' + opts.paths.join(','));
				case 'ext':
					var path = opts.paths[0];
					var match = /\.(\w+)$/.exec(path);
					if (match) {
						return match[0];
					}
					throw new Error('Extension can`t be parsed from: ' + opts.paths.join(','));
				default:
					throw new Error('Unknown interpolation key: ' + name);
			}
		});
	}

}());
