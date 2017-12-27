import { LoadRewriter } from './LoadRewriter';
import { LoadBuilder } from './LoadBuilder';
import { LoadPathResolver } from './LoadPathResolver';
import { BaseHandler } from "../base/BaseHandler";
import { LoadParser } from "./LoadParser";

export class LoadHandler extends BaseHandler {
	static Parser = LoadParser
	static Rewriter = LoadRewriter
	static Builder = LoadBuilder
	static PathResolver = LoadPathResolver
};
