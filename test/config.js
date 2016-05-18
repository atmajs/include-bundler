module.exports = {
	suites: {
		'node': {
			env: [ 'lib/bundler.js::Bundler' ],
			tests: 'test/**.test'
		}
	}
}