ScriptHandler = class ScriptHandler extends BaseHandler {
	constructor () {
		super(...arguments);
	}
	accepts (type) {
		return type === 'js';
	}
};
