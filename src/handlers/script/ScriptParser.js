ScriptHandler.Parser = class ScriptParser extends BaseParser {

	constructor () {
		super(...arguments);

		this.parsers = [
			new CommonJsHandler.Parser(this.solution, this.handler),
			new AmdJsHandler.Parser(this.solution, this.handler),
			new IncludeJsHandler.Parser(this.solution, this.handler),
		];
	}
	
	getDependencies (content, ownerResource) {
		var opts = {
			filename: ownerResource.filename
		};
		var ast = AstUtil.parse(content, opts);

		var dfrs = this.parsers.map(parser => parser.getDependencies(ast, ownerResource));
		return async_whenAll(dfrs).then(results => ResourceInfo.merge(...arr_flattern(results)));
	}

	accepts (type) {
		return type === 'js';
	}
};
