var Templates = {};
(function(){

	// import ./ITemplate.js
	// import ./common-js.js
	// import ./include-js.js	
	// import ./mask.js
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
}());