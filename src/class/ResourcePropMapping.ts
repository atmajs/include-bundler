import { Resource } from "./Resource";

export type ResourceMappingMatch = {	
	[P in keyof Resource]?: Resource[P] | ((value: Resource[P]) => boolean)
}
export type ResourceMappingTransform = {	
	[P in keyof Resource]?:  Resource[P] | ((value: Resource[P]) => Resource[P])
}

export class ResourcePropMapping {
	constructor (public resA: ResourceMappingMatch, public resB: ResourceMappingTransform) {
		
	}

	map (resource: Resource) {
		var match = true;
		for(var key in this.resA) {
			var val = this.resA[key];
			if (val == null)
				continue;

			var currentVal = resource[key];

			if (typeof val === 'function') {
				match = val(currentVal);								
			}
			if (val instanceof RegExp) {
				match = val.exec(currentVal) != null;
			}
			if (typeof val === 'string' || typeof val === 'number') {
				match = val === currentVal;
			}

			if (match == false) 
				return resource;
		}

		var clone = resource.clone();
		for(var key in this.resB) {
			var val = this.resB[key];
			var currentVal = resource[key];

			if (typeof val === 'function') {
				clone[key] = val(currentVal, resource);
				continue;
			}
			if (typeof val === 'string' || typeof val === 'boolean') {
				clone[key] = val;
				continue;
			}
		}

		return clone;
	}
}