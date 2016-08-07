CssHandler.Builder = class CssRewriter extends BaseBuilder {

	constructor () {
		super(...arguments);
	}

	createModule (outputItem) {
		var out = outputItem.resources.map(res => {
			return res.content;
		});
		
		outputItem.resource.content = out.join('\n');
	}

	accepts (type) {
		return type === 'css';
	}
	
};

