import { BasePathResolver } from "../base/BasePathResolver";

export class HtmlPathResolver extends BasePathResolver {

	resolve (includeData, resource) {
		return (resource.source || resource).cdUrl(includeData.url);
	}
	accepts (includeData) {
		return includeData.module === 'html';
	}
};
