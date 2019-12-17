import { TestHelper } from '../TestHelper';
import { Bundler } from '../../src/Bundler'


UTest({
    $before() {
        Bundler.clearCache();
    },
    $teardown() {
        Bundler.clearCache();
    },
    $config: {
        breakOnError: true
    },
    'should rebuild on changed cb call': {
        $before() {
            let files = this.files = {};
            TestHelper.registerFiles({
                'mainWatch.js': `
					module.exports = {
						letters: require('./data/fooWatch.js')
					};
				`,
                'data/fooWatch.js': `
					module.exports = 'Foo';
				`,
            }, {
                watch(cb) {
                    files[this.filename] = this;
                    this.watcher = cb;
                }
            });
        },
        async 'should rewrite path to load file from local app base path'() {
            let opts = {
                package: {
                    module: <any>'commonjs',
                    commonjs: {
                        output: 'simplified'
                    }
                },
                silent: true,
                watch: true
            };
            let bundler = new Bundler('mainWatch.js', opts);
            let resources = await bundler.build(opts);

            eq_(resources.length, 1);
            var main = resources[0];

            eq_(main.url, '/build/release/mainWatch.js');

            var module = {} as any;
            eval(main.content);
            deepEq_(module.exports.letters, 'Foo');

            eq_(Object.keys(this.files).length, 2);


            bundler.on('rebuild', assert.await((resources) => {
                eq_(resources.length, 1);
                var main = resources[0];

                var module = {} as any;
                eval(main.content);
                deepEq_(module.exports.letters, 'Foo2');
            }));

            var file = this.files['data/fooWatch.js'];
            file.write(`module.exports = 'Foo2'`);
            file.watcher();
        }
    }
});