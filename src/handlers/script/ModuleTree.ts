import { ModuleFile } from './import-js/ModuleFile';
import { ImportNode } from '../../class/ResourceInfo';
import { class_Uri } from 'atma-utils';
import { io } from '../../global';
import { Dictionary } from './import-js/Dictionary';

export function warnTransModuleChildDependencies (root: ModuleFile) {

    let modules = {};
    root
        .getAllModules()
        .filter(x => /exports\.\w+$/.test(x.path))
        .map(x => x.path)
        .forEach(path => {
            let uri = new class_Uri(path);
            let local = uri.toLocalFile();
            modules[local] = local;
        });
    
    let handled = new Dictionary<ModuleFile>();

    check(root);
    
    function check (m: ModuleFile) {
        if (handled.has(m)) {
            return;
        }
        handled.add(m);

        m.imports && m.imports.forEach(imp => {
            checkSingle(m, imp);
            if (imp.isCyclic !== true) {
                check(imp.module);
            };
        })
    }
    function checkSingle(m: ModuleFile, imp: ImportNode<ModuleFile>) {
        if (secondIsSubPath(m.path, imp.module.path)) {
            return;
        }
        let exports = secondHasCommonExports(m.path, imp.module.path);
        if (exports == null || exports.isSubPath) {
            return;
        }
        console.warn(`Transmodule import ${imp.module.path} in ${m.path}. Should import ${exports.exportPath} `)
    }

    function secondIsSubPath(a: string, b: string) {
        let uriA = new class_Uri(a);
        let uriB = new class_Uri(b);
        
        a = uriA.toLocalDir();
        b = uriB.toLocalFile();
        return b.includes(a);
    }
    function secondHasCommonExports(a: string, b: string): { exportPath: string, isSubPath: boolean } {
        const FILE = 'exports.ts';
        if (b.endsWith(FILE)) {
            return null;
        }

        let uriA = new class_Uri(a);
        let uriB = new class_Uri(b);
        let uriExports = null;
        let dir = new class_Uri(uriB.toLocalDir());
        let prev = dir.toLocalDir();
        while (uriExports == null) {
            let exp = dir.combine(FILE);
            if (io.File.exists(exp)) {
                uriExports = exp;
                break;
            }
            dir = dir.cdUp();
            if (dir.toLocalDir() === prev) {
                break;
            }
            prev = dir.toLocalDir();
        }
        if (uriExports == null) {
            return null;
        }
        let local = uriExports.toLocalFile();
        if (local in modules === false) {
            return null;
        }
        return {
            exportPath: local,
            isSubPath: secondIsSubPath(local, a)
        }        
    }
}