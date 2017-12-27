import * as assert from 'assert'
import { Solution } from '../../class/Solution'
import { BaseHandler } from './BaseHandler';
import { Resource } from '../../class/Resource';

export abstract class BaseBuilder {
	constructor (public solution: Solution, public handler: BaseHandler) {
		assert(solution instanceof Solution, 'Solution expected for the Builder');
		assert(handler instanceof BaseHandler, 'BaseHandler expected for the Builder');
	}
	
	buildPage (resource: Resource, dependencies: Resource[]): void {
		throw Error('Not implemented');
	}
	
	accepts (type): boolean {
		throw Error('Not implemented');
	}
}