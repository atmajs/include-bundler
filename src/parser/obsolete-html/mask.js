var MaskContentReader;
(function(){

	MaskContentReader = class MaskContentReader {
		canHandle (el) {
			var tagName = el.prop('tagName');
			if (tagName == null || tagName.toLowerCase() !== 'script') {
				return false;
			}

			var type = el.attr('type');
			if (type && type.toLowerCase().indexOf('mask') !== -1) {
				return true;
			}
					
			return false;
		}

		read (el, arr) {
			var content = el.text();

			return MaskParser.getDependencies(content, {}).then(list => {
				var resources = MaskParser.flatternDependencies(list);

				resources.forEach(x => x.module = 'global');
				arr.push(...resources);
			});
		}
	};

}());