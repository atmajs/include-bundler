import { BaseScriptBuilder } from "../base/BaseScriptBuilder";
import { OutputItem } from "../../../class/OutputResources";
import { Resource } from "../../../class/Resource";
import { class_Uri } from "atma-utils";
import { path_isRelative } from "../../../utils/path";

export class GlobalJsBuilder extends BaseScriptBuilder {

	wrapModule (resource: Resource, outputItem: OutputItem) {
		let { content, dependencies } = resource;
		let offset = 0;
		
		dependencies && dependencies.filter(x => x.pos != null && path_isRelative(x.url)).forEach(dep => {
			
			let resUrl = new class_Uri(resource.url);
			let resDep = new class_Uri(dep.url);
			
			
			let url = resUrl.combine(resDep as any).toLocalFile();

			let start = dep.pos + offset + 1;
			let c = content[start - 1];
			let end = content.indexOf(c, start);

			let oldLength = end - start;
			let newLength = url.length;

			content = content.substring(0, start) + url + content.substring(end);
			offset += newLength - oldLength;
		})

		return content;
	}
	
	accepts (resource: Resource) {		
		return resource.type === 'js' && resource.getModule() === 'global';
	}
	
};

