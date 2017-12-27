import { Solution } from "../../class/Solution";
import { BaseHandler } from "./BaseHandler";
import * as assert from 'assert'

export abstract class BaseRewriter {
	constructor (public solution: Solution, public handler: BaseHandler) {
		assert(solution instanceof Solution, 'Solution expected for Rewriter');		
		assert(handler instanceof BaseHandler, 'BaseHandler expected for the Rewriter');
	}
	
	rewritePartial (content, ownerResource): string | void {
		throw Error('Not implemented');
	}

	rewriteResource (resource): void {
		throw Error('Not implemented');
	}

	accepts (type): boolean {
		throw Error('Not implemented');
	}
}