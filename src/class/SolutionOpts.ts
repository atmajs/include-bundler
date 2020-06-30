import { Solution } from './Solution';
import { ResourcePropMapping } from './ResourcePropMapping';
import { path_getExtension, path_toAbsolute, path_resolveCurrent, path_toRelative, path_combine } from "../utils/path";
import { obj_getProperty } from 'atma-utils';
import { Include } from './Include';
import { mask } from '../global'
import { VarDefinitions } from './VarDefinitions';
import { Configuration } from '../config/Configuration';
import { obj_deepDefaults } from '../utils/obj';
import { ResourceType } from './ResourceInfo';
import { IImporterOptions } from '../handlers/script/import-js/ModuleFile';



interface IPackageOptions {
    module?: 'commonjs' | 'includejs' | 'global' | 'import'
    type?: 'module' | 'bundle'
    moduleWrapper?: 'umd' | 'iif' | 'script' | 'custom'
    moduleWrapperCustomPath?: string
    moduleName?: string,
    import?: IImporterOptions
    [key: string]: any
}
interface IExtensionTypes {
    [ext: string]: {
        type: ResourceType
    }
}
interface IDefaultExtension {
    js?: string
    mask?: string
    css?: string
    load?: string
}

export interface IAdditionOptions {
    mask?: {
        Module?: any,
        [key: string]: any
    }
    include?: {
        routes?: any
    }
}

export interface ISolutionOptions {

    build?: string
    type?: ResourceType
    base?: string
    version?: string

    mainPage?: string
    mainBundle?: string
    mainContent?: string

    outputBase?: string
    outputAppBase?: string
    outputMain?: string
    outputSources?: string
    outputAssets?: string
    outputShareBase?: boolean
    package?: IPackageOptions
    extensions?: IExtensionTypes
    defaultExtensions?: IDefaultExtension
    mappers?: any
    mappings?: any
    middlewares?: { [ext: string]: string[] }
    varDefs?: any
    parserIgnoreDependencies?: string[]
    dynamicDependencies?: string[]
    options?: IAdditionOptions
    prebuild?: string[]
    postbuild?: string[]
    silent?: boolean
    watch?: boolean
    minify?: boolean
    copyFiles?: { [sourcePath: string]: string }

    dependencies?: { [sourcePath: string]: string }
}

export class SolutionOptsBase {
    build: string
    type: string
    base: string
    version: string

    mainPage: string
    mainBundle: string
    mainContent: string
    outputBase: string
    outputAppBase: string

    output: string
    outputMain: string
    outputSources: string
    outputAssets: string
    outputShareBase: boolean
    package: IPackageOptions
    extensions: IExtensionTypes
    defaultExtensions: IDefaultExtension
    mappings: any
    rewrites: { [appUrl: string]: string }
    middlewares: any
    varDefs: VarDefinitions
    parserIgnoreDependencies: (string | RegExp)[]
    dynamicDependencies: string[]
    prebuild: string[]
    postbuild: string[]
    silent: boolean
    watch: boolean
    minify: boolean
    mappers: ResourcePropMapping[] = []
    options?: IAdditionOptions = {}
    copyFiles: { [source: string]: string } = null;
    dependencies?: { resource: RegExp, dependency: RegExp }[]
}


export class SolutionOpts extends SolutionOptsBase {

