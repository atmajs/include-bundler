var _mask;
class MaskContentReader {
	canHandle (node) {
		var tagName = node.tagName;
		if (tagName == null || tagName.toLowerCase() !== 'script') {
			return false;
		}

		var type = node.attr.type;
		if (type && type.toLowerCase().indexOf('mask') !== -1) {
			return true;
		}
				
		return false;
	}

	read (node, arr) {
		var mask = _mask || (_mask = require('maskjs'));
		var content = mask.jmask(node).text();

		return MaskParser.getDependencies(content, {}).then(list => {
			var resources = MaskParser.flatternDependencies(list);			
			arr.push(...resources);
		});
	}
}