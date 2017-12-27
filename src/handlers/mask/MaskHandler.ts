import { MaskRewriter } from './MaskRewriter';
import { MaskBuilder } from './MaskBuilder';
import { MaskPathResolver } from './MaskPathResolver';
import { BaseHandler } from "../base/BaseHandler";
import { MaskParser } from "./MaskParser";
import { mask } from '../../global'

export class MaskHandler extends BaseHandler {
	
	static Parser = MaskParser
	static Rewriter = MaskRewriter
	static Builder = MaskBuilder
	static PathResolver = MaskPathResolver

	resolvePath (includeData, parent) {
		var endpoint = {
			path: includeData.url
		};
		return mask.Module.resolvePath(endpoint, parent, parent, parent);
	}

	accepts (type) {
		return type === 'mask';
	}
	
};
