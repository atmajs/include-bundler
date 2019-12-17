import { TestHelper } from '../TestHelper';
import { Bundler } from '../../src/Bundler'

UTest({
    $before() {
        Bundler.clearCache();
    },
    $teardown() {
        Bundler.clearCache();
    },
    'should transform inner requires to vars': {
        $before() {
            TestHelper.registerFiles({
                'foo.js': `
					module.exports = {
						letters: 'Foo'
					};
				`
            });
        },
        'should run prebuild'() {
            return Bundler
                .build('foo.js', {
                    silent: true,
                    package: {
                        module: 'commonjs',
                        commonjs: {
                            output: 'simplified'
                        }
                    },
                    prebuild: [
                        '/test/scripts/prebuild-fixture.js'
                    ]
                })
                .done(resources => {

                    deepEq_((global as any).__prebuildFixture, [1, 2]);
                });
        }
    },
})