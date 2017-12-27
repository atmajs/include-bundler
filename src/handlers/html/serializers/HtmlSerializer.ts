import { BaseSerializer } from './BaseSerializer';
export class HtmlSerializer extends BaseSerializer {

	
	removeDependencies ($) {
		$('[data-bundler-if]')
			.filter((i, x) => {
				var condition = x.attribs['data-bundler-if'];
				var result = !!this.solution.opts.varDefs.evaluate(condition);
				if (result) {
					this.solution.reporter.info('Removing resource from HTML with condition ' + condition);
				}
				return result;
			})
			.remove()
			;

	}

	serialize ($, resources) {
		var arr = resources.filter(x => x.type === 'html');
		if (arr.length === 0)
			return;

		arr.forEach(x => x.embed = true);

		var html = arr
			.map(x => x.content)
			.join('\n');

		this
			.builder
			.insertBefore($, 'script', html);
	}

	rewrite ($, resource) {
		return void 0;
	}
}