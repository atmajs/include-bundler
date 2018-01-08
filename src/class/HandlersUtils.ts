import { BaseHandler } from "../handlers/base/BaseHandler";
import { IDependency } from "./IDependency";

export const HandlersUtils = {
	findPathResolver (handlers: BaseHandler[], includeData: IDependency) {
		var handler = handlers.find(x => x.pathResolver && x.pathResolver.accepts && x.pathResolver.accepts(includeData));
		return handler && handler.pathResolver;
	}
}