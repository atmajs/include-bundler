import { BaseBuilder } from '../base/BaseBuilder';
import { BaseSerializer } from './serializers/BaseSerializer'
import { BaseHandler } from '../base/BaseHandler';
import { Solution } from '../../class/Solution';
import { MaskSerializer } from './serializers/MaskSerializer';
import { StyleSerializer } from './serializers/StyleSerializer';
import { ScriptSerializer } from './serializers/ScriptSerializer';
import { HtmlSerializer } from './serializers/HtmlSerializer';
import { LoadSerializer } from './serializers/LoadSerializer';

export class HtmlBuilder extends BaseBuilder {
	serializers: BaseSerializer[]

	constructor (public solution: Solution, public handler: BaseHandler) {
		super(solution, handler);

		this.serializers = [
			new MaskSerializer(solution, this),
			new StyleSerializer(solution, this),
			new ScriptSerializer(solution, this),
			new HtmlSerializer(solution, this),
			new LoadSerializer(solution, this)
		];
	}

	createModule (outputItem, otherOutputItems) {
		var arr = outputItem.resources.map(resource => {
			var url = resource.toTargetUrl(this.solution);
			return `<script type='text/plain' name='bunder-item' data-bundler-path='${url}'>
				${resource.content}
			</script>`
		});
		outputItem.resource.content = arr.join('\n');
	}

	buildRoot (resource, dependencies) {
		var $ = this.createDocument(resource.content);

		dependencies.forEach(x => x.url = x.toRelative(resource));

		this.serializers.forEach(x => x.removeDependencies($));
		this.serializers.forEach(x => x.rewrite($, resource));		
		this.serializers.forEach(x => x.serialize($, dependencies));
		this.serializers.forEach(x => x.clean($));

		this.clean($);
		resource.content = $.html();
	}

	append ($, selector, html) {
		var container = $.root().find(selector).first();
		if (container.length !== 0) {
			container.append(html);
		} else {
			$.root().append(html);
		}
	}
	insertBefore ($, selector, html) {
		var anchor = $.root().find(selector).first();
		if (anchor.length !== 0) {
			anchor.before(html);
		} else {
			$.root().append(html);
		}
	}

	accepts (type) {
		return type === 'html';
	}

	createDocument (html) {
		return require('cheerio').load(html);
	}

	clean ($) {
		$('[data-bundler-if]')
			.filter((i, x) => {
				var condition = x.attribs['data-bundler-if'];
				var result = this.solution.opts.varDefs.evaluate(condition);
				return !!result;
			})
			.remove()
			;

		$('placeholder#bundlers-placeholder')
			.remove()
			;
	}
	
};

