class StyleSerializer extends BaseSerializer {

	constructor (...args) {
		super(...args);
	}

	removeDependencies ($) {
		$('link[href]')
			.filter(function(i, x){
				return x.attribs['data-bundler'] !== 'ignore';
			})
			.each((i, el) => {
				this._replaceWithPlaceholder($(el), 'css');
			})
			;
	}
	
	serialize ($, resources) {
		var arr = resources.filter(x => x.type === 'css');
		if (arr.length === 0)
			return;


		arr.forEach(resource => {
			var html = `<link href='${resource.url}' rel='stylesheet' />`; 

			var inserted = this._insertDependency($, resource, html);
			if (inserted === false) {
				this.builder.append($, 'head', html);
				return;
			}
		});		
	}

	rewrite ($, resource) {
		this._inlineResources(
			$,
			'link[href][data-bundler-content="inline"]',
			'href',
			content => `<style>${content}</style>`
		);
		this._rewriteStaticUrls(
			resource,
			$,
			'link[rel="stylesheet"][data-bundler="ignore"]',
			'href'
		);
	}
}