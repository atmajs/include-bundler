class StyleReader {
	canHandle (node) {
		var tagName = node.tagName;
		if (tagName == null || tagName.toLowerCase() !== 'link') {
			return false;
		}
		if (node.attr['href'] == null) {
			return false;
		}

		var rel = node.attr['rel'];
		if (rel == null || rel.toLowerCase() !== 'stylesheet') 
			return false;

		return true
	}

	read (node, arr) {
		var resource = {
			type: 'css',
			url: node.attr.href
		};
		arr.push(resource);
	}
}