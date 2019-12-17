import { TestHelper } from '../TestHelper';
import { Bundler } from '../../src/Bundler'

var Files =  {
	'root.js': `
		include
			.mask('templates/root.mask')
			.css('./styles/reset.less', '/styles/main.less')
			.js('./scripts/helper')
			//.js('foo commented')
			.done(function(){ /* include.js('commented') */ });

		Foo.include.js('property accessor must be skipped from parser');
	`,
	'scripts/app.js': `
		include.js('./helper::Helper');
	`,
	'scripts/helper.js': `
		module.exports = 42;
	`,
	'templates/root.mask': `
		import from '../styles/app.css'
		import from '../scripts/app.js'
	`,
	'styles/app.css': `
		h4 { color: red; }
	`,
	'styles/reset.less': `
		html, body { padding: 0; }
	`,
	'styles/main.less': `
		body { background: green; }
	`
};
UTest({
	'should set default extensions': {
		$before () {
			TestHelper.registerFiles({
				'main.js': `
					require('./foo');
				`,
				'foo.ts': `
					console.log('foo');
				`
			});
			Bundler.clearCache();
		},
		$after () {
			new Bundler.Solution('', { defaultExtensions: {js: 'js'} });
		},
		'should set and use default `ts` extension for scripts' () {
			return Bundler.getResourceTree('main.js', { defaultExtensions: {js: 'ts'}, silent: true }).done(resource => {
				var expect = {
					url: '/main.js',
					type: 'js',
					resources: [{
						url: '/foo.ts',
						type: 'js',
						
					}]
				};
				has_(resource, expect);
			});
		}
	}
});