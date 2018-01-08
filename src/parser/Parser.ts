import { _middlewares } from '../class/Middlewares';
import { path_getExtension } from "../utils/path";
import { async_resolve } from "../utils/async";
import { class_Dfr } from "atma-utils";
import { Solution } from "../class/Solution";

import * as assert from 'assert';
import { IDependency, IDependencies } from '../class/IDependency';

export const Parser = {
	getDependencies(resource, solution): PromiseLike<IDependencies> {
		assert(resource != null, 'Resource is empty');
		assert(solution instanceof Solution, 'Solution is not passed');

		var dfr = new class_Dfr;

		getDependenciesInternal(resource, solution)
			.done(_runMiddlewares)
			.fail(error => dfr.reject(error))
			;

		function _runMiddlewares(deps) {
			getDependenciesExternal(deps, resource, solution)
				.then((deps) => filterDynamicDeps(deps, solution))
				.done(deps => dfr.resolve(deps))
				.fail(error => dfr.reject(error))
				;
		}
		return dfr as PromiseLike<IDependencies>;
	}
};

function getDependenciesInternal(resource, solution) {
	assert(typeof resource.url === 'string', 'Path is expected');

	var ext = path_getExtension(resource.url);
	var handler = solution.handlers.find(x => x.parser.accepts(resource.type) || x.parser.accepts(ext))
	if (handler == null) {
		console.warn('GetDependenciesInternal: Skip uknown resource type', resource.type);
		return async_resolve({ dependencies: [] });
	}

	return handler.parser.getDependencies(resource.content, resource);
}
function getDependenciesExternal(deps, resource, solution) {
	return _middlewares
		.run('parseDependencies', resource, deps, solution)
		.then(() => deps)
		;
}
function filterDynamicDeps(info, solution) {
	info.dependencies = info.dependencies.filter(dep => isDynamicDependency(dep, solution) === false);
	return info;
}
function isDynamicDependency(dep, solution) {
	var arr = solution.opts.dynamicDependencies;
	return arr.length !== 0 && arr.some(rgx => rgx.test(dep.url));
}