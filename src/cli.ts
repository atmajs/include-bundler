import * as config from 'appcfg'
import { Runner } from './Runner';


export = function run () {
    Config
        .load()
        .then(config => Runner.run(config));
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
   
}
