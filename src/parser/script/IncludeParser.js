var IncludeParser;
(function() {

	IncludeParser = {
		parse: function parseIncludes(ast, resource) {

			var info = {
				resources: [],
				hasExports: false,
				hasResponseObject: false,
				responseAccessors: null,
			};

			AstUtil.each(ast, AstUtil.is.includeFunction, function(node, descend) {
				function isIncludeSymbolRef (node) {
					return AstUtil.is.type(node, 'AST_SymbolRef') && node.name == 'include';
				}
				var scope = AstUtil.findNode(node, isIncludeSymbolRef).scope || ast;
				processInclude(info, node, scope, resource);
				return true;
			});

			if (getPropertySetter('exports', ast) != null) {
				info.hasExports = true;
			}

			return new class_Dfr().resolve(info);
		}
	};

	function processInclude(info, node, scope, currentResource) {

		var arr = [];
		function isIncludeMethodCall (node) {
			return AstUtil.is.type(node, 'AST_Call') && node.start.value == 'include';
		};

		AstUtil.each(node, isIncludeMethodCall, function(node) {

			switch (node.expression && node.expression.property) {
			case 'js':
			case 'css':
			case 'load':
			case 'lazy':
			case 'mask':
			case 'routes':
			case 'setBase':
				var pckg = {
					type: node.expression.property,
					args: AstUtil.getArguments(node.args, scope),
				};

				if (pckg.args.length > 0) {
					arr.unshift(pckg);
				}

				break
			case 'done':
			case 'ready':
				processIncludeCallback(info, node.args && node.args[0]);
				break;
			case 'cfg':
			case 'instance':
			case 'embed':
			case 'plugin':
			case 'ajax':
			case 'promise':
			case 'client':
			case 'server':
			case 'use':
			case 'getPending':
			case 'getResource':
			case 'getResourceById':
			case 'getResources':
			case 'apply':
				break;
			default:
				console.warn('getIncludes: Unknown function call', node.expression);
				break;
			}
		});

		var include = new Include(currentResource);
		arr.forEach(function(x) {
			include[x.type].apply(include, x.args);
		});

		info.resources = info.resources.concat(include.includes);
	}


	function processIncludeCallback(info, Callback) {
		if (AstUtil.is.type(Callback, 'AST_Function') == false) {
			return;
		}

		var args = Callback.argnames,
			responseObjectName = args.length > 0 ? args[args.length - 1].name : null;

		if (responseObjectName) {
			info.hasResponseObject = true;
			var names = getPropertyAccessors(responseObjectName, Callback);
			if (names) {
				info.responseAccessors = (info.responseAccessors || []).concat(names);
			}
		}
	}

	/**
	 *	resolve %name%.propertyAccessor
	 */

	function getPropertyAccessors(name, Fn) {
		var references = [];
		Fn.body.forEach(function(x) {
			function isSymbolName(node) {
				return AstUtil.is.type(node, 'AST_SymbolRef') && node.name === name;
			}
			AstUtil.each(x, isSymbolName, function(node) {
				var chain = AstUtil.getPropertyChain(node, this.stack);
				if (chain) {
					references.push(chain);
				}
			});
		});
		return references;
	}

	/**
	 *	aim to find all **.exports = X
	 */

	function getPropertySetter(name, Fn) {

		var result = null;
		Fn.body.forEach(function(x) {
			function isPropertyName(node) {
				AstUtil.is.type(node, 'AST_Assign') && node.left.property === name;
			}
			AstUtil.each(x, isPropertyName, function(node) {
				var arr = ['include', 'module', 'exports'];
				if (arr.indexOf(node.start.value) > -1) {
					result = node;
				}
			});
		});
		return result;
	}

}());
