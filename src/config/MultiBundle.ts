import { ISolutionOptions } from '../class/SolutionOpts'
import { obj_setProperty } from 'atma-utils';
import { obj_deepExtend } from '../utils/obj';


export interface IBundle extends ISolutionOptions {
    file: string
    name?: string
    configuration?: string
}


export interface IMultiBundle {
    apps: {
        [appName: string]: IBundle
    }
    common?: ISolutionOptions
}


export function ensureBundlesConfig (config: IMultiBundle | IBundle): IBundle[] {
    if (isMultiConfig(config)) {

        let common = config.common || {};
        let bundles = Object.keys(config.apps).map(name => {
            let obj: ISolutionOptions = <any> { name };
            obj_deepExtend(obj, common);
            obj_deepExtend(obj, config.apps[name]);

            for (let key in config) {
                if (key === 'apps' || key === 'common') {
                    continue;
                }
                let prop = key;
                let dot = prop.indexOf('.');
                if (dot === -1) {
                    obj[prop] = config[prop];
                    continue;
                }                    
                let hostName = key.substring(0, dot);
                if (hostName in config.apps) {
                    if (hostName !== name) {
                        continue;
                    }
                    prop = prop.substring(dot + 1);
                }
                obj_setProperty(obj, prop, config[key]);
            }
            return obj;
        });
        return bundles;
    }
    return [config];
}

function isMultiConfig(config: any): config is IMultiBundle {
    return config.apps != null;
}