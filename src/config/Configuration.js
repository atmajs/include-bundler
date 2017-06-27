class Configuration {
	constructor () {
		this.opts = {};
	}

	define (key, value) {
		let obj = this.opts[key];
		if (obj == null) {
			this.opts[key] = {
				default: value,
				value: value
			};
		} else {
			obj.value = value;
		}
		if (key === 'middlewares') {
			io.File.registerExtensions(value);
		}
	}

	defineMany (options) {
		for (var key in options) {
			this.define(key, options[key]);
		}
	}

	get (key) {
		var entry = this.opts[key];
		if (entry == null) {
			throw Error('Invalid configuration key: ' + key);
		}

		return entry.value || entry.default;
	}

	reset () {
		for (var key in this.opts) {
			var entry = this.opts[key];
			entry.value = entry.default;
		}
	}
}