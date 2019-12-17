import { Bundler } from '../../src/Bundler'
import { class_Dfr } from 'atma-utils'

UTest({
	'should parse imports' : {
		'should parse mask, js and css imports' () {

			return parse(`import from './foo'; import Bar from '/compos/bar.js'; import from '/main.less'`, [ 
				{type: 'mask', url: './foo.mask', module: 'mask'},
				{type: 'js', url: '/compos/bar.js', module: 'mask'},
				{type: 'css', url: '/main.less', module: 'mask'}
			]);
		},
		'should parse with page' () {
			return parse(`View name='about' { import from './my'; }`, [ 
				{page: 'about', type: 'mask', url: './my.mask', module: 'mask'}
			]);
		},
		'should parse namespace' () {
			return parse(`import Foo from Services.Foos; import Button from controls is mask`, [ 
				{type: 'js', url: '/Services/Foos/Foo.js', module: 'mask'},
				{type: 'mask', url: '/controls/Button.mask', module: 'mask'}
			]);
		}
	}
});

function parse (code, expect) {
	var dfr = new class_Dfr();
	Bundler.Parser.getDependencies(code, { type: 'mask' }).then(result => {
		var deps = result.dependencies;
		eq_(deps.length, expect.length)

		deps.forEach((x, index) => {
			var url = expect[index].url;
			delete expect[index].url;
			has_(x, expect[index]);
			has_(x.url, url);
		})

		dfr.resolve();
	});
	return dfr;
}