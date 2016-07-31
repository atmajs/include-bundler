var AssetsManager;
(function(){
	
	//import ./CssAssets.js

	AssetsManager = class AssetsManager {
		constructor (solution) {
			this.assets = [];
			this.solution = solution;
		}
		rewriteCss (resource, solution) {
			var arr = CssAssets.rewrite(resource, solution);
			if (arr) {
				this.assets.push(...arr);
			}
		}
		shouldCopy (href, parent) {
			if (this.solution.opts.isSameBase() === false) {
				return true;
			}
			if (hrefIsAbsolute(href)) {
				return false;
			}
			return true;
		}
		getAssets () {
			return this.assets;
		}
		clearCache () {
			this.assets = [];
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