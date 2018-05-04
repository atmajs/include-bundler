import { Resource } from './Resource';
import { Solution } from "./Solution";
import { res_groupByPageAndBundles, res_groupResourcesByType } from '../utils/res';

export class OutputResources {

	items: OutputItem[] =[]
	resources: Resource[] = []
	pagesInput: any = {}
	rootInput: Resource
	rootOutput: Resource
	constructor (public solution: Solution) {
		
	}

	prepair (resources: Resource[]) {
		this.resources = [];
		this.pagesInput = {};
		this.items = [];
		
		this.rootInput = resources.pop();
		this.rootOutput = this.rootInput.toTarget(this.solution);
		this.rootOutput.content = this.rootInput.content;

		this.pagesInput = res_groupByPageAndBundles(resources, this.solution.opts);

		Object.keys(this.pagesInput).forEach(page => {

			Object.keys(this.pagesInput[page]).forEach(bundle => {

				let resources = this.pagesInput[page][bundle];
				let byType = res_groupResourcesByType(resources, this.solution.opts);
				Object.keys(byType).forEach(type => {

					let arr = byType[type];
					let item = new OutputItem({
						page, 
						bundle, 
						type, 
						solution: this.solution, 
						resources: arr
					});					
					this.items.push(item);					
				});

				if (byType['js'] == null) {
					let item = new OutputItem({
						page, 
						bundle, 
						type: 'js', 
						solution: this.solution, 
						resources: []
					});					
					this.items.push(item);
				}
				
			});
		})
	}

	getForPage (page) {
		return this.items.filter(x => x.page === page).map(x => x.resource);
	}

	getAll () {
		var all = this.items.map(x => x.resource).filter(x => x.embed !== true);
		if (this.rootOutput) {
			all.push(this.rootOutput);
		}		
		return all;
	}
}


export class OutputItem {
	page: string
	bundle: string
	type: string
	solution: Solution
	resource: Resource
	resources: Resource[]

	constructor ({ page, bundle, type, solution, resources }) {
		this.page = page;
		this.bundle = bundle;
		this.type = type;
		var ext = solution.opts.getExtForType(type);
		var filename = `${page}_${bundle}.${ext}`;
		var resource = new Resource({
			type: type, 
			url: filename,
			bundle: bundle
		}, null, solution);

		this.resource = resource.toTarget(solution);
		this.resources = resources || [];
	}
}