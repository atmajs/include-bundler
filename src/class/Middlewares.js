class Middlewares {
	constructor () {
		this.runners = {};
	}

	define (name, fn) {
		var fns = this.runners[name];
		if (fns == null) {
			fns = this.runners[name] = [];
		}

		fns.push(fn)
	}

	run (name, ...args) {
		var dfr = new class_Dfr;
		var fns = this.runners[name];
		if (fns == null || fns.length === 0) {
			return dfr.resolve();
		}

		var arr = fns.slice();
		function next () {
			if (arr.length === 0) {
				dfr.resolve();
				return;
			}
			var fn = arr.shift();
			var result = fn.call(null, ...args);
			if (result && result.then) {
				result.then(next, next);
				return;
			}
			next();
		}
		return dfr;
	}
}

var _middlewares = new Middlewares;