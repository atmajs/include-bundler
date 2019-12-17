import { Bundler } from '../../src/Bundler'

UTest({
	'should parse single commonjs' () {
        let code = `
            const foo = require('foo');
            class Foo {
                name (...args) {
                    console.log(args);
                }
            }
        `
		return parse(code,
			[ {type: 'js', url: 'foo', module: 'commonjs'} ]
		);
	},
    'parser should fail' (done) {
        let code = `
            const foo = require('foo');
            classy Foo {
                name (...args) {
                    console.log(args);
                }
            }
        `
        Bundler.Parser.getDependencies(code).then(assert.avoid(), error => {
            has_(error.message, 'Foo');
            done();
        });
    }
});

function parse (code, expect) {
	return Bundler.Parser.getDependencies(code).then(result => {
		var deps = result.dependencies;
		eq_(deps.length, expect.length)

		deps.forEach((x, index) => {
			has_(x, expect[index]);
		});
	});
}