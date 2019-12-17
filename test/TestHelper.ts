import { File, Uri } from 'atma-io'

export const TestHelper = {
	/*
	 * { path: content }
	 */
	registerFiles (Files, Proto?) {
		File.disableCache();
		Object.keys(Files).forEach(key => {
			var rgx = new RegExp(key, 'i');
			var Factory = File.getFactory();
			var content = Files[key];
			Factory.unregisterHandler(rgx);
			Factory.registerHandler(rgx, Class({
				Extends: Proto,
                filename: key,
                uri: new Uri('atma:///file/' + key),
				write (data) { content = data },
				exists () { return true },
				read () { return content }
			}));
		});
	},

	clearFiles (Files) {
		Object.keys(Files).forEach(key => {
			var rgx = new RegExp(key, 'i');
			var Factory = File.getFactory();
			Factory.unregisterHandler(rgx);
		});
	}
}