class ScriptLinkReader {
	canHandle (el) {
		var tagName = el.prop('tagName');
		if (tagName == null || tagName.toLowerCase() !== 'script') {
			return false;
		}
		if (this.getSource(el) == null) {
			return false;
		}
		if (el.attr('data-bundler') === 'ignore') {
			return false;
		}
		return true
	}

	read (el) {
		var resource = {
			type: 'js',
			url: this.getSource(el),
			module: 'global'
		};		
		return [ resource ];
	}

	getSource (el) {
		return el.attr('src') || el.attr('data-bundler-src')
	}
}