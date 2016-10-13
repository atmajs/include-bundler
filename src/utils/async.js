var async_map,
	async_whenAll,
	async_resolve,
	async_reject,
	async_await,
	async_waterfall;
(function(){
	async_map = function(arr, mapper) {
		var out = new Array(arr.length);
		var dfr = new class_Dfr;
		var errored = false;
		var wait = arr.length;
		if (wait === 0) {
			return dfr.resolve(out);
		}
		arr.forEach((x, i) => {
			if (x == null) {
				set(null, i);
				return;
			}
			var mix = mapper(x);
			if (mix == null || mix.then == null) {
				set(mix, i);
				return;
			}
			mix.then(x => set(x, i), error => {
				errored = true;
				dfr.reject(error);
			});
		});
		function set(value, i) {
			if (errored) {
				return;
			}
			out[i] = value;
			if (--wait === 0) {
				dfr.resolve(out);
			}
		}
		return dfr;
	};

	async_waterfall = function(arr, mapper) {
		var out = new Array(arr.length);
		var dfr = new class_Dfr;
		var i = -1;

		next();
				
		function next () {
			if (++i >= arr.length) {
				dfr.resolve(out);
				return;
			}
			var x = arr[i];
			if (x == null) {
				set(null, i);
				next();
				return;
			}
			var mix = mapper(x);
			if (mix == null || mix.then == null) {
				set(mix, i);
				next();
				return;
			}
			mix.then(x => {
				set(x, i);
				next();
			}, error => {
				dfr.reject(error);
			});
		}
		function set(value, i) {
			out[i] = value;			
		}
		return dfr;
	};

	async_whenAll = function(mix){
		var arr = Array.isArray(mix) ? mix : Array.from(arguments);
		var out = new Array(arr.length);
		var dfr = new class_Dfr;
		var errored = false;
		var wait = arr.length;
		if (wait === 0) {
			return dfr.resolve(out);
		}
		arr.forEach((x, i) => {
			if (x == null) {
				set(null, i);
				return;
			}
			var mix = x;
			if (mix == null || mix.then == null) {
				set(mix, i);
				return;
			}
			mix.then(x => set(x, i), error => {
				errored = true;
				dfr.reject(error);
			});
		});
		function set(value, i) {
			if (errored) {
				return;
			}
			out[i] = value;
			if (--wait === 0) {
				dfr.resolve(out);
			}
		}
		return dfr;
	};

	async_resolve = function(...args){
		return (new class_Dfr()).resolve(...args);
	};
	async_reject = function(...args){
		return (new class_Dfr()).reject(...args);
	};

	async_run = function(fn) {
		if (fn.length === 0) {
			var result = fn();
			if (result && result.then)
				return result;

			return async_resolve();
		}
		return class_Dfr.run((resolve, reject) => {
			fn(resolve, reject);
		});
	}
}());