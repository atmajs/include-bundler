import { TestHelper } from '../TestHelper';
import { Bundler } from '../../src/Bundler'


var Files = {
    'la.js': `
        import './b'
        export const A = '[a]'
    `,
    'b.js': `
        const B = '[b]'
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
    'should inline import scripts'() {
        Bundler.io.File.registerExtensions({
            '.js': [
                [{ read() { throw Error('is read') } }, 'read']
            ]
        });
        return Bundler.build('la.js', {
            silent: true,
            package: {
                module: 'global',
            }
        }).done(resources => {
            eq_(resources.length, 1);
            var main = resources[0];
            eq_(main.url, '/build/release/la.js');
        });
    },
    // 'should get script resources for html'() {
    //     return Bundler
    //         .getResources('index.html', { silent: true })
    //         .then(arr => arr.map(x => x.toJSON(false)))
    //         .done(arr => {
    //             eq_(arr.length, 4);

    //             var paths = arr.map(x => x.url);
    //             deepEq_(paths, [
    //                 '/data/icons.js',
    //                 '/main.js',
    //                 '/global.js',
    //                 '/index.html']);

    //             var asModules = arr.map(x => x.asModules);
    //             deepEq_(asModules, [['commonjs'], ['commonjs'], ['global'], ['root']]);
    //         });
    // }
})