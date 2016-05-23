// source ../node_modules/atma-utils/lib/utils.embed.js
// source /src/refs.js
var _Array_slice = Array.prototype.slice,
	_Array_splice = Array.prototype.splice,
	_Array_indexOf = Array.prototype.indexOf,

	_Object_create = null, // in obj.js
	_Object_hasOwnProp = Object.hasOwnProperty,
	_Object_getOwnProp = Object.getOwnPropertyDescriptor,
	_Object_defineProperty = Object.defineProperty;

// end:source /src/refs.js

// source /src/coll.js
var coll_each,
	coll_remove,
	coll_map,
	coll_indexOf,
	coll_find;
(function(){
	coll_each = function(coll, fn, ctx){
		if (ctx == null)
			ctx = coll;
		if (coll == null)
			return coll;

		var imax = coll.length,
			i = 0;
		for(; i< imax; i++){
			fn.call(ctx, coll[i], i);
		}
		return ctx;
	};
	coll_indexOf = function(coll, x){
		if (coll == null)
			return -1;
		var imax = coll.length,
			i = 0;
		for(; i < imax; i++){
			if (coll[i] === x)
				return i;
		}
		return -1;
	};
	coll_remove = function(coll, x){
		var i = coll_indexOf(coll, x);
		if (i === -1)
			return false;
		coll.splice(i, 1);
		return true;
	};
	coll_map = function(coll, fn, ctx){
		var arr = new Array(coll.length);
		coll_each(coll, function(x, i){
			arr[i] = fn.call(this, x, i);
		}, ctx);
		return arr;
	};
	coll_find = function(coll, fn, ctx){
		var imax = coll.length,
			i = 0;
		for(; i < imax; i++){
			if (fn.call(ctx || coll, coll[i], i))
				return true;
		}
		return false;
	};
}());

// end:source /src/coll.js

// source /src/polyfill/arr.js
if (Array.prototype.forEach === void 0) {
	Array.prototype.forEach = function(fn, ctx){
		coll_each(this, fn, ctx);
	};
}
if (Array.prototype.indexOf === void 0) {
	Array.prototype.indexOf = function(x){
		return coll_indexOf(this, x);
	};
}

// end:source /src/polyfill/arr.js
// source /src/polyfill/str.js
if (String.prototype.trim == null){
	String.prototype.trim = function(){
		var start = -1,
			end = this.length,
			code;
		if (end === 0)
			return this;
		while(++start < end){
			code = this.charCodeAt(start);
			if (code > 32)
				break;
		}
		while(--end !== 0){
			code = this.charCodeAt(end);
			if (code > 32)
				break;
		}
		return start !== 0 && end !== length - 1
			? this.substring(start, end + 1)
			: this;
	};
}

// end:source /src/polyfill/str.js
// source /src/polyfill/fn.js

if (Function.prototype.bind == null) {
	var _Array_slice;
	Function.prototype.bind = function(){
		if (arguments.length < 2 && typeof arguments[0] === "undefined")
			return this;
		var fn = this,
			args = _Array_slice.call(arguments),
			ctx = args.shift();
		return function() {
			return fn.apply(ctx, args.concat(_Array_slice.call(arguments)));
		};
	};
}

// end:source /src/polyfill/fn.js

// source /src/is.js
var is_Function,
	is_Array,
	is_ArrayLike,
	is_String,
	is_Object,
	is_notEmptyString,
	is_rawObject,
	is_Date,
	is_NODE,
	is_DOM;

(function() {
	is_Function = function(x) {
		return typeof x === 'function';
	};
	is_Object = function(x) {
		return x != null && typeof x === 'object';
	};
	is_Array = is_ArrayLike = function(arr) {
		return arr != null
			&& typeof arr === 'object'
			&& typeof arr.length === 'number'
			&& typeof arr.slice === 'function'
			;
	};
	is_String = function(x) {
		return typeof x === 'string';
	};
	is_notEmptyString = function(x) {
		return typeof x === 'string' && x !== '';
	};
	is_rawObject = function(obj) {
		if (obj == null || typeof obj !== 'object')
			return false;

		return obj.constructor === Object;
	};
	is_Date = function(x) {
		if (x == null || typeof x !== 'object') {
			return false;
		}
		if (x.getFullYear != null && isNaN(x) === false) {
			return true;
		}
		return false;
	};
	is_DOM = typeof window !== 'undefined' && window.navigator != null;
	is_NODE = !is_DOM;

}());

// end:source /src/is.js
// source /src/obj.js
var obj_getProperty,
	obj_setProperty,
	obj_hasProperty,
	obj_extend,
	obj_extendDefaults,
	obj_extendMany,
	obj_extendProperties,
	obj_extendPropertiesDefaults,
	obj_create,
	obj_toFastProps,
	obj_defineProperty;
(function(){
	obj_getProperty = function(obj_, path){
		if ('.' === path) // obsolete
			return obj_;

		var obj = obj_,
			chain = path.split('.'),
			imax = chain.length,
			i = -1;
		while ( obj != null && ++i < imax ) {
			obj = obj[chain[i]];
		}
		return obj;
	};
	obj_setProperty = function(obj_, path, val) {
		var obj = obj_,
			chain = path.split('.'),
			imax = chain.length - 1,
			i = -1,
			key;
		while ( ++i < imax ) {
			key = chain[i];
			if (obj[key] == null)
				obj[key] = {};

			obj = obj[key];
		}
		obj[chain[i]] = val;
	};
	obj_hasProperty = function(obj, path) {
		var x = obj_getProperty(obj, path);
		return x !== void 0;
	};
	obj_defineProperty = function(obj, path, dscr) {
		var x = obj,
			chain = path.split('.'),
			imax = chain.length - 1,
			i = -1, key;
		while (++i < imax) {
			key = chain[i];
			if (x[key] == null)
				x[key] = {};
			x = x[key];
		}
		key = chain[imax];
		if (_Object_defineProperty) {
			if (dscr.writable	 === void 0) dscr.writable	 = true;
			if (dscr.configurable === void 0) dscr.configurable = true;
			if (dscr.enumerable   === void 0) dscr.enumerable   = true;
			_Object_defineProperty(x, key, dscr);
			return;
		}
		x[key] = dscr.value === void 0
			? dscr.value
			: (dscr.get && dscr.get());
	};
	obj_extend = function(a, b){
		if (b == null)
			return a || {};

		if (a == null)
			return obj_create(b);

		for(var key in b){
			a[key] = b[key];
		}
		return a;
	};
	obj_extendDefaults = function(a, b){
		if (b == null)
			return a || {};
		if (a == null)
			return obj_create(b);

		for(var key in b) {
			if (a[key] == null)
				a[key] = b[key];
		}
		return a;
	}
	var extendPropertiesFactory = function(overwriteProps){
		if (_Object_getOwnProp == null)
			return overwriteProps ? obj_extend : obj_extendDefaults;

		return function(a, b){
			if (b == null)
				return a || {};

			if (a == null)
				return obj_create(b);

			var key, descr, ownDescr;
			for(key in b){
				descr = _Object_getOwnProp(b, key);
				if (descr == null)
					continue;
				if (overwriteProps !== true) {
					ownDescr = _Object_getOwnProp(a, key);
					if (ownDescr != null) {
						continue;
					}
				}
				if (descr.hasOwnProperty('value')) {
					a[key] = descr.value;
					continue;
				}
				_Object_defineProperty(a, key, descr);
			}
			return a;
		};
	};

	obj_extendProperties		 = extendPropertiesFactory(true);
	obj_extendPropertiesDefaults = extendPropertiesFactory(false );

	obj_extendMany = function(a){
		var imax = arguments.length,
			i = 1;
		for(; i<imax; i++) {
			a = obj_extend(a, arguments[i]);
		}
		return a;
	};
	obj_toFastProps = function(obj){
		/*jshint -W027*/
		function F() {}
		F.prototype = obj;
		new F();
		return;
		eval(obj);
	};
	_Object_create = obj_create = Object.create || function(x) {
		var Ctor = function(){};
		Ctor.prototype = x;
		return new Ctor;
	};
}());

