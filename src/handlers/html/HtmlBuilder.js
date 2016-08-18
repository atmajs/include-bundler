// import ./serializers/BaseSerializer.js
// import ./serializers/MaskSerializer.js
// import ./serializers/StyleSerializer.js
// import ./serializers/ScriptSerializer.js


HtmlHandler.Builder = class HtmlBuilder extends BaseBuilder {

	constructor (solution) {
		super(...arguments);

		this.serializers = [
			new MaskSerializer(solution, this),
			new ScriptSerializer(solution, this),
			new StyleSerializer(solution, this)
		];
	}

	buildRoot (resource, dependencies) {
		var $ = this.createDocument(resource.content);

		dependencies.forEach(x => x.url = x.toRelative(resource));

		this.serializers.forEach(x => x.removeDependencies($));
		this.serializers.forEach(x => x.rewrite($, resource));		
		this.serializers.forEach(x => x.serialize($, dependencies));

		resource.content = $.html();
	}

	append ($, selector, html) {
		var container = $.root().find(selector);
		if (container.length !== 0) {
			container.append(html);
		} else {
			$.root().append(html);
		}
	}
	insertBefore ($, selector, html) {
		var anchor = $.root().find(selector);
		if (anchor.length !== 0) {
			anchor.before(html);
		} else {
			$.root().append(html);
		}
	}

	accepts (type) {
		return type === 'html';
	}

	createDocument (html) {
		return require('cheerio').load(html);
	}

	removeDependencies ($) {		
		$('script[src]')
			.filter(function(i, x){
				return x.attribs['data-bundler'] !== 'ignore';
			})
			.remove()
			;
			
		$('link[href]')
			.filter(function(i, x){
				return x.attribs['data-bundler'] !== 'ignore';
			})
			.remove()
			;
	}
};

