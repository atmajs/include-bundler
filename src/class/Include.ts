import { res_groupByType } from "../utils/res";
import { class_Uri } from 'atma-utils'
import { mask } from '../global'

var lib = require('includejs/lib/include.node.module.js');
var Routes = lib.includeLib.Routes();
var PathResolver = lib.includeLib.PathResolver
var config = {};

export class Include {
	includes: Include[] = []
	base: string
	url: string
	location: string
	type: string
	route: any
	namespace: string
	module: string
	pos?: number

	constructor(resource?: { url: string, location?: string }) {
		if (resource) {
			this.url = resource.url;
			this.location = resource.location;
		}
	}
	include(type, mix) {
		var pckg = mix;
		if (typeof pckg === 'string' && arguments.length > 2) {
			pckg = Array.prototype.slice.call(arguments, 1);
		}

		Routes.each(type, pckg, (namespace, route) => {
			let item = new Include();
			item.type = type;
			item.url = class_Uri.combine(this.base, route.path);
			item.route = route;
			item.namespace = namespace;
			item.module = 'includejs';
			this.includes.push(item);
		});

		return this;
	}
	cfg(...args) {
		if (args.length === 2) {
			var key = args[0],
				val = args[1];
			config[key] = val;
		}
		if (args.length === 1) {
			mask.obj.extend(config, args[0]);
		}
		var result = lib.include.cfg.apply(lib.include, args);
		return this;
	}
	setBase(path) {
		this.base = path;
		return this;
	}
	routes(arg) {
		if (arg == null) {
			return Routes.getRoutes();
		}
		for (var key in arg) {
			Routes.register(key, arg[key], this);
		}
		return this;
	}

	static getConfig() {
		return config;
	}

	static toJsonRoutes() {
		var result = {},
			routes = Routes.getRoutes();

		for (var key in routes) {
			result[key] = _join(routes[key]);
		}

		function _join(route) {
			var result = '';
			for (var i = 0, x, imax = route.length; i < imax; i++) {
				x = route[i];

				if (i % 2 === 0) {
					result += x;
					continue;
				}
				result += '{%1}'.format(x);
			}
			return result;
		}

		return result;
	};

	static groupByType = res_groupByType;
	static PathResolver = PathResolver;

	js: (x: any) => this
	css: (x: any) => this
	load: (x: any) => this
	lazy: (x: any) => this
	mask: (x: any) => this
};



['js', 'css', 'load', 'lazy', 'mask'].forEach(type => {
	Include.prototype[type] = function () {
		var mix = arguments.length > 1 ? Array.from(arguments) : arguments[0];
		return this.include(type, mix);
	};
});




