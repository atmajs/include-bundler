var Resource = class_create({

	resources: null,
	parent: null,

	uri: null,
	appuri: null,

	type: '',
	content: '',
	namespace: '',

	location: '',
	directory: '',
	id: '',

	constructor (includeData, parent) {
		var _type = includeData.type,
			_url = includeData.url,
			_namespace = includeData.namespace,
			_uri = includeData.uri,
			_parentLocation = parent && parent.directory,
			_parentAppUri = parent && parent.appuri; // ?optional

		this.type = _type;
		this.namespace = _namespace;
		this.content = includeData.content;
		this.parent = parent;

		if (_url) {
			this.uri = _uri || path_resolveUri(_url, _parentLocation, solution.directory);
			this.appuri = path_resolveAppUri(_url, _parentAppUri);


			if (__cache[this.appuri]) {
				return __cache[this.appuri];
			}

			__cache[this.appuri] = this;
			this.url = this.appuri;
			this.location = path_getDir(this.appuri);
			this.directory = path_getDir(this.uri.toString());
			this.id = this.appuri;
		}else{

			this.uri = new net.Uri();
			this.url = '';
		}

		this.resources = [];
		return this;
	},
	loader: null,
	load () {
		this.defer();
		if (this.content == null) {
			var file = new io.File(this.uri);

			if (!file.exists())
				file = resp.RefPath(this.uri.toLocalFile());


			if (file == null || file.exists() === false){
				logger.error('<file> 404 - ', this.uri.toLocalFile());
				return this;
			}

			this.content = file.read();

			if (this.content) {
				logger.log('<resource>', this.type, this.uri.file.bold.green);
			}else{

				logger.warn('<file:empty>', this.uri.file);
			}
		}

		var that = this,
			includes = null;

		switch (this.type) {
		case 'html':
			resp
				.HTML
				.extractIncludes(this.content, solution.directory, solution.variables)
				.done(function(includes){
					this.includes = includes.map(function(x){
						return new Resource(x, that);
					});

					ruqq.arr.invoke(this.includes, 'load');
					this.resolve(this.includes);
				}.bind(this));
			return this;
		case 'js':

			includes = resp
				.JS
				.extractIncludes(this, solution.directory, solution.variables);

			this.includes = includes.map(function(x){
				return new Resource(x, that);
			});

			break;
		case 'css':
		case 'load':
		case 'lazy':
			return this;
		default:
			throw new Error('Builder: resource of unknown type' + this.type);
			break;
		}

		ruqq.arr.invoke(this.includes, 'load');
		this.resolve(this.includes);
		return this;
	}
});