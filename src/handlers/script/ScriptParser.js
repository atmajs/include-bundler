ScriptHandller.Parser = class ScriptParser extends BaseParserComposed {

	constructor () {
		super(...arguments);
	}
	
	getDependencies (content, ownerResource) {
		var many = [
			new CommonJsParser(this.solution),
			new AmdJsParser(this.solution),
			new IncludeJsParser(this.solution),
		];

		var opts = {
			filename: ownerResource.filename
		};
		var ast = AstUtil.parse(content, opts);

		var dfrs = many.map(parser => parser.getDependencies(ast, ownerResource));
		return async_whenAll(dfrs).then(results => arr_flatter(results));		
	}
};
