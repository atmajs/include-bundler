import { Directory } from 'atma-io'

const OUTPUT_DIR = 'test/cli/fixtures/build/';

UTest({
    $before () {
        Directory.remove(OUTPUT_DIR)
    },
    'should run builder' (done) {

        let { execFile } = require('child_process');

        execFile('node', [ 'index', '--file', 'index.html', '--base', 'test/cli/fixtures/'], (error, stdout) => {
            eq_(error, null);
            done();
        });

        
    },
    'should test build' () {
        return require('selenium-query')
            .load('file:///' + process.cwd() + '/test/cli/fixtures/build/release/index.html')
            .find('body')
            .text()
            .then(text => eq_(text.trim(), 'is-b'));
    }
})