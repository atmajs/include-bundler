import { BasePathResolver } from '../base/BasePathResolver';
export class CssPathResolver extends BasePathResolver {

	accepts (type) {
		return false;
	}
};
