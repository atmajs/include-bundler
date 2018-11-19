import { BaseHandler } from '../../base/BaseHandler';
import { ImportJsParser } from './ImportJsParser';
import { ImportJsRewriter } from './ImportJsRewriter';
import { ImportJsBuilder } from './ImportJsBuilder';

export class ImportJsHandler extends BaseHandler {
	static Parser = ImportJsParser
	static Rewriter = ImportJsRewriter
	static Builder = ImportJsBuilder
	static PathResolver = null
};
