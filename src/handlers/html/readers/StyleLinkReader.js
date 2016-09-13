class StyleLinkReader {
	canHandle (el) {
		var tagName = el.prop('tagName');
		if (tagName == null || tagName.toLowerCase() !== 'link') {
			return false;
		}
		if (el.attr('href') == null) {
			return false;
		}

		var rel = el.attr('rel');
		if (rel == null || rel.toLowerCase() !== 'stylesheet') 
			return false;

		return true
	}

	read (el) {
		var resource = {
			type: 'css',
			url: el.attr('href'),
			module: 'global',
			bundle: el.attr('data-bundler-bundle')
		};
		return [resource];
	}
}