import { BaseBuilder } from "../../base/BaseBuilder";
import { Resource } from "../../../class/Resource";
import { OutputItem } from "../../../class/OutputResources";

export abstract class BaseScriptBuilder extends BaseBuilder {

    wrapModule(resource: Resource, outputItem: OutputItem = null, otherOutputItems: OutputItem[] = null): string {
        throw Error('Not implemented');
    }
    buildRoot(resource, dependencies) {
        throw Error('Not implemented');
    }
};

