import { BaseHandler } from '../../base/BaseHandler';
import { CommonJsBuilderSimplified } from './CommonJsBuilderSimplified';
import { Solution } from '../../../class/Solution';
import { Templates } from './templates/Templates';
import { BaseScriptBuilder } from '../base/BaseScriptBuilder';
import { Resource } from '../../../class/Resource';

export class CommonJsBuilder extends BaseScriptBuilder {

	constructor (public solution: Solution, public handler: BaseHandler) {
		super(solution, handler);


		var opts = this.solution.opts.package.commonjs;
		if (opts && opts.output === 'simplified') {
			this.wrapModule = CommonJsBuilderSimplified.wrapModule;
			this.getRootContent = CommonJsBuilderSimplified.getRootContent;
			this.getHeaderContent = CommonJsBuilderSimplified.getHeaderContent;
		}
	}

	accepts (resource) {
		if (resource.type !== 'js') {
			return false;
		}
		var module = resource.getModule();	
		if (module == null || module === 'root') 
			module = this.solution.opts.package.module;

		return module === 'commonjs';
	}

	wrapModule (resource: Resource) {
		var opts = this.solution.iteration;
		if (opts.commonjs == null) {
			opts.commonjs = {
				addHeading: true,
				hasHeading: false
			}
		};

		var body = '';

		if (opts.commonjs.hasHeading === false && opts.commonjs.addHeading === true) {			
			opts.commonjs.hasHeading = true;
			body = this.getHeaderContent();
		}

		var {url, content} = resource;

		var module = Templates
			.Module
			.replace('%MODULE_PATH%', () => url)
			.replace('%MODULE%', () => content);
		

		return body + module;
	}

	getHeaderContent () {
		var mainUrl = this.solution.outputResources.rootInput.url;

		return Templates
			.Header
			.replace('%ROOT_DIR%', () => mainUrl);
	}

	buildRoot (root, outputDependencies) {
		outputDependencies.forEach(x => x.embed = true);

		var content = this.getRootContent(root, outputDependencies);
		var body = outputDependencies
			.map(x => x.content)
			.concat([ content ])
			.join('\n');


		var wrapper = this.solution.opts.package.moduleWrapper;
		switch (wrapper) {
			case 'iif':
				body = this.wrapWithIIF(body);
				break;
			case 'umd':
				body = this.wrapWithUMD(body);
				break;
			case 'custom':
				body = this.wrapWithCustom(body);
				break;
			case 'script':
				break;
			default:
				throw new Error('Uknown module wrapper: ' + wrapper);
		}		

		root.content = body;
	}

	getRootContent (root, outputDependencies?) {
		return  root.content;
	}

	wrapWithIIF (body) {
		return Templates
			.RootModule
			.replace('%BUNDLE%', () => body);
	}
	
	wrapWithUMD (body) {
		var opts = this.solution.opts.package;
		var name = opts.moduleName || '';
		return Templates
			.UMD
			.replace('%MODULE%', () => body)
			.replace('%NAME%', () => name)
			;
	}
	wrapWithCustom (body) {
		let opts = this.solution.opts.package;
		let template = Templates.load(opts.moduleWrapperCustomPath);
		
		return template
			.replace('/**MODULE**/', () => body)
			;
	}
};
