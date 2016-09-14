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
			var html = `<script src='${resource.url}' type='text/javascript'></script>`; 

			var inserted = this._insertDependency($, resource, html);
			if (inserted === false) {
				this.builder.append($, 'body', html);
				return;
			}
		});
	}

	rewrite ($, resource) {
		$('script[data-bundler="ignore"]')
			.each((i, x) => {
				var path = x.attribs['src'];
				if (path_withProtocol(path))
					return;

				var resource = new Resource({url: path}, resource, this.solution);
				var url = resource.toTarget(this.solution, { targetType: 'static' }).url;

				x.attribs['src'] = url;
			})
	}

	clean ($) {
		
	}
}