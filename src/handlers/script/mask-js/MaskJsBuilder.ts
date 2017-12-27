import { BaseScriptBuilder } from "../base/BaseScriptBuilder";

export class MaskJsBuilder extends BaseScriptBuilder {

	wrapModule (resource) {
		return Templates
			.module
			.replace('%URL%', () => resource.url)
			.replace('%CONTENT%', () => resource.content);
	}
	
	accepts (resource) {		
		return resource.type === 'js' && resource.getModule() === 'mask';
	}
	
};

var Templates = {
	module: `
	var module = { exports: {} };
	
	%CONTENT%

	;(function(exports, Module){
		var endpoint = new Module.Endpoint('%URL%', 'script');
		Module.registerModule(exports, endpoint);
	}(module.exports, mask.Module));
`
}