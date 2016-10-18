CssHandler = class CssHandler extends BaseHandler {
	constructor () {
		super(...arguments);
	}
	accepts (type) {
		return type === 'css';
	}
};
