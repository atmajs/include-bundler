_config.defineMany({
	readFile: function (path, opts) {
		return io.File.readAsync(path, opts)
	},
	writeFile: function(path, content, opts){
		return io.File.writeAsync(path, content, opts);
	}
});
