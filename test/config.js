module.exports = {
	suites: {
		'node': {
			env: [ 'lib/bundler.js::Bundler', 'test/TestHelper.js' ],
			tests: 'test/**.test'
		}
	}
}