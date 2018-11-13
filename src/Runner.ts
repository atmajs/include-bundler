import { Bundler } from './Bundler'
import { ensureBundlesConfig, IBundle, IMultiBundle } from './config/MultiBundle'
import { ISolutionOptions } from './class/SolutionOpts';


interface IBundlerFunction {
    (path: string, opts: ISolutionOptions): PromiseLike<any>;
}
export interface IBundleResult {
    name: string
    result?: any
    error?: Error
}

function mainBundlerFunction (path: string, opts: ISolutionOptions) {
    return Bundler.process(path, opts);
}

export namespace Runner {

    export function run (config: IMultiBundle | IBundle, bundleFn: IBundlerFunction = mainBundlerFunction): PromiseLike<IBundleResult[]> {
        let bundles = ensureBundlesConfig(config);

        return processMany(bundles, bundleFn)
    }
    
    function processMany(bundles: IBundle[], bundleFn: IBundlerFunction): PromiseLike<IBundleResult[]> {
        let i = -1,
            imax = bundles.length,
            hasWatcher = bundles.some(x => x.watch),
            results: IBundleResult[] = [];

        return new Promise((resolve, reject) => {
            next();

            function next() {
                if (++i >= imax) {
                    console.log('All done');
                    resolve(results);
                    return;
                }
                let bundle = bundles[i];
                processSingle(bundle, bundleFn).then(
                    function onComplete(val) {
                        let result = {
                            name: bundle.name || bundle.file,
                            result: val
                        };
                        results.push(result)
                        console.log(`Ready ${result.name}`);
                        next();
                    },
                    function onError(error) {
                        let result = {
                            name: bundle.name || bundle.file,
                            error: error
                        };
                        
                        console.error(`Failed ${result.name}`);
                        console.error(error);
                        results.push(result);
                        next();
                    }
                );
            }
        });
    }
    
    function processSingle(config: IBundle, bundleFn: IBundlerFunction) {
        validate(config);
        let path = config.file,
            opts = config;
        if (opts.middlewares) {
            Bundler.Config.define('middlewares', opts.middlewares);
        }
        Bundler.clearCache();
        
        if (opts.configuration) {
            var Configurator = require(config.configuration);
            return Configurator.process(Bundler).then(() => {
                return bundleFn(path, opts);
            });
        }
        return bundleFn(path, opts)
    }
    function validate(config) {
        if (!config.file) {
            throw new Error('`file` property should contain path to the main entry point of the app');
        }
    }

}


