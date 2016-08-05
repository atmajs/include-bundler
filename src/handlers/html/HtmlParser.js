// import ./readers/MaskContentReader.js
// import ./readers/StyleLinkReader.js
// import ./readers/ScriptLinkReader.js

HtmlHandler.Parser = class HtmlParser extends BaseParser {

	constructor () {
		super(...arguments);

		this.readers = [
			new MaskContentReader,
			new StyleLinkReader,
			new ScriptLinkReader
		];
	}
	
	getDependencies (content, ownerResource) {
		
		var $ = this.createDocument(content);
		var queue = [];
		
		$('*').each((index, node) => {
			var $el = $(node);
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
