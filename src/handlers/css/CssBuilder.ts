import { OutputItem } from '../../class/OutputResources';
import { BaseBuilder } from "../base/BaseBuilder";

export class CssBuilder extends BaseBuilder {

    createModule (outputItem: OutputItem) {
        let out = outputItem
            .resources
            .map(res => {
                this.solution.assetsManager.rewriteAssets(res, outputItem.resource, this.solution);
                return res.content;
            });

        outputItem.resource.content = out.join('\n');
    }

    accepts (type) {
        return type === 'css';
    }

};

