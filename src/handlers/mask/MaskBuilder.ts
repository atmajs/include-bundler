import { BaseBuilder } from '../base/BaseBuilder';
import { OutputItem } from '../../class/OutputResources';
export class MaskBuilder extends BaseBuilder {

	createModule (outputItem: OutputItem, otherOutputItems: OutputItem[]) {
		var out = [], arr;

		otherOutputItems.forEach(item => {
			if (item.resource.type === 'css') {
				var arr = this.registerStyles(item.resources);
				out.push(...arr);
			}
		})

		arr = outputItem.resources.map(resource => {
			/*
			* @TODO consider to use relative paths instead of applications root
			*/
			//-let url = resource.toRelative(outputItem.resource);
			let url = resource.url;
			return `module path="${url}" { 
				${resource.content}
			}`
		});
		out.push(...arr);

		
		outputItem.resource.content = out.join('\n');
	}

	buildRoot (resource, dependencies) {

		var maskDeps = dependencies.filter(x => x.type === 'mask');

		maskDeps.forEach(x => x.embed = true);
		
		var body = maskDeps.map(x => x.content).join('\n');
		var imports = dependencies
			.filter(x => x.type !== 'mask')
			.map(x => {
				var url = x.toRelative(resource);				
				return `import sync from '${url}';`;
			})
			.join('\n');

		
		
		resource.content = `${imports}\n${body}\n${resource.content}`;
	}

	accepts (type) {
		return type === 'mask';
	}

	registerStyles (resources) {
		return resources.filter(x => x.getModule() === 'mask').map(resource => {
			return `module path="${resource.url}";`
		});
	}
	
};

