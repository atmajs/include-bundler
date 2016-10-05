#!/usr/bin/env node

loadConfig().then(process);


function loadConfig () {

	function load(sources) {
		return require('appcfg')
			.fetch(sources)
			.fail(error => {
				console.error('Configuration error', error.message);
				process.exit(1);
			})
			.then(x => x.toJSON());	
	}

	return load([
			{
				path: 'package.json',
				getterProperty: 'app-bundler',
				optional: true
			}
		])
		.then(json => {
			if (json.config) {
				return load([{ path: json.config }]);
			}
			return json;
		});
}

function process (config) {

	validate(config);

	var Bundler = require('./lib/bundler');
	var path = config.file,
		opts = config;

	if (opts.middlewares) {
		Bundler.Config.define('middlewares', opts.middlewares);
	}

	if (opts.configuration) {
		var Configurator = require(config.configuration);
		Configurator.process(Bundler).then(run);
		return;
	}

	run();

	function run () {
		Bundler
			.process(path, opts)
			.fail(error => {
				console.error('Failed: ', error);
				process.exit(1);
			})
			.done(x => console.log('Ready'));	
	}

	
}

function validate (config) {
	if (!config.file) {
		throw new Error('`file` property should contain path to the main entry point of the app');
	}
}