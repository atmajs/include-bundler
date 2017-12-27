import { res_getTreeInfo } from "./res";
import { class_Dfr } from "atma-utils";

export interface IWorkerInfo {
	action: () => class_Dfr
	message: (treeInfo: any, time: any) => string
	reporter: { 
		info: (message: string) => void
	}
}

let tree_async;
(function () {
	tree_async = function (workerInfo: IWorkerInfo) {
		let start = Date.now(),
			dfr = workerInfo.action(),
			reporter = workerInfo.reporter;

		dfr.done(resources => {
			let end = Date.now();
			let seconds = ((end - start) / 1000).toFixed(2);
			let treeInfo = res_getTreeInfo(resources);
			reporter
				.info(workerInfo.message(treeInfo, seconds));
			reporter
				.info(treeInfo.treeString);			
		})

		return dfr;
	};
}());

export {
	tree_async
};