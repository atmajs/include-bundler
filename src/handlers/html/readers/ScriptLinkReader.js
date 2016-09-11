class ScriptLinkReader {
	canHandle (el) {
		var tagName = el.prop('tagName');
		if (tagName == null || tagName.toLowerCase() !== 'script') {
			return false;
		}
		if (this.getSource(el) == null) {
			return false;
		}		
		var type = el.attr('type');
		if (type && type.toLowerCase().indexOf('javascript') === -1) {
			return false;
		}						
		return true
	}

	read (el) {
		var resource = {
			type: 'js',
			url: this.getSource(el),
			module: 'global',
			bundle: el.attr('data-bundler-bundle'),
			meta: {
				skipDependencies: el.attr('data-bundler-dependencies') === 'ignore'
			}
		};		
		return [ resource ];
	}

	getSource (el) {
		return el.attr('src') || el.attr('data-bundler-src')
	}
}