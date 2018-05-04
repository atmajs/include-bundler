import * as assert from 'assert'
import { Solution } from '../../class/Solution'
import { BaseHandler } from './BaseHandler';
import { Resource } from '../../class/Resource';
import { OutputItem } from '../../class/OutputResources';

export abstract class BaseBuilder {
	constructor (public solution: Solution, public handler: BaseHandler) {
		assert(solution instanceof Solution, 'Solution expected for the Builder');
		assert(handler instanceof BaseHandler, 'BaseHandler expected for the Builder');
	}
	
	buildPage (resource: Resource, dependencies: Resource[]): void {
		throw Error('Not implemented');
	}

	abstract accepts (type): boolean;
	abstract buildRoot (resource: Resource, dependencies: Resource[], solution?: Solution): void
	abstract createModule (outputItem: OutputItem, otherOutputItems: OutputItem[]): void
	
}