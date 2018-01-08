import { AssetsManager } from '../assets/AssetsManager';
import { async_run, async_waterfall } from '../utils/async';
import { class_EventEmitter, class_Uri } from "atma-utils";
import { SolutionOptsBase, SolutionOpts, ISolutionOptions } from "./SolutionOpts";
import { IReporter } from "./Reporter";
import { HandlersUtils } from "./HandlersUtils";
import { OutputResources } from './OutputResources';
import { Handlers } from '../handlers/exports'
import { BaseHandler } from '../handlers/base/BaseHandler';

let solution = null;


export class Solution extends class_EventEmitter {
	path: string
	opts: SolutionOpts
	assetsManager
	outputResources
	reporter: IReporter
	handlers: BaseHandler[]

	constructor(path: string, opts: ISolutionOptions = <any>{}) {
		super();
		
		this.path = path;
		this.opts = new SolutionOpts(this, opts);
		this.assetsManager = new AssetsManager(this);
		this.outputResources = new OutputResources(this);
		this.reporter = IReporter.create(this.opts);

		this.handlers = Handlers.map(Ctor => new Ctor(this));
		Object.assign(this.handlers, HandlersUtils);
	}

	getOptionsForResource(resource) {
		// var files = this.opts.files;
		// if (files == null) {
		// 	return null;
		// }
		// @TODO support settings for a resource
	}

	isMainResource(resource) {
		return this.outputResources.rootInput === resource;
	}

	runScripts(name, ...args) {
		return async_run((resolve, reject) => {
			let arr = this.opts[name];
			if (arr == null || arr.length === 0) {
				resolve(...args);
				return;
			}
			async_waterfall(arr, function (path) {
				let mix = require(class_Uri.combine(process.cwd(), path));
				if (mix && mix.process) {
					return mix.process();
				}
			}).then(() => resolve(...args), reject);
		})
	}
};
