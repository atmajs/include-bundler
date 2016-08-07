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

	accepts (type) {
		return type === 'mask';
	}
};