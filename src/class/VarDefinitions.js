class VarDefinitions {
	constructor (solution, defs) {
		this.solution = solution;
		this.code = serializeVars(defs);
	}

	evaluate (expression) {
		try {
			var code = `${this.code}\n return ${expression};`;
			var fn = new Function(code);
			return fn();
		}
		catch (error) {
			var msg = `Expression evaluation failed: ${expression}. With message ${error.message}`;
			this.solution.reporter.error(msg);
		}
	}
}

function serializeVars (map) {
	var code = [];
	for(var key in map) {
		var expr = JSON.stringify(map[key]);
		var line = `var ${key} = ${expr};`
		code.push(line);
	}
	return code.join('\n');
}
