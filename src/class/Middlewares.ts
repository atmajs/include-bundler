import { class_Dfr } from "atma-utils";

class Middlewares {
	runners: any = {};

	supports = {
		'parseDependencies': function (resource, deps, opts, solution) {
			return new class_Dfr();
		},
		'buildResources': function (resources, solution) {
			return new class_Dfr();
		},
		'rewriteDependencies': function (resources, solution) {
			var outputItems = solution.outputResources.items;
			return new class_Dfr();
		},
		'buildBundle': function (outputItem) {
			return new class_Dfr();
		}

	}
	constructor() {
		this.runners = {};

		this.supports = {
			'parseDependencies': function (resource, deps, opts, solution) {
				return new class_Dfr();
			},
			'buildResources': function (resources, solution) {
				return new class_Dfr();
			},
			'rewriteDependencies': function (resources, solution) {
				var outputItems = solution.outputResources.items;
				return new class_Dfr();
			},
			'buildBundle': function (outputItem) {
				return new class_Dfr();
			}

		}
	}

	define(name, fn) {
		if (this.supports[name] === void 0) {
			throw new Error('Unsupported middleware name: ' + name);
		}

		var fns = this.runners[name];
		if (fns == null) {
			fns = this.runners[name] = [];
		}

		fns.push(fn)
	}

	run(name, ...args) {
		if (this.supports[name] === void 0) {
			throw new Error('Unsupported middleware name: ' + name);
		}

		var dfr = new class_Dfr;
		var fns = this.runners[name];
		if (fns == null || fns.length === 0) {
			return dfr.resolve(...args);
		}

		var arr = fns.slice();
		function next(...transformedArgs) {
			var nextArgs = transformedArgs.length === 0 ? args : transformedArgs;
			if (arr.length === 0) {
				dfr.resolve(...(nextArgs || []));
				return;
			}
			args = nextArgs;

			var fn = arr.shift();
			var result = fn.call(null, ...args);
			if (result != null) {
				if (result.then) {
					result.then(next, error => dfr.reject(error));
					return;
				}
				if (Array.isArray(result)) {
					args = result;
				} else {
					args = [result];
				}
			}

			next();
		}

		next();
		return dfr;
	}
}


export const _middlewares = new Middlewares;