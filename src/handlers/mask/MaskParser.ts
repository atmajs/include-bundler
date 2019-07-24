import { Solution } from '../../class/Solution';
import { BaseHandler } from '../base/BaseHandler';
import { path_combine } from '../../utils/path';
import { BaseParser } from "../base/BaseParser";
import { async_resolve } from "../../utils/async";
import { Resource } from '../../class/Resource';
import { mask } from '../../global'
import { ResourceInfo } from '../../class/ResourceInfo';
import { color } from '../../utils/color';

export class MaskParser extends BaseParser {

	constructor (public solution: Solution, public handler: BaseHandler) {
		super(solution, handler);		
	}
	
	getDependencies (content, ownerResource) {
		var ast = this._parse(content, ownerResource);
		var arr = [];
		this._forEachImports(ast, imports => {
			arr.push(...imports);
		});		
		return async_resolve({ dependencies: arr }) as PromiseLike<ResourceInfo>;
	}

	accepts (type) {
		return type === 'mask';
	}

	_parse (content, resource?: Resource) {
		mask.off('error');
		mask.off('warn');

		var reporter = this.solution.reporter;
		mask.on('error', error => reporter.error(toMessage(error)));
		mask.on('warn', warning => reporter.warn(toMessage(warning)));

		function toMessage (warning) {
			var msg = '';
			if (resource) msg += color(`yellow<${resource.url}>\n`);
			msg += warning.message;
			return msg;
		}

		return mask.parse(content);
	}

	_forEachImports (ast, cb) {
		mask.TreeWalker.walk(ast,  node => {
			if (node.tagName === 'imports') {				
				var imports = (Array
					.from(node.nodes) as any[])
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
			// @NextIteration base will be handled in mask.Module.resolvePath
			// var base = mask.Module.cfg('base');
			// if (base) {
			// 	path = path_combine(base, path);
			// }
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
