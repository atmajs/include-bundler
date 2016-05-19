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
		function append(pckg, type, path) {
			var arr = pckg[type];
			if (arr == null) {
				arr = pckg[type] = [];
			}
			arr.push(path);
		}
		var _types = {
			'js': 'js',
			'es6': 'js',
			'css': 'css',
			'less': 'css',
			'scss': 'css',
			'json': 'ajax',
			'mask': 'mask',
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
	}());
}());