import { ModuleFile } from './ModuleFile';
import * as io from 'atma-io'
import { ImportNode, ExportNode } from '../../../class/ResourceInfo';

declare type File = InstanceType<typeof io.File>;

let Rgx = {
    check: /^[ \t]*((import((\s*\{[^\}]+}\s*from)|\s+from|\s+["']))|(export\s+(const|let|var|function|\*)))/m,
    Imports: {
        full: {
            rgx: /^[ \t]*import\s*['"]([^'"]+)['"][\t ;]*[\r\n]{0,2}/gm,
            map (match: RegExpMatchArray) {
                let $import = new ImportNode();
                $import.position = match.index;
                $import.length = match[0].length;
                $import.type = 'full';
                $import.path = match[1];
                return $import;
            }
        },
        refs: {
            rgx: /^[ \t]*import\s*\{([^}]+)}\s*from\s*['"]([^'"]+)['"][\t ;]*[\r\n]{0,2}/gm,
            map (match: RegExpMatchArray) {
                let $import = new ImportNode();
                $import.position = match.index;
                $import.length = match[0].length;
                $import.type = 'refs';
                $import.path = match[2];
                $import.refs = match[1].split(',').map(x => x.trim());
                return $import;
            }
        },
        exportAll: {
            rgx: /^[ \t]*export\s+\*\s+from\s*['"]([^'"]+)['"][\t ;]*[\r\n]{0,2}/gm,
            map (match: RegExpMatchArray) {
                let $import = new ImportNode();
                $import.position = match.index;
                $import.length = match[0].length;
                $import.type = 'exportAll';
                $import.path = match[1];                
                $import.exportAll = true;
                return $import;
            }
        },
        exportRefs: {
            rgx: /^[ \t]*export\s*\{([^}]+)}\s*from\s*['"]([^'"]+)['"][\t ;]*[\r\n]{0,2}/gm,
            map (match: RegExpMatchArray) {
                let $import = new ImportNode();
                $import.position = match.index;
                $import.length = match[0].length;
                $import.type = 'exportRefs';
                $import.path = match[2];
                $import.refs = match[1].split(',').map(x => x.trim());
                $import.exportRefs = true;
                return $import;
            }
        }
    },
    Exports: {
        ref: {
            rgx: /^[ \t]*export\s*(const|let|var)\s+([\w\d_$]+)(?=\s*[^;])/gm,
            map (match: RegExpMatchArray) {
                let $export = new ExportNode();
                $export.position = match.index;
                $export.length = match[0].length;
                $export.type = 'ref';
                $export.ref = match[2];
                return $export;
            }
        },
        named: {
            rgx: /^[ \t]*export\s*(const|let|var)\s+([\w\d_$]+)(?=\s*[;])/gm,
            map (match: RegExpMatchArray) {
                let $export = new ExportNode();
                $export.position = match.index;
                $export.length = match[0].length;
                $export.type = 'named';
                $export.ref = match[2];
                return $export;
            }
        },
        function: {
            rgx: /^[ \t]*export\s*function\s+([\w\d_$]+)/gm,
            map (match: RegExpMatchArray) {
                let $export = new ExportNode();
                $export.position = match.index;
                $export.length = match[0].length;
                $export.type = 'function';
                $export.ref = match[1];
                return $export;
            }
        }
    }
}

export class Parser {
    static supports (content: string) {
        return Rgx.check.test(content);
    }
    static parse (content: string, file: File): ModuleFile {
        let module = new ModuleFile(content, file);
        if (Parser.supports(content) === false) {
            return module;
        }
        for (let key in Rgx.Imports) {
            let x = <{rgx: RegExp, map: (...args) => ImportNode}> Rgx.Imports[key];
            x.rgx.lastIndex = 0;            
            for (let match = x.rgx.exec(content); match != null; match = x.rgx.exec(content)) {
                module.imports.push(x.map(match, content))
            }
        }
        for (let key in Rgx.Exports) {
            let x = <{rgx: RegExp, map: (...args) => ExportNode}> Rgx.Exports[key];
            x.rgx.lastIndex = 0;
            for (let match = x.rgx.exec(content); match != null; match = x.rgx.exec(content)) {
                module.exports.push(x.map(match, content))
            }
        }

        module.imports.filter(x => x.type === 'exportRefs').forEach(imp => {
            imp.refs.forEach(ref => {
                let exp = new ExportNode();
                exp.position = 0;
                exp.length = 0;
                exp.ref = ref;
                module.exports.push(exp);
            })
            
        });

        module.imports.sort((a, b) => a.position < b.position ? -1 : 1);
        module.exports.sort((a, b) => a.position < b.position ? -1 : 1);
        return module;
    }
}

