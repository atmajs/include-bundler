class ScriptReader {
	canHandle (node) {
		var tagName = node.tagName;
		if (tagName == null || tagName.toLowerCase() !== 'script') {
			return false;
		}
		if (node.attr['src'] == null && node.attr['data-bundler-src'] == null) {
			return false;
		}
		if (node.attr['data-bundler'] === 'ignore') {
			return false;
		}
		return true
	}

	read (node, arr) {
		var resource = {
			type: 'js',
			url: node.attr['src'] || node.attr['data-bundler-src'],
			module: 'global'
		};		
		arr.push(resource);
	}
}