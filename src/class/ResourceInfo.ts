export type ResourceType = 'js' | 'mask' | 'css' | 'html' | 'data' | 'asset';

export class ResourceMeta {
    hasPages?: boolean
    skipDependencies?: boolean
    includejs?: {
        hasIncludes: boolean,
        hasExports: boolean,
        hasResponseObject: boolean,
        responseAccessors: any
    }
}

export class ResourceInfo {
    type: ResourceType
	url?: string

    page?: string
    bundle?: string
    module?: string
    pos?: number
    
    content?: string
    namespace?: string
	
	dependencies?: ResourceInfo[] = []
    meta?: ResourceMeta
	
	static merge(...infos: ResourceInfo[]) {		
		const result = new ResourceInfo;

		infos.forEach(x => {

            if (x.dependencies) {
                if (result.dependencies == null) {
                    result.dependencies = [];
                }
                result.dependencies.push( ... x.dependencies);
            }
            if (x.meta) {
                if (result.meta == null) {
                    result.meta = {};
                }
                Object.assign(result.meta, x.meta);
            }			
		});
		return result;
	}
}