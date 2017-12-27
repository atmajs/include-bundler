import { CommonJsParser } from './CommonJsParser';
import { CommonJsRewriter } from './CommonJsRewriter';
import { CommonJsBuilder } from './CommonJsBuilder';
import { CommonJsPathResolver } from './CommonJsPathResolver';
import { BaseHandler } from "../../base/BaseHandler";

export class CommonJsHandler extends BaseHandler {
	static Parser = CommonJsParser
	static Rewriter = CommonJsRewriter
	static Builder = CommonJsBuilder
	static PathResolver = CommonJsPathResolver
};
