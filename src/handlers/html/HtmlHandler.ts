import { HtmlRewriter } from './HtmlRewriter';
import { BaseHandler } from "../base/BaseHandler";
import { HtmlParser } from "./HtmlParser";
import { HtmlBuilder } from "./HtmlBuilder";
import { HtmlPathResolver } from "./HtmlPathResolver";

export class HtmlHandler extends BaseHandler {
	static Parser = HtmlParser
	static Rewriter = HtmlRewriter
	static Builder = HtmlBuilder
	static PathResolver = HtmlPathResolver
};
