var HtmlParser;
(function(){
	
	HtmlParser = {
		getDependencies (resource, opts) {
			var $ = createDoc(resource.content);
			var dfr = new class_Dfr;			
			var queue = [];
			var resources = [];

			$('*').each((index, node) => {
				var $el = $(node);
				var reader = ResourceReaders.find(reader => reader.canHandle($el));
				if (reader) {
					queue.push({
						node: $el,
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

	var createDoc;
	(function(){
		createDoc = function(html){
			if (_cheerio == null) 
				_cheerio = require('cheerio');
				
			return _cheerio.load(html);
		};
		var _cheerio;
	}()); 
}());