import * as io from 'atma-io'
import { u_makeIndent, u_getNewLine } from './utils'
import { Dictionary } from './Dictionary';
import { String } from './String';
import { ImportNode, ExportNode } from '../../../class/ResourceInfo';

declare type File = InstanceType<typeof io.File>;

export class IImporterOptions {
    removeUnusedExports?: boolean = true
    wrapper?: 'iif' | 'script' | 'custom' = 'iif'
}
export class ModuleFile {
    id: string
    path: string
    outer = new Dictionary<ModuleFile>()
    scoped = new Dictionary<ModuleFile>()

    imports: ImportNode[] = []
    exports: ExportNode[] = []
    
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
    getAllImports (): ImportNode[] {
        function read (module: ModuleFile, stack: ModuleFile[] = []): ImportNode[] {
            if (stack.includes(module) || module.imports == null) {
                return [];
            }
            stack.push(module);
            
            let arr = [...module.imports];
            module.imports.forEach(x => arr.push(...read(x.module, stack)));
            return arr;
        }
        return read(this);
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
            }
        });
        // remove imports
        this.imports.reverse().forEach(x => {
            content = String.replace(content, x.position, x.length, '');
        });
        
        let externalRefs = '';
        if (this.exports.length > 0) {
            externalRefs = this
                .exports
                .reverse()
                .filter(x => {
                    if (options.removeUnusedExports === false) {
                        return true;
                    }
                    if (x.dependents.length === 0) {
                        console.warn(`Module ${this.id} has unused export ${x.ref}`);
                        return false;
                    }
                    return true;
                })
                .filter(x => {
                    let exportInOuter = parents.some(p => p.exports.some(e => e.ref == x.ref));
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
    
        let indentScopedContent = `${u_makeIndent(scopedContent || '', '    ', io)}`;
        let indentContent = `${u_makeIndent(content, '    ', io)}`; 
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
}
