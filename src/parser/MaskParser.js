var MaskParser;
(function(){
	var _mask;
	MaskParser = {
		getDependencies (resource, solution) {

			return class_Dfr.run(resolve => {
				var deps = getDependencies(resource, solution);

				resolve(deps);
			});
		},
		flatternDependencies (depsInfo) {
			return arr_flattern(depsInfo);
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


	function getDependencies (resource, solution){

		var content = resource.content;
		var ast = mask.parse(content);
		var out = [];

		mask.TreeWalker.walk(ast, function (node) {
			if (node.tagName === 'imports') {
				logger.log('imports'.green, node.nodes.length)
			}
			logger.log(node.tagName, '<'.cyan);
			if (node.tagName !== 'import') {
				return;
			}
			var dependency = convertImportNodeToIncludeData(node);
			if (dependency.page != null) {

			}
			out.push(dependency);
		});

		var hasPage = out.some(x => x.page != null);

		solution.on('rewriteDependencies', (resources, solution) => {

		});

		return out;
	}

	function convertImportNodeToIncludeData(node) {
		var path = node.path;
		if (path_getExtension(path) === '') {
			path += '.mask';
		}

		var type = mask.Module.getType(new mask.Module.Endpoint(node.path, node.contentType))
		var dependency = {
			url: path,
			type: maskTypeToIncludeType(type),
			module: 'mask',
			page: null
		};

		var owner = node.parent;
		if (owner != null && owner.tagName === 'imports') {
			owner = owner.parent;
		}
		if (owner == null || owner.type === mask.Dom.FRAGMENT) {
			return dependency;
		}
		var page = owner.attr['data-bundler-page'] || owner.attr.page || owner.attr.id || owner.attr.name;
		if (page == null) {
			throw Error('Nested import found, but the container has no `page`, `id` or `name` in attributes');
		}
		dependency.page = page;
		return dependency;
	}
}());