import { BaseBuilder } from '../base/BaseBuilder';
export class LoadBuilder extends BaseBuilder {

	createModule (outputItem, otherOutputItems) {
		var html = outputItem
			.resources
			.map(resource => {
				var url = resource.toTargetUrl(this.solution);
				return `<script type='text/plain' data-bundler-path='${url}'>			
					${resource.content}
				</script>`
			})
			.join('\n');

		outputItem.resource.content = html;
		outputItem.resource.type = 'html';
	}

	buildRoot (resource, dependencies) {		
		throw new Error('Right now only rewriter is supported')	
	}

	accepts (type) {
		return type === 'load';
	}
	
};

