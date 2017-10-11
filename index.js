#!/usr/bin/env node

var Bundler = require('./lib/bundler');

loadConfig().then(processConfig);


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

function processConfig (rootConfig) {
	if (rootConfig.apps) {
		let common = rootConfig.common || {};

		let bundles = Object.keys(rootConfig.apps).map(name => {
			let config = Object.assign({ name }, common, rootConfig.apps[name]);
			return config;
		});
		processBundles(bundles);
		return;
	}
	processBundles([ rootConfig ])
}
function processBundles (bundles) {
	var i = -1,
		imax = bundles.length,
		hasWatcher = bundles.some(x => x.watch);

	next();

	function next () {
		if (++i >= imax) {
			console.log('All done');
			return;
		}
		let bundle = bundles[i];
		processBundle(bundle).then(
			function onComplete () {
				console.log(`Ready ${bundle.name || bundle.file}`);
				next();
			},
			function onError (error) {
				console.error(`Failed ${bundle.name || bundle.file}`);
				console.error(error);
				next();				
			}
		);		
	}
}
function processBundle (config) {	
	validate(config);
	var path = config.file,
		opts = config;
	if (opts.middlewares) {
		Bundler.Config.define('middlewares', opts.middlewares);
	}
	if (opts.configuration) {
		var Configurator = require(config.configuration);
		return Configurator.process(Bundler).then(() => {
			return Bundler.process(path, opts);
		});
	}
	return Bundler.process(path, opts)
}
function validate (config) {
	if (!config.file) {
		throw new Error('`file` property should contain path to the main entry point of the app');
	}
}

