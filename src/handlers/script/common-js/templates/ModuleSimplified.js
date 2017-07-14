var %VAR_ID%;
(function () {
	var exports = {};
	var module = { exports: exports };
	%MODULE%;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(%VAR_ID%) && isObject(module.exports)) {
		Object.assign(%VAR_ID%, module.exports);
		return;
	}
	%VAR_ID% = module.exports;
}());