import { BaseHandler } from '../../base/BaseHandler';
import { GlobalJsParser } from './GlobalJsParser';
import { GlobalJsRewriter } from './GlobalJsRewriter';
import { GlobalJsBuilder } from './GlobalJsBuilder';

export class GlobalJsHandler extends BaseHandler {
	static Parser = GlobalJsParser
	static Rewriter = GlobalJsRewriter
	static Builder = GlobalJsBuilder
	static PathResolver = null
};
