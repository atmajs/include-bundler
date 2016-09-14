// import ./serializers/BaseSerializer.js
// import ./serializers/MaskSerializer.js
// import ./serializers/StyleSerializer.js
// import ./serializers/ScriptSerializer.js
// import ./serializers/HtmlSerializer.js
// import ./serializers/LoadSerializer.js


HtmlHandler.Builder = class HtmlBuilder extends BaseBuilder {

	constructor (solution) {
		super(...arguments);

		this.serializers = [
			new MaskSerializer(solution, this),
			new StyleSerializer(solution, this),
			new ScriptSerializer(solution, this),
			new HtmlSerializer(solution, this),
			new LoadSerializer(solution, this)
		];
	}

	createModule (outputItem, otherOutputItems) {
		var arr = outputItem.resources.map(resource => {
			return `<script type='text/plain' name='bunder-item' data-bundler-path='${resource.url}'>			
				${resource.content}
			</script>`
		});
		outputItem.resource.content = arr.join('\n');
	}

	buildRoot (resource, dependencies) {
		var $ = this.createDocument(resource.content);

		dependencies.forEach(x => x.url = x.toRelative(resource));

		this.serializers.forEach(x => x.removeDependencies($));
		this.serializers.forEach(x => x.rewrite($, resource));		
		this.serializers.forEach(x => x.serialize($, dependencies));
		this.serializers.forEach(x => x.clean($));

		resource.content = $.html();
	}

	append ($, selector, html) {
		var container = $.root().find(selector).first();
		if (container.length !== 0) {
			container.append(html);
		} else {
			$.root().append(html);
		}
	}
	insertBefore ($, selector, html) {
		var anchor = $.root().find(selector).first();
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
/*
	removeDependencies ($) {
		$('[data-bundler-if]')
			.filter((i, x) => {
				var condition = x.attribs['data-bundler-if'];
				var result = this.solution.opts.varDefs.evaluate(condition);
				return !!result;
			})
			.remove()
			;

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
	*/
};

