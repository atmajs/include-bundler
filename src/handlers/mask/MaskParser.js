MaskHandller.Parser = class MaskParser extends BaseParser {

	constructor () {
		super(...arguments);
	}
	
	getDependencies (content, ownerResource) {
		var ast = this._parse(content, ownerResource);
		var arr = [];
		forEachImports(ast, imports => arr.push(...imports));
		return arr;
	}

	accepts (type) {
		return type === 'mask';
	}

	_parse (content, resource) {
		mask.off('error');
		mask.off('warn');

		mask.on('error', error => reporter.error(resource && resource.url, error));
		mask.on('warn', warning => reporter.warn(resource && resource.url, warning));

		return mask.parse(content);
	}

	_forEachImports (content, cb) {
		mask.TreeWalker.walk(ast,  node => {
			if (node.tagName !== 'imports') {
				return;
			}

			var imports = Array
				.from(node.nodes)
				.filter(x => x.tagName === 'import')
				.map(x => this._getDependencyFromNode(node));

			cb(imports);
		});
	}

	_getDependencyFromNode (node) {
		var path = node.path;
		if (path_getExtension(path) === '') {
			path += '.mask';
		}

		var type = mask.Module.getType(new mask.Module.Endpoint(node.path, node.contentType))
		var dependency = {
			url: path,
			type: MAPPING[type],
			module: 'mask',
			page: null
		};

		var owner = node.parent;
		if (owner != null && owner.tagName === 'imports') {
			owner = owner.parent;
		}
		if (owner == null || owner.type === mask.Dom.FRAGMENT) {
			return dependency;
		}
		var page = owner.attr['data-bundler-page'] || owner.attr.page || owner.attr.id || owner.attr.name;
		if (page == null) {
			solution.reporter.warn('Nested import found, but the container has no "data-bundler-page", "page", "id" or "name" in attributes');
		}
		dependency.page = page;
		return dependency;
	}
};

var MAPPING = { mask: 'mask', data: 'load', script: 'js', style: 'css' };

