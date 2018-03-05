import { path_toRelative } from "../../src/utils/path";

UTest({
    'relative': {
        'should return relative to root as no common base is present' () {
            let a = '/qux/baz/doom.png'
            let b = '/foo/bar';

            eq_(path_toRelative(a, b), '../../qux/baz/doom.png');
        },
        'should return relative to common folder' () {
            let a = '/foo/baz/doom.png'
            let b = '/foo/bar';

            eq_(path_toRelative(a, b), '../baz/doom.png');
        },
        'should return relative to full common path' () {
            let a = '/foo/baz/doom.png'
            let b = '/foo/baz';

            eq_(path_toRelative(a, b), 'doom.png');
        }
    } 
})