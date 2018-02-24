import { io } from '../global'

export const FileActions = {
	readFile (path, opts) {		
		return io.File.readAsync(path, opts)
	},
	writeFile (path, content, opts){
		return io.File.writeAsync(path, content, opts);
	},
	clearFileCache () {
		io.File.clearCache();
	}
};
