import { path_combine } from './path';
import { io } from '../global'

export namespace Npm {
    export function resolveAppUrl (path: string, currentLocation: string, base: string) {
        
        let name = /^(@?[^\\\/]+)/.exec(path)[0];
        let resource = path.substring(name.length + 1);
        if (resource && hasExt(resource) === false) {
            resource += '.js';
        }
        while (path != null) {
            let dirname = path_combine(currentLocation, 'node_modules', name);
            let pckg = path_combine(dirname, 'package.json');
            if (io.File.exists(pckg)) {
                let json = io.File.read(pckg);
                if (json) {
                    let filename = combineMain(dirname, json.main);
                    if (base) {
                        let relative = io.env.currentDir.toRelativeString(base);
                        if (relative) {
                            filename = path_combine(relative, filename);
                        }
                    }
                    return filename;
                }
            }
            let next = currentLocation.replace(/[^\/]+\/?$/, '');
            if (next === currentLocation) {
                return null;
            }
            currentLocation = next;
        }
        return null;
    }


    function combineMain (cwd, filename) {
        if (filename == null) {
            filename = 'index.js';
        }
        if (hasExt(filename) === false) {
            filename += '.js';
        }
        var path = path_combine(cwd, filename);

        if (io.File.exists(path)) {
            return path;
        }
        
        console.log(`Entry File does not exist: ${filename}`);
    }
    function hasExt(path) {
        return /\.[\w]{1,8}($|\?|#)/.test(path);
    }
}