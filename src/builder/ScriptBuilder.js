var ScriptBuilder;
(function(){
	ScriptBuilder = {
		build (resources, solution) {
			var arr = resources.filter(x => x.type === 'js');
			var bundleHash = arr.reduce((aggr, x) => {
				aggr[x.bundle] = 1;
				return aggr;
			}, {});

			
			return Object.keys(bundleHash).map(name => {				
				return build(name, arr.filter(x => x.bundle === name), solution);
			});
		}
	};

	function build(bundleName, resources, solution) {
		var template = Templates.resolveForType('js', solution);
		var arr = resources.slice();
		var main;

		if (solution.opts.package.type === 'module') {
			main = arr.pop();
		}

		var body = arr.map(resource => {
			return template.wrapModule(resource.url, resource.content);
		}).join('\n');

		if (main != null) {
			body += '\n' + main.content;
		}

		var content = template.wrapBundle(body, resources);
		if (main == null) {
			main = arr.pop();
		}

		var resource = main.toTarget(solution);
		resource.content = content;
		return resource;
	}


	var MAIN_BUNDLE = 'index';
}());