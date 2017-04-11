class IReporter {
	static create () {
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
	print (...args) {
		process.stdout.write(...args);
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