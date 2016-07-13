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

	constructor: function (includeData, parent) {
		this.resources = [];

		if (includeData == null || includeData.url == null) {
			includeData = { type: solution.type, url: solution.path };
		}

		this.parent = parent;
		this.type = includeData.type;
		this.content = includeData.content;
		this.namespace = includeData.namespace;

		var url = Include
			.PathResolver
			.resolveBasic(includeData.url, includeData.type, parent);

		// System paths
		this.filename = path_toAbsolute(url, null, solution.opts.base);
		this.directory = path_getDir(this.filename);

		// Application paths
		this.url = path_toRelative(this.filename, solution.opts.base);
		this.location = path_getDir(this.url);
	},
	toTarget () {
		var folder = solution.opts.getOutputFolder(this.type);
		var url = path_combine(folder, this.url);
		var filename = path_combine(solution.opts.outputBase, url);
		var resource = new Resource(this.type);
		resource.filename = filename;
		resource.directory = path_getDir(filename);
		resource.url = url;
		resource.location = path_getDir(url);

		return resource;
	},
	toJSON (deep) {
		return {
			type: this.type,
			namespace: this.namespace,
			filename: this.filename,
			directory: this.directory,
			url: this.url,
			location: this.location,
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
	}
});