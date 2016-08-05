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
}