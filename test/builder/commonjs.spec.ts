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

            var module = global.module = {} as any;
            global.eval(main.content);
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
    },
    'should build cyclic':  {
        $before () {
            this.files = {
                'foo.js': `
                    const bar = require('./bar');

                    let barExport = bar.ForFoo();
                    module.exports =  {
                        Foo1 () {
                            return barExport;
                        }
                    };
                `,
                'bar.js': `
                    const foo = require('./foo');
                    module.exports = {
                        ForFoo () {
                            return 'bar';
                        },
                        ForExport () {
                            return foo.Foo1();
                        }
                    };
                `
            };
            TestHelper.registerFiles(this.files);
        },
        $after () {
            TestHelper.clearFiles(this.files);
        },
        $teardown () {
            Bundler.clearCache();
        },
        async 'cyclic scoped reference' () {
            let content = `module.exports = require('./bar');`;
            let code = await Helpers.$process(content, {
                dependencies: {
                    'foo.js': 'bar.js'
                }
            });
            let result = Helpers.$eval(code);
            eq_(result.ForExport(), 'bar');
        }
    },
})



namespace Helpers {
    export async function $process (str: string, opts = {}) {
        let resources = await Bundler.build('main.js', {
            mainContent: str,
            silent: true,
			package: {
                module: 'commonjs',
                commonjs: {
                    output: 'simplified'
                }
            },
            ...opts
        });

        return resources[0].content;
    }
    export function $eval(code): any {
        let module = { exports: {} };
        let fn = new Function('module', code);
        fn(module);
        return module.exports;
    }
}
