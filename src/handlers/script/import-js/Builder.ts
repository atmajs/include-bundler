import * as io from 'atma-io'
import { ModuleFile, IImporterOptions } from './ModuleFile';
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

        cache[module.id] = module;

        if (resource.dependencies) {
            let scoped = resource.dependencies.map(dep => {
                //let res = new Resource(dep, resource, resource.solution);
                return Builder.getModuleFromResource(dep.resource);
            });
            let scopedDict = new Dictionary<ModuleFile>();
            scopedDict.add(...scoped);

            module.scoped = scopedDict;
            module.imports = resource
                .dependencies
                .filter(x => x.import != null)
                .map(dep => {
                    let imp = dep.import;  
                    imp.module = Builder.getModuleFromResource(dep.resource);                
                    return imp;
                });            
        }
        
        if (resource.meta.import && resource.meta.import.exports) {
            module.exports = resource.meta.import.exports;
        }

        return module;
    }
    export function build(root: ModuleFile, options = new IImporterOptions) {
        
        flattern(root);
        distinct(root);
        moveExportAllImprotsToOuter(root);
        markUsedExports(root);
        return root.toScript([], options);
    }    
}


export function flattern (module: ModuleFile, stack: ModuleFile[] = []) {
    stack.push(module);
    module
        .imports
        .forEach(x => {
            if (stack.includes(x.module) === false) {
                flattern(x.module, stack);
            }            
            module.scoped.add(x.module);
        });
}
export function distinct (module: ModuleFile, index: number = 0, parents: { index: number, module: ModuleFile }[] = [], stack: ModuleFile[] = []) {
    if (stack.includes(module)) {
        return;
    }
    stack.push(module);
    module.outer.forEach((x, i) => distinct(x, i, [ ...parents, { index, module }], stack));
    module.outer.removeByFn(x => {
        return parents.some(p => p.module.outer.has(x));
    });

    module.scoped.forEach((x, i) => distinct(x, i, [ ...parents, { index,  module}], stack));

    module.scoped.removeByFn(x => {
        let inOuter = parents.some(p => p.module.outer.has(x));        
        if (inOuter) {            
            return true;
        }
        let parentsScope = parents.find(p => p.module.scoped.has(x));
        if (parentsScope != null) {
            let ancestor = parentsScope.module;
            let foundIndex = ancestor.scoped.indexOf(x)
            let selfIndex = parentsScope.index;
            if (foundIndex > selfIndex) {
                let x = ancestor.scoped.arr[foundIndex];
                ancestor.scoped.arr.splice(foundIndex, 1);
                ancestor.scoped.arr.splice(selfIndex, 0, x);
            }
            return true;
        }
        for (let i = parents.length - 1; i > -1; i--) {
            let item = parents[i];
            let p = item.module;
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
function markUsedExports (module: ModuleFile) {
    let modules = module.getAllModules();
    let imports = module.getAllImports();

    modules.forEach(module => {
        
        // Search all imports for module
        imports.filter(x => x.module.id === module.id).forEach($import => {
            if ($import.exportAll || $import.refs == null) {
                module.exports.forEach(exp => {
                    if (exp.dependents.includes(module) === false) {
                        exp.dependents.push(module);
                    }
                });
                return;
            }
            $import.refs.forEach(ref => {
                let exp = module.exports.find(x => x.ref === ref);
                if (exp == null) {
                    throw new Error(`Imported reference ${ref} is not exported from ${module.id}`);
                }
                if (exp.dependents.includes(module) === false) {
                    exp.dependents.push(module);
                }
            })
        });
    });
}