import { AmdJsParser } from './AmdJsParser';
import { AmdJsRewriter } from './AmdJsRewriter';
import { AmdJsBuilder } from './AmdJsBuilder';
import { BaseHandler } from "../../base/BaseHandler";

export class AmdJsHandler extends BaseHandler {

	static Parser = AmdJsParser
	static Rewriter = AmdJsRewriter
	static Builder = AmdJsBuilder
	static PathResolver = null
};