    defaults: SolutionOptsBase = {
        build: 'release',
        type: '',
        base: '',
        version: null,

        mainPage: 'main',
        mainBundle: '',
        mainContent: null,

        outputBase: '',
        outputAppBase: '/',
        output: '',
        outputMain: '{output}/build/{build}/{filename}.{ext}',
        outputSources: '{output}/build/{build}',
        outputAssets: '{output}/build/{build}/assets',
        outputShareBase: null,
        package: {
            module: 'commonjs',
            modules: ['commonjs', 'includejs', 'global', 'import'],

            type: 'module',
            types: ['module', 'bundle'],

            moduleWrapper: 'iif',
            moduleWrappers: ['umd', 'iif', 'script', 'custom'],
            moduleName: '',
            import: null,

        },
        extensions: {
            '': { type: 'js' },

            'js': { type: 'js' },
            'es6': { type: 'js' },
            'jsx': { type: 'js' },
            'ts': { type: 'js' },

            'mask': { type: 'mask' },

            'css': { type: 'css' },
            'less': { type: 'css' },
            'scss': { type: 'css' },
            'sass': { type: 'css' },

            'html': { type: 'html' },
            'json': { type: 'data' },

            'jpg': { type: 'asset' },
            'png': { type: 'asset' },
            'mp4': { type: 'asset' },
        },
        defaultExtensions: {
            'js': 'js',
            'mask': 'mask',
            'css': 'css',
            'load': 'load'
        },
        mappers: null,
        mappings: null,
        rewrites: null,
        middlewares: null,
        varDefs: null,
        parserIgnoreDependencies: [
            '\\/bower_components\\/',
            '\\/node_modules\\/',
            '\\.min\\.'
        ],
        dynamicDependencies: [

        ],
        prebuild: [

        ],
        postbuild: [

        ],
        silent: false,
        watch: false,
        minify: false,
        options: {
            mask: {
                Module: {
                    base: ''
                }
            }
        },
        copyFiles: null,
        dependencies: null
    }
    resolvers = {
        base(basePath) {
            return basePath
                ? path_toAbsolute(basePath)
                : path_resolveCurrent();
        },
        outputBase(outputBase, opts) {
            return outputBase
                ? path_toAbsolute(outputBase)
                : opts.base;
        },
        outputMain: prepairPath,
        outputSources: prepairPath,
        outputAssets: prepairPath,
        package: function (packageOpts) {
            if (packageOpts == null) {
                return this.package;
            }
            var opts = Object.create(this.defaults.package);
            return Object.assign(opts, packageOpts);
        },
        varDefs(varDefs) {
            return new VarDefinitions(this.solution, varDefs);
        },
        mappers() {
            return []
        },
        mappings(val) {
            return val || {};
        },
        middlewares(val) {
            Configuration.Instance.define('middlewares', val);
        },
        version(val, opts) {
            if (typeof val === 'string') {
                if (val[0] === '#') {
                    var path = val.replace('#{', '').replace('}', '');
                    var json = require(process.cwd() + '/package.json');
                    return obj_getProperty(json, path);
                }
                if (val === 'random') {
                    return (Math.random() * 100000000 | 0).toString(32);
                }
            }
            return val;
        },
        parserIgnoreDependencies(arr) {
            return arr.map(x => new RegExp(x));
        },
        dynamicDependencies(arr) {
            return arr.map(x => new RegExp(x));
        },
        extensions(opts) {
            if (opts === this.defaults.extensions) {
                return opts;
            }
            let def = Object.create(this.defaults.extensions);
            return Object.assign(def, opts);
        },
        defaultExtensions(opts) {
            if (opts === this.defaults.defaultExtensions) {
                return opts;
            }
            /** REFACTOR **/
            Include.prototype.cfg('extentionDefault', opts);
            for (var type in opts) {
                switch (type) {
                    case 'js':
                        mask.Module.cfg('ext.script', opts[type]);
                        break;
                    case 'css':
                        mask.Module.cfg('ext.style', opts[type]);
                        break;
                }
            }
            let def = Object.create(this.defaults.defaultExtensions);
            return Object.assign(def, opts);
        },
        options(opts: IAdditionOptions) {
            if (opts == null) {
                return {};
            }
            if (opts.mask) {
                if (opts.mask.Module) {
                    for (let key in opts.mask.Module) {
                        mask.Module.cfg(key, opts.mask.Module[key]);
                    }
                }
                for (let key in opts.mask) if (key !== 'Module') {
                    mask.cfg(key, opts.mask.Module[key]);
                }
            }
            if (opts.include) {
                if (opts.include.routes) {
                    Include.prototype.routes(opts.include.routes);
                }
            }
            return opts;
        },
        dependencies (val) {
            if (val == null) {
                return null;
            }
            let arr = [];
            for (let key in val) {
                arr.push({
                    resource: new RegExp(key),
                    dependency: new RegExp(val[key])
                })
            }
            return arr;
        }
    }

    paths: string[]
    type: ResourceType

    constructor(public solution: Solution, opts_: ISolutionOptions) {
        super();
        this.paths = [solution.path];
        let opts = opts_ || {};

        for (let key in this.defaults) {
            this[key] = obj_deepDefaults(opts[key], this.defaults[key]);
        }

        for (let key in this.resolvers) {
            this[key] = this.resolvers[key].call(this, this[key], this);
        }
        if (!this.type && solution.path) {
            this.type = this.getTypeForExt(path_getExtension(solution.path));
        }
    }
    getOutputFolder(type) {
        if (type === 'asset') {
            return this.outputAssets;
        }
        return this.outputSources;
    }
    isSameBase() {
        if (this.outputShareBase === false) {
            return false;
        }
        return this.base === this.outputBase;
    }
    getExtForType(type) {
        var match = this.defaultExtensions[type];
        if (match == null)
            throw new Error('Type is not supported: ' + type);

        return match;
    }
    getTypeForExt(ext) {
        var match = this.extensions[ext];
        if (match == null)
            throw new Error('Extension is not configurated: ' + ext);

        return match.type;
    }
    mapResource(resource_) {
        var resource = resource_;
        this.mappers.forEach(mapper => {
            resource = mapper.map(resource);
        });
        return resource;
    }
    toAppUrl(filename) {
        return '/' + path_toRelative(filename, this.base);
    }
    fromAppUrl(url) {
        return path_combine(this.base, url);
    }
};

function prepairPath(path, opts) {
    return interpolateStr(path, opts);
}
function interpolateStr(str, opts) {
    return str.replace(/{(\w+)}/g, (full, name) => {
        var x = opts[name];
        if (x != null) {
            return x;
        }
        switch (name) {
            case 'filename':
                var path = opts.paths[0];
                if (path === '')
                    return opts.mainPage;

                var match = /([^/\\]+)\.\w+$/.exec(path);
                if (match) {
                    return match[1];
                }
                throw new Error('Filename can`t be parsed from: ' + opts.paths.join(','));
            case 'ext':
                var path = opts.paths[0];
                if (path === '')
                    return opts.type;

                var match = /\.(\w+)$/.exec(path);
                if (match) {
                    return match[1];
                }
                throw new Error('Extension can`t be parsed from: ' + opts.paths.join(','));
            default:
                throw new Error('Unknown interpolation key: ' + name);
        }
    });
}

