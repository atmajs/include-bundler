import { TestHelper } from '../TestHelper';
import { Bundler } from '../../src/Bundler'


var Files = {
    'main.js': `
		module.exports = {
			letters: require('./data/letterA.js')
		};
	`,
    'data/letterA.js': `
		module.exports = ['A'];
    `,
    'data/letterB.js': `
		module.exports = ['B'];
	`,
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
    async 'should bundle commonjs scripts'() {
        // let resources = await Bundler.build('main.js', {
        //     silent: true,
        //     package: {
        //         module: 'commonjs'
        //     },
        // });

        // eq_(resources.length, 1);
        // var main = resources[0];

        // eq_(main.url, '/build/release/main.js');

        // var module = global.module = {} as any;
        // global.eval(main.content);
        // deepEq_(module.exports.letters, ['A']);
        return Bundler.build('main.js', {
            silent: true,
            package: {
                module: 'commonjs'
            },
            rewrites: {
                '/data/letterA.js' : '/data/letterB.js'
            }
        }).done(resources => {
            eq_(resources.length, 1);
            var main = resources[0];

            eq_(main.url, '/build/release/main.js');

            var module = global.module = {} as any;
            global.eval(main.content);
            deepEq_(module.exports.letters, ['B']);
        });
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
