MaskHandler.Builder = class MaskRewriter extends BaseBuilder {

	constructor () {
		super(...arguments);
	}

	createModule (outputItem, otherOutputItems) {
		var out = [], arr;

		otherOutputItems.forEach(item => {
			if (item.resource.type === 'css') {
				var arr = this.registerStyles(item.resources);
				out.push(...arr);
			}
		})

		arr = outputItem.resources.map(resource => {
			return `module path="${resource.url}" { 
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

		
		
		resource.content = `${body}\n${imports}\n${resource.content}`;
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

