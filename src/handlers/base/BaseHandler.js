class BaseHandler {
	

	constructor (solution) {
		this.solution = solution;

		var { Parser, Rewriter, Builder, PathResolver } = this.constructor;
		
		this.parser = new Parser(solution, this);
		this.rewriter = new Rewriter(solution, this);
		this.builder = new Builder(solution, this);
		this.pathResolver = new PathResolver(solution, this);
	}
};
