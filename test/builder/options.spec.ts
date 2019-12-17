import { TestHelper } from '../TestHelper';
import { Bundler } from '../../src/Bundler'

UTest({
    'should define File middlewares': {
        $before() {
            TestHelper.registerFiles({
                'fscript.js': `
					module.exports = {
						letters: require('/test/fixtures/letter-replace.js')
					};
				`
            });
        },
        'should set and use File middleware'() {
            Bundler.io.File.middleware['test-replacer'] = {
                read: assert.await(function (file) {
                    file.content = file.content.replace('_A_', '|B|');
                })
            };
            return Bundler.build('fscript.js', {
                package: {
                    module: 'commonjs',
                },
                middlewares: {
                    js: ['test-replacer:read']
                },
                silent: true
            }).done(resources => {
                eq_(resources.length, 1);
                var main = resources[0];

                eq_(main.url, '/build/release/fscript.js');

                var module = {} as any;
                eval(main.content);
                deepEq_(module.exports.letters, ['|B|', 'b']);
            });

        }
    }
})