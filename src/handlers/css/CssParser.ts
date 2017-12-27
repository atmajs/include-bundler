import { BaseParser } from "../base/BaseParser";
import { async_resolve } from "../../utils/async";
import { IDependency } from "../../class/IDependency";
import { Resource } from "../../class/Resource";

export class CssParser extends BaseParser {

	getDependencies (content: string, ownerResource: Resource) {		
		return async_resolve({ dependencies: [] }) as PromiseLike<IDependency[]>;
	}

	accepts (type) {
		return type === 'css';
	}
};