// end:source /src/obj.js
// source /src/arr.js
var arr_remove,
	arr_each,
	arr_indexOf,
	arr_contains,
	arr_pushMany;
(function(){
	arr_remove = function(array, x){
		var i = array.indexOf(x);
		if (i === -1)
			return false;
		array.splice(i, 1);
		return true;
	};
	arr_each = function(arr, fn, ctx){
		arr.forEach(fn, ctx);
	};
	arr_indexOf = function(arr, x){
		return arr.indexOf(x);
	};
	arr_contains = function(arr, x){
		return arr.indexOf(x) !== -1;
	};
	arr_pushMany = function(arr, arrSource){
		if (arrSource == null || arr == null || arr === arrSource)
			return;

		var il = arr.length,
			jl = arrSource.length,
			j = -1
			;
		while( ++j < jl ){
			arr[il + j] = arrSource[j];
		}
	};
}());

// end:source /src/arr.js
// source /src/fn.js
var fn_proxy,
	fn_apply,
	fn_doNothing,
	fn_createByPattern;
(function(){
	fn_proxy = function(fn, ctx) {
		return function(){
			return fn_apply(fn, ctx, arguments);
		};
	};

	fn_apply = function(fn, ctx, args){
		var l = args.length;
		if (0 === l)
			return fn.call(ctx);
		if (1 === l)
			return fn.call(ctx, args[0]);
		if (2 === l)
			return fn.call(ctx, args[0], args[1]);
		if (3 === l)
			return fn.call(ctx, args[0], args[1], args[2]);
		if (4 === l)
			return fn.call(ctx, args[0], args[1], args[2], args[3]);

		return fn.apply(ctx, args);
	};

	fn_doNothing = function(){
		return false;
	};

	fn_createByPattern = function(definitions, ctx){
		var imax = definitions.length;
		return function(){
			var l = arguments.length,
				i = -1,
				def;

			outer: while(++i < imax){
				def = definitions[i];
				if (def.pattern.length !== l) {
					continue;
				}
				var j = -1;
				while(++j < l){
					var fn  = def.pattern[j];
					var val = arguments[j];
					if (fn(val) === false) {
						continue outer;
					}
				}
				return def.handler.apply(ctx, arguments);
			}

			console.error('InvalidArgumentException for a function', definitions, arguments);
			return null;
		};
	};

}());

// end:source /src/fn.js
// source /src/str.js
var str_format;
(function(){
	str_format = function(str_){
		var str = str_,
			imax = arguments.length,
			i = 0, x;
		while ( ++i < imax ){
			x = arguments[i];
			if (is_Object(x) && x.toJSON) {
				x = x.toJSON();
			}
			str_ = str_.replace(rgxNum(i - 1), String(x));
		}

		return str_;
	};

	var rgxNum;
	(function(){
		rgxNum = function(num){
			return cache_[num] || (cache_[num] = new RegExp('\\{' + num + '\\}', 'g'));
		};
		var cache_ = {};
	}());
}());

// end:source /src/str.js
// source /src/class.js
/**
 * create([...Base], Proto)
 * Base: Function | Object
 * Proto: Object {
 *    constructor: ?Function
 *    ...
 */
var class_create,

	// with property accessor functions support
	class_createEx;
(function(){

	class_create   = createClassFactory(obj_extendDefaults);
	class_createEx = createClassFactory(obj_extendPropertiesDefaults);

	function createClassFactory(extendDefaultsFn) {
		return function(){
			var args = _Array_slice.call(arguments),
				Proto = args.pop();
			if (Proto == null)
				Proto = {};

			var Ctor = Proto.hasOwnProperty('constructor')
				? Proto.constructor
				: function ClassCtor () {};

			var i = args.length,
				BaseCtor, x;
			while ( --i > -1 ) {
				x = args[i];
				if (typeof x === 'function') {
					BaseCtor = wrapFn(x, BaseCtor);
					x = x.prototype;
				}
				extendDefaultsFn(Proto, x);
			}
			return createClass(wrapFn(BaseCtor, Ctor), Proto);
		};
	}

	function createClass(Ctor, Proto) {
		Proto.constructor = Ctor;
		Ctor.prototype = Proto;
		return Ctor;
	}
	function wrapFn(fnA, fnB) {
		if (fnA == null) {
			return fnB;
		}
		if (fnB == null) {
			return fnA;
		}
		return function(){
			var args = _Array_slice.call(arguments);
			var x = fnA.apply(this, args);
			if (x !== void 0)
				return x;

			return fnB.apply(this, args);
		};
	}
}());

// end:source /src/class.js
// source /src/error.js
var error_createClass,
	error_formatSource,
	error_formatCursor,
	error_cursor;

(function(){
	error_createClass = function(name, Proto, stackSliceFrom){
		var Ctor = _createCtor(Proto, stackSliceFrom);
		Ctor.prototype = new Error;

		Proto.constructor = Error;
		Proto.name = name;
		obj_extend(Ctor.prototype, Proto);
		return Ctor;
	};

	error_formatSource = function(source, index, filename) {
		var cursor  = error_cursor(source, index),
			lines   = cursor[0],
			lineNum = cursor[1],
			rowNum  = cursor[2],
			str = '';
		if (filename != null) {
			str += str_format(' at {0}({1}:{2})\n', filename, lineNum, rowNum);
		}
		return str + error_formatCursor(lines, lineNum, rowNum);
	};

	/**
	 * @returns [ lines, lineNum, rowNum ]
	 */
	error_cursor = function(str, index){
		var lines = str.substring(0, index).split('\n'),
			line = lines.length,
			row = index + 1 - lines.slice(0, line - 1).join('\n').length;
		if (line > 1) {
			// remote trailing newline
			row -= 1;
		}
		return [str.split('\n'), line, row];
	};

	(function(){
		error_formatCursor = function(lines, lineNum, rowNum) {

			var BEFORE = 3,
				AFTER  = 2,
				i = lineNum - BEFORE,
				imax   = i + BEFORE + AFTER,
				str  = '';

			if (i < 0) i = 0;
			if (imax > lines.length) imax = lines.length;

			var lineNumberLength = String(imax).length,
				lineNumber;

			for(; i < imax; i++) {
				if (str)  str += '\n';

				lineNumber = ensureLength(i + 1, lineNumberLength);
				str += lineNumber + '|' + lines[i];

				if (i + 1 === lineNum) {
					str += '\n' + repeat(' ', lineNumberLength + 1);
					str += lines[i].substring(0, rowNum - 1).replace(/[^\s]/g, ' ');
					str += '^';
				}
			}
			return str;
		};

		function ensureLength(num, count) {
			var str = String(num);
			while(str.length < count) {
				str += ' ';
			}
			return str;
		}
		function repeat(char_, count) {
			var str = '';
			while(--count > -1) {
				str += char_;
			}
			return str;
		}
	}());

	function _createCtor(Proto, stackFrom){
		var Ctor = Proto.hasOwnProperty('constructor')
			? Proto.constructor
			: null;

		return function(){
			obj_defineProperty(this, 'stack', {
				value: _prepairStack(stackFrom || 3)
			});
			obj_defineProperty(this, 'message', {
				value: str_format.apply(this, arguments)
			});
			if (Ctor != null) {
				Ctor.apply(this, arguments);
			}
		};
	}

	function _prepairStack(sliceFrom) {
		var stack = new Error().stack;
		return stack == null ? null : stack
			.split('\n')
			.slice(sliceFrom)
			.join('\n');
	}

}());

// end:source /src/error.js

