import { Resource } from './Resource';
import { ModuleFile } from '../handlers/script/import-js/ModuleFile';

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

export class ImportNode<T = ModuleFile> {
    position: number
    length: number
    str: string
    path: string
    refs: string[]
    type: 'full' | 'refs' | 'exportAll' | 'exportRefs'
    scopeLess: boolean
    module: T
    parent: T
    exportAll: boolean;
    exportRefs: boolean;
    isCyclic: boolean;
    isLazy: boolean
}
export class ExportNode {
    position: number
    length: number
    str: string
    ref: string
    refs: string[]
    type: 'ref' | 'function' | 'named' | 'scoped'
    dependents: ModuleFile[] = []

    builder = { movedToOuter: false }

    clone () {
        var node = new ExportNode();
        node.position = this.position;
        node.length = this.length;
        node.str = this.str;
        node.ref = this.ref;
        node.refs = this.refs;
        node.type = this.type;
        node.dependents = this.dependents;
        return node;
    }

    hasExport (ref: string) {
        if (this.ref === ref) {
            return true;
        }
        if (this.refs != null && this.refs.includes(ref)) {
            return true;
        }
        return false;
    }
}
