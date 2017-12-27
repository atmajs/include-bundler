import { arr_flattern } from '../../utils/arr';
import { BaseTagReader } from "./readers/BaseTagReader";
import { MaskContentReader } from "./readers/MaskContentReader";
import { StyleLinkReader } from "./readers/StyleLinkReader";
import { ScriptLinkReader } from "./readers/ScriptLinkReader";
import { ScriptContentReader } from "./readers/ScriptContentReader";
import { BaseParser } from "../base/BaseParser";
import { BaseHandler } from "../base/BaseHandler";
import { Solution } from "../../class/Solution";
import { async_map } from "../../utils/async";


export class HtmlParser extends BaseParser {
	readers: BaseTagReader[]
	
	constructor (public solution: Solution, public handler: BaseHandler) {
		super(solution, handler);

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
