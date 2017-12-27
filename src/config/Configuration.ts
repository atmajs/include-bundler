import { FileActions } from './File'
import { io } from '../global'

export class Configuration {
	opts: any = {}
	

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
			io.File.registerExtensions(value, /* clean previous */ true);
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

	static get Instance (): Configuration {
		return _instance
	}
}

const _instance = new Configuration();
_instance.defineMany(FileActions);