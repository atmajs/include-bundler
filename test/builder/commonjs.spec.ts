import { TestHelper } from '../TestHelper';
import { Bundler } from '../../src/Bundler'

var Files = {
    'main.js': `
		module.exports = {
			letters: require('./data/icons.js')
		};
	`,
    'data/icons.js': `
		module.exports = ['a', 'b'];
	`,
    'global.js': `
		var data = require('main.js');
		function getData () {
			return data;
		}
	`,
    'index.html': `
		<!doctype html>
		
		<script src='jquery.js' data-bundler='ignore'></script>
		<script src='global.js'></script>
	`
};

UTest({
    $before() {
        TestHelper.registerFiles(Files);
        Bundler.clearCache();
    },
    $after() {
        TestHelper.clearFiles(Files);
    },
    $teardown() {
        Bundler.clearCache();
    },
    $config: {
        breakOnError: true
    },
    'should bundle commonjs scripts'() {
        return Bundler.build('main.js', {
            silent: true,
            package: {
                module: 'commonjs'
            },
        }).done(resources => {
            eq_(resources.length, 1);
            var main = resources[0];

            eq_(main.url, '/build/release/main.js');

            var module = {} as any;
            eval(main.content);
            deepEq_(module.exports.letters, ['a', 'b']);
        });
    },
    'should get script resources for html'() {
        return Bundler
            .getResources('index.html', { silent: true })
            .then(arr => arr.map(x => x.toJSON(false)))
            .done(arr => {
                eq_(arr.length, 4);

                var paths = arr.map(x => x.url);
                deepEq_(paths, [
                    '/data/icons.js',
                    '/main.js',
                    '/global.js',
                    '/index.html']);

                var asModules = arr.map(x => x.asModules);
                deepEq_(asModules, [['commonjs'], ['commonjs'], ['global'], ['root']]);
            });
    },
    'should bundle scripts in html page'() {
        return Bundler.build('index.html', {
            package: {
                module: 'commonjs',
            },
            silent: true,
        }).done(resources => {

            eq_(resources.length, 2);
            eq_(resources[0].type, 'js');
            var script = resources[0];
            var getData;

            global.eval(script.content);
            eq_(typeof getData, 'function');
            deepEq_(getData(), {
                letters: ['a', 'b']
            });

            eq_(resources[1].type, 'html');
            eq_(resources[1].url, '/build/release/index.html');
            has_(resources[1].content, 'src="main_index.js"');
        });
    },
    'should bundle scripts in html with overriden mainOutputPath'() {
        return Bundler.build('index.html', {
            package: {
                module: 'commonjs',
            },
            outputMain: '{filename}.{build}.{ext}',
            silent: true,
        }).done(resources => {
            eq_(resources[1].url, '/index.release.html');
            has_(resources[1].content, 'src="build/release/main_index.js"');
        });
    }
})