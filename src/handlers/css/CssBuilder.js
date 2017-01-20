CssHandler.Builder = class CssRewriter extends BaseBuilder {

	constructor () {
		super(...arguments);
	}

	createModule (outputItem) {
		var out = outputItem
			.resources
			.map(res => {
				this.solution.assetsManager.rewriteCss(res, outputItem.resource, this.solution);
				return res.content;
			});
		
		outputItem.resource.content = out.join('\n');
	}

	accepts (type) {
		return type === 'css';
	}
	
};

