import { ScriptParser } from './ScriptParser';
import { ScriptRewriter } from './ScriptRewriter';
import { ScriptBuilder } from './ScriptBuilder';
import { ScriptPathResolver } from './ScriptPathResolver';
import { BaseHandler } from "../base/BaseHandler";

export class ScriptHandler extends BaseHandler {
	
	static Parser = ScriptParser
	static Rewriter = ScriptRewriter
	static Builder = ScriptBuilder
	static PathResolver = ScriptPathResolver

	accepts (type) {
		return type === 'js';
	}
};
