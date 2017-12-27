import { Solution } from "../../../class/Solution";
import { BaseTagReader } from "./BaseTagReader";

export class ScriptContentReader extends BaseTagReader {
	

	canHandle (el) {
		var tagName = el.prop('tagName');
		if (tagName == null || tagName.toLowerCase() !== 'script') {
			return false;
		}

		var type = el.attr('type');
		if (type && type.toLowerCase().indexOf('javascript') === -1) {
			return false;
		}

		return true;
	}

	read (el) {
		var content = el.text();
		var handler = this.solution.handlers.find(x => x.parser.accepts('js'));
		return handler.parser.getDependencies(content, {}).then(({dependencies}) => {
			
			return dependencies;
		});
	}
}