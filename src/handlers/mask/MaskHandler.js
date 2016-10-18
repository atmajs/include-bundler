MaskHandler = class MaskHandler extends BaseHandler {
	constructor () {
		super(...arguments);
	}

	resolvePath (includeData, parent) {
		var endpoint = {
			path: includeData.url
		};
		return mask.Module.resolvePath(endpoint, parent, parent, parent);
	}

	accepts (type) {
		return type === 'mask';
	}
	
};
