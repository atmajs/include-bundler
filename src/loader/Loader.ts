import { class_Dfr, obj_extend } from 'atma-utils'
import { res_getTreeInfo, res_walk } from '../utils/res';
import { path_getExtension } from '../utils/path';
import { async_resolve, async_waterfall } from '../utils/async';
import { Parser } from '../parser/Parser';
import * as assert from 'assert'
import { Resource } from '../class/Resource';
import { Configuration } from '../config/Configuration';
import { Solution } from '../class/Solution';
import { color } from '../utils/color';
import { ResourceInfo, ResourceType } from '../class/ResourceInfo';

export const Loader = {
    opts: null,
    solution: null,

    load(type: ResourceType, path: string, opts, solution: Solution) {
        this.opts = opts;
        this.solution = solution;


        let includeData: ResourceInfo = {
            type: type,
            url: path,
            module: 'root',
            page: solution.opts.mainPage
        };

        let start = Date.now();
        return ResourceLoader
            .load(includeData, null, opts, solution)
            .then(loader => {
                var end = Date.now();
                var seconds = ((end - start) / 1000).toFixed(2);
                var treeInfo = res_getTreeInfo(loader.resource);
                var reporter = solution.reporter;
                reporter
                    .info(color(`Loaded bold<yellow<${treeInfo.count}>> files in bold<yellow<${seconds}>> sec.`));
                reporter
                    .info(treeInfo.treeString);
                return loader.resource;
            });
    },
    loadResource(resource) {
        return ResourceLoader
            .loadResource(resource, this.opts, this.solution)
            .then(loader => loader.resource);
    },
    clearCache() {
        ResourceLoader.clearCache();
        return this;
    },
    removeCached(filename) {
        ResourceLoader.clearCacheSingle(filename);
        return this;
    },
    getTypeFromPath(path) {
        var ext = path_getExtension(path);
        var type = Object.keys(types).find(type => {
            return types[type].indexOf(` ${ext} `) !== -1
        });
        if (type == null) {
            throw new Error('Resource type can`t be resolve from path ' + path);
        }
        return type;
    }
};

var types = {
    'js': ' es6 js ',
    'mask': ' mask ',
    'html': ' html ',
    'css': ' css scss less '
};

namespace ResourceLoader {
    export function load(includeData: ResourceInfo, parent: Resource, opts, solution: Solution) {
        var resource = new Resource(includeData, parent, solution);
        var loader = __loaders[resource.filename];
        if (loader == null) {
            loader = __loaders[resource.filename] = new TreeLoader(resource, opts, solution);
            loader.process();
        } else {
            // Try to find the resource in ancestors
            var res = tryGetCyclicRoot(resource);
            if (res != null) {
                solution.reporter.warn(`Caution. Cyclic dependency detected. '${includeData.url}' in '${parent.url}'`);
                return async_resolve({ resource: res })
            }
        }
        if (includeData.page) {
            loader.done(() => {
                this.definePageForAll(includeData.page, loader.resource);
            });
        }

        return loader;
    }
    export function loadResource(resource, opts, solution) {
        var loader = __loaders[resource.filename];
        if (loader == null) {
            loader = __loaders[resource.filename] = new TreeLoader(resource, opts, solution);
            loader.process();
        }
        return loader;
    }
    export function clearCache() {
        __loaders = {};
        let cacheCleaner = Configuration.Instance.get('clearFileCache');
        cacheCleaner && cacheCleaner();
        return ResourceLoader;
    }
    export function clearCacheSingle(filename) {
        delete __loaders[filename];
        return ResourceLoader;
    }
    export function definePageForAll(name, resource) {
        res_walk(resource, res => {
            if (res.page) return false;

            var arr = res.inPages;
            if (arr.indexOf(name) !== -1)
                return;

            res.inPages.push(name);
        });
    }
    export function tryGetCyclicRoot(resource: Resource) {
        var x = resource.parent;
        while (x != null) {
            if (x.filename === resource.filename) {
                let res = x.clone();
                res.isCyclic = true;
                return res;
            }
            x = x.parent;
        }
        return null;
    }

    class TreeLoader extends class_Dfr {
        constructor(public resource: Resource, public opts, public solution: Solution) {
            super();
        }
        process() {
            this
                .solution
                .reporter
                .print('Load ' + toMessage(this.resource.url));

            function toMessage(path) {
                var parts = path.replace(/^\/+/, '').split('/');
                var name = parts.pop();
                parts = parts.map(x => color(`bold<${x}>`));
                name = color(`green<${name}>`);
                parts.push(name);
                return parts.join('/');
            }
            if (this.resource.parent == null && this.solution.opts.mainContent) {
                this.resource.content = this.solution.opts.mainContent;
                this.processChildren();
                return;
            }

            var start = Date.now();
            var reader = Configuration.Instance.get('readFile');
            reader(this.resource.filename, this.opts).done(content => {
                var end = Date.now();
                this.solution.reporter.print(color(` cyan<${end - start}> ms \n`));
                this.resource.content = content;
                this.processChildren();
            }).fail(error => this.reject(error));
        }
        private processChildren() {
            if (this.shouldSkipChildren()) {
                this.resolve(this);
                return;
            }
            Parser
                .getDependencies(this.resource, this.solution)
                .then(result => this.loadChildren(result), error => this.reject(error));
        }
        private loadChildren(result: ResourceInfo) {

            assert(Array.isArray(result.dependencies), `Expects array of dependencies for ${this.resource.url}`);

            this.resource.meta = obj_extend(this.resource.meta, result.meta);
            this.resource.dependencies = result.dependencies;

            var deps = result.dependencies;
            async_waterfall(deps, dep => {
                return ResourceLoader
                    .load(dep, this.resource, this.opts, this.solution)
                    .then(loader => {
                        dep.resource = loader.resource;
                        return loader.resource;
                    });
            })
                .fail(error => this.reject(error))
                .done(resources => {
                    this.resource.resources.push(...resources);
                    this.resolve(this);
                });
        }
        private shouldSkipChildren() {
            var arr = this.solution.opts.parserIgnoreDependencies;
            var shouldSkip = arr.some(rgx => (rgx as RegExp).test(this.resource.filename));
            if (shouldSkip) {
                return true;
            }

            var meta = this.resource.meta;
            if (meta && meta.skipDependencies) {
                return true;
            }
            return false;
        }
    }

    var __loaders: { [key: string]: TreeLoader } = {};
}
