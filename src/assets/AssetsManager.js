var AssetsManager;
(function(){
	
	//import ./CssAssets.js

	AssetsManager = class AssetsManager {
		constructor (solution) {
			this.assets = [];
			this.solution = solution;
		}
		rewriteCss (resource, targetResource, solution) {
			var arr = CssAssets.rewrite(resource, targetResource, solution);
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
		shouldRewritePath (href, ownerResource, targetResource) {
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

		flush () {
			var i = -1, 
				arr = this.assets, 
				dfr = new class_Dfr,
				manager = this;
			function next () {
				if (++i >= arr.length) {
					dfr.resolve(); 
					return;
				}
				var asset = arr[i];
				var target = asset.toTarget(manager.solution)
				io
					.File
					.copyToAsync(asset.filename, target.filename)
					.then(next, error => dfr.reject(error));
			}
			next();
			return dfr; 
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