var CssAssets;
(function(){
	CssAssets = {
		rewrite (resource, content, opts) {
			var regexp = /url[\s]*\(('|")?([^)'"]+)('|")?\)/gi,
				assets = [],
				hash = {},
				match;

			var targetDirectory = solution.outputSources;
			var base = solution.base;

			while (match = regexp.exec(content)) {
				var href = match[2].trim();
				if (href === '') {
					continue;
				}
				if (isAbsolute(href)) {
					continue;
				}
				if (href[0] === '/') {
					continue;
				}

				var asset = new Resource({ type: 'asset', url: href }, resource);
				if (asset.filename in hash === false) {
					assets.push(asset.toJSON());
					hash[asset.filename] = 1;
				}

				var before = content.substring(0, match.index),
					after = content.substring(match.index + match[0].length);

				content = before + asset.url + after;
			}

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