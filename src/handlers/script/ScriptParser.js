ScriptHandler.Parser = class ScriptParser extends BaseParser {

	constructor () {
		super(...arguments);
	}
	
	getDependencies (content, ownerResource) {
		var many = [
			new CommonJsHandler.Parser(this.solution),
			new AmdJsHandler.Parser(this.solution),
			new IncludeJsHandler.Parser(this.solution),
		];

		var opts = {
			filename: ownerResource.filename
		};
		var ast = AstUtil.parse(content, opts);

		var dfrs = many.map(parser => parser.getDependencies(ast, ownerResource));
		return async_whenAll(dfrs).then(results => ResourceInfo.merge(...arr_flattern(results)));
	}

	accepts (type) {
		return type === 'js';
	}
};
