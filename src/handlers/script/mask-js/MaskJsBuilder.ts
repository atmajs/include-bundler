import { BaseScriptBuilder } from "../base/BaseScriptBuilder";
import { Resource } from "../../../class/Resource";
import { CommonJsBuilder } from '../common-js/CommonJsBuilder';

export class MaskJsBuilder extends BaseScriptBuilder {

    wrapModule (resource: Resource) {
        let builder = new CommonJsBuilder(this.solution, this.handler);

        let footer = Templates
            .footer
            .replace('%URL%', () => resource.url);


        let content = builder.wrapModule(resource, null, null, {
            partials: {
                footer
            }
         });
        return content;

        // return Templates
        //     .module
        //     .replace('%URL%', () => resource.url)
        //     .replace('%CONTENT%', () => content);
    }

    accepts (resource: Resource) {
        return resource.type === 'js' && resource.getModule() === 'mask';
    }

};

var Templates = {
    module: `
    var exports = {};
    var module = { exports: exports };

    %CONTENT%

    ;(function(exports, Module){
        var endpoint = new Module.Endpoint('%URL%', 'script');
        Module.registerModule(exports, endpoint);
    }(module.exports, mask.Module));
`, footer: `
    ;(function(exports, Module){
        var endpoint = new Module.Endpoint('%URL%', 'script');
        Module.registerModule(exports, endpoint);
    }(module.exports, mask.Module));
`
}
