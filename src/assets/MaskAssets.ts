import { path_toRelative } from "../utils/path";
import { Resource } from "../class/Resource";
import { Solution } from '../class/Solution';


export const MaskAssets = {
    rewrite(resource: Resource, targetResource: Resource, solution: Solution) {
        let regexp = /src\s*=\s*('|")([^)'"]+)('|")/gi;
        let assets = [];
        let hash = {};
        let match: RegExpMatchArray;

        let content = resource.content;
        while (match = regexp.exec(content)) {
            let href = match[2].trim();
            if (href === '' || /\.\w{1,5}(\?.+)?$/.test(href) === false || href.includes('~')) {
                continue;
            }
            if (solution.assetsManager.shouldCopy(href) === false) {

                if (solution.assetsManager.shouldRewritePath(href, resource, targetResource)) {
                    let asset = new Resource({ type: 'asset', url: href }, resource, solution);
                    content = replace(
                        href,
                        match,
                        content,
                        asset.url,
                        targetResource.url,
                        solution,
                    );
                }
                continue;
            }

            let asset = new Resource({ type: 'asset', url: href }, resource, solution);
            if (asset.filename in hash === false) {
                assets.push(asset);
                hash[asset.filename] = 1;
            }

            let assetUrl = asset.toTarget(solution, { targetType: 'static' }).url;
            content = replace(
                href,
                match,
                content,
                assetUrl,
                targetResource.url,
                solution
            );
        }
        resource.content = content;

        return assets;
    }
};

function isAbsolute(href) {
    if (/^\s*data:/.test(href)) {
        return true;
    }
    return /^[\w]{1,8}:\/\//.test(href);
}

function formatUrl(assetUrl, targetUrl) {
    let styleUrl = targetUrl;
    return path_toRelative(assetUrl, styleUrl, "/");
}

function replace(href: string, match: RegExpMatchArray, content: string, assetUrl: string, targetUrl: string, solution) {
    let before = content.substring(0, match.index);
    let after = content.substring(match.index + match[0].length);
    let entry = match[0].replace(href, assetUrl);
    return before + entry + after;
}
