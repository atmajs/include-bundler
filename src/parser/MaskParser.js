var MaskParser;
(function(){
	var _mask;
	MaskParser = {
		getDependencies (resource, solution) {
			var mask = _mask || (_mask = require('maskjs'));
			var content = resource.content;
			return mask
				.Module
				.getDependencies(content, '', {deep: false})
				.then(list => list);
		},
		flatternDependencies (depsInfo) {
			var out = [];
			for (var key in depsInfo) {
				var arr = depsInfo[key];
				if (arr.length === 0) {
					continue;
				}
				out = out.concat(toIncludeData(arr, key));
			}
			return out;
		}
	};

	function toIncludeData(arr, key) {
		var out = [], imax = arr.length, i = -1;
		while( ++i < imax ){
			out.push(toIncludeDataSingle(arr[i], key));
		}
		return out;
	}
	function toIncludeDataSingle(path, key) {
		var type = maskTypeToIncludeType(key);
		return { type: type, url: path, module: 'mask' };
	}

	var mapping = { mask: 'mask', data: 'load', script: 'js', style: 'css' };
	function maskTypeToIncludeType(key) {
		return mapping[key];
	}
}());