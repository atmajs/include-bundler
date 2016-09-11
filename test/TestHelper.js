var TestHelper = {
	/*
	 * { path: content }
	 */
	registerFiles (Files) {
		io.File.disableCache();
		Object.keys(Files).forEach(key => {
			var rgx = new RegExp(key, 'i');
			var Factory = io.File.getFactory();
			Factory.unregisterHandler(rgx);
			Factory.registerHandler(rgx, Class({
				exists () { return true },
				read () { return Files[key] }
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