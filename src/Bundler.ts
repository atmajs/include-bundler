import { Watcher } from './loader/Watcher';
import { _middlewares } from './class/Middlewares';
import { Parser } from './parser/Parser';
import { Resource } from './class/Resource';
import { AssetsManager } from './assets/AssetsManager';
import { Loader } from './loader/Loader'
import { class_EventEmitter } from 'atma-utils';
import { Solution } from './class/Solution';
import { io } from './global'
import { Configuration } from './config/Configuration';
import { ISolutionOptions } from './class/SolutionOpts';
import { res_flattern } from './utils/res';
import { tree_async } from './utils/tree';
import { Builder } from './builder/Builder';
import { color } from './utils/color';

export class Bundler extends class_EventEmitter {
	solution: Solution

	static clearCache() {
		Loader.clearCache();

		if (io.File.middleware) {
			for (let key in io.File.middleware) {
				let midd = io.File.middleware[key];
				if (midd.clearTemp) {
					midd.clearTemp();
				}
			}
		}
		return Bundler;
	}		
	static get Config () {
		return Configuration.Instance;
	}

	constructor (path: string, opts: ISolutionOptions) {
		super();
		this.solution = new Solution(path, opts);
	}

	getResourceTree (opts?) {
		var solution = this.solution,
			type = solution.opts.type,
			path = solution.path;
			
		return Loader
			.load(type, path, opts, solution)
			.then(x => x.toJSON());
	}

	static getResourceTree(path: string, opts: ISolutionOptions) {
		return new Bundler(path, opts).getResourceTree();
	}

	getResources (opts?) {
		var solution = this.solution,
			type = solution.opts.type,
			path = solution.path;
		
		return Loader.load(type, path, opts, solution).then(resource => {
			return res_flattern(resource).map(x => x);
		});
	}
	static getResources(path, opts) {
		return new Bundler(path, opts).getResources();
	}

	build (opts) {
		var solution = this.solution,
			type = solution.opts.type,
			path = solution.path,
			shouldRebuild = false,
			isBuilding = false,
			isRebuilding = false,
			rootResource = null,
			self = this;

		
		function build(resource) {
			isBuilding = true;
			var resources = res_flattern(resource);				
			return tree_async({
				resources,
				reporter: solution.reporter,
				action: () => 
					Builder.build(resources, solution),
				message: (treeInfo, seconds) => 
					color(`Created bold<yellow<${treeInfo.count}>> files in bold<yellow<${seconds}>> sec.`)
			}).done(buildComplete).fail(buildFailed);
		}
		function buildComplete (resources) {
			isBuilding = false;
			if (shouldRebuild) {
				shouldRebuild = false;
				isRebuilding = true;
				build(rootResource);
				return;
			}
			if (isRebuilding) {
				isRebuilding = false;
				self.emit('rebuild', resources);
			}
		}
		function buildFailed (error) {
			isBuilding = false;
			if (isRebuilding) {
				solution.reporter.error(color('red<Build Failed>'));
				solution.reporter.error(error);
				isRebuilding = false;
			}				
			if (shouldRebuild) {
				shouldRebuild = false;
				isRebuilding = true;
				build(rootResource);
				return;	
			}
		}
		function rebuild() {
			if (isBuilding) {
				shouldRebuild = true;
				return;
			}
			isRebuilding = true;
			solution.iteration = {};
			build(rootResource);
		}
		function start () {
			return Loader
				.load(type, path, opts, solution)
				.then(resource => {
					rootResource = resource;
					if (opts && opts.watch === true) {
						Watcher
							.watch(resource, solution)
							.on('changed', rebuild);
					}
					return build(resource)
						.then((result) => solution.runScripts('postbuild', result))
				});
		}
		return solution
			.runScripts('prebuild')
			.then(start);			
	}

	static build (path, opts) {
		return new Bundler(path, opts).build(opts);
	}

	static process (path: string, opts: ISolutionOptions) {
		var bundler = new Bundler(path, opts);
		var solution = bundler.solution;

		function builderComplete (resources) {
			resources.forEach(res => {
				io.File.write(res.filename, res.content);
			});
			return solution
				.assetsManager
				.flush()
				.then(() => {
					return Promise.resolve(solution) 
				});
		}
		if (opts && opts.watch === true) {
			bundler.on('rebuild', builderComplete);
		}			
		return bundler
			.build(opts)
			.then(builderComplete);
	}

	defineMiddleware (name, fn) {
		_middlewares.define(name, fn);
	}

	static get Parser () {
		return { 
			getDependencies (content, opts: ISolutionOptions = { type : 'js'}) {
				if (typeof opts === 'string') opts = { type: opts };

				var solution = new Solution('', opts);
				var resource = new Resource({ type: opts.type, content: content}, null, solution);
				return Parser.getDependencies(resource, solution);
			}
		}
	}

	static get io () {
		return io;
	}

	static get AssetsManager () { return AssetsManager }
	static get Resource () { return Resource }
	static get Solution () { return Solution }		
};
