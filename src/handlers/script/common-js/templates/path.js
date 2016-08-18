var path_getDir,
	path_resolveCurrent,
	path_normalize,
	path_resolveUrl,
	path_combine	
	;
(function(){
	var isNodeJS = typeof process !== 'undefined' 
		&& typeof window === 'undefined' 
		&& typeof navigator === 'undefined';

	path_getDir = function(path) {
		return path.substring(0, path.lastIndexOf('/') + 1);
	};

	(function(){
		var current_;		
		if (isNodeJS === false) {
			path_resolveCurrent = function(){
				if (current_ != null) return current_;

				var fn = 'baseURI' in global.document
						? fromBase
						: fromLocation;
				return (current_ = path_sliceFilename(fn()));
			};
			function fromBase() {
				var path = global.document.baseURI;
				var i = path.indexOf('?');
				return i === -1 ? path : path.substring(0, i);
			}
			function fromLocation() {
				return global.location.origin + global.location.pathname;
			}
		}
		else {
		
			path_resolveCurrent = function(){
				if (current_ != null) return current_;
				return (current_ = path_win32Normalize(__dirname));
			};
		}
	}());


	path_normalize = function(path) {
		var path_ = path
			.replace(new RegExp("\\\\\\\\", "g"), '/')
			// remove double slashes, but not near protocol
			.replace(new RegExp("([^:\\\\/])\\\\/{2,}", "g"), '$1/')
			// './xx' to relative string
			.replace(new RegExp("^\\\\.\\\\/"), '')
			// join 'xx/./xx'
			.replace(new RegExp("\\\\/\\\\.\\\\//", "g"), '/')
			;
		path_ = path_collapse(path_);		
		return path_;
	};
	path_resolveUrl = function(path, location) {
		var url = path_normalize(path);
		if (url[0] === '/') {
			url = path_combine(path_resolveCurrent(), url);
		} else if (rgx_PROTOCOL.test(url) === false) {
			url = path_normalize(path_combine(location || path_resolveCurrent(), url));
		}
		if (rgx_PROTOCOL.test(url) === false) {
			url = 'file://' + url;
		}
		return url;
	};
	
	path_combine = function() {
		var out = '',
			imax = arguments.length,
			i = -1, x;
		while ( ++i < imax ){
			x = arguments[i];
			if (!x)  continue;

			x = path_normalize(x);
			if (out === '') {
				out = x;
				continue;
			}
			if (out[out.length - 1] !== '/') {
				out += '/'
			}
			if (x[0] === '/') {
				x = x.substring(1);
			}
			out += x;
		}
		return path_collapse(out);
	};

	var rgx_PROTOCOL = /^(file|https?):/i,
		rgx_SUB_DIR  = new RegExp("[^\\\\/\\\\.]+\/\\\\.\\\\.\\\\/"),
		rgx_FILENAME = new RegExp("\\\\/[^\\\\/]+\\\\.\\\\w+(\\\\?.*)?(#.*)?$"),
		rgx_EXT      = new RegExp("\\\\.(\\\\w+)$"),
		rgx_win32Drive = new RegExp("(^\\\\/?\\\\w{1}:)(\\\\/|$)")
		;

	function path_win32Normalize (path){
		path = path_normalize(path);
		if (path.substring(0, 5) === 'file:')
			return path;

		return 'file://' + path;
	}

	function path_collapse(url_) {
		var url = url_;
		while (rgx_SUB_DIR.test(url)) {
			url = url.replace(rgx_SUB_DIR, '');
		}
		return url;
	}
	function path_ensureTrailingSlash(path) {
		if (path.charCodeAt(path.length - 1) === 47 /* / */)
			return path;

		return path + '/';
	}
	function path_sliceFilename(path) {
		return path_ensureTrailingSlash(path.replace(rgx_FILENAME, ''));
	}

}());
