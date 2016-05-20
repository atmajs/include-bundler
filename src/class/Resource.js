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

	constructor: function (includeData, parent) {
		this.resources = [];

		if (includeData == null || includeData.url == null) {
			includeData = { type: solution.type, url: solution.path };
		}

		this.parent = parent;
		this.type = includeData.type;
		this.content = includeData.content;
		this.namespace = includeData.namespace;

		var url = Include.PathResolver.resolveBasic(includeData.url, includeData.type);

		// System paths
		this.filename = path_toAbsolute(url, parent && parent.directory, solution.base);
		this.directory = path_getDir(this.filename);

		// Application paths
		this.url = path_toRelative(this.filename, solution.base);
		this.location = path_getDir(this.url);
	},
	toOutputResource () {
		var folder = solution.getOutputFolder(this.type);
		var url = path_combine(folder, this.url);
		var filename = path_combine(solution.outputBase, url);
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
	}
});