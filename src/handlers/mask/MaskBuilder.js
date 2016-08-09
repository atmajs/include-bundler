MaskHandler.Builder = class MaskRewriter extends BaseBuilder {

	constructor () {
		super(...arguments);
	}

	createModule (outputItem) {
		var out = outputItem.resources.map(resource => {

			var url = resource.toRelative(outputItem.resource);
			return `module path="${resource.url}" { 
				${resource.content}
			}`
		});
		
		outputItem.resource.content = out.join('\n');
	}

	rewriteRoot (resource, dependencies) {

		var maskDeps = dependencies.filter(x => x.type === 'mask');

		maskDeps.forEach(x => x.embed = true);
		
		var body = maskDeps.map(x => x.content).join('\n');
			body += '\n' + resource.content;

		var imports = dependencies
			.filter(x => x.type !== 'mask')
			.map(x => `import sync from '${x.url}';`)
			.join('\n');

		body = `${imports}\n${body}`;

		resource.content = body;
	}

	accepts (type) {
		return type === 'mask';
	}
	
};

