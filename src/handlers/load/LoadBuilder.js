LoadHandler.Builder = class LoadBuilder extends BaseBuilder {

	constructor () {
		super(...arguments);

	}

	createModule (outputItem, otherOutputItems) {
		var html = outputItem
			.resources
			.map(resource => {
				return `<script type='text/plain' data-bundler-path='${resource.url}'>			
					${resource.content}
				</script>`
			})
			.join('\n');

		outputItem.resource.content = html;
		outputItem.resource.type = 'html';
	}

	buildRoot (resource, dependencies) {		
		throw new Error('Right now only rewriter is supported')	
	}

	accepts (type) {
		return type === 'load';
	}
	
};

