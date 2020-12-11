import { Resource } from "../class/Resource";
import { Solution } from "../class/Solution";
import { CssAssets } from "./CssAssets";
import { class_Dfr } from "atma-utils";
import { io } from '../global'
import { MaskAssets } from './MaskAssets';
import { path_getExtension } from '../utils/path';


export class AssetsManager {
    assets: Resource[] = []
    constructor(public solution: Solution) {
    }

    rewriteAssets(resource: Resource, targetResource: Resource, solution: Solution) {
        let arr = null;
        let type = resource.type;
        if (type === 'load') {
            let ext = path_getExtension(resource.url);
            type = this.solution.opts.getTypeForExt(ext);
        }
        switch (type) {
            case 'css':
                arr = CssAssets.rewrite(resource, targetResource, solution);
                break;
            case 'mask':
                arr = MaskAssets.rewrite(resource, targetResource, solution);
                break;
        }
        if (arr) {
            this.assets.push(...arr);
        }
    }
    shouldCopy(href) {
        if (withProtocol(href)) {
            return false;
        }
        if (href[0] === '/' && this.solution.opts.isSameBase()) {
            return false;
        }
        return true;
    }
    shouldRewritePath(href, ownerResource, targetResource) {
        return this.shouldCopy(href);
    }
    getAssets() {
        return this.assets;
    }
    clearCache() {
        this.assets = [];
    }

    flush() {
        var i = -1,
            arr = this.assets,
            dfr = new class_Dfr,
            manager = this;
        function next() {
            if (++i >= arr.length) {
                dfr.resolve();
                return;
            }
            var asset = arr[i];
            var target = asset.toTarget(manager.solution)
            io
                .File
                .copyToAsync(asset.filename, target.filename)
                .then(next, error => dfr.reject(`AssetsManager can't copy a file ${asset.filename} to ${target.filename}`));
        }
        next();
        return dfr;
    }
};

function hrefIsAbsolute(href) {
    if (withProtocol(href)) {
        return true;
    }
    if (href[0] === '/') {
        return true;
    }
    return false;
}

function withProtocol(href) {
    if (/^\s*data:/.test(href)) {
        return true;
    }
    if (/^[\w]{1,8}:\/\//.test(href)) {
        return true;
    }
    return false;
}
