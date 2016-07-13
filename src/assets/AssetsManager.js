var AssetsManager;
(function(){
	var assets = [];
	//import ./CssAssets.js

	AssetsManager = {
		rewriteCss (resource, opts) {
			var arr = CssAssets.rewrite(resource, opts);
			if (arr) {
				assets.push(...arr);
			}
		},
		shouldCopy (href, parent) {
			if (solution.opts.isSameBase() === false) {
				return true;
			}
			if (hrefIsAbsolute(href)) {
				return false;
			}
			return true;
		},
		getAssets () {
			return assets;
		},
		clearCache () {
			assets = [];
		}
	};

	function hrefIsAbsolute(href) {
		if (/^\s*data:/.test(href)) {
			return true;
		}
		if (/^[\w]{1,8}:\/\//.test(href)) {
			return true;
		}
		if (href[0] === '/') {
			return true;
		}
		return false;
	}
}());