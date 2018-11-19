import * as io from 'atma-io'
import { Compiler } from 'atma-io-middleware-base'
import { ModuleFile, ImportNode } from './ModuleFile';
import { Resource } from '../../../class/Resource';
import { Dictionary } from './Dictionary';

let cache: { [id: string]: ModuleFile } = {};
let options = {
    withPathComments: true,
    extension: 'js'
};

export namespace Builder {
    export function clearCache () {
        cache = {};
    }
    export function getModuleFromResource(resource: Resource) {
        if (resource.content == null) {
            throw new Error(`Content is no loaded: ${resource.filename}`);
        }
        let file = new io.File(resource.filename);
        let module = new ModuleFile(resource.content, file);

        if (cache[module.id]) {
            return cache[module.id];
        }

        if (resource.dependencies) {
            let scoped = resource.dependencies.map(dep => {
                //let res = new Resource(dep, resource, resource.solution);
                return Builder.getModuleFromResource(dep.resource);
            });
            let scopedDict = new Dictionary<ModuleFile>();
            scopedDict.add(...scoped);

            module.scoped = scopedDict;
            module.imports = resource.dependencies.map(dep => {
                let imp = dep.import;  
                imp.module = Builder.getModuleFromResource(dep.resource);                
                return imp;
            });            
        }
        
        if (resource.meta.import.exports) {
            module.exports = resource.meta.import.exports;
        }

        return module;
    }
    export function build(root: ModuleFile, options: any) {
        flattern(root);
        distinct(root);
        moveExportAllImprotsToOuter(root);
        return root.toScript();
    }    
}


export function flattern (module: ModuleFile) {
    module
        .imports
        .forEach(x => {
            
            flattern(x.module);
            module.scoped.add(x.module);
        });
}
export function distinct (module: ModuleFile, parents: ModuleFile[] = []) {
    module.outer.removeByFn(x => {
        return parents.some(p => p.outer.has(x));
    });
    module.outer.forEach(x => distinct(x, [ ...parents, module]));

    module.scoped.removeByFn(x => {
        let inOuter = parents.some(p => p.outer.has(x));
        if (inOuter) {
            return true;
        }
        let inScope = parents.some(p => p.scoped.has(x));
        if (inScope) {
            return true;
        }
        for (let i = parents.length - 1; i > -1; i--) {
            let p = parents[i];
            let hasDeep = p.hasDeep(x, module);
            if (hasDeep) {
                for (let i = 0; i < p.outer.arr.length; i++) {
                    let child = p.outer.arr[i];
                    if (child.hasDeep(x)) {
                        p.outer.insert(x, i);
                        return true;
                    }
                }
                for (let i = 0; i < p.scoped.arr.length; i++) {
                    let child = p.scoped.arr[i];
                    if (child.hasDeep(x)) {
                        p.scoped.insert(x, i);
                        return true;
                    }
                }
                throw new Error('O_o: Child not found');
                p.outer.add(x);
                return true;
            }
        }
        
        return false;
    });
    module.scoped.forEach(x => distinct(x, [ ...parents, module]));
}

function moveExportAllImprotsToOuter(module: ModuleFile) {
    module
        .imports
        .filter(imp => imp.exportAll && module.scoped.has(imp.module))
        .forEach(imp => {
            module.outer.add(imp.module);
            module.scoped.remove(imp.module);
        });

    module.scoped.forEach(moveExportAllImprotsToOuter);
}
