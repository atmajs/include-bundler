class BaseHandler {
	

	constructor (solution) {
		this.solution = solution;

		var { Parser, Rewriter, Builder } = this.constructor;
		
		this.parser = new Parser(solution);
		this.rewriter = new Rewriter(solution);
		this.builder = new Builder(solution);
	}
};
