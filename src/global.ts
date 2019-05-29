let g = global as any;
let mask = require('maskjs');
let assert = require('assert');
let logger = require('atma-logger');
let io = g.io || require('atma-io');

/* Make compatible with previous atma-loaders */
g.Class = require('atma-class');


export {
    mask,
    assert,
    logger,
    io
};