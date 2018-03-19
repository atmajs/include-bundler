import { BaseRewriter } from "../base/BaseRewriter";
import { path_isRelative, path_normalize, path_toRelative, path_combine, path_getDir } from "../../utils/path";
import { MaskParser } from "./MaskParser";
import { mask } from '../../global'
import { Resource } from "../../class/Resource";

export class MaskRewriter extends BaseRewriter {

	rewritePartial (content, ownerResource: Resource) {
		var parser = this.handler.parser as MaskParser;
		var ast = parser._parse(content, ownerResource);
		var found = false;

		mask.TreeWalker.walk(ast,  node => {
			if (node.tagName !== 'imports') {
				return;
			}

			if (ownerResource.source && ownerResource.location !== ownerResource.source.location) {
				node
					.nodes
					.filter(x => path_isRelative(x.path))
					.forEach(x => {
						let ownerSource = ownerResource.source.url,
							ownerTarget = ownerResource.url,
							currentUrl = path_normalize(path_combine(path_getDir(ownerSource), x.path)),
							targetUrl = path_toRelative(currentUrl, ownerTarget);

						x.path = currentUrl;//targetUrl;
					});
	
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
				.map(x => {
					let url = x.url; //x.toRelative(ownerResource); 
					return `import sync from '${url}';`
				})
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

	rewriteResource (resource: Resource) {
		var meta = resource.meta;
		if (meta != null && meta.hasPages === false) {
			return;
		}

		var result = this.rewritePartial(resource.content, resource);
		if (result && result !== resource.content) {
			resource.content = result;
		}
	}

	rewriteRoot (resourceInput: Resource, resourceOutput: Resource) {
		var ast = (this.handler.parser as MaskParser)._parse(resourceInput.content);
		mask.TreeWalker.walk(ast, (node) => {
			if (node.tagName !== 'import') {
				return;
			}
			if (node.path == null || path_isRelative(node.path) === false) {
				return;
			}
			if (node.path[0] === '@') {
				// MaskJS prefixed path
				return;
			}
			let path = path_combine(path_getDir(resourceInput.url), node.path);
			node.path = path_toRelative(path, resourceOutput.url);
		});

		resourceOutput.content = mask.stringify(ast, { indent: 4 });
	}

	accepts (type) {
		return type === 'mask';
	}
};