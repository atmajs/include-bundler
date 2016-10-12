MaskHandler.Rewriter = class MaskRewriter extends BaseRewriter {

	constructor () {
		super(...arguments);
	}

	rewritePartial (content, ownerResource) {
		var parser = this.handler.parser;
		var ast = parser._parse(content, ownerResource);
		var found = false;

		mask.TreeWalker.walk(ast,  node => {
			if (node.tagName !== 'imports') {
				return;
			}

			var page = parser._getPageForNode(node.nodes[0]);
			if (page == null) {
				return;
			}

			found = true;
			var template = this
				.solution
				.outputResources
				.getForPage(page)
				.sort((a, b) => {
					if (a.type === b.type) {
						return 0;
					}
					if (a.type === 'js') {
						return 1;
					}
					return 0;
				})
				.map(x => `import sync from '${x.url}';`)
				.join('');

			var imports = mask.parse(template);
			node.nodes.unshift(...(imports.nodes));
		});
		if (found === false) {
			return;
		}
		return mask.stringify(ast, {
			indent: this.solution.opts.minify ? 0 : 4 
		});
	}

	rewriteResource (resource) {
		var meta = resource.meta;
		if (meta != null && meta.hasPages === false) {
			return;
		}

		var result = this.rewritePartial(resource.content, resource);
		if (result && result !== resource.content) {
			resource.content = result;
		}
	}

	rewriteRoot (resourceInput, resourceOutput) {
		var ast = this.handler.parser._parse(resourceInput.content);
		mask.TreeWalker.walk(ast, (node) => {
			if (node.tagName !== 'import')
				return;

			if (path_isRelative(node.path) === false)
				return;

			var path = path_combine(path_getDir(resourceInput.url), node.path);
			
			node.path = path_toRelative(path, resourceOutput.url);
		});

		resourceOutput.content = mask.stringify(ast, { indent: 4 });
	}

	accepts (type) {
		return type === 'mask';
	}
};