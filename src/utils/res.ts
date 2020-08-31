import { path_getExtension } from "./path";
import { SolutionOpts, SolutionOptsBase } from "../class/SolutionOpts";
import { Resource } from "../class/Resource";
import { ResourceType } from "../class/ResourceInfo";
import { color } from "./color";
import { Solution } from '../class/Solution';

export type ResourceTypeGroup = {
    [key in ResourceType]: string[]
}


export function res_groupByType(arr: string[], opts: SolutionOpts): ResourceTypeGroup {
    var pckg = {} as ResourceTypeGroup,
        imax = arr.length,
        i = -1;
    while (++i < imax) {
        var path = arr[i];
        var ext = path_getExtension(path);
        var type = opts.getTypeForExt(ext);
        append(pckg, type, path);
    }
    return pckg;
};

export function res_groupByPage(arr: Resource[], opts: SolutionOpts) {
    var pages = {}, imax = arr.length, i = -1;
    while (++i < imax) {
        var resource = arr[i];
        var name = res_getPage(resource, opts);
        append(pages, name, resource);
    }
    return pages;
};
export function res_groupByBundle(arr) {
    var bundles = {}, imax = arr.length, i = -1;
    while (++i < imax) {
        var resource = arr[i];
        var name = resource.bundle;
        append(bundles, name, resource);
    }
    return bundles;
};
export function res_groupByPageAndBundles(arr: Resource[], opts: SolutionOpts) {
    var pages = res_groupByPage(arr, opts);
    for (var key in pages) {
        pages[key] = res_groupByBundle(pages[key]);
    }
    return pages;
};
export function res_groupResourcesByType(arr: Resource[],  opts: SolutionOpts) {
    var out = {}, imax = arr.length, i = -1;
    while (++i < imax) {
        var resource = arr[i];
        var type = resource.type;
        append(out, type, resource);
    }
    return out;
};
export function res_getPage(resource: Resource, opts: SolutionOpts) {
    var pages = resource.inPages;
    if (pages == null || pages.length === 0)
        return opts.mainPage;

    if (pages.length === 1) {
        return pages[0];
    }
    return opts.mainPage;
    //@TODO pagebundles
    if (pages.indexOf(opts.mainPage) !== -1) {
        return opts.mainPage;
    }
    return pages.sort().join('-');
};


function append(pckg: any, name: ResourceType | string, x: string | Resource) {
    var arr = pckg[name];
    if (arr == null) {
        arr = pckg[name] = [];
    }
    arr.push(x);
}



export function res_flattern(resource, dependencies: SolutionOptsBase['dependencies']) {
    let arr = ResFlatternUtils.flattern(resource);
    if (dependencies) {
        outer: for (let i = 0; i < arr.length; i++) {
            let a = arr[i];
            let deps = dependencies.filter(x => x.resource.test(a.url));
            if (deps.length === 0) {
                continue;
            }
            let indexes = [ i ];
            for (let j = i + 1; j < arr.length; j++) {
                let b = arr[j];
                if (b == null) {
                    continue;
                }
                let isSame = deps.some(x => x.resource.test(b.url));
                if (isSame) {
                    indexes.push(j);
                    continue;
                }

                let isDependency = deps.some(x => x.dependency.test(b.url));
                if (isDependency) {
                    let cursor = j;
                    indexes.forEach(idx => {
                        arr.splice(++cursor, 0, arr[idx]);
                    });
                    indexes.reverse().forEach(idx => {
                        arr.splice(idx, 1);
                    });
                    i--;
                    continue outer;
                }
            }
        }
    }
    return arr;
};
namespace ResFlatternUtils {
    export function flattern(resource: Resource, copyInfo = false, out = [], hash = {}): Resource[] {
        if (resource.url in hash) {
            return out;
        }
        if (resource.resources) {
            resource
                .resources
                .filter(x => x.isCyclic !== true)
                .forEach(x => flattern(x, copyInfo, out, hash));
        }
        let cached = hash[resource.url];
        if (cached == null) {
            hash[resource.url] = resource;
            out.push(resource);
        } else {
            if (copyInfo) {
                takeModuleDescriptions(cached, resource);
                takePageDefinitions(cached, resource);
            }
        }
        return out;
    }
    // export function distinct(stack) {
    //     for (var i = 0; i < stack.length; i++) {
    //         for (var j = i + 1; j < stack.length; j++) {
    //             if (stack[i].url === stack[j].url) {
    //                 takeModuleDescriptions(stack[i], stack[j]);
    //                 takePageDefinitions(stack[i], stack[j]);
    //                 stack.splice(j, 1);
    //                 j--;
    //             }
    //         }
    //     }
    //     return stack;
    // }
    // export function toArray(resource, out) {
    //     if (resource.resources) {
    //         resource
    //             .resources
    //             .filter(x => x.isCyclic !== true)
    //             .forEach(x => toArray(x, out));
    //     }
    //     out['push'](resource);
    //     return out;
    // }
    function takeModuleDescriptions(resA, resB) {
        if (resB.asModules == null || resB.asModules.length === 0) {
            return;
        }
        resB
            .asModules
            .filter(name => resA.asModules.indexOf(name) === -1)
            .forEach(name => resA.asModules.push(name));
    }
    function takePageDefinitions(resA, resB) {
        if (resB.inPages == null || resB.inPages.length === 0) {
            return;
        }
        resB
            .inPages
            .filter(name => resA.inPages.indexOf(name) === -1)
            .forEach(name => resA.inPages.push(name));
    }
}



