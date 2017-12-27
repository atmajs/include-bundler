import { Bundler } from './Bundler'
import { ISolutionOptions } from './class/SolutionOpts'
import * as config from 'appcfg'

export = function run () {
    Config
        .load()
        .then(Config.prepair)
        .then(Process.processMany);
}

interface IExternalConfig {
    config: string
}
interface IConfig extends ISolutionOptions {
    file: string
    name?: string
    configuration?: string
}

interface IAppsConfig {
    apps: {
        [appName: string]: IConfig
    }
    common?: ISolutionOptions
}

namespace Config {
    function doLoad(sources) {
        return config
            .fetch(sources)
            .fail(error => {
                console.error('Configuration error', error.message);
                process.exit(1);
            })
            .then(x => x.toJSON());
    }

    export function isMultiConfig(config: any): config is IAppsConfig {
        return config.apps != null;
    }

    export function load() {
        return doLoad([{
            path: 'package.json',
            getterProperty: 'app-bundler',
            optional: true
        }])
            .then(json => {
                if (json.config) {
                    return doLoad([{ path: json.config }]);
                }
                return json;
            });
    }
    export function prepair(config: IAppsConfig | ISolutionOptions): ISolutionOptions[] {
        if (isMultiConfig(config)) {

            let common = config.common || {};

            let bundles = Object.keys(config.apps).map(name => {
                return Object.assign({ name }, common, config.apps[name]);
            });
            return bundles;
        }
        return [config];
    }
}

namespace Process {
    
    export function processMany(bundles: IConfig[]) {
        let i = -1,
            imax = bundles.length,
            hasWatcher = bundles.some(x => x.watch);

        next();

        function next() {
            if (++i >= imax) {
                console.log('All done');
                return;
            }
            let bundle = bundles[i];
            processSingle(bundle).then(
                function onComplete() {
                    console.log(`Ready ${bundle.name || bundle.file}`);
                    next();
                },
                function onError(error) {
                    console.error(`Failed ${bundle.name || bundle.file}`);
                    console.error(error);
                    next();
                }
            );
        }
    }
    
    function processSingle(config: IConfig) {
        validate(config);
        let path = config.file,
            opts = config;
        if (opts.middlewares) {
            Bundler.Config.define('middlewares', opts.middlewares);
        }
        if (opts.configuration) {
            var Configurator = require(config.configuration);
            return Configurator.process(Bundler).then(() => {
                return Bundler.process(path, opts);
            });
        }
        return Bundler.process(path, opts)
    }
    function validate(config) {
        if (!config.file) {
            throw new Error('`file` property should contain path to the main entry point of the app');
        }
    }

}


