import * as io from 'atma-io'
import { u_makeIndent, u_getNewLine } from './utils'
import { Dictionary } from './Dictionary';
import { String } from './String';
import { ImportNode, ExportNode } from '../../../class/ResourceInfo';

declare type File = InstanceType<typeof io.File>;

export class IImporterOptions {
    removeUnusedExports?: boolean = true
    wrapper?: 'iif' | 'script' | 'custom' = 'iif'
    lazy?: {
        [rgx: string]: string[]
    } = null
}
export class ModuleFile {
    id: string
    path: string
    outer = new Dictionary<ModuleFile>()
    scoped = new Dictionary<ModuleFile>()
    
    imports: ImportNode[] = []
    exports: ExportNode[] = []

    scopedVars: ExportNode[] = []
    
    constructor (public content: string, public file: File) {
        this.id = file.uri.toLocalFile();
        this.path = file.uri.toRelativeString(io.env.currentDir);
    }
    
    hasDeep (x: ModuleFile, ignore?: ModuleFile, hash: Dictionary<ModuleFile> = new Dictionary<ModuleFile>()) {
        function check (arr: ModuleFile[]) {
            for (let i = 0; i < arr.length; i++) {
                let module = arr[i];
                if (module == ignore || hash.has(module)) {
                    continue;
                }
                hash.add(module);
    
                let has = module.hasDeep(x, ignore, hash);
                if (has) {
                    return true;
                }
            }
            return false;
        }
        if (this.id === x.id) {
            return true;
        }

        return check(this.outer.arr) || check(this.scoped.arr);
    }
    getAllModules (): ModuleFile[] {
        let dict = new Dictionary<ModuleFile> ();

        function add (module: ModuleFile) {
            if (dict.has(module)) {
                return;
            }
            dict.add(module);
            module.outer.forEach(add);
            module.scoped.forEach(add);
        }
        add(this);
        return dict.arr;
    }
    static getAllImports (modules: ModuleFile[]): ImportNode[] {

        let arr = [];
        modules.filter(x => x.imports != null).forEach(x => arr.push(...x.imports));
        return arr;

        // function read (module: ModuleFile, stack: ModuleFile[] = []): ImportNode[] {
        //     if (stack.includes(module) || module.imports == null) {
        //         return [];
        //     }
        //     stack.push(module);
            
        //     let arr = [...module.imports];
        //     module.imports.forEach(x => arr.push(...read(x.module, stack)));
        //     return arr;
        // }
        // return read(this);
    }

    toScript (parents: ModuleFile[] = [], options: IImporterOptions, indent: string = ''): string {
        let newLine = u_getNewLine(this.content, io);
        let outerContent = this
            .outer
            .arr
            .map(x => x.toScript([...parents, this], options))
            .map(x => x.replace(/[\s]*$/, ''))
            .join(newLine);
        
        let scopedContent = this
            .scoped
            .arr
            .map(x => x.toScript([...parents, this], options))
            .map(x => x.replace(/[\s]*$/, ''))
            .join(newLine);
        
        let scopedRefs = this
            .scopedVars
            .filter(x => !options.removeUnusedExports || x.dependents.length > 0) 
            .map(x => `    ${x.ref}`)
            .join(`,${newLine}`)
            ;
        
        if (scopedRefs) {
            scopedRefs = String.replace(scopedRefs, 0, 3, 'var');
            scopedRefs += ';';
            scopedContent = scopedRefs + newLine + scopedContent;
        }
        
        let content = this.content;
        
        // normalize exports
        this.exports.reverse().forEach(x => {
            if (options.removeUnusedExports && x.dependents.length === 0) {
                let str = content.substring(x.position, x.position + x.length);
                str = str.replace(/\s*export\s*/g, '');
                content = String.replace(content, x.position, x.length, str);
                return;
            }
            switch (x.type) {
                case 'ref': 
                    content = String.replace(content, x.position, x.length, x.ref);
                    break;
                case 'function': 
                    content = String.replace(content, x.position, x.length, `${x.ref} = function `);
                    break;
                case 'named': 
                    content = String.replace(content, x.position, x.length, '');
                    break;
                case 'scoped':
                    if (x.length > 0) {
                        content = String.replace(content, x.position, x.length, '');
                    }
                    break;
            }
        });
        // remove imports
        this.imports.reverse().forEach(x => {
            content = String.replace(content, x.position, x.length, '');
        });
        
        // create var declaration
        let externalRefs = '';
        if (this.exports.length > 0) {
            externalRefs = this
                .exports
                .reverse()
                .filter(x => {
                    if (x.builder.movedToOuter) {
                        return false;
                    }
                    if (options.removeUnusedExports === false) {
                        return true;
                    }
                    if (x.dependents.length === 0) {
                        console.warn(`Module ${this.id} has unused export ${x.ref}`);
                        return false;
                    }                    
                    return true;
                })
                .map(x => {
                    /** Remove local scoped var declaration and make it global scoped */
                    if (x.type === 'scoped') {
                        let rgx = new RegExp(`\\b(var|let|const|function)\\s+${x.ref}`);
                        content = content.replace(rgx, x.ref);
                    }
                    return x;
                })
                .filter(x => {
                    let exportInOuter = parents
                        .some(p => {
                            let parentsExport = p.exports.find(e => e.hasExport(x.ref));
                            if (parentsExport == null) {
                                return false;
                            }
                            if (options.removeUnusedExports && parentsExport.dependents.length === 0) {
                                return false;
                            }
                            return true;
                        });
                    return exportInOuter === false
                })                
                .map(x => `    ${x.ref}`)
                .join(`,${newLine}`)
                ;
            if (externalRefs.length > 0) {
                externalRefs = String.replace(externalRefs, 0, 3, 'var');
                externalRefs += ';';
            }
        }
        
        const SPACE = '\t'
        let indentScopedContent = `${u_makeIndent(scopedContent || '', SPACE, io)}`;
        let indentContent = `${u_makeIndent(content, SPACE, io)}`; 
        let scopeLess = parents.length === 0 && options.wrapper !== 'iif';        
        
        content = [
            `${outerContent}` || '',
            `${externalRefs}` || '',
            !scopeLess && (indentScopedContent || indentContent) ? `(function(){` : '',
            indentScopedContent,
            indentContent,
            !scopeLess && (indentScopedContent || indentContent) ? `}());` : ''
        ]
        .filter(x => !!x)
        .join(newLine);

        return u_makeIndent(content, indent, io);
    }

    toImportsJson () {
        function toJSON (module: ModuleFile) {
            var json = {
                id: module.id,
                imports: null
            };
            if (module.imports) {
                json.imports = module.imports.map(x => toJSON(x.module));
            }
            return json;
        }
        
        return toJSON(this);
    }
    toModulesJson () {
        function toJSON (module: ModuleFile) {            
            let json = {
                id: module.id,
                outer: module.outer.arr.map(x => toJSON(x)),
                scoped: module.scoped.arr.map(x => toJSON(x))
            };
            if (json.outer.length === 0) {
                delete json.outer;
            }
            if (json.scoped.length === 0) {
                delete json.scoped;
            }
            
            return json;
        }
        
        return toJSON(this);
    }
}
