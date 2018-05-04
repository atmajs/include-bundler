import { arr_flattern } from '../../../utils/arr';
import { Include } from '../../../class/Include';
import { res_getPage } from '../../../utils/res';
import { BaseScriptBuilder } from '../base/BaseScriptBuilder';
import { Resource } from '../../../class/Resource';
import { Solution } from '../../../class/Solution';
import { OutputItem } from '../../../class/OutputResources';

export class IncludeJsBuilder extends BaseScriptBuilder {

	wrapScriptlessModule (otherOutputItems) {
		var allResources = arr_flattern(otherOutputItems.map(x => x.resources));

		var jsResources = allResources.filter(x => this.accepts(x));
		var cssResources = allResources.filter(x => x.type === 'css');
		var loadResources = allResources.filter(x => x.type === 'load');

		var jsRegister = this._serializeRegister(jsResources, 'js');
		var cssRegister = this._serializeRegister(cssResources, 'css');
		var loadRegister = this._serializeRegister(loadResources, 'load');
		return `
			${jsRegister}
			${cssRegister}
			${loadRegister}
		`;
	}
	isMainBuilder(solution: Solution): boolean {
		const KEY = 'includejs';
		const packageInfo = solution.opts.package;
		return packageInfo.module === KEY || packageInfo.moduleName === KEY;
	}
	wrapModule (resource, outputItem, otherOutputItems) {
		var opts = this.solution.opts;
		var page = res_getPage(resource, opts);
		
		if (opts.ctx.includejs == null) {
			opts.ctx.includejs = {};							
		}
		if (opts.ctx.includejs[page] == null) {
			opts.ctx.includejs[page] = {
				addHeading: true,
				hasHeading: false,
				lastItem: null
			};
		}

		var builderOpts = opts.ctx.includejs[page];
		var body = '';

		if (builderOpts.hasHeading === false && builderOpts.addHeading === true) {			
			builderOpts.hasHeading = true;			
			body = this._createHeading(builderOpts, resource, outputItem, otherOutputItems);
		}

		var content = resource.content,
			url = resource.toTargetUrl(this.solution);


		body += `include.setCurrent({ url: '${url}' });\n`
		body += content;
		body += `\ninclude.getResourceById('${url}', 'js').readystatechanged(3);`

		if (builderOpts.hasHeading && builderOpts.lastItem === resource) {
			body += `\ninclude.resumeStack();`
		}

		return body;
	}

	accepts (resource: Resource) {
		if (resource.type !== 'js') {
			return false;
		}
		const  module = resource.getModule();			
		return module === 'includejs';
	}


	private _createHeading (builderOpts, resource: Resource, outputItem: OutputItem, otherOutputItems: OutputItem[]) {
		var outputItems = [outputItem, ...otherOutputItems];
		var allResources = arr_flattern(outputItems.map(x => x.resources));

		var jsResources = allResources.filter(x => this.accepts(x));
		var cssResources = allResources.filter(x => x.type === 'css');
		var loadResources = allResources.filter(x => x.type === 'load');

		builderOpts.lastItem = jsResources[jsResources.length - 1];

		var jsRegister = this._serializeRegister(jsResources, 'js');
		var cssRegister = this._serializeRegister(cssResources, 'css');
		var loadRegister = this._serializeRegister(loadResources, 'load');
		var version = this._serializeVersion();
		var config = this._serializeConfig();
		var heading = `
			${version}
			${config}
			include.pauseStack();
			${jsRegister}
			${cssRegister}
			${loadRegister}
		`;

		return heading;
	}

	private _serializeVersion () {
		var v = this.solution.opts.version;
		if (!v) return '';
		return `include.cfg('version', '${v}');`
	}

	private _serializeConfig () {
		var opts = Include.getConfig();
		var json = JSON.stringify(opts);
		if (json === '{}') return '';
		return `include.cfg(${json});`
	}

	private _serializeRegister (resources, type) {
		var paths = resources
			.filter(x => x.type === type)
			.map(x => {
				return { 
					type: type, 
					url: x.toTargetUrl(this.solution) 
				};
			});

		if (paths.length === 0) {
			return '';
		}
		var json = JSON.stringify({
			[type]: paths
		});
		return `
			include.register(${json});
		`;
	}
	
};