// source /src/class/Dfr.js
var class_Dfr;
(function(){
	class_Dfr = function(){};
	class_Dfr.prototype = {
		_isAsync: true,
		_done: null,
		_fail: null,
		_always: null,
		_resolved: null,
		_rejected: null,

		defer: function(){
			this._rejected = null;
			this._resolved = null;
			return this;
		},
		isResolved: function(){
			return this._resolved != null;
		},
		isRejected: function(){
			return this._rejected != null;
		},
		isBusy: function(){
			return this._resolved == null && this._rejected == null;
		},
		resolve: function() {
			var done = this._done,
				always = this._always
				;

			this._resolved = arguments;

			dfr_clearListeners(this);
			arr_callOnce(done, this, arguments);
			arr_callOnce(always, this, [ this ]);

			return this;
		},
		reject: function() {
			var fail = this._fail,
				always = this._always
				;

			this._rejected = arguments;

			dfr_clearListeners(this);
			arr_callOnce(fail, this, arguments);
			arr_callOnce(always, this, [ this ]);
			return this;
		},
		then: function(filterSuccess, filterError){
			return this.pipe(filterSuccess, filterError);
		},
		done: function(callback) {
			if (this._rejected != null)
				return this;
			return dfr_bind(
				this,
				this._resolved,
				this._done || (this._done = []),
				callback
			);
		},
		fail: function(callback) {
			if (this._resolved != null)
				return this;
			return dfr_bind(
				this,
				this._rejected,
				this._fail || (this._fail = []),
				callback
			);
		},
		always: function(callback) {
			return dfr_bind(
				this,
				this._rejected || this._resolved,
				this._always || (this._always = []),
				callback
			);
		},
		pipe: function(mix /* ..methods */){
			var dfr;
			if (typeof mix === 'function') {
				dfr = new class_Dfr;
				var done_ = mix,
					fail_ = arguments.length > 1
						? arguments[1]
						: null;

				this
					.done(delegate(dfr, 'resolve', done_))
					.fail(delegate(dfr, 'reject',  fail_))
					;
				return dfr;
			}

			dfr = mix;
			var imax = arguments.length,
				done = imax === 1,
				fail = imax === 1,
				i = 0, x;
			while( ++i < imax ){
				x = arguments[i];
				switch(x){
					case 'done':
						done = true;
						break;
					case 'fail':
						fail = true;
						break;
					default:
						console.error('Unsupported pipe channel', arguments[i])
						break;
				}
			}
			done && this.done(delegate(dfr, 'resolve'));
			fail && this.fail(delegate(dfr, 'reject' ));

			function pipe(dfr, method) {
				return function(){
					dfr[method].apply(dfr, arguments);
				};
			}
			function delegate(dfr, name, fn) {
				return function(){
					if (fn != null) {
						var override = fn.apply(this, arguments);
						if (override != null) {
							if (isDeferred(override) === true) {
								override.pipe(dfr);
								return;
							}

							dfr[name](override)
							return;
						}
					}
					dfr[name].apply(dfr, arguments);
				};
			}

			return this;
		},
		pipeCallback: function(){
			var self = this;
			return function(error){
				if (error != null) {
					self.reject(error);
					return;
				}
				var args = _Array_slice.call(arguments, 1);
				fn_apply(self.resolve, self, args);
			};
		},
		resolveDelegate: function(){
			return fn_proxy(this.resolve, this);
		},
		
		rejectDelegate: function(){
			return fn_proxy(this.reject, this);
		},
		
	};

	class_Dfr.run = function(fn, ctx){
		var dfr = new class_Dfr();
		if (ctx == null)
			ctx = dfr;

		fn.call(
			ctx
			, fn_proxy(dfr.resolve, ctx)
			, fn_proxy(dfr.reject, dfr)
			, dfr
		);
		return dfr;
	};

	// PRIVATE

	function dfr_bind(dfr, arguments_, listeners, callback){
		if (callback == null)
			return dfr;

		if ( arguments_ != null)
			fn_apply(callback, dfr, arguments_);
		else
			listeners.push(callback);

		return dfr;
	}

	function dfr_clearListeners(dfr) {
		dfr._done = null;
		dfr._fail = null;
		dfr._always = null;
	}

	function arr_callOnce(arr, ctx, args) {
		if (arr == null)
			return;

		var imax = arr.length,
			i = -1,
			fn;
		while ( ++i < imax ) {
			fn = arr[i];

			if (fn)
				fn_apply(fn, ctx, args);
		}
		arr.length = 0;
	}
	function isDeferred(x){
		if (x == null || typeof x !== 'object')
			return false;

		if (x instanceof class_Dfr)
			return true;

		return typeof x.done === 'function'
			&& typeof x.fail === 'function'
			;
	}
}());

// end:source /src/class/Dfr.js
// source /src/class/EventEmitter.js
var class_EventEmitter;
(function(){

	class_EventEmitter = function() {
		this._listeners = {};
	};
	class_EventEmitter.prototype = {
		on: function(event, fn) {
			if (fn != null){
				(this._listeners[event] || (this._listeners[event] = [])).push(fn);
			}
			return this;
		},
		once: function(event, fn){
			if (fn != null) {
				fn._once = true;
				(this._listeners[event] || (this._listeners[event] = [])).push(fn);
			}
			return this;
		},

		pipe: function(event){
			var that = this,
				args;
			return function(){
				args = _Array_slice.call(arguments);
				args.unshift(event);
				fn_apply(that.trigger, that, args);
			};
		},

		emit: event_trigger,
		trigger: event_trigger,

		off: function(event, fn) {
			var listeners = this._listeners[event];
			if (listeners == null)
				return this;

			if (arguments.length === 1) {
				listeners.length = 0;
				return this;
			}

			var imax = listeners.length,
				i = -1;
			while (++i < imax) {

				if (listeners[i] === fn) {
					listeners.splice(i, 1);
					i--;
					imax--;
				}

			}
			return this;
		}
	};

	function event_trigger() {
		var args = _Array_slice.call(arguments),
			event = args.shift(),
			fns = this._listeners[event],
			fn, imax, i = 0;

		if (fns == null)
			return this;

		for (imax = fns.length; i < imax; i++) {
			fn = fns[i];
			fn_apply(fn, this, args);

			if (fn._once === true){
				fns.splice(i, 1);
				i--;
				imax--;
			}
		}
		return this;
	}
}());

// end:source /src/class/EventEmitter.js
// source /src/class/Uri.es6
"use strict";

