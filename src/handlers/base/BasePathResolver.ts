import { Solution } from "../../class/Solution";
import { BaseHandler } from "./BaseHandler";

export abstract class BasePathResolver {
	constructor (public solution: Solution, public handler: BaseHandler) {
		
	}
	
	resolve (includeData, resource): string {
		throw Error('Not implemented');
	}

	accepts (type): boolean {
		throw Error('Not implemented');
	}
}