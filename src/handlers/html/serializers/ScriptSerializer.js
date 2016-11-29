class ScriptSerializer extends BaseSerializer {

	constructor (...args) {
		super(...args);
	}
	
	removeDependencies ($) {
		$('script[src]')
			.filter(function(i, x){
				return x.attribs['data-bundler'] !== 'ignore';
			})
			.each((i, el) => {
				this._replaceWithPlaceholder($(el), 'js');
			})
			;
	}

	serialize ($, resources) {
		var arr = resources.filter(x => x.type === 'js');
		if (arr.length === 0)
			return;

		arr.forEach(resource => {
			var url = resource.url;
			if (this.solution.opts.version) {
				url += '?v=' + this.solution.opts.version;
			}
			var html = `<script src='${url}' type='text/javascript'></script>`; 

			var inserted = this._insertDependency($, resource, html);
			if (inserted === false) {
				this.builder.append($, 'body', html);
				return;
			}
		});
	}

	rewrite ($, resource) {
		this._inlineResources(
			$,
			'script[src][data-bundler-content="inline"]',
			'src',
			content => `<script type='text/javascript'>${content}</script>`	
		);
		this._rewriteStaticUrls(
			resource,
			$,
			'script[data-bundler="ignore"]',
			'src'
		);
	}

	clean ($) {
		
	}
}