ScriptHandler.Builder = class ScriptBuilder extends BaseBuilder {

	constructor () {
		super(...arguments);
	}

	createModule (outputItem) {

		var out = outputItem.resources.map(res => {
			var template = Templates.resolveForResource(res, solution);

			return template.wrapModule(res, this.solution);
		});
		
		outputItem.resource.content = out.join('\n');
		return resource;	
	}

	rewriteRoot (resource, dependencies) {

	}

	accepts (type) {
		return type === 'mask';
	}
	
};

