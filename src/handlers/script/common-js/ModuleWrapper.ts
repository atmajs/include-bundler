import { Solution } from '../../../class/Solution';
import { Templates } from './templates/Templates';

export class ModuleWrapper {
    constructor (public solution: Solution) {

    }
    wrap (body: string) {
        var wrapper = this.solution.opts.package.moduleWrapper;
        switch (wrapper) {
            case 'iif':
                body = this.wrapWithIIF(body);
                break;
            case 'umd':
                body = this.wrapWithUMD(body);
                break;
            case 'custom':
                body = this.wrapWithCustom(body);
                break;
            case 'script':
                break;
            default:
                throw new Error('Uknown module wrapper: ' + wrapper);
        }
        return body;
    }

    private wrapWithIIF(body) {
        return Templates
            .RootModule
            .replace('%BUNDLE%', () => body);
    }

    private wrapWithUMD(body) {
        var opts = this.solution.opts.package;
        var name = opts.moduleName || '';
        return Templates
            .UMD
            .replace('%MODULE%', () => body)
            .replace('%NAME%', () => name)
            ;
    }
    private wrapWithCustom(body) {
        let opts = this.solution.opts.package;
        let template = Templates.load(opts.moduleWrapperCustomPath);

        return template
            .replace('/**MODULE**/', () => body)
            ;
    }
}