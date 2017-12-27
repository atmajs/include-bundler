import { CommonJsHandler } from './common-js/CommonJsHandler';
import { BasePathResolver } from '../base/BasePathResolver';
export class ScriptPathResolver extends BasePathResolver {

	resolvers = [
		new CommonJsHandler.PathResolver(this.solution, this.handler)
	]
	
	accepts (includeData) {
		if (includeData.type !== 'js') {
			return false;
		}
		var resolver = this._getInnerResolver(includeData);
		return resolver != null;
	}

	resolve (includeData, parentResource) {
		var resolver = this._getInnerResolver(includeData);		
		return resolver.resolve(includeData, parentResource);
	}

	_getInnerResolver (includeData) {
		return this.resolvers.find(x => x.accepts(includeData));
	}
};
