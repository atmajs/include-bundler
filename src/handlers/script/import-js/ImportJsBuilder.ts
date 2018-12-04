import { BaseScriptBuilder } from "../base/BaseScriptBuilder";
import { OutputItem } from "../../../class/OutputResources";
import { Resource } from "../../../class/Resource";
import { Builder } from './Builder';
import { Templates } from '../common-js/templates/Templates';
import { IImporterOptions } from './ModuleFile';

export class ImportJsBuilder extends BaseScriptBuilder {

    buildRoot(outputRoot: Resource, outputDependencies) {
        outputDependencies.forEach(x => x.embed = true);

        Builder.clearCache();

        let root = outputRoot.source;        
        let module = Builder.getModuleFromResource(root);
        let $package = this.solution.opts.package;
        let options = $package.import || new IImporterOptions;
        options.wrapper = $package.moduleWrapper as any;

        let body = Builder.build(module, options);

		switch (options.wrapper) {
			case 'custom':
				body = this.wrapWithCustom(body);
				break;
            case 'script':
            case 'iif':
                break;
            default:
				throw new Error(`Unsupported module wrapper "${options.wrapper}" for import`);
		}
        outputRoot.content = body;
    }

	wrapModule (resource: Resource, outputItem: OutputItem) {
        return resource.content;      
	}
	
	accepts (resource: Resource) {	
        if (resource.type !== 'js')  {
            return false;
        }
        let module = resource.getModule();
        if (module === 'root' && resource.solution.opts.package.module === 'import') {
            module = 'import';
        }        
        return module === 'import';
    }
    
    
	wrapWithCustom (body) {
		let opts = this.solution.opts.package;
		let template = Templates.load(opts.moduleWrapperCustomPath);
		
		return template
			.replace('/**MODULE**/', () => body)
			;
	}
};

