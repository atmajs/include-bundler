import { Solution } from "../../class/Solution";
import { BaseHandler } from "./BaseHandler";
import * as assert from 'assert'
import { ResourceInfo } from '../../class/ResourceInfo';

export abstract class BaseParser {

	constructor (public solution: Solution, public handler: BaseHandler) {
		assert(solution instanceof Solution, 'Solution expected for Parser');		
		assert(handler instanceof BaseHandler, 'BaseHandler expected for the Parser');
	}

	getDependencies (content, ownerResource): {dependencies: ResourceInfo[]} | PromiseLike<{dependencies: ResourceInfo[]}> {
		throw new Error('Not implemented');
	}

	accepts (type): boolean {
		throw new Error('Not implemented');
	}
};