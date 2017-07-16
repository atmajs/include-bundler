var res_groupByType,
	res_groupByPage,
	res_groupByBundle,
	res_groupByPageAndBundles,
	res_groupResourcesByType,
	res_getPage,
	res_flattern,
	res_getTreeInfo,
	res_walk,
	res_find;
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
				resource
					.resources
					.filter(x => x.isCyclic !== true)
					.forEach(x => toArray(x, out));
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
		/* Array of resources or root resource */
		res_getTreeInfo = function (mix) {
			var arr = Array.isArray(mix) ? mix : flattern(mix);

			var paths = arr.map(x => {
				var pages = x.inPages.map(page => `bg_white<black<${page}>>`.color).join(' ');
				return `${x.url} ${pages}`;
			}).sort();

			return {
				count: arr.length,
				treeString: formatTree(paths)
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
				resource
					.resources
					.filter(x => x.isCyclic !== true)
					.forEach(x => toArray(x, out));
			}
			out['push'](resource);
			return out;
		}

		function formatTree(paths){
			var tree = tree_fromPaths(paths);

			tree = tree_collapse(tree);

			var str = '';
			formatArr(tree, 0);
			return str;

			function formatArr(items, indent) {
				
				items.forEach((item, index) => {
					str += getIndent(indent, index === items.length - 1);
					str += `yellow<${item.id}>`.color; 
					str += '\n';

					formatArr(item.items, indent + 1);
				});
			}

			function getIndent(indent, isLastEntry) {
				
				var i = -1;
				var str = '';
				while(++i < indent) {
					var leading = i === indent - 1 && isLastEntry ? '└' : '|';
					var seperator = i === indent - 1 ? '───' : '   ';
					str += leading + seperator;
				}	
				return str;
			}
		}
		function tree_collapse(arr) {
			arr.forEach(item => {
				if (item.items.length === 1) {
					item.id += '/' + item.items[0].id;
					item.items = item.items[0].items;
				}
				tree_collapse(item.items);
			})
			return arr;
		}
		function tree_fromPaths(model) {
            var index = -1,
                index_ = index,
                i = 0,
                imax = model.length;
            for (; i < imax - 1; i++){
                
                index_ = str_lastSameIndex(model[i], model[++i]);
                if (index === -1 || index > index_) {
                    index = index_;
                }
            }
            
            if (imax === 1) 
                model[0] = model[0].substring(model[0].lastIndexOf('/') + 1);
            
            
            if (index > 0) {
                index_ = model[0].lastIndexOf('/');
                if (index_ < index) {
                    index = index_
                }
                
                for (i = 0; i< imax; i++) {
                    model[i] = model[i].substring(index);
                    
                    if (model[i][0] === '/') 
                        model[i] = model[i].substring(1);
                    
                }
            }
            
            var tree = [],
                parts;
            
            for (var i = 0, imax = model.length; i < imax; i++){
                
                tree_ensurePath(tree, model[i].split('/'));
            }
            
            return tree;
        }
        function tree_getItem(items, id) {
            for (var i = 0, x, imax = items.length; i < imax; i++){
                x = items[i];
                
                if (x.id === id) 
                    return x;
            }
            return null;
        }
        
        function tree_ensurePath(rootItems, parts) {
            var items = rootItems,
                item_,
                item;
            for (var i = 0, imax = parts.length; i < imax; i++){
                item_ = tree_getItem(items, parts[i]);
                
                if (item_ == null) {
                    item_ = {
                        id: parts[i],
                        items: []
                    };
                    items.push(item_);
                }
                
                items = item_.items;
            }
            return items;
        }
        function str_lastSameIndex(str, compare) {
            var i = 0,
                imax = str.length < compare.length
                ? str.length
                : compare.length
                ;
            
            for (; i< imax; i++) {
                if (str.charCodeAt(i) !== compare.charCodeAt(i)) {
                    break;
                }
            }
            
            return i;
        }
        
        function path_combine(_1, _2) {
            if (_1[_1.length - 1] === '/') 
                _1 = _1.substring(0, _1.length - 1);
            
            if (_2[0] !== '/') 
                _2 = '/' + _2;
                
            return _1 + _2;
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
			var x = arr[i];
			if (x.isCyclic === true) {
				continue;
			}
			result = res_walk(x, fn);
			if (result === false) {
				return result;
			}
		}
	};

	res_find = function (res, matcher) {
		var out = null;
		res_walk(res, x => {
			if (matcher(x)) {
				out = x;
				return false;
			}
		});
		return out;
	}
}());	