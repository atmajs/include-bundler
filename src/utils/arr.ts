export function arr_flattern(arr) {
	var out = [];
	arr.forEach(x => {
		if (Array.isArray(x) === false) {
			out.push(x);
			return;
		}

		var flat = arr_flattern(x);
		out.push(...flat);
	});
	return out.filter(x => x != null);
};