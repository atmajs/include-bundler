var res_groupByType,
	res_groupByPage,
	res_groupByBundle,
	res_groupByPageAndBundles,
	res_groupResourcesByType,
	res_getPage,
	res_flattern,
	res_getTreeInfo,
	res_walk;
(function(){

	(function(){
		res_groupByType = function(arr, opts){
			var pckg = {}, imax = arr.length, i = -1;
			while (++i < imax) {
				var path = arr[i];
				var ext = path_getExtension(path);
				var type = opts.getTypeForExt(ext);
				append(pckg, type, path);
			}
			return pckg;
		};

		res_groupByPage = function(arr, opts){
			var pages = {}, imax = arr.length, i = -1;
			while (++i < imax) {
				var resource = arr[i];
				var name = res_getPage(resource, opts);
				append(pages, name, resource);
			}
			return pages;
		};
		res_groupByBundle = function(arr){
			var bundles = {}, imax = arr.length, i = -1;
			while (++i < imax) {
				var resource = arr[i];
				var name = resource.bundle;
				append(bundles, name, resource);
			}
			return bundles;
		};
		res_groupByPageAndBundles = function (arr, opts) {
			var pages = res_groupByPage(arr, opts);
			for(var key in pages) {
				pages[key] = res_groupByBundle(pages[key], opts);
			}
			return pages;
		};
		res_groupResourcesByType = function (arr) {
			var out = {}, imax = arr.length, i = -1;
			while (++i < imax) {
				var resource = arr[i];
				var type = resource.type;
				append(out, type, resource);
			}
			return out;
		};
		res_getPage = function(resource, opts) {
			var pages = resource.inPages;
			if (pages == null || pages.length === 0)
				return opts.mainPage;

			if (pages.length === 1) {
				return pages[0];
			}
			return opts.mainPage;
			//@TODO pagebundles
			if (pages.indexOf(opts.mainPage) !== -1) {
				return opts.mainPage;
			}
			return pages.sort().join('-');
		};

		
		function append(pckg, name, x) {
			var arr = pckg[name];
			if (arr == null) {
				arr = pckg[name] = [];
			}
			arr.push(x);
		}
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
			if (resource.resources) {
				resource.resources.forEach(x => toArray(x, out));
			}
			out['push'](resource);
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
		function takePageDefinitions (resA, resB) {
			if (resB.inPages == null || resB.inPages.length === 0) {
				return;
			}
			resB
				.inPages
				.filter(name => resA.inPages.indexOf(name) === -1)
				.forEach(name => resA.inPages.push(name));
		}
	}());

	(function(){
		res_getTreeInfo = function (resource) {
			var arr = flattern(resource).map(x => {
				return `${x.url} ${x.inPages.join(',')}`.color;
			}).sort();


			return {
				count: arr.length,
				treeString: arr.join('\n')
			};
		};

		function flattern(resource){
			return distinct(toArray(resource, []))
		};
		function distinct(stack) {
			for (var i = 0; i < stack.length; i++) {
				for (var j = i + 1; j < stack.length; j++) {
					if (stack[i].url === stack[j].url) {
						stack.splice(j, 1);
						j--;						
					}
				}
			}
			return stack;
		}
		function toArray(resource, out) {
			if (resource.resources) {
				resource.resources.forEach(x => toArray(x, out));
			}
			out['push'](resource);
			return out;
		}
	}());

	res_walk = function (res, fn) {
		var result = fn(res);
		if (result === false)
			return result;

		var arr = res.resources;
		if (arr == null) 
			return;

		var imax = arr.length,
			i = -1;
		while(++i < imax) {
			result = res_walk(arr[i], fn);
			if (result === false) {
				return result;
			}
		}		
	};
}());	