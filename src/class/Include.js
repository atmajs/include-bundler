var Include;
(function(){

	var lib = require('includejs/lib/include.node.module.js');
	var Routes = lib.includeLib.Routes();
	var PathResolver = lib.includeLib.PathResolver
	var config = {};

	Include = class_create({
		constructor: function (resource) {
			this.includes = [];
			if (resource) {
				this.url = resource.url;
				this.location = resource.location;
			}
		},
		include (type, mix) {
			var pckg = mix;
			if (typeof pckg === 'string' && arguments.length > 2) {
				pckg = Array.prototype.slice.call(arguments, 1);
			}

			Routes.each(type, pckg, (namespace, route) => {
				this.includes.push({
					type: type,
					url: class_Uri.combine(this.base, route.path),
					route: route,
					namespace: namespace,
					module: 'includejs'
				});
			});

			return this;
		},
		cfg: function() {
			if (arguments.length === 2) {
				var key = arguments[0],
					val = arguments[1];
				config[key] = val;
			}
			if (arguments.length === 1) {
				mask.obj.extend(config, arguments[0]);
			}
			var result = lib.include.cfg.apply(lib.include, arguments);
			return this;
		},
		setBase: function(path){
			this.base = path;
			return this;
		},
		routes: function(arg){
			if (arg == null){
				return Routes.getRoutes();
			}
			for (var key in arg) {
                Routes.register(key, arg[key], this);
			}
			return this;
		}
	});
	Include.getConfig = function () {
		return config;
	};


	['js', 'css', 'load', 'lazy', 'mask'].forEach(type => {
		Include.prototype[type] = function() {
			var mix = arguments.length > 1 ? Array.from(arguments) : arguments[0];
			return this.include(type, mix);
		};
	});

	Include.toJsonRoutes = function(){
		var result = {},
			routes = Routes.getRoutes();

		for (var key in routes) {
			result[key] = _join(routes[key]);
		}

		function _join(route) {
			var result = '';
			for (var i = 0, x, imax = route.length; i < imax; i++){
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

	Include.groupByType = res_groupByType;
	Include.PathResolver = PathResolver;
}());
