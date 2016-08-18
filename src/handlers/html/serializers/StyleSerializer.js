class StyleSerializer extends BaseSerializer {

	constructor (...args) {
		super(...args);
	}

	removeDependencies ($) {
		$('link[href]')
			.filter(function(i, x){
				return x.attribs['data-bundler'] !== 'ignore';
			})
			.remove()
			;
	}
	
	serialize ($, resources) {
		var arr = resources.filter(x => x.type === 'css');
		if (arr.length === 0)
			return;

		var html = arr
			.map(x => `<link href='${x.url}' rel='stylesheet' />`)
			.join('\n');

		this.builder.append($, 'head', html);
	}

	rewrite ($, resource) {
		return void 0;
	}
}