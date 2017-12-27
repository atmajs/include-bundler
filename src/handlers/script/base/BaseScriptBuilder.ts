import { BaseBuilder } from "../../base/BaseBuilder";
import { Resource } from "../../../class/Resource";

export abstract class BaseScriptBuilder extends BaseBuilder {

    wrapModule(resource: Resource, outputItem = null, otherOutputItems = null): string {
        throw Error('Not implemented');
    }
    buildRoot(resource, dependencies) {
        throw Error('Not implemented');
    }
};

