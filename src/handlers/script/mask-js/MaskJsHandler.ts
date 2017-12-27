import { MaskJsParser } from './MaskJsParser';
import { MaskJsRewriter } from './MaskJsRewriter';
import { MaskJsBuilder } from './MaskJsBuilder';
import { BaseHandler } from "../../base/BaseHandler";

export class MaskJsHandler extends BaseHandler {
	static Parser = MaskJsParser
	static Rewriter = MaskJsRewriter
	static Builder = MaskJsBuilder
	static PathResolver = null
};