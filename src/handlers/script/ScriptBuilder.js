ScriptHandler.Builder = class ScriptBuilder extends BaseBuilder {

	constructor () {
		super(...arguments);

		this.builders =  [
			new GlobalJsHandler.Builder(this.solution, this.handler),
			new CommonJsHandler.Builder(this.solution, this.handler),
			new AmdJsHandler.Builder(this.solution, this.handler),
			new IncludeJsHandler.Builder(this.solution, this.handler),
			new MaskJsHandler.Builder(this.solution, this.handler)
		]
	}

	createModule (outputItem, otherOutputItems) {
		var out = outputItem.resources.map(res => {

			var builder = this.builders.find(x => x.accepts(res));
			if (builder == null)
				throw new Error('Builder is not found for ' + res.url);

			return builder.wrapModule(res, outputItem, otherOutputItems);
		});
		
		outputItem.resource.content = out.join('\n');
	}

	buildRoot (resource, dependencies) {
		var builder = this.builders.find(x => x.accepts(resource));
		if (builder == null)
			throw new Error('Builder is not found for ' + resource.url);

		return builder.buildRoot(resource, dependencies);
	}

	accepts (type) {
		return type === 'js';
	}
	
};

