import { BaseParser } from "../base/BaseParser";
import { async_resolve } from "../../utils/async";
import { Resource } from "../../class/Resource";
import { ResourceInfo } from "../../class/ResourceInfo";

export class CssParser extends BaseParser {

	getDependencies (content: string, ownerResource: Resource) {		
		return async_resolve({ dependencies: [] }) as PromiseLike<ResourceInfo[]>;
	}

	accepts (type) {
		return type === 'css';
	}
};
