var TestHelper = {
	/*
	 * { path: content }
	 */
	registerFiles (Files, Proto) {
		io.File.disableCache();
		Object.keys(Files).forEach(key => {
			var rgx = new RegExp(key, 'i');
			var Factory = io.File.getFactory();
			var content = Files[key];
			Factory.unregisterHandler(rgx);
			Factory.registerHandler(rgx, Class({
				Extends: Proto,
				filename: key,
				write (data) { content = data },
				exists () { return true },
				read () { return content }
			}));
		});
	},

	clearFiles (Files) {
		Object.keys(Files).forEach(key => {
			var rgx = new RegExp(key, 'i');
			var Factory = io.File.getFactory();
			Factory.unregisterHandler(rgx);
		});
	}
}