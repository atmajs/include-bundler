class ScriptSerializer extends BaseSerializer {

	constructor (...args) {
		super(...args);
	}
	
	removeDependencies ($) {
		$('script[src]')
			.filter(function(i, x){
				return x.attribs['data-bundler'] !== 'ignore';
			})
			.remove()
			;
	}

	serialize ($, resources) {
		var arr = resources.filter(x => x.type === 'js');
		if (arr.length === 0)
			return;

		var html = arr
			.map(x => `<script src='${x.url}' type='text/javascript'></script>`)
			.join('\n');

		this.builder.append($, 'body', html);
	}

	rewrite ($, resource) {
		return void 0;
	}
}