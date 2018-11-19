import { BaseBuilder } from "../../base/BaseBuilder";
import { Resource } from "../../../class/Resource";
import { OutputItem } from "../../../class/OutputResources";
import { Solution } from "../../../class/Solution";

export abstract class BaseScriptBuilder extends BaseBuilder {
    /** When a module has no js script, only other resource imports. 
     *  You may want to add some resource registration code
     */
    wrapScriptlessModule (otherOutputItems: OutputItem[]) {
		return '';
	}
	isMainBuilder(solution: Solution): boolean {
		return false;
    }
    
    createModule(outputItem: OutputItem, otherOutputItems: OutputItem[]): void {
		throw new Error("Method not implemented.");
	}
    wrapModule(resource: Resource, outputItem: OutputItem = null, otherOutputItems: OutputItem[] = null): string {
        throw Error('Not implemented');
    }
    buildRoot(resource, dependencies) {
        throw Error('Not implemented');
    }
};

