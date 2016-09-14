class BaseSerializer {
	constructor (solution, builder) {
		this.solution = solution;
		this.builder = builder;
	}

	removeDependencies ($) {
		throw new Error('Not implemented');
		return void 0;
	}

	serialize ($, allDependencies) {
		throw new Error('Not implemented');
		return void 0;
	}

	rewrite ($, ownerResource) {
		throw new Error('Not implemented');
		return void 0;	
	}

	clean ($) {
		return void 0;
	}


	_replaceWithPlaceholder ($el, type) {
		var bundle = $el.attr('data-bundler-bundle') || 'index';
		var html = `<placeholder id="bundlers-placeholder" type="${type}" bundle="${bundle}" />`;
		$el.replaceWith(html);
	}

	_insertDependency ($, resource, html) {
		var bundle = resource.bundle;
		var type = resource.type;
		var getSelector = (bundle) => {
			return `placeholder#bundlers-placeholder[type="${type}"][bundle="${bundle}"]`
		};
		
		var bundleSelector = getSelector(resource.bundle);
		var globalSelector = getSelector('index');
		var el = $(bundleSelector).first();
		if (el.length !== 0) {
			el.before(html);
			return true;
		}
		el = $(globalSelector).first();
		if (el.length !== 0) {
			el.before(html);
			return true;
		}

		return false;
	}
}