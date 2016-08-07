MaskHandler.Builder = class MaskRewriter extends BaseBuilder {

	constructor () {
		super(...arguments);
	}

	createModule (outputItem) {
		var out = outputItem.resources.map(resource => {
			return `module path="${resource.url}" { 
				${resource.content}
			}`
		});
		
		outputItem.resource.content = out.join('\n');
	}

	rewriteRoot (resource, dependencies) {
		dependencies.forEach(x => x.embed = true);
		
		var body = dependencies.map(x => x.content).join('\n');
			body += '\n' + resource.content;

		resource.content = body;
	}

	accepts (type) {
		return type === 'mask';
	}
	
};

