import { CssParser } from './CssParser';
import { BaseHandler } from "../base/BaseHandler";
import { CssPathResolver } from './CssPathResolver';
import { CssRewriter } from './CssRewriter';
import { CssBuilder } from './CssBuilder';

export class CssHandler extends BaseHandler {
	
	static Parser = CssParser
	static Rewriter = CssRewriter
	static Builder = CssBuilder
	static PathResolver = CssPathResolver

	accepts (type) {
		return type === 'css';
	}
};
