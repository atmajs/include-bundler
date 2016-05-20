var AssetsManager;
(function(){
	var assets = [];
	//import ./CssAssets.js

	AssetsManager = {
		rewriteCss (resource, content, opts) {
			var arr = CssAssets.rewrite(resource, content, opts);
			if (arr) {
				assets.push(...arr);
			}
		},
		getAssets () {
			return assets;
		}
	}
}());