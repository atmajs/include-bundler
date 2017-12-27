import { BaseSerializer } from "./BaseSerializer";

export class MaskSerializer extends BaseSerializer {

	removeDependencies ($) {
		return void 0;
	}

	serialize ($, resources) {
		var arr = resources.filter(x => x.type === 'mask');
		if (arr.length === 0)
			return;

		arr.forEach(x => x.embed = true);
		var html = arr
			.map(x => `<script type='text/mask' data-run='auto'>\n${x.content}\n</script>`)
			.join('\n');

		this
			.builder
			.insertBefore($, 'script[type="text/mask"]', html);
	}

	rewrite ($, resource) {
		$('script[type="text/mask"]').each((i, node) => {
			var content = $(node).text();
			var handler = this.solution.handlers.find(x => x.rewriter.accepts('mask'));
			var result = handler.rewriter.rewritePartial(content, resource);
			if (result && result !== content) {
				$(node).text(result);
			}
		});
	}
}