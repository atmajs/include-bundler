var tree_async;
(function () {
	tree_async = function (workerInfo) {
		var start = Date.now(),
			dfr = workerInfo.action(),
			reporter = workerInfo.reporter;

		dfr.done(() => {
			var end = Date.now();
			var seconds = ((end - start) / 1000).toFixed(2);
			var treeInfo = res_getTreeInfo(workerInfo.resources);
			reporter
				.info(workerInfo.message(treeInfo, seconds));
			reporter
				.info(treeInfo.treeString);			
		})

		return dfr;
	};
}());