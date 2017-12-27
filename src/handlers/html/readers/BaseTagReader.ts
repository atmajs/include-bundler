import { Solution } from '../../../class/Solution';
import { IDependency } from '../../../class/IDependency';

export abstract class BaseTagReader {
	constructor (public solution: Solution) {
		
	}

	canHandle (el): boolean {
		throw Error('Not implemented')
	}

	read (el): IDependency[] | PromiseLike<IDependency[]> {
		throw Error('Not implemented')
	}
}