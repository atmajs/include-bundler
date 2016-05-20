var async_map,
	async_whenAll;
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
	}
}());