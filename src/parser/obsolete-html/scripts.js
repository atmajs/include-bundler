class ScriptReader {
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

	read (el, arr) {
		var resource = {
			type: 'js',
			url: this.getSource(el),
			module: 'global',
			meta: {
				skipDependencies: el.attr('data-bundler-dependencies') === 'ignore'
			}
		};		
		arr.push(resource);
	}

	getSource (el) {
		return el.attr('src') || el.attr('data-bundler-src')
	}
}