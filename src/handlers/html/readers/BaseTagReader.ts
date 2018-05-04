import { Solution } from '../../../class/Solution';
import { ResourceInfo } from '../../../class/ResourceInfo';

export abstract class BaseTagReader {
	constructor (public solution: Solution) {
		
	}

	canHandle (el): boolean {
		throw Error('Not implemented')
	}

	read (el): ResourceInfo[] | PromiseLike<ResourceInfo[]> {
		throw Error('Not implemented')
	}
}