import { Resource } from './Resource';

export type ResourceType = 'js' | 'mask' | 'css' | 'html' | 'data' | 'asset' | 'load';

export class ResourceMeta {
    hasPages?: boolean
    skipDependencies?: boolean
    includejs?: {
        hasIncludes: boolean,
        hasExports: boolean,
        hasResponseObject: boolean,
        responseAccessors: any
    }
    import?: {
        exports?: ExportNode[]
        imports?: ImportNode[],
        import?: ImportNode
    }
}

export class ResourceInfo {
    type: ResourceType
	url?: string

    page?: string
    bundle?: string
    module?: string
    pos?: number
    length?: number
    
    content?: string
    namespace?: string
	
	dependencies?: ResourceInfo[] = []
    meta?: ResourceMeta
    resource?: Resource
    import?: ImportNode
    
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

export class ImportNode<T = any> {
    position: number
    length: number
    str: string
    path: string
    refs: string[]
    type: 'full' | 'refs'
    scopeLess: boolean
    module: T
    exportAll: boolean;
}
export class ExportNode {
    position: number
    length: number
    str: string
    ref: string
    type: 'const' | 'function'
}
