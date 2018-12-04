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
        markCyclicImports(root);
        moveImportsToScoped(root);
        removeNestedScopedModules(root);
        moveToCommonParent(root);
        moveExportAllImprotsToOuter(root);
        distinctOuter(root);
        markUsedExports(root);

        distinct(root);
        
        return root.toScript([], options);
    }    
}


export function moveImportsToScoped (module: ModuleFile, handled = new Dictionary<ModuleFile>()) {
    module
        .imports
        .forEach(x => {
            if (x.isCyclic === true || handled.has(x.module)) {
                return;
            }
            handled.add(x.module);

            moveImportsToScoped(x.module, handled);  
            module.scoped.add(x.module);
        });
}

function removeNestedScopedModules (module: ModuleFile, parent: ModuleFile = null, parents: { module: ModuleFile, child: ModuleFile }[] = [], handled = new Dictionary<ModuleFile>()) {
    if (handled.has(module)) {
        return;
    }
    handled.add(module);

    module.scoped.removeByFn(x => {
        let inOuter = parents.some(p => p.module.outer.has(x));        
        if (inOuter) {            
            return true;
        }
        let parentsScope = parents.find(p => p.module.scoped.has(x));
        if (parentsScope != null) {
            let ancestor = parentsScope.module;
            let foundIndex = ancestor.scoped.indexOf(x)
            let selfIndex = ancestor.scoped.indexOf(parentsScope.child);
            if (foundIndex === -1 || selfIndex === -1) {
                throw new Error(`0_o. Parents conflict. Self: ${selfIndex}. Found: ${foundIndex}`);
            }
            if (foundIndex > selfIndex) {
                let x = ancestor.scoped.arr[foundIndex];
                ancestor.scoped.arr.splice(foundIndex, 1);
                ancestor.scoped.arr.splice(selfIndex, 0, x);
            }
            return true;
        }
    });
    module.scoped.forEach(x => removeNestedScopedModules(x, module, [...parents, { child: x, module: module}], handled));
}
function moveToCommonParent (module: ModuleFile, parent: ModuleFile = null, parents: { module: ModuleFile, child: ModuleFile }[] = [], handled = new Dictionary<ModuleFile>()) {
    if (handled.has(module)) {
        return;
    }
    handled.add(module);

    module.scoped.removeByFn(x => {
        
        let topCommonParent: ModuleFile;
        for (let i = parents.length - 1; i > -1; i--) {
            let item = parents[i];
            let p = item.module;
            let hasDeep = p.hasDeep(x, item.child);
            if (hasDeep) {
                topCommonParent = p;
            }
        }
        if (topCommonParent) {
            for (let i = 0; i < topCommonParent.outer.arr.length; i++) {
                let child = topCommonParent.outer.arr[i];
                if (child.hasDeep(x)) {
                    topCommonParent.outer.insert(x, i);
                    return true;
                }
            }
            for (let i = 0; i < topCommonParent.scoped.arr.length; i++) {
                let child = topCommonParent.scoped.arr[i];
                if (child.hasDeep(x)) {
                    topCommonParent.scoped.insert(x, i);
                    return true;
                }
            }
            throw new Error('O_o: Child not found');            
            return true;
        }
        
        return false;
    });

    module.scoped.forEach((x, i) => moveToCommonParent(x, module, [ ...parents, { child: x,  module}], handled));

    
}
function distinctOuter (module: ModuleFile, index: number = 0, parents: { index: number, module: ModuleFile }[] = [], handled = new Dictionary<ModuleFile>()) {
    if (handled.has(module)) {
        return;
    }
    handled.add(module);

    module.outer.forEach((x, i) => distinctOuter(x, i, [ ...parents, { index, module }], handled));
    module.outer.removeByFn(x => {
        return parents.some(p => p.module.outer.has(x));
    });
}


function distinct (module: ModuleFile, handled = new Dictionary<ModuleFile>()) {
    if (handled.has(module)) {
        return;
    }
    handled.add(module);

    module.outer.removeByFn(x => {
        if (handled.has(x)) {
            return true;
        }
        distinct(x, handled);
        return false;
    });
    module.scoped.removeByFn(x => {
        if (handled.has(x)) {
            console.log('Remove ', x.id);
            return true;
        }
        distinct(x, handled);
        return false;
    });
}


function moveExportAllImprotsToOuter(module: ModuleFile, handled = new Dictionary<ModuleFile>()) {
    if (handled.has(module)) {
        return;
    }
    handled.add(module);
    module
        .imports
        .filter(imp => imp.exportAll && module.scoped.has(imp.module) && imp.isCyclic !== true)
        .forEach(imp => {
            module.outer.add(imp.module);
            module.scoped.remove(imp.module);
        });

    module.scoped.forEach(m => {
        moveExportAllImprotsToOuter(m, handled)
    });
}
function markUsedExports (module: ModuleFile) {
    let modules = module.getAllModules();
    let imports = ModuleFile.getAllImports(modules);

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
                let exp = module.exports.find(x => x.hasExport(ref));
                if (exp == null) {
                    throw new Error(`Imported reference ${ref} in ${ $import.parent.id } is not exported from ${module.id}`);
                }
                if (exp.dependents.includes(module) === false) {
                    exp.dependents.push(module);
                }
            })
        });
    });
}

function markCyclicImports (module: ModuleFile, parentIds = {}, handled = new Dictionary<ModuleFile>()) {
    if (handled.has(module)) {
        return;
    }
    handled.add(module);

    let hash = { ...parentIds, [module.id]: 1};
    module.imports.forEach(imp => {
        if (imp.module.id in hash) {
            imp.isCyclic = true;
            return;
        }
        markCyclicImports(imp.module, hash, handled);
    });
}