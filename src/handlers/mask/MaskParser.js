MaskHandler.Parser = class MaskParser extends BaseParser {

	constructor () {
		super(...arguments);

		mask.Module.cfg('base', '');
	}
	
	getDependencies (content, ownerResource) {
		var ast = this._parse(content, ownerResource);
		var arr = [];
		this._forEachImports(ast, imports => {
			arr.push(...imports);
		});		
		return async_resolve({ dependencies: arr });
	}

	accepts (type) {
		return type === 'mask';
	}

	_parse (content, resource) {
		mask.off('error');
		mask.off('warn');

		var reporter = this.solution.reporter;
		mask.on('error', error => reporter.error(toMessage(error)));
		mask.on('warn', warning => reporter.warn(toMessage(warning)));

		function toMessage (warning) {
			var msg = '';
			if (resource) msg += `yellow<${resource.url}>\n`.color;
			msg += warning.message;
			return msg;
		}

		return mask.parse(content);
	}

	_forEachImports (ast, cb) {
		mask.TreeWalker.walk(ast,  node => {
			if (node.tagName === 'imports') {				
				var imports = Array
					.from(node.nodes)
					.filter(x => x.tagName === 'import')
					.map(x => this._getDependenciesFromNode(x))
					.reduce((aggr, x) => aggr.concat(...x), []);

				cb(imports);
			}
			if (node.tagName === 'import:cfg') {
				var arr = mask.Utils.Expression.evalStatements(node.expression);
				mask.Module.cfg.apply(mask.Module, arr);
			}
		});
	}

	_getDependenciesFromNode (node) {
		var page = this._getPageForNode(node),
			path = mask.Module.resolvePath(node, null, null, null, false),
			type = mask.Module.getType(new mask.Module.Endpoint(path, node.contentType));			

		if (path[0] === '/') {
			var base = mask.Module.cfg('base');
			if (base) {
				path = path_combine(base, path);
			}
		}
		return [ this._createDependency(path, type, page) ];
	}

	_cfg_getExtensionForType (type) {
		return mask.Module.cfg('ext')[type];
	}

	_cfg_getBaseForNs (type) {
		return mask.Module.cfg('nsBase') || '';
	}

	_createDependency (path, type, page) {
		return {
			url: path,
			type: MAPPING[type],
			module: 'mask',
			page: page
		};		
	}

	_getPageForNode (node) {
		var owner = node.parent;
		if (owner != null && owner.tagName === 'imports') {
			owner = owner.parent;
		}
		if (owner == null || owner.type === mask.Dom.FRAGMENT) {
			return null;
		}
		var page = owner.attr['data-bundler-page'] || owner.attr.page || owner.attr.id || owner.attr.name;
		if (page == null) {
			this.solution.reporter.warn('Nested import found, but the container has no "data-bundler-page", "page", "id" or "name" in attributes');
		}
		return page;
	}
};

var MAPPING = { mask: 'mask', data: 'load', script: 'js', style: 'css' };

