var res_groupByType,
	res_flattern;
(function(){

	(function(){
		res_groupByType = function(arr){
			var pckg = {}, imax = arr.length, i = -1;
			while (++i < imax) {
				var path = arr[i];
				var ext = getExt(path);
				var type = getType(ext);
				append(pckg, type, path);
			}
			return pckg;
		};

		res_groupByPage = function(arr){
			var pages = {}, imax = arr.length, i = -1;
			while (++i < imax) {
				var resource = arr[i];
				var name = getPage(resource);
				append(pages, name, resource);
			}
			return pages;
		};

		var rgxExt = /\.([\w]+)($|\?|:)/
		function getExt(path) {
			var match = rgxExt.exec(path);
			if (match == null) {
				return 'js';
			}
			return match[1];
		}
		function getType (ext) {
			return _types[ext] || 'load';
		}
		function getPage(resource) {
			var pages = resource.inPages;
			if (pages == null || pages.length === 0)
				return 'main';

			if (pages.length === 1) {
				return pages[0];
			}
			if (pages.indexOf('main') !== -1) {
				return 'main';
			}
			return pages.sort().join('-');
		}
		function append(pckg, name, x) {
			var arr = pckg[name];
			if (arr == null) {
				arr = pckg[name] = [];
			}
			arr.push(x);
		}
		var _types = {
			'js': 'js',
			'es6': 'js',
			'css': 'css',
			'less': 'css',
			'scss': 'css',
			'json': 'ajax',
			'mask': 'mask'
		};

	}());

	(function(){
		res_flattern = function(resource){
			return distinct(toArray(resource, []))
		};
		function distinct(stack) {
			for (var i = 0; i < stack.length; i++) {
				for (var j = i + 1; j < stack.length; j++) {
					if (stack[i].url === stack[j].url) {
						takeModuleDescriptions(stack[i], stack[j]);
						takePageDefinitions(stack[i], stack[j]);
						stack.splice(j, 1);
						j--;						
					}
				}
			}
			return stack;
		}
		function toArray(resource, out) {
			var method = resource.type === 'css' ? 'push' : 'unshift'
			out[method](resource);
			resource.resources.forEach(x => toArray(x, out));
			return out;
		}
		function takeModuleDescriptions (resA, resB) {
			if (resB.asModules == null || resB.asModules.length === 0) {
				return;
			}
			resB
				.asModules
				.filter(name => resA.asModules.indexOf(name) === -1)
				.forEach(name => resA.asModules.push(name));
		}
		function takeModuleDescriptions (resA, resB) {
			if (resB.inPages == null || resB.inPages.length === 0) {
				return;
			}
			resB
				.inPages
				.filter(name => resA.inPages.indexOf(name) === -1)
				.forEach(name => resA.inPages.push(name));
		}
	}());
}());