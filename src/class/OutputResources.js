class OutputResources {

	constructor (solution) {
		this.solution = solution;
		this.resources = [];

		this.pagesInput = {};
		this.items = [];

		this.root = null;		
	}

	prepair (resources) {
		
		
		this.rootInput = resources.pop();
		this.rootOutput = this.rootInput.toTarget(this.solution);
		this.rootOutput.content = this.rootInput.content;

		this.pagesInput = res_groupByPageAndBundles(resources, this.solution.opts);

		Object.keys(this.pagesInput).forEach(page => {

			Object.keys(this.pagesInput[page]).forEach(bundle => {

				var resources = this.pagesInput[page][bundle];
				var byType = res_groupResourcesByType(resources, this.solution.opts);
				Object.keys(byType).forEach(type => {

					var arr = byType[type];
					var item = new OutputItem({
						page, 
						bundle, 
						type, 
						solution: this.solution, 
						resources: arr
					});

					this.items.push(item);
				});
				
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


class OutputItem {
	constructor ({ page, bundle, type, solution, resources }) {
		this.page = page;
		this.bundle = bundle;
		this.type = type;
		var ext = solution.opts.getExtForType(type);
		var filename = `${page}_${bundle}.${ext}`;
		var resource = new Resource({type: type, url: filename}, null, solution);

		this.resource = resource.toTarget(solution);
		this.resources = resources || [];
	}
}