/* Array of resources or root resource */
export function res_getTreeInfo(mix) {
    var arr = Array.isArray(mix) ? mix : ResFlatternUtils.flattern(mix);

    var paths = arr.map(x => {
        var pages = x.inPages.map(page => color(`bg_white<black<${page}>>`)).join(' ');
        return `${x.url} ${pages}`;
    }).sort();

    return {
        count: arr.length,
        treeString: ResGetTreeInfo.formatTree(paths)
    };
};
namespace ResGetTreeInfo {
    // export function flattern(resource: Resource) {
    //     return toUniqueArray(resource, [], {});
    // };
    //- function distinct(stack) {
    //     for (var i = 0; i < stack.length; i++) {
    //         for (var j = i + 1; j < stack.length; j++) {
    //             if (stack[i].url === stack[j].url) {
    //                 stack.splice(j, 1);
    //                 j--;
    //             }
    //         }
    //     }
    //     return stack;
    // }
    function toUniqueArray(resource: Resource, out: Resource[], hash) {
        if (resource.resources) {
            resource
                .resources
                .filter(x => x.isCyclic !== true)
                .forEach(x => toUniqueArray(x, out, hash));
        }
        if (hash[resource.url] == null) {
            hash[resource.url] = true;
            out.push(resource);
        }
        return out;
    }

    export function formatTree(paths) {
        var tree = tree_fromPaths(paths);

        tree = tree_collapse(tree);

        var str = '';
        formatArr(tree, 0);
        return str;

        function formatArr(items, indent) {

            items.forEach((item, index) => {
                str += getIndent(indent, index === items.length - 1);
                str += color(`yellow<${item.id}>`);
                str += '\n';

                formatArr(item.items, indent + 1);
            });
        }

        function getIndent(indent, isLastEntry) {

            var i = -1;
            var str = '';
            while (++i < indent) {
                var leading = i === indent - 1 && isLastEntry ? '└' : '|';
                var seperator = i === indent - 1 ? '───' : '   ';
                str += leading + seperator;
            }
            return str;
        }
    }
    function tree_collapse(arr) {
        arr.forEach(item => {
            if (item.items.length === 1) {
                item.id += '/' + item.items[0].id;
                item.items = item.items[0].items;
            }
            tree_collapse(item.items);
        })
        return arr;
    }
    function tree_fromPaths(model) {
        var index = -1,
            index_ = index,
            i = 0,
            imax = model.length;
        for (; i < imax - 1; i++) {

            index_ = str_lastSameIndex(model[i], model[++i]);
            if (index === -1 || index > index_) {
                index = index_;
            }
        }

        if (imax === 1)
            model[0] = model[0].substring(model[0].lastIndexOf('/') + 1);


        if (index > 0) {
            index_ = model[0].lastIndexOf('/');
            if (index_ < index) {
                index = index_
            }

            for (i = 0; i < imax; i++) {
                model[i] = model[i].substring(index);

                if (model[i][0] === '/')
                    model[i] = model[i].substring(1);

            }
        }

        var tree = [],
            parts;

        for (var i = 0, imax = model.length; i < imax; i++) {

            tree_ensurePath(tree, model[i].split('/'));
        }

        return tree;
    }
    function tree_getItem(items, id) {
        for (var i = 0, x, imax = items.length; i < imax; i++) {
            x = items[i];

            if (x.id === id)
                return x;
        }
        return null;
    }

    function tree_ensurePath(rootItems, parts) {
        var items = rootItems,
            item_,
            item;
        for (var i = 0, imax = parts.length; i < imax; i++) {
            item_ = tree_getItem(items, parts[i]);

            if (item_ == null) {
                item_ = {
                    id: parts[i],
                    items: []
                };
                items.push(item_);
            }

            items = item_.items;
        }
        return items;
    }
    function str_lastSameIndex(str, compare) {
        var i = 0,
            imax = str.length < compare.length
                ? str.length
                : compare.length
            ;

        for (; i < imax; i++) {
            if (str.charCodeAt(i) !== compare.charCodeAt(i)) {
                break;
            }
        }

        return i;
    }

    function path_combine(_1, _2) {
        if (_1[_1.length - 1] === '/')
            _1 = _1.substring(0, _1.length - 1);

        if (_2[0] !== '/')
            _2 = '/' + _2;

        return _1 + _2;
    }
}

export function res_walk(res, fn) {
    var result = fn(res);
    if (result === false)
        return result;

    var arr = res.resources;
    if (arr == null)
        return;

    var imax = arr.length,
        i = -1;
    while (++i < imax) {
        var x = arr[i];
        if (x.isCyclic === true) {
            continue;
        }
        result = res_walk(x, fn);
        if (result === false) {
            return result;
        }
    }
};

export function res_find(res, matcher) {
    var out = null;
    res_walk(res, x => {
        if (matcher(x)) {
            out = x;
            return false;
        }
    });
    return out;
}