var class_Uri;
(function () {

	class_Uri = class_create({
		protocol: null,
		value: null,
		path: null,
		file: null,
		extension: null,

		constructor: function constructor(uri) {
			if (uri == null) {
				return this;
			}if (util_isUri(uri)) {
				return uri.combine("");
			}uri = normalize_uri(uri);

			this.value = uri;

			parse_protocol(this);
			parse_host(this);

			parse_search(this);
			parse_file(this);

			// normilize path - "/some/path"
			this.path = normalize_pathsSlashes(this.value);

			if (/^[\w]+:\//.test(this.path)) {
				this.path = "/" + this.path;
			}
			return this;
		},
		cdUp: function cdUp() {
			var path = this.path;
			if (path == null || path === "" || path === "/") {
				return this;
			}

			// win32 - is base drive
			if (/^\/?[a-zA-Z]+:\/?$/.test(path)) {
				return this;
			}

			this.path = path.replace(/\/?[^\/]+\/?$/i, "");
			return this;
		},
		/**
   * '/path' - relative to host
   * '../path', 'path','./path' - relative to current path
   */
		combine: function combine(path) {

			if (util_isUri(path)) {
				path = path.toString();
			}

			if (!path) {
				return util_clone(this);
			}

			if (rgx_win32Drive.test(path)) {
				return new class_Uri(path);
			}

			var uri = util_clone(this);

			uri.value = path;

			parse_search(uri);
			parse_file(uri);

			if (!uri.value) {
				return uri;
			}

			path = uri.value.replace(/^\.\//i, "");

			if (path[0] === "/") {
				uri.path = path;
				return uri;
			}

			while (/^(\.\.\/?)/ig.test(path)) {
				uri.cdUp();
				path = path.substring(3);
			}

			uri.path = normalize_pathsSlashes(util_combinePathes(uri.path, path));

			return uri;
		},
		toString: function toString() {
			var protocol = this.protocol ? this.protocol + "://" : "";
			var path = util_combinePathes(this.host, this.path, this.file) + (this.search || "");
			var str = protocol + path;

			if (!(this.file || this.search)) {
				str += "/";
			}
			return str;
		},
		toPathAndQuery: function toPathAndQuery() {
			return util_combinePathes(this.path, this.file) + (this.search || "");
		},
		/**
   * @return Current Uri Path{String} that is relative to @arg1 Uri
   */
		toRelativeString: function toRelativeString(uri) {
			if (typeof uri === "string") uri = new class_Uri(uri);

			//if (uri.protocol !== this.protocol || uri.host !== this.host)
			//	return this.toString();

			if (this.path.indexOf(uri.path) === 0) {
				// host folder
				var p = this.path ? this.path.replace(uri.path, "") : "";
				if (p[0] === "/") p = p.substring(1);

				return util_combinePathes(p, this.file) + (this.search || "");
			}

			// sub folder
			var current = this.path.split("/"),
			    relative = uri.path.split("/"),
			    commonpath = "",
			    i = 0,
			    length = Math.min(current.length, relative.length);

			for (; i < length; i++) {
				if (current[i] === relative[i]) continue;

				break;
			}

			if (i > 0) commonpath = current.splice(0, i).join("/");

			if (commonpath) {
				var sub = "",
				    path = uri.path,
				    forward;
				while (path) {
					if (this.path.indexOf(path) === 0) {
						forward = this.path.replace(path, "");
						break;
					}
					path = path.replace(/\/?[^\/]+\/?$/i, "");
					sub += "../";
				}
				return util_combinePathes(sub, forward, this.file);
			}

			return this.toString();
		},

		toLocalFile: function toLocalFile() {
			var path = util_combinePathes(this.host, this.path, this.file);

			return util_win32Path(path);
		},
		toLocalDir: function toLocalDir() {
			var path = util_combinePathes(this.host, this.path, "/");

			return util_win32Path(path);
		},
		toDir: function toDir() {
			var str = this.protocol ? this.protocol + "://" : "";

			return str + util_combinePathes(this.host, this.path, "/");
		},
		isRelative: function isRelative() {
			return !(this.protocol || this.host);
		},
		getName: function getName() {
			return this.file.replace("." + this.extension, "");
		}
	});

	var rgx_protocol = /^([a-zA-Z]+):\/\//,
	    rgx_extension = /\.([\w\d]+)$/i,
	    rgx_win32Drive = /(^\/?\w{1}:)(\/|$)/,
	    rgx_fileWithExt = /([^\/]+(\.[\w\d]+)?)$/i;

	function util_isUri(object) {
		return object && typeof object === "object" && typeof object.combine === "function";
	}

	function util_combinePathes() {
		var args = arguments,
		    str = "";
		for (var i = 0, x, imax = arguments.length; i < imax; i++) {
			x = arguments[i];
			if (!x) continue;

			if (!str) {
				str = x;
				continue;
			}

			if (str[str.length - 1] !== "/") str += "/";

			str += x[0] === "/" ? x.substring(1) : x;
		}
		return str;
	}

	function normalize_pathsSlashes(str) {

		if (str[str.length - 1] === "/") {
			return str.substring(0, str.length - 1);
		}
		return str;
	}

	function util_clone(source) {
		var uri = new class_Uri(),
		    key;
		for (key in source) {
			if (typeof source[key] === "string") {
				uri[key] = source[key];
			}
		}
		return uri;
	}

	function normalize_uri(str) {
		return str.replace(/\\/g, "/").replace(/^\.\//, "")

		// win32 drive path
		.replace(/^(\w+):\/([^\/])/, "/$1:/$2");
	}

	function util_win32Path(path) {
		if (rgx_win32Drive.test(path) && path[0] === "/") {
			return path.substring(1);
		}
		return path;
	}

	function parse_protocol(obj) {
		var match = rgx_protocol.exec(obj.value);

		if (match == null && obj.value[0] === "/") {
			obj.protocol = "file";
		}

		if (match == null) {
			return;
		}obj.protocol = match[1];
		obj.value = obj.value.substring(match[0].length);
	}

	function parse_host(obj) {
		if (obj.protocol == null) {
			return;
		}if (obj.protocol === "file") {
			var match = rgx_win32Drive.exec(obj.value);
			if (match) {
				obj.host = match[1];
				obj.value = obj.value.substring(obj.host.length);
			}
			return;
		}

		var pathStart = obj.value.indexOf("/", 2);

		obj.host = ~pathStart ? obj.value.substring(0, pathStart) : obj.value;

		obj.value = obj.value.replace(obj.host, "");
	}

	function parse_search(obj) {
		var question = obj.value.indexOf("?");
		if (question === -1) {
			return;
		}obj.search = obj.value.substring(question);
		obj.value = obj.value.substring(0, question);
	}

	function parse_file(obj) {
		var match = rgx_fileWithExt.exec(obj.value),
		    file = match == null ? null : match[1];

		if (file == null) {
			return;
		}
		obj.file = file;
		obj.value = obj.value.substring(0, obj.value.length - file.length);
		obj.value = normalize_pathsSlashes(obj.value);

		match = rgx_extension.exec(file);
		obj.extension = match == null ? null : match[1];
	}

	class_Uri.combinePathes = util_combinePathes;
	class_Uri.combine = util_combinePathes;
})();
/*args*/
//# sourceMappingURL=Uri.es6.map
// end:source /src/class/Uri.es6
// end:source ../node_modules/atma-utils/lib/utils.embed.js

// source ./utils/res.js
var res_groupByType,
	res_flattern;
(function(){

	(function(){
		res_groupByType = function(arr){
			var pckg = {}, imax = arr.length, i = -1;
			while (++i < imax) {
				var path = arr[i];
				var ext = getExt(path);
				var type = getType(ext);
				append(pckg, type, path);
			}
			return pckg;
		};

		var rgxExt = /\.([\w]+)($|\?|:)/
		function getExt(path) {
			var match = rgxExt.exec(path);
			if (match == null) {
				return 'js';
			}
			return match[1];
		}
		function getType (ext) {
			return _types[ext] || 'load';
		}
		function append(pckg, type, path) {
			var arr = pckg[type];
			if (arr == null) {
				arr = pckg[type] = [];
			}
			arr.push(path);
		}
		var _types = {
			'js': 'js',
			'es6': 'js',
			'css': 'css',
			'less': 'css',
			'scss': 'css',
			'json': 'ajax',
			'mask': 'mask',
		};

	}());

	(function(){
		res_flattern = function(resource){
			return distinct(toArray(resource, []))
		};
		function distinct(stack) {
			for (var i = 0; i < stack.length; i++) {
				for (var j = i + 1; j < stack.length; j++) {
					if (stack[i].url === stack[j].url) {
						stack.splice(j, 1);
						j--;
					}
				}
			}
			return stack;
		}
		function toArray(resource, out) {
			var method = resource.type === 'css' ? 'push' : 'unshift'
			out[method](resource);
			resource.resources.forEach(x => toArray(x, out));
			return out;
		}
	}());
}());
// end:source ./utils/res.js
// source ./utils/path.js
var path_getDir,
	path_getFile,
	path_getExtension,
	path_resolveCurrent,
	path_normalize,
	path_resolveUrl,
	path_combine,
	path_isRelative,
	path_toRelative,
	path_appendQuery,
	path_toAbsolute
	;
(function(){
	var isWeb = true;

	path_getDir = function(path) {
		return path.substring(0, path.lastIndexOf('/') + 1);
	};
	path_getFile = function(path) {
		path = path
			.replace('file://', '')
			.replace(/\\/g, '/')
			.replace(/\?[^\n]+$/, '');

		if (/^\/\w+:\/[^\/]/i.test(path)){
			// win32 drive
			return path.substring(1);
		}
		return path;
	};
	path_getExtension = function(path) {
		var query = path.indexOf('?');
		if (query !== -1) {
			path = path.substring(0, query);
		}
		var match = rgx_EXT.exec(path);
		return match == null ? '' : match[1];
	};

	path_appendQuery = function(path, key, val){
		var conjunctor = path.indexOf('?') === -1 ? '?' : '&';
		return path + conjunctor + key + '=' + val;
	};

	(function(){
		var current_;
		path_resolveCurrent = function(){
			if (current_ != null) return current_;
			return (current_ = path_win32Normalize(process.cwd()));
		};
	}());


	path_normalize = function(path) {
		var path_ = path
			.replace(/\\/g, '/')
			// remove double slashes, but not near protocol
			.replace(/([^:\/])\/{2,}/g, '$1/')
			// './xx' to relative string
			.replace(/^\.\//, '')
			// join 'xx/./xx'
			.replace(/\/\.\//g, '/')
			;
		return path_collapse(path_);
	};
	path_resolveUrl = function(path, base) {
		var url = path_normalize(path);
		if (path_isRelative(url)) {
			return path_normalize(path_combine(base || path_resolveCurrent(), url));
		}
		if (rgx_PROTOCOL.test(url))
			return url;

		if (url.charCodeAt(0) === 47 /*/*/) {
			if (__cfg.base) {
				return path_combine(__cfg.base, url);
			}
		}
		return url;
	};
	path_isRelative = function(path) {
		return rgx_PROTOCOL.test(path) === false;
	};
	path_toRelative = function(path, anchor, base){
		var path_     = path_resolveUrl(path_normalize(path), base),
			absolute_ = path_resolveUrl(path_normalize(anchor), base);

		if (path_getExtension(absolute_) !== '') {
			absolute_ = path_getDir(absolute_);
		}
		absolute_ = path_combine(absolute_, '/');
		if (path_.toUpperCase().indexOf(absolute_.toUpperCase()) === 0) {
			return path_.substring(absolute_.length);
		} else {
			var sub = '../';
			while (true) {
				var folder = absolute_.replace(/[^\/]+\/?$/, '');
				if (folder === '' || folder === absolute_) {
					break;
				}
				absolute_ = folder;
				if (path_.toUpperCase().indexOf(absolute_.toUpperCase()) === 0) {
					return path_combine(sub, path_.substring(absolute_.length));
				}
				sub += '../'
			}
		}
		return path;
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

	(function(){
		path_toAbsolute = function(path, parentLocation, rootLocation){
			path = path_normalize(path);
			if (path_isRelative(path) === false) {
				return path;
			}
			if (path[0] === '/') {
				if (rootLocation == null) {
					rootLocation = path_resolveCurrent();
				}
				return path_combine(rootLocation, path);
			}
			if (parentLocation == null) {
				parentLocation = rootLocation || path_resolveCurrent();
			}
			return path_combine(parentLocation, path);
		};

		var _cwd;
		function cwd() {
			return _cwd || (_cwd = path_normalize(process.cwd()));
		}
	}());

	var rgx_PROTOCOL = /^(file|https?):/i,
		rgx_SUB_DIR  = /[^\/\.]+\/\.\.\//,
		rgx_FILENAME = /\/[^\/]+\.\w+(\?.*)?(#.*)?$/,
		rgx_EXT      = /\.(\w+)$/,
		rgx_win32Drive = /(^\/?\w{1}:)(\/|$)/
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

// end:source ./utils/path.js
// source ./utils/async.js
var async_map,
	async_whenAll;
(function(){
	async_map = function(arr, mapper) {
		var out = new Array(arr.length);
		var dfr = new class_Dfr;
		var errored = false;
		var wait = arr.length;
		if (wait === 0) {
			return dfr.resolve(out);
		}
		arr.forEach((x, i) => {
			if (x == null) {
				set(null, i);
				return;
			}
			var mix = mapper(x);
			if (mix == null || mix.then == null) {
				set(mix, i);
				return;
			}
			mix.then(x => set(x, i), error => {
				errored = true;
				dfr.reject(error);
			});
		});
		function set(value, i) {
			if (errored) {
				return;
			}
			out[i] = value;
			if (--wait === 0) {
				dfr.resolve(out);
			}
		}
		return dfr;
	};

	async_whenAll = function(mix){
		var arr = Array.isArray(mix) ? mix : Array.from(arguments);
		var out = new Array(arr.length);
		var dfr = new class_Dfr;
		var errored = false;
		var wait = arr.length;
		if (wait === 0) {
			return dfr.resolve(out);
		}
		arr.forEach((x, i) => {
			if (x == null) {
				set(null, i);
				return;
			}
			var mix = x;
			if (mix == null || mix.then == null) {
				set(mix, i);
				return;
			}
			mix.then(x => set(x, i), error => {
				errored = true;
				dfr.reject(error);
			});
		});
		function set(value, i) {
			if (errored) {
				return;
			}
			out[i] = value;
			if (--wait === 0) {
				dfr.resolve(out);
			}
		}
		return dfr;
	}
}());
// end:source ./utils/async.js

// source ./class/Resource.js
var Resource = class_create({

	resources: null,
	parent: null,

	filename: '',
	directory: '',
	content: '',

	url: '',
	location: '',
	namespace: '',

	type: '',

	constructor: function (includeData, parent) {
		this.resources = [];

		if (includeData == null || includeData.url == null) {
			includeData = { type: solution.type, url: solution.path };
		}

		this.parent = parent;
		this.type = includeData.type;
		this.content = includeData.content;
		this.namespace = includeData.namespace;

		var url = Include.PathResolver.resolveBasic(includeData.url, includeData.type);

		// System paths
		this.filename = path_toAbsolute(url, parent && parent.directory, solution.opts.base);
		this.directory = path_getDir(this.filename);

		// Application paths
		this.url = path_toRelative(this.filename, solution.opts.base);
		this.location = path_getDir(this.url);
	},
	toTarget () {
		var folder = solution.opts.getOutputFolder(this.type);
		var url = path_combine(folder, this.url);
		var filename = path_combine(solution.opts.outputBase, url);
		var resource = new Resource(this.type);
		resource.filename = filename;
		resource.directory = path_getDir(filename);
		resource.url = url;
		resource.location = path_getDir(url);
		return resource;
	},
	toJSON (deep) {
		return {
			type: this.type,
			namespace: this.namespace,
			filename: this.filename,
			directory: this.directory,
			url: this.url,
			location: this.location,
			resources: deep === false ? void 0 : this.resources.map(x => x.toJSON())
		};
	}
});
// end:source ./class/Resource.js
// source ./class/Include.js
var Include;
(function(){

	var lib = require('includejs/lib/include.node.module.js');
	var Routes = lib.includeLib.Routes();
	var PathResolver = lib.includeLib.PathResolver;

	Include = class_create({
		constructor: function (resource) {
			this.includes = [];
			if (resource) {
				this.url = resource.url;
				this.location = resource.location;
			}
		},
		include (type, mix) {
			var pckg = mix;
			if (typeof pckg === 'string' && arguments.length > 2) {
				pckg = Array.prototype.slice.call(arguments, 1);
			}

			Routes.each(type, pckg, (namespace, route) => {
				this.includes.push({
					type: type,
					url: net.Uri.combine(this.base, route.path),
					route: route,
					namespace: namespace
				});
			});

			return this;
		},
		cfg: function() {
			return this;
		},
		setBase: function(path){
			this.base = path;
			return this;
		},
		routes: function(arg){
			if (arg == null){
				return Routes.getRoutes();
			}
			for (var key in arg) {
                Routes.register(key, arg[key], this);
			}
			return this;
		}
	});


	['js', 'css', 'load', 'lazy', 'mask'].forEach(type => {
		Include.prototype[type] = function() {
			var mix = arguments.length > 1 ? Array.from(arguments) : arguments[0];
			return this.include(type, mix);
		};
	});

	Include.toJsonRoutes = function(){
		var result = {},
			routes = Routes.getRoutes();

		for (var key in routes) {
			result[key] = _join(routes[key]);
		}

		function _join(route) {
			var result = '';
			for (var i = 0, x, imax = route.length; i < imax; i++){
				x = route[i];

				if (i % 2 === 0) {
					result += x;
					continue;
				}
				result += '{%1}'.format(x);
			}
			return result;
		}

		return result;
	};

	Include.groupByType = res_groupByType;
	Include.PathResolver = PathResolver;
}());

// end:source ./class/Include.js
// source ./class/Solution.js
var solution = null;
var Solution = null;
(function(){
	// source ./SolutionOpts.js
	var SolutionOpts;
	(function(){
		SolutionOpts = class_create({
			defaults: {
				build: 'release',
				type: '',
				base: '',
				outputBase: '',
				outputMain: '{filename}.{build}.{ext}',
				outputSources: 'build/{build}',
				outputAssets: 'build/{build}/assets',
			},
			resolvers: {
				base (basePath) {
					return basePath
						? path_toAbsolute(basePath)
						: path_resolveCurrent();
				},
				outputBase (outputBase, opts) {
					return outputBase
						? path_toAbsolute(outputBase)
						: opts.base;
				},
				outputMain: prepairPath,
				outputSources: prepairPath,
				outputAssets: prepairPath,
			},
			constructor: function(solution, opts_){
				this.paths = [ solution.path ];
				var opts = opts_ || {};
				for (var key in this.defaults) {
					var val = opts[key] || this.defaults[key];
					this[key] = val;
				}
				for (var key in this.resolvers) {
					this[key] = this.resolvers[key].call(this, this[key], this);
				}
			},
			getOutputFolder (type) {
				if (type === 'asset') {
					return this.outputAssets;
				}
				return this.outputSources;
			},
			isSameBase () {
				return this.base === this.outputBase;
			}
		});
	
		function prepairPath(path, opts) {
			return interpolateStr(path, opts);
		}
		function interpolateStr(str, opts) {
			return str.replace(/{(\w+)}/g, (full, name) => {
				var x = opts[name];
				if (x != null) {
					return x;
				}
				switch (name) {
					case 'filename':
						var path = opts.paths[0];
						var match = /([^/\\]+)\.\w+$/.exec(path);
						if (match) {
							return match[0];
						}
						throw new Error('Filename can`t be parsed from: ' + opts.paths.join(','));
					case 'ext':
						var path = opts.paths[0];
						var match = /\.(\w+)$/.exec(path);
						if (match) {
							return match[0];
						}
						throw new Error('Extension can`t be parsed from: ' + opts.paths.join(','));
					default:
						throw new Error('Unknown interpolation key: ' + name);
				}
			});
		}
	
	}());
	
	// end:source ./SolutionOpts.js

	Solution = class_create({
		constructor: function(path, opts){
			if (opts == null) {
				opts = {};
			}

			this.path = path;
			this.opts = new SolutionOpts(this, opts);
		},

		toTargetAsset: function(resource) {
			var resource = new Resource(resource.type);
			resource.filename = path_combine(opts.outputMain, opts.outputAssets, resource.url);
			resource.directory = path_getDir(this.filename);
		}
	});

}());

// end:source ./class/Solution.js

// source ./assets/AssetsManager.js
var AssetsManager;
(function(){
	var assets = [];
	//source ./CssAssets.js
	var CssAssets;
	(function(){
		CssAssets = {
			rewrite (resource, opts) {
				var regexp = /url[\s]*\(('|")?([^)'"]+)('|")?\)/gi,
					assets = [],
					hash = {},
					match;
	
				var content = resource.content;
				while (match = regexp.exec(content)) {
					var href = match[2].trim();
					if (href === '') {
						continue;
					}
					if (AssetsManager.shouldCopy(href) === false) {
						continue;
					}
	
					var asset = new Resource({ type: 'asset', url: href }, resource);
					if (asset.filename in hash === false) {
						assets.push(asset);
						hash[asset.filename] = 1;
					}
	
					var before = content.substring(0, match.index),
						after = content.substring(match.index + match[0].length);
	
					var assetUrl = asset.toTarget().url;
					var styleUrl = resource.toTarget().url;
					var relUrl = path_toRelative(assetUrl, styleUrl, "/");
					var entry = match[0].replace(href, relUrl);
					content = before + entry + after;
				}
				resource.content = content;
	
				return assets;
			}
		};
	
		function isAbsolute(href) {
			if (/^\s*data:/.test(href)) {
				return true;
			}
			return /^[\w]{1,8}:\/\//.test(href);
		}
	}());
	//end:source ./CssAssets.js

	AssetsManager = {
		rewriteCss (resource, opts) {
			var arr = CssAssets.rewrite(resource, opts);
			if (arr) {
				assets.push(...arr);
			}
		},
		shouldCopy (href, parent) {
			if (solution.opts.isSameBase() === false) {
				return true;
			}
			if (hrefIsAbsolute(href)) {
				return false;
			}
			return true;
		},
		getAssets () {
			return assets;
		}
	};

	function hrefIsAbsolute(href) {
		if (/^\s*data:/.test(href)) {
			return true;
		}
		if (/^[\w]{1,8}:\/\//.test(href)) {
			return true;
		}
		if (href[0] === '/') {
			return true;
		}
		return false;
	}
}());
// end:source ./assets/AssetsManager.js

// source ./parser/ScriptParser.js
var ScriptParser;
(function(){
	// source ./script/AstUtil.js
	var AstUtil;
	(function() {
	
		var UglifyJS = require('uglify-js'),
			nope = function() {
				return true;
			},
			variableOverrides = null,
	
			walk = function(node, fn) {
				var walker = new UglifyJS.TreeWalker(function(node, descend) {
					return fn.call(this, node, descend);
				});
				node.walk(walker);
			},
	
			findNode = function(node, fn, options) {
				var result, intop = true;
				if (!options) {
					options = {};
				}
				walk(node, function(node) {
					if (options.scopeOnly && !intop) {
						if (node instanceof UglifyJS.AST_Scope) {
							return true;
						}
					}
					intop = false;
	
					if (fn(node)) {
						result = node;
						this.visit = nope;
						return true;
					}
					return null;
				});
				return result;
			},
	
			each = function(node, selector, fn) {
				walk(node, function(node) {
					return selector(node) ? fn.call(this, node, selector) : null;
				});
			},
			getVariableValue = function(scope, varName) {
				if (variableOverrides && varName in variableOverrides) {
					return variableOverrides[varName];
				}
	
				var varDef = findNode(scope, function(node) {
					return node instanceof UglifyJS.AST_VarDef && node.name.name == varName;
				}, {
					scopeOnly: true
				});
	
				if (varDef) {
					return evaluateNode(varDef.value, scope);
				}
	
				varDef = findNode(scope, function(node) {
					if (node instanceof UglifyJS.AST_Assign && node.left instanceof UglifyJS.AST_SymbolRef && node.left.name == varName) {
						return true;
					}
					return null;
				}, {
					scopeOnly: true
				});
	
				if (varDef) {
					return evaluateNode(varDef.right, scope);
				}
	
				return null;
			},
			evaluateNode = function(node, scope) {
				if (scope == null) {
					console.warn('Evaluate Node: Scope is undefined', node);
				}
	
				switch (node.TYPE) {
				case 'String':
				case 'Number':
					return node.value;
				case 'Array':
					return ruqq.arr.map(Array.prototype.slice.call(node.elements), function(x) {
						return evaluateNode(x, scope);
					});
				case 'Object':
					return ruqq.arr.aggr(node.properties, {}, function(x, aggr) {
						aggr[x.key] = evaluateNode(x.value, scope);
					});
				case 'Binary':
					var left = evaluateNode(node.left, scope),
						right = evaluateNode(node.right, scope);
	
					if (left == null || right == null) {
						return null;
					}
	
					switch (node.operator) {
					case '+':
						return left + right;
					case '-':
						return left - right;
					case '*':
						return left * right;
					case '/':
						return left / right;
					default:
						console.error('Unknown operator', node);
					}
					break;
				case 'Assign':
					return evaluateNode(node.right, scope);
				case 'SymbolRef':
					return getVariableValue(scope, node.name);
				}
	
				//var type = node.TYPE,
				//	info = node.start || node.end || node,
				//	file = '~' + info.file.substr(-25);
				//
				//console.warn('[includes parser]: Dynamic Expression', type, file, ':', info.line);
				return null;
			},
	
			getArguments = function(args, scope) {
				if (scope == null) {
					console.warn('getArguments: scope is undefined', args);
				}
	
				args = Array.prototype.slice.call(args);
	
	
	
				args = ruqq.arr.map(args, function(x) {
					return evaluateNode(x, scope);
				});
	
	
				return cleanArgs(args);
			},
			cleanArgs = function(args) {
				for (var i = 0, x, length = args.length; i < length; i++) {
					x = args[i];
	
					if (x == null) {
						args.splice(i, 1);
						length--;
						i--;
						continue;
					}
	
					if (Array.isArray(x)) {
						for (var j = 0; j < x.length; j++) {
							if (x[j] == null) {
								x.splice(j, 1);
								j--;
							}
						}
						continue;
					}
	
					if (typeof x === 'object') {
						var empty = true;
						for (var key in x) {
							if (x.hasOwnProperty(key) == false) {
								continue;
							}
	
							if (x[key] == null) {
								delete x[key];
								continue;
							}
							empty = false;
						}
	
						if (empty) {
							args.splice(i, 1);
							length--;
							i--;
						}
					}
				}
	
				return args;
			},
			getPropertyChain = function(node, stack) {
				if ((node instanceof UglifyJS.AST_SymbolRef) == false) {
					console.warn('Current node is not a sumbol referencing');
				}
	
				var i = stack.length - 1,
					chain = [],
					key
					while (--i > -1) {
						var x = stack[i];
	
						if (x instanceof UglifyJS.AST_PropAccess) {
							chain.push(typeof x.property === 'string' ? x.property : x.property.value);
							continue;
						}
						break;
					}
	
					return chain;
			},
	
			transform = function(node, fn) {
				var transform = new UglifyJS.TreeTransformer(fn);
				node.transform(transform);
			};
	
	
	
		AstUtil = {
			findNode: findNode,
			each: each,
			evaluateNode: evaluateNode,
			getArguments: getArguments,
			getPropertyChain: getPropertyChain,
			transform: transform,
			parse: function(code, opts) {
	
				return UglifyJS.parse(code);
				try {
					return UglifyJS.parse(code, opts);
				} catch(e) {
					console.error('ast/parse', code, opts);
				}
	
			},
			is: {
				includeFunction: function(node) {
					return !!(node instanceof UglifyJS.AST_Call && node.start && node.start.value == 'include');
				},
				amdFunction: function(node) {
					if (node instanceof UglifyJS.AST_Call === false) {
						return false;
					}
					if (node.start == null) {
						return false;
					}
					var name = node.start.value;
					var args = node.args;
					if (args.length === 0) {
						return false;
					}
					if (name === 'define') {
						return true;
					}
					if (name === 'require') {
						if (args.length > 1) {
							return true;
						}
						if (AstUtil.is.string(args[0])) {
							// is commonjs require
							return false;
						}
						return true;
					}
					return false;
				},
				commonJsFunction: function(node) {
					if (node instanceof UglifyJS.AST_Call === false) {
						return false;
					}
					if (node.start == null) {
						return false;
					}
					var name = node.start.value;
					var args = node.args;
					if (args.length === 0) {
						return false;
					}
					if (name === 'require') {
						if (args.length !==  1) {
							return false;
						}
	
						if (AstUtil.is.string(args[0])) {
							// is commonjs require
							return true;
						}
					}
					return false;
				},
				type: function(obj, type) {
					if (type instanceof Array) {
						for (var i = 0, length = type.length; i < length; i++) {
							if (obj instanceof UglifyJS[type[i]]) {
								return true;
							}
						}
						return false;
					}
	
					return obj instanceof UglifyJS[type];
				},
				string (node) {
					return node instanceof UglifyJS.AST_Node && node.TYPE === 'String';
				}
			},
		};
	
	}());
	
	// end:source ./script/AstUtil.js
	// source ./script/IncludeParser.js
	var IncludeParser;
	(function() {
	
		IncludeParser = {
			parse: function parseIncludes(ast, resource) {
	
				var info = {
					resources: [],
					hasExports: false,
					hasResponseObject: false,
					responseAccessors: null,
				};
	
				AstUtil.each(ast, AstUtil.is.includeFunction, function(node, descend) {
					function isIncludeSymbolRef (node) {
						return AstUtil.is.type(node, 'AST_SymbolRef') && node.name == 'include';
					}
					var scope = AstUtil.findNode(node, isIncludeSymbolRef).scope || ast;
					processInclude(info, node, scope, resource);
					return true;
				});
	
				if (getPropertySetter('exports', ast) != null) {
					info.hasExports = true;
				}
	
				return new class_Dfr().resolve(info);
			}
		};
	
		function processInclude(info, node, scope, currentResource) {
	
			var arr = [];
			function isIncludeMethodCall (node) {
				return AstUtil.is.type(node, 'AST_Call') && node.start.value == 'include';
			};
	
			AstUtil.each(node, isIncludeMethodCall, function(node) {
	
				switch (node.expression && node.expression.property) {
				case 'js':
				case 'css':
				case 'load':
				case 'lazy':
				case 'mask':
				case 'routes':
				case 'setBase':
					var pckg = {
						type: node.expression.property,
						args: AstUtil.getArguments(node.args, scope),
					};
	
					if (pckg.args.length > 0) {
						arr.unshift(pckg);
					}
	
					break
				case 'done':
				case 'ready':
					processIncludeCallback(info, node.args && node.args[0]);
					break;
				case 'cfg':
				case 'instance':
				case 'embed':
				case 'plugin':
				case 'ajax':
				case 'promise':
				case 'client':
				case 'server':
				case 'use':
				case 'getPending':
				case 'getResource':
				case 'getResourceById':
				case 'getResources':
				case 'apply':
					break;
				default:
					console.warn('getIncludes: Unknown function call', node.expression);
					break;
				}
			});
	
			var include = new Include(currentResource);
			arr.forEach(function(x) {
				include[x.type].apply(include, x.args);
			});
	
			info.resources = info.resources.concat(include.includes);
		}
	
	
		function processIncludeCallback(info, Callback) {
			if (AstUtil.is.type(Callback, 'AST_Function') == false) {
				return;
			}
	
			var args = Callback.argnames,
				responseObjectName = args.length > 0 ? args[args.length - 1].name : null;
	
			if (responseObjectName) {
				info.hasResponseObject = true;
				var names = getPropertyAccessors(responseObjectName, Callback);
				if (names) {
					info.responseAccessors = (info.responseAccessors || []).concat(names);
				}
			}
		}
	
		/**
		 *	resolve %name%.propertyAccessor
		 */
	
		function getPropertyAccessors(name, Fn) {
			var references = [];
			Fn.body.forEach(function(x) {
				function isSymbolName(node) {
					return AstUtil.is.type(node, 'AST_SymbolRef') && node.name === name;
				}
				AstUtil.each(x, isSymbolName, function(node) {
					var chain = AstUtil.getPropertyChain(node, this.stack);
					if (chain) {
						references.push(chain);
					}
				});
			});
			return references;
		}
	
		/**
		 *	aim to find all **.exports = X
		 */
	
		function getPropertySetter(name, Fn) {
	
			var result = null;
			Fn.body.forEach(function(x) {
				function isPropertyName(node) {
					AstUtil.is.type(node, 'AST_Assign') && node.left.property === name;
				}
				AstUtil.each(x, isPropertyName, function(node) {
					var arr = ['include', 'module', 'exports'];
					if (arr.indexOf(node.start.value) > -1) {
						result = node;
					}
				});
			});
			return result;
		}
	
	}());
	
	// end:source ./script/IncludeParser.js
	// source ./script/AmdParser.js
	var AmdParser;
	(function() {
	
		AmdParser = {
			parse: function parseIncludes(ast, resource) {
				var info = {
					resources: []
				};
				AstUtil.each(ast, AstUtil.is.amdFunction, function(node, descend) {
					var scope = node.scope || ast;
					process(info, node, scope, resource);
					return true;
				});
	
				return new class_Dfr().resolve(info);
			}
		};
	
		function process(info, node, scope, currentResource) {
			if (node.args.length < 2) {
				return;
			}
	
			var args = AstUtil.getArguments(node.args, scope);
			var include = new Include(currentResource);
			var dependencies = args.find(x => Array.isArray(x));
			if (dependencies == null) {
				return;
			}
			var groups = Include.groupByType(dependencies);
			for(var type in groups) {
				include[type].apply(include, groups[type]);
			}
			info.resources = info.resources.concat(include.includes);
		}
	}());
	
	// end:source ./script/AmdParser.js
	// source ./script/CommonJsParser.js
	var CommonJsParser;
	(function() {
	
		CommonJsParser = {
			parse: function parseIncludes(ast, resource) {
				var info = {
					resources: []
				};
				AstUtil.each(ast, AstUtil.is.commonJsFunction, function(node, descend) {
					var scope = node.scope || ast;
					process(info, node, scope, resource);
					return true;
				});
	
				return new class_Dfr().resolve(info);
			}
		};
	
		function process(info, node, scope, currentResource) {
			if (node.args.length !== 1) {
				return;
			}
	
			var args = AstUtil.getArguments(node.args, scope);
			var include = new Include(currentResource);
			var path = args[0];
			if (typeof path !== 'string') {
				throw new Error('Path should be a string: ' + path);
			}
			var groups = Include.groupByType([ path ]);
			for(var type in groups) {
				include[type].apply(include, groups[type]);
			}
			info.resources = info.resources.concat(include.includes);
		}
	}());
	
	// end:source ./script/CommonJsParser.js
	// source ./script/IncludeReducer.js
	
	// end:source ./script/IncludeReducer.js

	ScriptParser = {
		getIncludesInfo (resource, directory, variables) {
			var ast = AstUtil.parse(resource.content, {
				filename: path_toLocalFile(resource.filename)
			});
			return IncludeParser.parse(ast, resource);
		},
		getDependencies (content, opts) {
			opts = opts || {
				filename: ''
			};
			var ast = AstUtil.parse(content, opts);
			var info = {
				commonjs: null,
				include: null,
				amd: null,
			};
			var a = IncludeParser.parse(ast).then(includeInfo => info.include = includeInfo);
			var b = AmdParser.parse(ast).then(amdInfo => info.amd = amdInfo);
			var c = CommonJsParser.parse(ast).then(commonJsInfo => info.commonjs = commonJsInfo);

			return async_whenAll(a, b, c).then(x => info);
		},
		flatternDependencyInfos (info) {
			var arr = [];
			arr.push(...info.commonjs.resources);
			arr.push(...info.include.resources);
			arr.push(...info.amd.resources);
			return arr;
		}
	};

}());

// end:source ./parser/ScriptParser.js
// source ./parser/MaskParser.js
var MaskParser;
(function(){
	var _mask;
	MaskParser = {
		getDependencies (content, opts) {
				var mask = _mask || (_mask = require('maskjs'));
				var dfr = new class_Dfr;
				mask
					.Module
					.getDependencies(content, opts.filename, {deep: false})
					.done(list => dfr.resolve(list));
				return dfr;
		},
		flatternDependencies (depsInfo) {
			var out = [];
			for (var key in depsInfo) {
				var arr = depsInfo[key];
				if (arr.length === 0) {
					continue;
				}
				out = out.concat(toIncludeData(arr, key));
			}
			return out;
		}
	};

	function toIncludeData(arr, key) {
		var out = [], imax = arr.length, i = -1;
		while( ++i < imax ){
			out.push(toIncludeDataSingle(arr[i], key));
		}
		return out;
	}
	function toIncludeDataSingle(path, key) {
		var type = maskTypeToIncludeType(key);
		return { type: type, url: path };
	}

	var mapping = { mask: 'mask', data: 'load', script: 'js', style: 'css' };
	function maskTypeToIncludeType(key) {
		return mapping[key];
	}
}());
// end:source ./parser/MaskParser.js
// source ./parser/Parser.js
var Parser;
(function(){
	Parser = {
		getDependencies (resource, content, opts) {
			var fn = Types[resource.type];
			if (fn == null) {
				return new class_Dfr().resolve([]);
			}
			return fn(resource, opts);
		}
	};

	var Types = {
		js (resource) {
			var opts = {
				filename: resource.filename
			};
			return ScriptParser.getDependencies(resource.content, opts).then(info => {
				return ScriptParser.flatternDependencyInfos(info);
			});
		},
		css (resource, opts) {
			AssetsManager.rewriteCss(resource, opts);
			return new class_Dfr().resolve([]);
		},
		mask (resource, opts) {
			return MaskParser.getDependencies(resource.content, opts).then(info => {
				return MaskParser.flatternDependencies(info);
			});
		},
		load: null,
		ajax: null,
	}
}());
// end:source ./parser/Parser.js

// source ./loader/Loader.js
var Loader;
(function(){

	Loader = {
		load (type, path, opts) {
			var includeData = { type: type, url: path };
			return ResourceLoader
				.load(includeData, null, opts)
				.then(loader => loader.resource);
		}
	};

	var ResourceLoader;
	(function(){
		ResourceLoader = {
			load (includeData, parent, opts) {
				var resource = new Resource(includeData, parent);
				var loader = __loaders[resource.filename];
				if (loader) {
					return loader;
				}
				loader = __loaders[resource.filename] = new TreeLoader(resource, opts);
				loader.process();
				return loader;
			}
		};
		var TreeLoader = class_create(class_Dfr, {
			constructor: function(resource, opts) {
				this.resource = resource;
				this.opts = opts;
			},
			process () {
				io.File.readAsync(this.resource.filename, this.opts).done(content => {
					this.resource.content = content;
					this.processChildren()
				}).fail(error => this.reject(error));
			},
			processChildren () {
				var content = this.resource.content;
				var opts = this.opts;
				Parser
					.getDependencies(this.resource, content, opts)
					.then(deps => this.loadChildren(deps), error => this.reject(error));
			},
			loadChildren: function (deps) {
				async_map(deps, dep => {
					return ResourceLoader
						.load(dep, this.resource, this.opts)
						.then(loader => loader.resource);
				})
				.fail(error => this.reject(error))
				.done(resources => {
					this.resource.resources = resources;
					this.resolve(this);
				});
			}
		});

		var __loaders = {};
	}());

}());
// end:source ./loader/Loader.js

module.exports = {
	getResourceTree (path, opts) {
		solution = new Solution(path, opts);
		return Loader.load('js', path, opts).then(x => x.toJSON());
	},
	getResources (path, opts) {
		solution = new Solution(path, opts);
		return Loader.load('js', path, opts).then(resource => {
			return res_flattern(resource).map(x => x);
		});
	},
	build (resource, targetDir) {
		return new Promise(resolve => {
			resolve({
				script: '',
				style: '',
				html: '',
				resourceManager: null
			});
		});
	},
	Parser: {
		getDependencies (content, type = 'js') {
			return ScriptParser.getDependencies(content);
		}
	},
	AssetsManager: AssetsManager,
	Resource: Resource
};