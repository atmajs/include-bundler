var Resource = class_create({

	resources: null,
	parent: null,

	filename: '',
	directory: '',
	content: '',

	url: '',
	location: '',
	namespace: '',

	type: '',
	bundle: 'index',
	module: '',

	embed: false,
	asModules: null,
	inPages: null,

	constructor: function (includeData, parent, solution) {
		if (arguments.length === 0)
			return;

		this.resources = [];

		if (includeData == null) {
			includeData = { type: solution.type };
		}
		if (includeData.type == null) {
			if (includeData.url) {
				includeData.type = solution.opts.getTypeForExt(path_getExtension(includeData.url));
			} else {
				includeData.type = solution.type;
			}
		}

		this.parent = parent;
		this.type = includeData.type;
		this.content = includeData.content;
		this.namespace = includeData.namespace;
		this.page = includeData.page;
		this.asModules = [];
		this.inPages = [];
		this.source = null;

		if (includeData.bundle) {
			this.bundle = includeData.bundle;
		}

		if (includeData.module) {
			this.asModules = [ includeData.module ];
		}
		if (includeData.meta) {
			this.meta = includeData.meta;
		}
		if (includeData.page) {
			this.inPages = [ includeData.page ];	
		} else {
			var owner = parent;
			while(owner != null && owner.inPages.length === 0) {
				owner = owner.parent;
			}
			if (owner != null) {
				this.inPages = [ ...owner.inPages ];
			}
		}

		if (includeData.url == null) {
			return;
		}

		var url;
		
		var pathResolver = solution.handlers.findPathResolver(includeData);
		if (pathResolver) {
			url = pathResolver.resolve(includeData, parent);
		}
		if (url == null) {
			url = Include
				.PathResolver
				.resolveBasic(includeData.url, includeData.type, parent);
		}

		this.hash = path_sliceHash(url);
		if (this.hash) {
			url = url.replace(this.hash, '');
		}
		this.query = path_sliceQuery(url);
		if (this.query) {
			url = url.replace(this.query, '');
		}

		// System paths
		this.filename = path_toAbsolute(url, null, solution.opts.base);
		this.directory = path_getDir(this.filename);

		// Application paths
		this.url = '/' + path_toRelative(this.filename, solution.opts.base);
		this.location = path_getDir(this.url);

		if (this.query) {
			this.url += this.query;			
		}
		if (this.hash) {
			this.url += this.hash;			
		}

		var mapped = solution.opts.mapResource(this);
		if (mapped) {			
			return mapped;
		}

		this.solution = solution;

		return this;
	},
	clone () {
		var res = new Resource();
		res.resources = this.resource;
		res.parent = this.parent;
		res.filename = this.filename;
		res.directory = this.directory;
		res.content = this.content;
		res.url = this.url;
		res.location = this.location;
		res.namespace = this.namespace;
		res.type = this.type;
		res.bundle = this.bundle;
		res.module = this.module;
		res.embed = this.embed;
		res.asModules = this.asModules;
		res.inPages = this.inPages;
		res.source = this.source;
		return res;
	},
	toTarget (solution, settings) {

		var resource = settings && settings.targetType === 'static'
			? this._toStaticTarget(solution, settings)
			: this._toOutputTarget(solution, settings);
		

		resource.content = this.content;
		resource.asModules = this.asModules;
		resource.inPages = this.inPages;
		resource.bundle = this.bundle;

		if (solution.opts.version) {
			resource.url += '?v=' + solution.opts.version;
		}

		return resource;
	},
	_toStaticTarget (solution, settings) {
		var opts = solution.opts;
		var url = this.url;

		var filename = path_removeQuery(url);
		var resource = new Resource({ type: this.type }, this, solution);
		
		if (settings == null || settings.relative !== true) {
			url = path_combine(solution.opts.outputAppBase, url);
		}
		

		resource.url = url;
		resource.location = path_getDir(url);
		resource.filename = filename;
		resource.directory = path_getDir(filename);
		resource.source = this;
		return resource;
	},
	_toOutputTarget (solution, settings) {
		var opts = solution.opts;
		var url;
		if (solution.isMainResource(this)) {
			url = opts.outputMain;
		} else {
			url = path_combine(
				opts.getOutputFolder(this.type), 
				path_removeQuery(this.url)
			);			
		}

		var filename = path_combine(opts.outputBase, url);
		var resource = new Resource({ type: this.type }, this, solution);

		if (settings == null || settings.relative !== true && url.indexOf(solution.opts.outputAppBase) === -1) {
			url = path_combine(solution.opts.outputAppBase, url);
		}

		resource.url = url;
		resource.location = path_getDir(url);
		resource.filename = filename;
		resource.directory = path_getDir(filename);
		resource.source = this;
		return resource;
	},
	toRelative (resource) {
		var url = path_toRelative(this.filename, resource.filename);
		return url;
	},
	toTargetUrl (solution) {
		var url = this.url;
		if (url.indexOf(solution.opts.outputAppBase) === -1)
			url = path_combine(solution.opts.outputAppBase, url);

		return url;
	},
	toJSON (deep) {
		return {
			type: this.type,
			namespace: this.namespace,
			filename: this.filename,
			directory: this.directory,
			url: this.url,
			location: this.location,
			asModules: this.asModules,
			resources: deep === false ? void 0 : this.resources.map(x => x.toJSON())
		};
	},
	setModuleType (type) {
		if (this.isModuleType(type)) {
			return;
		}
		this.module = this
			.module
			.split(',')
			.splice(0, 0, type)
			.join(',');
	},
	isModuleType (type) {
		return this.module.indexOf(type) !== -1;
	},

	getModule (solution) {
		var modules = this.asModules;
		if (modules == null || modules.length === 0) {
			return null;
		}
				
		if (modules.length === 1) {
			return modules[0];
		}

		var arr = ['global', 'commonjs', 'amd', 'includejs'];
		var name = arr.find(name => modules.indexOf(name) !== -1);
		if (name == null) {
			name = modules[0];
		}
		return name;
	}
});