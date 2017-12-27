import { Solution } from "../../../class/Solution";
import { BaseTagReader } from "./BaseTagReader";

export class MaskContentReader extends BaseTagReader {
	
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
