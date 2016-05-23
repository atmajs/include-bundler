var CssAssets;
(function(){
	CssAssets = {
		rewrite (resource, opts) {
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
				if (AssetsManager.shouldCopy(href) === false) {
					continue;
				}

				var asset = new Resource({ type: 'asset', url: href }, resource);
				if (asset.filename in hash === false) {
					assets.push(asset);
					hash[asset.filename] = 1;
				}

				var before = content.substring(0, match.index),
					after = content.substring(match.index + match[0].length);

				var assetUrl = asset.toTarget().url;
				var styleUrl = resource.toTarget().url;
				var relUrl = path_toRelative(assetUrl, styleUrl, "/");
				var entry = match[0].replace(href, relUrl);
				content = before + entry + after;
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
}());