import { IDependency } from '../../class/IDependency';
import { Solution } from "../../class/Solution";
import { BaseHandler } from "./BaseHandler";
import * as assert from 'assert'

export abstract class BaseParser {

	constructor (public solution: Solution, public handler: BaseHandler) {
		assert(solution instanceof Solution, 'Solution expected for Parser');		
		assert(handler instanceof BaseHandler, 'BaseHandler expected for the Parser');
	}

	getDependencies (content, ownerResource): {dependencies: IDependency[]} | PromiseLike<{dependencies: IDependency[]}> {
		throw new Error('Not implemented');
	}

	accepts (type): boolean {
		throw new Error('Not implemented');
	}
};