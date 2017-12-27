import { Solution } from "../../class/Solution";
import { BaseParser } from "./BaseParser";
import { BaseBuilder } from "./BaseBuilder";
import { BaseRewriter } from "./BaseRewriter";
import { BasePathResolver } from "./BasePathResolver";

export abstract class BaseHandler {
	
	parser: BaseParser
	rewriter: BaseRewriter
	builder: BaseBuilder
	pathResolver: BasePathResolver


	constructor (public solution: Solution) {
		
		var { Parser, Rewriter, Builder, PathResolver } = <typeof PathResolver>this.constructor;
		
		this.parser = new Parser(solution, this);
		this.rewriter = new Rewriter(solution, this);
		this.builder = new Builder(solution, this);
		this.pathResolver = new PathResolver(solution, this);
	}

	static Parser: IBaseParserCtor
	static Rewriter: IBaseRewriterCtor
	static Builder: IBaseBuilderCtor
	static PathResolver: IBasePathResolverCtor
};

interface IBaseParserCtor {
	new (solution: Solution, handler: BaseHandler): BaseParser
}
interface IBaseRewriterCtor {
	new (solution: Solution, handler: BaseHandler): BaseRewriter
}
interface IBaseBuilderCtor {
	new (solution: Solution, handler: BaseHandler): BaseBuilder
}
interface IBasePathResolverCtor {
	new (solution: Solution, handler: BaseHandler): BasePathResolver
}
