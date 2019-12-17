import { BaseScriptBuilder } from "../base/BaseScriptBuilder";
import { OutputItem } from "../../../class/OutputResources";
import { Resource } from "../../../class/Resource";
import { class_Uri } from "atma-utils";
import { path_isRelative } from "../../../utils/path";
import { ModuleWrapper } from '../common-js/ModuleWrapper';
import { Templates } from '../common-js/templates/Templates';
import { template_interpolate, template_stringifyContent } from '../../../utils/template';

export class GlobalJsBuilder extends BaseScriptBuilder {

    wrapModule(resource: Resource, outputItem: OutputItem) {
        let { content, dependencies } = resource;
        let offset = 0;

        dependencies && dependencies.filter(x => x.pos != null && path_isRelative(x.url)).forEach(dep => {

            let resUrl = new class_Uri(resource.url);
            let resDep = new class_Uri(dep.url);


            let url = resUrl.combine(resDep as any).toLocalFile();

            let start = dep.pos + offset + 1;
            let c = content[start - 1];
            let end = content.indexOf(c, start);

            let oldLength = end - start;
            let newLength = url.length;

            content = content.substring(0, start) + url + content.substring(end);
            offset += newLength - oldLength;
        })

        return content;
    }

    buildRoot(root: Resource, outputDependencies: Resource[]) {
        outputDependencies.forEach(x => x.embed = true);

        let content = this.getRootContent(root, outputDependencies);
        let body = outputDependencies
            .map(x => {
                let content = x.content;
                if (x.type === 'css') {
                    content = template_interpolate(Templates.Style, { body: template_stringifyContent(content), url: x.url });
                }
                if (x.type === 'mask') {
                    throw new Error('Mask modules are not implemented for global modules');
                }
                return content;
            })
            .concat([content])
            .join('\n');


        var wrapper = new ModuleWrapper(this.solution);
        root.content = wrapper.wrap(body);
    }

    getRootContent(root, outputDependencies?) {
        return root.content;
    }

    accepts(resource: Resource) {
        if (resource.type !== 'js') {
            return false;
        }
        let module = resource.getModule();
        if (module == null || module === 'root') {
            module = this.solution.opts.package.module;
        }
        return module === 'global';
    }

};

