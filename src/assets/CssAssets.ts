import { path_toRelative } from "../utils/path";
import { Resource } from "../class/Resource";


export const CssAssets = {
	rewrite(resource, targetResource, solution) {
		var regexp = /url[\s]*\(('|")?([^)'"]+)('|")?\)/gi,
			assets = [],
			hash = {},
			match;

		var content = resource.content;
		while (match = regexp.exec(content)) {
			var href = match[2].trim();
			if (href === '') {
				continue;
			}
			if (solution.assetsManager.shouldCopy(href) === false) {

				if (solution.assetsManager.shouldRewritePath(href, resource, targetResource)) {
					var asset = new Resource({ type: 'asset', url: href }, resource, solution);
					content = replace(
						href,
						match,
						content,
						asset.url,
						targetResource.url,
						solution
					);
				}
				continue;
			}

			var asset = new Resource({ type: 'asset', url: href }, resource, solution);
			if (asset.filename in hash === false) {
				assets.push(asset);
				hash[asset.filename] = 1;
			}

			var assetUrl = asset.toTarget(solution).url;
			content = replace(
				href,
				match,
				content,
				assetUrl,
				targetResource.url,
				solution
			);

			// var before = content.substring(0, match.index),
			// 	after = content.substring(match.index + match[0].length);

			// var assetUrl = asset.toTarget(solution).url;
			// var styleUrl = targetResource.url;
			// var relUrl = path_toRelative(assetUrl, styleUrl, "/");
			// var entry = match[0].replace(href, relUrl);
			// content = before + entry + after;
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
	var styleUrl = targetUrl;
	return path_toRelative(assetUrl, styleUrl, "/");
}

function replace(href, match, content, assetUrl, targetUrl, solution) {
	var before = content.substring(0, match.index),
		after = content.substring(match.index + match[0].length);

	var relUrl = formatUrl(assetUrl, targetUrl);
	var entry = match[0].replace(href, relUrl);
	return before + entry + after;
}
