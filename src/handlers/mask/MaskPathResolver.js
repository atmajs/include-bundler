MaskHandler.PathResolver = class MaskPathResolver extends BasePathResolver {

	constructor () {
		super(...arguments);
	}
	resolve (includeData, resource) {
		var node = {
			path: includeData.url,
			type: MAPPING[includeData.type]
		};
		var module = {
			path: resource.url,
			location: resource.location
		};
		return mask.Module.resolvePath(node, null, null, module);
	}
	accepts (includeData) {
		return includeData.module === 'mask';
	}
};


var MAPPING = { mask: 'mask', load: 'data', js: 'script', css: 'style' };