var HtmlParser;
(function(){
	var _mask;

	HtmlParser = {
		getDependencies (resource, opts) {
			var content = resource.content;
			var mask = _mask || (_mask = require('maskjs'));
			var dfr = new class_Dfr;
			
			var ast = mask.parseHtml(content);
			var queue = [];
			var resources = [];
			mask.TreeWalker.walk(ast, node => {
				var reader = ResourceReaders.find(reader => reader.canHandle(node));
				if (reader) {
					queue.push({
						node: node,
						reader: reader
					});
				}
			});

			function process () {					
				if (queue.length === 0) {
					dfr.resolve(resources);
					return;
				}
				var x = queue.shift();
				var promise = x.reader.read(x.node, resources);
				if (promise == null) {
					process();
					return;
				}
				promise.then(process, process);
			}
			
			process();

			return dfr;
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
		return { type: type, url: path, asModule: [ 'mask' ] };
	}

	var mapping = { mask: 'mask', data: 'load', script: 'js', style: 'css' };
	function maskTypeToIncludeType(key) {
		return mapping[key];
	}

	// import ./html/styles.js
	// import ./html/scripts.js
	// import ./html/mask.js

	var ResourceReaders = [
		new StyleReader, 
		new ScriptReader, 
		new MaskContentReader
	];
}());