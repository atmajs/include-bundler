var SolutionOpts;
(function(){
	SolutionOpts = class_create({
		defaults: {
			build: 'release',
			type: '',
			base: '',
			version: null,
			
			mainPage: 'main',
			mainBundle: '',

			outputBase: '',
			outputAppBase: '/',
			outputMain: 'build/{build}/{filename}.{ext}',
			outputSources: 'build/{build}',
			outputAssets: 'build/{build}/assets',
			package: {
				module: 'commonjs', 
				modules: ['commonjs', 'includejs', 'global'],

				type: 'module',
				types: [ 'module', 'bundle'],

				moduleWrapper: 'iif',
				moduleWrappers: ['umd', 'iif', 'script'],
				moduleName: '',
			},
			extensions: {
				'': { type: 'js'},
				
				'js':  { type: 'js' },
				'es6': { type: 'js' },
				'jsx': { type: 'js' },
				'ts':  { type: 'js' },

				'mask': { type: 'mask' },

				'css': { type: 'css' },
				'less': { type: 'css' },
				'scss': { type: 'css' },
				'sass': { type: 'css' },

				'html': { type: 'html' },
				'json': { type: 'data' },

				'jpg': { type: 'asset' },
				'png': { type: 'asset' },
				'mp4': { type: 'asset' },
			},
			defaultExtensions: {
				'js': 'js',
				'mask': 'mask',
				'css': 'css',
				'load': 'load'
			},
			mappers: null,
			mappings: null,
			varDefs: null,
			parserIgnoreDependencies: [
				'\\/bower_components\\/',
				'\\/node_modules\\/',
				'\\.min\\.'
			],
			dynamicDependencies: [

			],
			silent: false,
			watch: false
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
				var opts = Object.create(this.defaults.package);
				return Object.assign(opts, packageOpts);
			},
			varDefs (varDefs) {
				return new VarDefinitions(this.solution, varDefs);
			},
			mappers () {
				return []
			},
			mappings (val) {
				return val || {};
			},
			version (val, opts) {
				if (typeof val === 'string') {
					if (val[0] === '#') {
						var path = val.replace('#{', '').replace('}', '');
						var json = require(process.cwd() + '/package.json');
						return obj_getProperty(json, path);
					}
					if (val === 'random') {
						return (Math.random() * 100000000 | 0).toString(32);
					}
				}
				return val;
			},
			parserIgnoreDependencies (arr) {
				return arr.map(x => new RegExp(x));
			},
			dynamicDependencies (arr) {
				return arr.map(x => new RegExp(x));
			},
			extensions (opts) {
				if (opts === this.defaults.extensions) {
					return opts;
				}
				return Object.assign(this.defaults.extensions, opts);
			}
		},
		constructor: function(solution, opts_){
			this.solution = solution;
			this.paths = [ solution.path ];
			var opts = opts_ || {};
			for (var key in this.defaults) {
				var val = opts[key] || this.defaults[key];
				this[key] = val;
			}
			for (var key in this.resolvers) {
				this[key] = this.resolvers[key].call(this, this[key], this);
			}
			if (this.type === '' && solution.path) {
				this.type = this.getTypeForExt(path_getExtension(solution.path));
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
		},
		getExtForType (type) {
			var match = this.defaultExtensions[type];
			if (match == null) 
				throw new Error('Type is not supported: ' + type);

			return match;
		},
		getTypeForExt (ext) {			
			var match = this.extensions[ext];
			if (match == null) 
				throw new Error('Extension is not configurated: ' + ext);

			return match.type;
		},
		mapResource (resource_) {
			var resource = resource_;
			this.mappers.forEach(mapper => {
				resource = mapper.map(resource);
			});
			return resource;
		},
		toAppUrl (filename) {
			return '/' + path_toRelative(filename, this.base);
		},
		fromAppUrl (url) {
			return path_combine(this.base, url);
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
					if (path === '') 
						return opts.mainPage;

					var match = /([^/\\]+)\.\w+$/.exec(path);
					if (match) {
						return match[1];
					}
					throw new Error('Filename can`t be parsed from: ' + opts.paths.join(','));
				case 'ext':
					var path = opts.paths[0];
					if (path === '') 
						return opts.type;

					var match = /\.(\w+)$/.exec(path);
					if (match) {
						return match[1];
					}
					throw new Error('Extension can`t be parsed from: ' + opts.paths.join(','));
				default:
					throw new Error('Unknown interpolation key: ' + name);
			}
		});
	}

}());
