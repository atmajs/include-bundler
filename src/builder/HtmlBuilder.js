var HtmlBuilder;
(function(){
	HtmlBuilder = {
		buildDependencies (resources, solution) {
			
		},

		rewriteRoot (resource, dependencies, solution) {

			var $ = createDoc(resource.content);

			removeDependencies($);
			
			var css = serializeMany(dependencies, x => x.type === 'css', solution);
			if (css) {
				add($, 'head', css);
			}

			var html = serializeMany(dependencies, x => x.type !== 'css' && x.type !== 'js' && x.type !== 'mask', solution);
			if (html) {
				add($, 'body', html);
			}

			var mask = serializeMany(dependencies, x => x.type === 'mask', solution);
			if (mask) {				
				var anchor = $.root().find('script[type="text/mask"]');
				if (anchor.length !== 0) {
					anchor.before(mask);
				} else {
					$.root().append(mask);
				}
			}

			var js = serializeMany(dependencies, x => x.type === 'js', solution);
			if (js) {				
				add($, 'body', js);
			}

			resource.content = $.html();			
		}
	};

	function add($, selector, html) {
		var container = $(selector);
		if (container.length !== 0) {
			container.append(html);
		} else {
			$.root().append(html);
		}
	}

	function removeDependencies ($) {		
		$('script[src]')
			.filter(function(i, x){
				return x.attribs['data-bundler'] !== 'ignore';
			})
			.remove()
			;
			
		$('link[href]')
			.filter(function(i, x){
				return x.attribs['data-bundler'] !== 'ignore';
			})
			.remove()
			;
	}

	function serializeMany (dependencies, filter, solution) {
		return dependencies
			.filter(filter)
			.map(x => serializeSingle(x, solution))
			.join('\n');
	}

	var serializeSingle;
	(function(){
		serializeSingle = function(resource, solution){

			var serializer = Serializers[resource.type];
			if (serializer == null) {
				serializer = Serializers[path_getExtension(resource.url)];
			}
			if (serializer == null)
				throw new Error('Unknown html serializer for type ' + resource.type);

			return serializer(resource, solution);
		};
		var Serializers = {
			js (resource, solution) {
				var href = getUrl(resource, solution);
				return `<script src='${href}' type='text/javascript'></script>`;
			},
			css (resource,solution) {
				var href = getUrl(resource, solution);
				return `<link href='${href}' rel='stylesheet' />`;
			},
			html (resource, solution) {
				resource.embed = true;
				return resource.content;
			},
			mask (resource, solution) {
				resource.embed = true;
				return `<script type='text/mask' data-run='auto'>\n${resource.content}\n</script>`
			}
		};

		function getUrl(resource, solution) {
			var path = resource.url,
				v = solution.opts.version;
			if (v == null) {
				return path;
			}
			return path + '?v=' + v;
		}		
	}()); 


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