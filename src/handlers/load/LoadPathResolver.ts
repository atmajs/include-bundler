import { BasePathResolver } from "../base/BasePathResolver";

export class LoadPathResolver extends BasePathResolver {
	
	accepts (type) {
		return false;
	}
};
