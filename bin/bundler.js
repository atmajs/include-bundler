#!/usr/bin/env node

loadConfig().then(process);


function loadConfig () {

	function load(sources) {
		return require('appcfg')
			.fetch(sources)
			.fail(error => {
				throw new Error('<app:configuration>', error);
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

	/** 
	 * Load atma env and its plugins. 
	 * TODO: remove atma dependency and extract io middlewares to standalone plugins
	 */

	require('atma');

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
			.fail(console.error)
			.done(x => console.log('Ready'));	
	}

	
}
