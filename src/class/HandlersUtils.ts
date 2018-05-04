import { BaseHandler } from "../handlers/base/BaseHandler";
import { ResourceInfo } from "./ResourceInfo";

export const HandlersUtils = {
	findPathResolver (handlers: BaseHandler[], includeData: ResourceInfo) {
		var handler = handlers.find(x => x.pathResolver && x.pathResolver.accepts && x.pathResolver.accepts(includeData));
		return handler && handler.pathResolver;
	}
}