import { BaseParser } from "../base/BaseParser";

export class LoadParser extends BaseParser {

	
	getDependencies (content, ownerResource) {
		return null;
	}

	accepts (resource) {
		return false;
	}
};
