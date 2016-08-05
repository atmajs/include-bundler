class ResourceInfo {
	constructor () {
		this.dependencies = [];
		this.meta = {};
	}

	static merge(...infos) {
		var result = new ResourceInfo;

		infos.forEach(x => {
			result.dependencies.push( ... x.dependencies);

			Object.assign(result.meta, x.meta);
		})
		return result;
	}
}