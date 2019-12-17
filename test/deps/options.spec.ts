import { Bundler } from '../../src/Bundler'

UTest({
    async 'should ignore dynamic dependencies'() {

        let code = `define(["foo", "bar"], function(){})`;

        let { dependencies } = await Bundler.Parser.getDependencies(code, {
            type: 'js',
            dynamicDependencies: ['foo']
        });

        eq_(dependencies.length, 1);
        eq_(dependencies[0].url, 'bar');
        eq_(dependencies[0].module, 'amd');
    }
});
