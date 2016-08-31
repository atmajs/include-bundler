class LoadSerializer extends BaseSerializer {

	constructor (...args) {
		super(...args);
	}

	removeDependencies ($) {
		return void 0;
	}

	serialize ($, resources) {

		var arr = resources.filter(x => x.type === 'load');
		if (arr.length === 0)
			return;

		arr.forEach(x => x.embed = true);
		var html = arr
			.map(resource => {
				return `<script type='text/plain' data-bundler-path='${resource.url}'>			
					${resource.content}
				</script>`
			})
			.join('\n');

		this
			.builder
			.insertBefore($, 'script', html);
	}

	rewrite ($, resource) {
		return void 0;
	}
}