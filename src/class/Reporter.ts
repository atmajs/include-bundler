import { res_getTreeInfo } from '../utils/res'

export class IReporter {
	static create (opts) {
		if (opts.silent === true) {
			return new SilentReporter();
		}
		return new ConsoleReporter();
	}
};

class ConsoleReporter {
	error (...args) {
		console.error(...args);
	}
	warn (...args) {
		console.warn(...args);
	}
	log (...args) {
		console.log(...args);
	}
	info (...args) {
		console.info(...args);
	}
	print (x: string | Buffer) {
		process.stdout.write(x);
	}

	treeTime(action, messageProvider, resources) {
		var start = Date.now();
		var dfr = action();

		dfr.done(() => {
			var end = Date.now();
			var seconds = ((end - start) / 1000).toFixed(2);
			var treeInfo = res_getTreeInfo(resources);
			this
				.info(messageProvider(treeInfo));
			this
				.info(treeInfo.treeString);			
		})

		return dfr;
	}
}


class SilentReporter {
	error (...args) {
	}
	warn (...args) {
	}
	log (...args) {
	}
	info (...args) {
	}
	print (...args) {
	}

	treeTime(action, messageProvider, resources) {
		return action();
	}
}