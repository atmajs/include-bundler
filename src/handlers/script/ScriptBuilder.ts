import { BaseScriptBuilder } from './base/BaseScriptBuilder';
import { ScriptHandler } from './ScriptHandler';
import { BaseBuilder } from '../base/BaseBuilder';
import { GlobalJsHandler } from './global-js/GlobalJsHandler';
import { CommonJsHandler } from './common-js/CommonJsHandler';
import { AmdJsHandler } from './amd-js/AmdJsHandler';
import { IncludeJsHandler } from './include-js/IncludeJsHandler';
import { MaskJsHandler } from './mask-js/MaskJsHandler';
import { OutputItem } from '../../class/OutputResources';
import { Resource } from '../../class/Resource';
import { ImportJsHandler } from './import-js/ImportJsHandler';

export class ScriptBuilder extends BaseBuilder {

	builders: BaseScriptBuilder[] = [
		new GlobalJsHandler.Builder(this.solution, this.handler),
		new CommonJsHandler.Builder(this.solution, this.handler),
		new AmdJsHandler.Builder(this.solution, this.handler),
		new IncludeJsHandler.Builder(this.solution, this.handler),
        new MaskJsHandler.Builder(this.solution, this.handler),
        new ImportJsHandler.Builder(this.solution, this.handler),
	]
	
	createModule (outputItem: OutputItem, otherOutputItems: OutputItem[]) {
		let code = '';
		let resArr = outputItem.resources;
		if (resArr == null || resArr.length === 0) {
			let builder = this.builders.find(x => x.isMainBuilder(this.solution));
			if (builder) {
				code = builder.wrapScriptlessModule(otherOutputItems);
			}
			
		} else {
			const out = resArr.map(res => {
				let builder = this.builders.find(x => x.accepts(res));
				if (builder == null)
					throw new Error('Module Builder not found for ' + res.url);

				return builder.wrapModule(res, outputItem, otherOutputItems);
			});
			code = out.join('\n');
		}
		outputItem.resource.content = code;
	}

	buildRoot (resource: Resource, dependencies) {
		var builder = this.builders.find(x => x.accepts(resource));
		if (builder == null) {
            throw new Error(`Root Builder not found for ${resource.url} (${resource.getModule()})`);
        }

		return builder.buildRoot(resource, dependencies);
	}

	accepts (type) {
		return type === 'js';
	}
	
};

