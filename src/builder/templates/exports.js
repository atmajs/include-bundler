var Templates = {};
(function(){

	// import ./ITemplate.js
	// import ./common-js.js
	// import ./global-js.js
	// import ./include-js.js	
	// import ./mask.js
	// import ./html.js
	// import ./css.js

	Templates.resolveForType = function(type, solution){
		var Ctor;
		switch (type) {
			case 'css':
				Ctor = Templates.css;
				break;
			case 'mask':
				Ctor = Templates.mask;
				break;
			case 'js': 
				Ctor = Templates[solution.opts.package.module];
				if (Ctor == null)				
					throw new Error('Unsupported module system');

				break;
			default:
				throw new Error('Unknown resource type');
		}

		return new Ctor();
	};
	Templates.resolveForResource = function(resource, solution){
		var type = resource.type, Ctor;
		switch (type) {
			case 'css':
				Ctor = Templates.css;
				break;
			case 'mask':
				Ctor = Templates.mask;
				break;
			case 'js': 
				var modules = resource.asModules;
				if (modules == null || modules.length === 0) {
					Ctor = Templates[solution.opts.package.module];
					break;
				}
				var opts = solution.getOptionsForResource(resource);
				if (opts != null && opts.module) {
					Ctor = Templates[opts.module];
					break;
				}
				if (modules.length === 1) {
					Ctor = Templates[modules[0]];
					break;	
				}

				var arr = ['global', 'commonjs', 'amd', 'includejs'];

				var name = arr.find(name => modules.indexOf(name) !== -1);
				if (name == null) {
					name = modules[0];
				}
				Ctor = Templates[name];				
				break;
			default:
				throw new Error(`Unknown resource type ${type}`);
		}
		if (Ctor == null) {
			throw new Error(`Unknown type for a resource ${resource.url}`);	
		}

		return new Ctor();
	};
}());