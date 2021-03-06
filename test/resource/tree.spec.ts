import { TestHelper } from '../TestHelper';
import { Bundler } from '../../src/Bundler'

var Files =  {
	'foo-include.js': `
		include.js('./folder/bar-commonjs.js');
	`,
	'folder/bar-commonjs.js': `
		require('../qux.js');
	`,
	'main-amd.js': `
		require(["./foo-include"], function(){});
	`,
	'qux.js': `
		console.log('Wow');
	`
};
UTest({
	$before () {
		TestHelper.registerFiles(Files);
	},
	'should get resource tree from files' () {
		return Bundler.getResourceTree('main-amd.js', {silent: true}).done(resource => {

			var expect = {
				url: '/main-amd.js',
				resources: [{
					url: '/foo-include.js',
					resources: [{
						url: '/folder/bar-commonjs.js',
						resources: [{
							url: '/qux.js',
							resources: []
						}]
					}]
				}]
			};
			has_(resource, expect);
		})
	},
	'should flattern tree' () {
		return Bundler.getResources('main-amd.js', {silent: true}).done(resources => {
			var urls = resources.map(x => x.url);
			deepEq_(urls, [
				'/qux.js',
				'/folder/bar-commonjs.js',
				'/foo-include.js',
				'/main-amd.js',
			]);
		})
	}
});