// import ./readers/MaskContentReader.js
// import ./readers/StyleLinkReader.js
// import ./readers/ScriptLinkReader.js
// import ./readers/ScriptContentReader.js

HtmlHandler.Parser = class HtmlParser extends BaseParser {

	constructor () {
		super(...arguments);

		this.readers = [
			new MaskContentReader(this.solution),
			new StyleLinkReader(this.solution),
			new ScriptLinkReader(this.solution),
			new ScriptContentReader(this.solution)
		];
	}
	
	getDependencies (content, ownerResource) {
		
		var $ = this.createDocument(content);
		var queue = [];
		
		$('*').each((index, node) => {
			var $el = $(node);
			if ($el.attr('data-bundler') === 'ignore') {
				return;
			}

			var condition = $el.attr('data-bundler-if');
			if (condition) {
				var result = this.solution.opts.varDefs.evaluate(condition)
				if (!result) {
					return;
				}
			}

			var reader = this.readers.find(reader => reader.canHandle($el));
			if (reader) {
				queue.push({
					node: $el,
					reader: reader
				});
			}
		});

		return async_map(queue, x => x.reader.read(x.node))
			.then(arr_flattern)
			.then(deps => ({ dependencies: deps }));		
	}

	accepts (type) {
		return type === 'html';
	}

	createDocument (html) {
		return require('cheerio').load(html);
	}
};
