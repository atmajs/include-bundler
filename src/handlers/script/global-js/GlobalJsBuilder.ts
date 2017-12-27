import { BaseScriptBuilder } from "../base/BaseScriptBuilder";

export class GlobalJsBuilder extends BaseScriptBuilder {

	wrapModule (resource) {
		return resource.content;
	}
	
	accepts (resource) {		
		return resource.type === 'js' && resource.getModule() === 'global';
	}
	
};

