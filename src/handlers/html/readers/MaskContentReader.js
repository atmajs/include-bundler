var MaskContentReader;
(function(){

	MaskContentReader = class MaskContentReader {
		constructor (solution) {
			this.solution = solution;
		}

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

		read (el) {
			var content = el.text();
			var handler = this.solution.handlers.find(x => x.parser.accepts('mask'));
			return handler.parser.getDependencies(content, {}).then(({dependencies}) => {
				
				//dependencies.forEach(x => x.module = 'global');
				return dependencies;
			});
		}
	};

}());