const Bundler = require('./bundler');


const io = global.io;
const lib = process.argv.some(x => /cli/.test(x)) ? 'cli' : 'api';

build();


function build () {
    const file = lib === 'api' ? 'src/api.ts' : 'src/cli.ts'
	const options = {
        type: 'js',
        outputMain: lib === 'api' ? 'lib/bundler.js' : 'lib/cli.js',
        middlewares: {
            'ts': ['atma-io-middleware-importer:read', 'atma-loader-ts:read'],
            'js': ['atma-io-middleware-importer:read']
        },
        defaultExtensions: {
            "js": "ts"
        },
        package: {
            "module": "commonjs",
            "moduleName": "bundler",
            "moduleWrapper": "script",
            "commonjs": {
                "output": "simplified"
            }
        },
        dynamicDependencies: [
            "assert",
            "maskjs",
            "atma-io",
            "atma-logger",
            "appcfg",
            "cheerio",
            "includejs",
            "uglify-es",
            "atma-utils"
        ],
        watch: process.argv.some(x => /watch/.test(x))
    };
	return Bundler
		.clearCache()
		.process(file, options)
		.fail(error => {
			console.error('Failed: ', error);
			process.exit(1);
		})
		.done(x => {
			
			logger.log(lib, `Done`.green)
		});
}
