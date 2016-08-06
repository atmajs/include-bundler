(function () {

	var mask = require('maskjs');
	var assert = require('assert');
			

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
		res_groupByPage,
		res_groupByBundle,
		res_groupByPageAndBundles,
		res_groupResourcesByType,
		res_getPage,
		res_flattern;
	(function(){
	
		(function(){
			res_groupByType = function(arr, opts){
				var pckg = {}, imax = arr.length, i = -1;
				while (++i < imax) {
					var path = arr[i];
					var ext = path_getExtension(path);
					var type = opts.getTypeForExt(ext);
					append(pckg, type, path);
				}
				return pckg;
			};
	
			res_groupByPage = function(arr, opts){
				var pages = {}, imax = arr.length, i = -1;
				while (++i < imax) {
					var resource = arr[i];
					var name = res_getPage(resource, opts);
					append(pages, name, resource);
				}
				return pages;
			};
			res_groupByBundle = function(arr){
				var bundles = {}, imax = arr.length, i = -1;
				while (++i < imax) {
					var resource = arr[i];
					var name = resource.bundle;
					append(bundles, name, resource);
				}
				return bundles;
			};
			res_groupByPageAndBundles = function (arr, opts) {
				var pages = res_groupByPage(arr, opts);
				for(var key in pages) {
					pages[key] = res_groupByBundle(pages[key], opts);
				}
				return pages;
			};
			res_groupResourcesByType = function (arr) {
				var out = {}, imax = arr.length, i = -1;
				while (++i < imax) {
					var resource = arr[i];
					var type = resource.type;
					append(out, type, resource);
				}
				return out;
			};
			res_getPage = function(resource, opts) {
				var pages = resource.inPages;
				if (pages == null || pages.length === 0)
					return opts.mainPage;
	
				if (pages.length === 1) {
					return pages[0];
				}
				if (pages.indexOf(opts.mainPage) !== -1) {
					return opts.mainPage;
				}
				return pages.sort().join('-');
			};
	
			
			function append(pckg, name, x) {
				var arr = pckg[name];
				if (arr == null) {
					arr = pckg[name] = [];
				}
				arr.push(x);
			}
		}());
	
		(function(){
			res_flattern = function(resource){
				return distinct(toArray(resource, []))
			};
			function distinct(stack) {
				for (var i = 0; i < stack.length; i++) {
					for (var j = i + 1; j < stack.length; j++) {
						if (stack[i].url === stack[j].url) {
							takeModuleDescriptions(stack[i], stack[j]);
							takePageDefinitions(stack[i], stack[j]);
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
			function takeModuleDescriptions (resA, resB) {
				if (resB.asModules == null || resB.asModules.length === 0) {
					return;
				}
				resB
					.asModules
					.filter(name => resA.asModules.indexOf(name) === -1)
					.forEach(name => resA.asModules.push(name));
			}
			function takePageDefinitions (resA, resB) {
				if (resB.inPages == null || resB.inPages.length === 0) {
					return;
				}
				resB
					.inPages
					.filter(name => resA.inPages.indexOf(name) === -1)
					.forEach(name => resA.inPages.push(name));
			}
		}());
	}());
	// end:source ./utils/res.js
	// source ./utils/arr.js
	var arr_flattern;
	
	(function(){
	
		arr_flattern = function (arr) {
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
	
	
	}());
	// end:source ./utils/arr.js
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
		async_whenAll,
		async_resolve,
		async_reject;
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
		};
	
		async_resolve = function(...args){
			return (new class_Dfr()).resolve(...args);
		};
		async_reject = function(...args){
			return (new class_Dfr()).reject(...args);
		};
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
		bundle: 'index',
		module: '',
	
		embed: false,
	
		constructor: function (includeData, parent, solution) {
			this.resources = [];
	
			if (includeData == null) {
				includeData = { type: solution.type };
			}
			if (includeData.type == null) {
				if (includeData.url) {
					includeData.type = solution.opts.getTypeForExt(path_getExtension(includeData.url));
				} else {
					includeData.type = solution.type;
				}
			}
	
			this.parent = parent;
			this.type = includeData.type;
			this.content = includeData.content;
			this.namespace = includeData.namespace;
			this.asModules = [];
			this.inPages = [];
	
			if (includeData.bundle) {
				this.bundle = includeData.bundle;
			}
	
			if (includeData.module) {
				this.asModules = [ includeData.module ];
			}
			if (includeData.page) {
				this.inPages = [ includeData.page ];	
			} else {
				var owner = parent;
				while(owner != null && owner.inPages.length !== 0) {
					owner = owner.parent;
				}
				if (owner != null) {
					this.inPages = [ ...owner.inPages ];
				}
			}
	
			if (includeData.url == null) {
				return;
			}
	
			var url = Include
				.PathResolver
				.resolveBasic(includeData.url, includeData.type, parent);
	
			// System paths
			this.filename = path_toAbsolute(url, null, solution.opts.base);
			this.directory = path_getDir(this.filename);
	
			// Application paths
			this.url = path_toRelative(this.filename, solution.opts.base);
			this.location = path_getDir(this.url);
	
		},
		toTarget (solution) {
			var folder = solution.opts.getOutputFolder(this.type);
			var url = path_combine(folder, this.url);
			var filename = path_combine(solution.opts.outputBase, url);
			var resource = new Resource({ type: this.type }, this, solution);
	
			resource.type = this.type;
			resource.url = url;
			resource.location = path_getDir(url);
			resource.filename = filename;
			resource.directory = path_getDir(filename);
	
			resource.content = this.content;
			
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
				asModules: this.asModules,
				resources: deep === false ? void 0 : this.resources.map(x => x.toJSON())
			};
		},
		setModuleType (type) {
			if (this.isModuleType(type)) {
				return;
			}
			this.module = this
				.module
				.split(',')
				.splice(0, 0, type)
				.join(',');
		},
		isModuleType (type) {
			return this.module.indexOf(type) !== -1;
		}
	});
	// end:source ./class/Resource.js
	// source ./class/ResourceInfo.js
	class ResourceInfo {
		constructor () {
			this.dependencies = [];
			this.meta = {};
		}
	
		static merge(...infos) {
			var result = new ResourceInfo;
	
			infos.forEach(x => {
				result.dependencies.push( ... x.dependencies);
	
				Object.assign(result.meta, x.meta);
			})
			return result;
		}
	}
	// end:source ./class/ResourceInfo.js
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
						namespace: namespace,
						module: 'include'
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
					version: null,
					
					mainPage: 'main',
					mainBundle: '',
		
					outputBase: '',
					outputMain: '{filename}.{build}.{ext}',
					outputSources: 'build/{build}',
					outputAssets: 'build/{build}/assets',
					package: {
						module: 'commonjs', 
						modules: ['commonjs', 'includejs', 'global'],
		
						type: 'module',
						types: [ 'module', 'bundle']
					},
					extensions: {
						'': { type: 'js'},
						
						'js': { type: 'js' },
						'es6': { type: 'js' },
						'jsx': { type: 'js' },
		
						'mask': { type: 'mask' },
		
						'css': { type: 'css' },
						'less': { type: 'css' },
						'scss': { type: 'css' },
						'sass': { type: 'css' },
		
						'html': { type: 'load' },
						'json': { type: 'data' },
		
						'jpg': { type: 'asset' },
						'png': { type: 'asset' },
						'mp4': { type: 'asset' },
					},
					defaultExtensions: {
						'js': 'js',
						'mask': 'mask',
						'css': 'css',
						'load': 'html'
					}
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
					package: function(packageOpts) {
						if (packageOpts == null) {
							return this.package;
						}
						var opts = Object.create(this.package);
						return Object.assign(opts, packageOpts);
					}
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
					if (this.type === '' && solution.path) {
						this.type = this.getTypeForExt(path_getExtension(solution.path));
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
				},
				getExtForType (type) {
					var match = this.defaultExtensions[type];
					if (match == null) 
						throw new Error('Type is not supported: ' + type);
		
					return match;
				},
				getTypeForExt (ext) {			
					var match = this.extensions[ext];
					if (match == null) 
						throw new Error('Extension is not configurated: ' + ext);
		
					return match.type;
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
							if (path === '') 
								return opts.mainPage;
		
							var match = /([^/\\]+)\.\w+$/.exec(path);
							if (match) {
								return match[0];
							}
							throw new Error('Filename can`t be parsed from: ' + opts.paths.join(','));
						case 'ext':
							var path = opts.paths[0];
							if (path === '') 
								return opts.type;
		
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
		// source ./OutputResources.js
		class OutputResources {
		
			constructor (solution) {
				this.solution = solution;
				this.resources = [];
		
				this.pagesInput = {};
				this.items = [];
		
				this.root = null;		
			}
		
			prepair (resources) {
				
				var rootResource = resources.pop();
				this.root = rootResource.toTarget(this.solution);
				this.root.content = rootResource.content;
		
				this.pagesInput = res_groupByPageAndBundles(resources, this.solution.opts);
		
				Object.keys(this.pagesInput).forEach(page => {
		
					Object.keys(this.pagesInput[page]).forEach(bundle => {
		
						var resources = this.pagesInput[page][bundle];
						var byType = res_groupResourcesByType(resources, this.solution.opts);
						Object.keys(byType).forEach(type => {
		
							var arr = byType[type];
							var item = new OutputItem({
								page, 
								bundle, 
								type, 
								solution: this.solution, 
								resources: arr
							});
		
							this.items.push(item);
						});
						
					});
				})
			}
		
			getForPage (page) {
				return this.items.filter(x => x.page === page).map(x => x.resource);
			}
		
			getAll () {
				var all = this.items.map(x => x.resource).filter(x => x.embed !== true);
				if (this.root) {
					all.push(this.root);
				}
				return all;
			}
		}
		
		
		class OutputItem {
			constructor ({ page, bundle, type, solution, resources }) {
				this.page = page;
				this.bundle = bundle;
				this.type = type;
				var ext = solution.opts.getExtForType(type);
				var filename = `${page}_${bundle}.${ext}`;
				var resource = new Resource({type: type, url: filename}, null, solution);
		
				this.resource = resource.toTarget(solution);
				this.resources = resources || [];
			}
		}
		// end:source ./OutputResources.js
		// source ./Reporter.js
		class IReporter {
			static create () {
				return new ConsoleReporter();
			}
		};
		
		class ConsoleReporter {
			error (...args) {
				console.error(...args);
			}
			warn (...args) {
				console.warn(...args);
			}
			log (...args) {
				console.log(...args);
			}
		}
		// end:source ./Reporter.js
	
		Solution = class Solution extends class_EventEmitter {
			constructor (path, opts) {
				super();
	
				this.path = path;
				this.opts = new SolutionOpts(this, opts || {});
				this.assetsManager = new AssetsManager(this);
				this.outputResources = new OutputResources(this);
				this.reporter = IReporter.create();
	
				this.handlers = Handlers.map(Ctor => new Ctor(this));			
			}
	
			getOptionsForResource (resource) {
				var files = this.opts.files;
				if (files == null) {
					return null;
				}
				// @TODO support settings for a resource
			}
		};
	
	}());
	
	// end:source ./class/Solution.js
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
		bundle: 'index',
		module: '',
	
		embed: false,
	
		constructor: function (includeData, parent, solution) {
			this.resources = [];
	
			if (includeData == null) {
				includeData = { type: solution.type };
			}
			if (includeData.type == null) {
				if (includeData.url) {
					includeData.type = solution.opts.getTypeForExt(path_getExtension(includeData.url));
				} else {
					includeData.type = solution.type;
				}
			}
	
			this.parent = parent;
			this.type = includeData.type;
			this.content = includeData.content;
			this.namespace = includeData.namespace;
			this.asModules = [];
			this.inPages = [];
	
			if (includeData.bundle) {
				this.bundle = includeData.bundle;
			}
	
			if (includeData.module) {
				this.asModules = [ includeData.module ];
			}
			if (includeData.page) {
				this.inPages = [ includeData.page ];	
			} else {
				var owner = parent;
				while(owner != null && owner.inPages.length !== 0) {
					owner = owner.parent;
				}
				if (owner != null) {
					this.inPages = [ ...owner.inPages ];
				}
			}
	
			if (includeData.url == null) {
				return;
			}
	
			var url = Include
				.PathResolver
				.resolveBasic(includeData.url, includeData.type, parent);
	
			// System paths
			this.filename = path_toAbsolute(url, null, solution.opts.base);
			this.directory = path_getDir(this.filename);
	
			// Application paths
			this.url = path_toRelative(this.filename, solution.opts.base);
			this.location = path_getDir(this.url);
	
		},
		toTarget (solution) {
			var folder = solution.opts.getOutputFolder(this.type);
			var url = path_combine(folder, this.url);
			var filename = path_combine(solution.opts.outputBase, url);
			var resource = new Resource({ type: this.type }, this, solution);
	
			resource.type = this.type;
			resource.url = url;
			resource.location = path_getDir(url);
			resource.filename = filename;
			resource.directory = path_getDir(filename);
	
			resource.content = this.content;
			
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
				asModules: this.asModules,
				resources: deep === false ? void 0 : this.resources.map(x => x.toJSON())
			};
		},
		setModuleType (type) {
			if (this.isModuleType(type)) {
				return;
			}
			this.module = this
				.module
				.split(',')
				.splice(0, 0, type)
				.join(',');
		},
		isModuleType (type) {
			return this.module.indexOf(type) !== -1;
		}
	});
	// end:source ./class/Resource.js
	// source ./class/Middlewares.js
	var _middlewares;
	(function(){
	
		class Middlewares {
			constructor () {
				this.runners = {};
	
				this.supports = {
					'parseDependencies': function(resource, deps, opts, solution){
						return new Promise();
					},
					'buildResources': function (resources, solution) {
						return new Promise();
					},
					'rewriteDependencies': function (resources, solution) {
						var outputItems = solution.outputResources.items;
						return new Promise();
					},
					'buildBundle': function (outputItem) {
						return new Promise();
					}
					
				}
			}
	
			define (name, fn) {
				if (this.supports[name] === void 0) {
					throw new Error('Unsupported middleware name: ' + name);
				}
	
				var fns = this.runners[name];
				if (fns == null) {
					fns = this.runners[name] = [];
				}
	
				fns.push(fn)
			}
	
			run (name, ...args) {
				if (this.supports[name] === void 0) {
					throw new Error('Unsupported middleware name: ' + name);
				}
	
				var dfr = new class_Dfr;
				var fns = this.runners[name];
				if (fns == null || fns.length === 0) {
					return dfr.resolve(...args);
				}
	
				var arr = fns.slice();
				function next (...transformedArgs) {
					var nextArgs = transformedArgs.length === 0 ? args : transformedArgs;
					if (arr.length === 0) {
						dfr.resolve(...(nextArgs || []));
						return;
					}
					args = nextArgs;
	
					var fn = arr.shift();
					var result = fn.call(null, ...args);
					if (result != null) {
						if (result.then) {
							result.then(next, error => dfr.reject(error));
							return;
						}
						if (Array.isArray(result)) {
							args = result;
						} else {
							args = [ result ];
						}
					}
	
					next();
				}
				
				next();
				return dfr;
			}
		}
	
		_middlewares = new Middlewares;
	
	}());
	// end:source ./class/Middlewares.js

	// source ./assets/AssetsManager.js
	var AssetsManager;
	(function(){
		
		//source ./CssAssets.js
		var CssAssets;
		(function(){
			CssAssets = {
				rewrite (resource, solution) {
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
						if (solution.assetsManager.shouldCopy(href) === false) {
							continue;
						}
		
						var asset = new Resource({ type: 'asset', url: href }, resource, solution);
						if (asset.filename in hash === false) {
							assets.push(asset);
							hash[asset.filename] = 1;
						}
		
						var before = content.substring(0, match.index),
							after = content.substring(match.index + match[0].length);
		
						var assetUrl = asset.toTarget(solution).url;
						var styleUrl = resource.toTarget(solution).url;
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
	
		AssetsManager = class AssetsManager {
			constructor (solution) {
				this.assets = [];
				this.solution = solution;
			}
			rewriteCss (resource, solution) {
				var arr = CssAssets.rewrite(resource, solution);
				if (arr) {
					this.assets.push(...arr);
				}
			}
			shouldCopy (href, parent) {
				if (this.solution.opts.isSameBase() === false) {
					return true;
				}
				if (hrefIsAbsolute(href)) {
					return false;
				}
				return true;
			}
			getAssets () {
				return this.assets;
			}
			clearCache () {
				this.assets = [];
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

	// source ./parser/Parser.js
	var Parser;
	(function(){
		
		var assert = require('assert');
	
		// source ./ScriptParser.js
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
					parse: function parseIncludes(ast, solution) {
			
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
							processInclude(info, node, scope, solution);
							return true;
						});
			
						if (getPropertySetter('exports', ast) != null) {
							info.hasExports = true;
						}
			
						return new class_Dfr().resolve(info);
					}
				};
			
				function processInclude(info, node, scope, solution) {
			
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
			
					var include = new Include();
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
					parse: function parseIncludes(ast, solution) {
						var info = {
							resources: []
						};
						AstUtil.each(ast, AstUtil.is.amdFunction, function(node, descend) {
							var scope = node.scope || ast;
							process(info, node, scope, solution);
							return true;
						});
			
						return new class_Dfr().resolve(info);
					}
				};
			
				function process(info, node, scope, solution) {
					if (node.args.length < 2) {
						return;
					}
			
					var args = AstUtil.getArguments(node.args, scope);
					var include = new Include();
					var dependencies = args.find(x => Array.isArray(x));
					if (dependencies == null) {
						return;
					}
			
					var groups = Include.groupByType(dependencies, solution.opts);
					for(var type in groups) {
						include[type].apply(include, groups[type]);
					}
					include.includes.forEach(x => x.module = 'amd');
					info.resources = info.resources.concat(include.includes);
				}
			}());
			
			// end:source ./script/AmdParser.js
			// source ./script/CommonJsParser.js
			var CommonJsParser;
			(function() {
			
				CommonJsParser = {
					parse: function parseIncludes(ast, solution) {
						var info = {
							resources: []
						};
						AstUtil.each(ast, AstUtil.is.commonJsFunction, function(node, descend) {
							var scope = node.scope || ast;
							process(info, node, scope, solution);
							return true;
						});
			
						info.resources.forEach(x => x.module = 'commonjs');
			
						return new class_Dfr().resolve(info);
					}
				};
			
				function process(info, node, scope, solution) {
					if (node.args.length !== 1) {
						return;
					}
			
					var args = AstUtil.getArguments(node.args, scope);
					var include = new Include();
					var path = args[0];
					if (typeof path !== 'string') {
						throw new Error('Path should be a string: ' + path);
					}
					var groups = Include.groupByType([ path ], solution.opts);
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
				getDependencies (resource, solution) {
					var opts = {
						filename: resource.filename
					};
					var ast = AstUtil.parse(resource.content, opts);
					var info = {
						commonjs: null,
						include: null,
						amd: null,
					};			
					var a = IncludeParser.parse(ast, solution).then(includeInfo => info.include = includeInfo);
					var b = AmdParser.parse(ast, solution).then(amdInfo => info.amd = amdInfo);
					var c = CommonJsParser.parse(ast, solution).then(commonJsInfo => info.commonjs = commonJsInfo);
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
		
		// end:source ./ScriptParser.js
		// source ./MaskParser.js
		var MaskParser;
		(function(){
			var _mask;
			MaskParser = {
				getDependencies (resource, solution) {
		
					return class_Dfr.run(resolve => {
						var deps = getDependencies(resource, solution);
		
						resolve(deps);
					});
				},
				flatternDependencies (depsInfo) {
					return arr_flattern(depsInfo);
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
				return { type: type, url: path, module: 'mask' };
			}
		
			var mapping = { mask: 'mask', data: 'load', script: 'js', style: 'css' };
			function maskTypeToIncludeType(key) {
				return mapping[key];
			}
		
		
			function getDependencies (resource, solution){
		
				var content = resource.content;
				var ast = mask.parse(content);
				var out = [];
		
				mask.TreeWalker.walk(ast, function (node) {
					if (node.tagName === 'imports') {
						logger.log('imports'.green, node.nodes.length)
					}
					logger.log(node.tagName, '<'.cyan);
					if (node.tagName !== 'import') {
						return;
					}
					var dependency = convertImportNodeToIncludeData(node);
					if (dependency.page != null) {
		
					}
					out.push(dependency);
				});
		
				var hasPage = out.some(x => x.page != null);
		
				solution.on('rewriteDependencies', (resources, solution) => {
		
				});
		
				return out;
			}
		
			function convertImportNodeToIncludeData(node) {
				var path = node.path;
				if (path_getExtension(path) === '') {
					path += '.mask';
				}
		
				var type = mask.Module.getType(new mask.Module.Endpoint(node.path, node.contentType))
				var dependency = {
					url: path,
					type: maskTypeToIncludeType(type),
					module: 'mask',
					page: null
				};
		
				var owner = node.parent;
				if (owner != null && owner.tagName === 'imports') {
					owner = owner.parent;
				}
				if (owner == null || owner.type === mask.Dom.FRAGMENT) {
					return dependency;
				}
				var page = owner.attr['data-bundler-page'] || owner.attr.page || owner.attr.id || owner.attr.name;
				if (page == null) {
					throw Error('Nested import found, but the container has no `page`, `id` or `name` in attributes');
				}
				dependency.page = page;
				return dependency;
			}
		}());
		// end:source ./MaskParser.js
		// source ./HtmlParser.js
		var HtmlParser;
		(function(){
			
			HtmlParser = {
				getDependencies (resource, opts) {
					var $ = createDoc(resource.content);
					var dfr = new class_Dfr;			
					var queue = [];
					var resources = [];
		
					$('*').each((index, node) => {
						var $el = $(node);
						var reader = ResourceReaders.find(reader => reader.canHandle($el));
						if (reader) {
							queue.push({
								node: $el,
								reader: reader
							});
						}
					});
		
					function process () {					
						if (queue.length === 0) {
							dfr.resolve(resources);
							return;
						}
						var x = queue.shift();
						var promise = x.reader.read(x.node, resources);
						if (promise == null) {
							process();
							return;
						}
						promise.then(process, process);
					}
					
					process();
		
					return dfr;
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
				return { type: type, url: path, asModule: [ 'mask' ] };
			}
		
			var mapping = { mask: 'mask', data: 'load', script: 'js', style: 'css' };
			function maskTypeToIncludeType(key) {
				return mapping[key];
			}
		
			// source ./html/styles.js
			class StyleReader {
				canHandle (el) {
					var tagName = el.prop('tagName');
					if (tagName == null || tagName.toLowerCase() !== 'link') {
						return false;
					}
					if (el.attr('href') == null) {
						return false;
					}
			
					var rel = el.attr('rel');
					if (rel == null || rel.toLowerCase() !== 'stylesheet') 
						return false;
			
					return true
				}
			
				read (el, arr) {
					var resource = {
						type: 'css',
						url: el.attr('href'),
						module: 'global'
					};
					arr.push(resource);
				}
			}
			// end:source ./html/styles.js
			// source ./html/scripts.js
			class ScriptReader {
				canHandle (el) {
					var tagName = el.prop('tagName');
					if (tagName == null || tagName.toLowerCase() !== 'script') {
						return false;
					}
					if (this.getSource(el) == null) {
						return false;
					}
					if (el.attr('data-bundler') === 'ignore') {
						return false;
					}
					return true
				}
			
				read (el, arr) {
					var resource = {
						type: 'js',
						url: this.getSource(el),
						module: 'global'
					};		
					arr.push(resource);
				}
			
				getSource (el) {
					return el.attr('src') || el.attr('data-bundler-src')
				}
			}
			// end:source ./html/scripts.js
			// source ./html/mask.js
			var MaskContentReader;
			(function(){
			
				MaskContentReader = class MaskContentReader {
					canHandle (el) {
						var tagName = el.prop('tagName');
						if (tagName == null || tagName.toLowerCase() !== 'script') {
							return false;
						}
			
						var type = el.attr('type');
						if (type && type.toLowerCase().indexOf('mask') !== -1) {
							return true;
						}
								
						return false;
					}
			
					read (el, arr) {
						var content = el.text();
			
						return MaskParser.getDependencies(content, {}).then(list => {
							var resources = MaskParser.flatternDependencies(list);
			
							resources.forEach(x => x.module = 'global');
							arr.push(...resources);
						});
					}
				};
			
			}());
			// end:source ./html/mask.js
		
			var ResourceReaders = [
				new StyleReader, 
				new ScriptReader, 
				new MaskContentReader
			];
		
			var createDoc;
			(function(){
				createDoc = function(html){
					if (_cheerio == null) 
						_cheerio = require('cheerio');
						
					return _cheerio.load(html);
				};
				var _cheerio;
			}()); 
		}());
		// end:source ./HtmlParser.js
	
		Parser = {
			getDependencies (resource, solution) {
				assert(resource != null, 'Resource is empty');
				assert(solution instanceof Solution, 'Solution is not passed');
				
				var dfr = new class_Dfr;
				
				getDependenciesInternal(resource, solution)
					.done(_runMiddlewares)
					.fail(error => dfr.reject(error))
					;
	
				function _runMiddlewares (deps) {
					getDependenciesExternal(deps, resource, solution)
						.done(deps => dfr.resolve(deps))
						.fail(error => dfr.reject(error))
						;
				}			
				return dfr;
			}
		};
	
		function getDependenciesInternal(resource, solution) {
			assert(typeof resource.url === 'string', 'Path is expected');
	
			var ext = path_getExtension(resource.url);
			var handler = solution.handlers.find(x => x.parser.accepts(resource.type) || x.parser.accepts(ext))
			if (handler == null) {
				console.warn('GetDependenciesInternal: Skip uknown resource type', resource.type);
				return async_resolve({dependencies: []});
			}
	
			return handler.parser.getDependencies(resource.content, resource);
	
			// var fn = Types[resource.type];
			// if (fn == null) {
			// 	fn = Types[path_getExtension(resource.url)];
			// }
			// if (fn == null) {
			// 	console.warn('GetDependenciesInternal: Skip uknown resource type', resource.type);
			// 	return new class_Dfr().resolve([]);
			// }
			// return fn(resource, solution);
		}
		function getDependenciesExternal(deps, resource, solution) {
			return _middlewares
				.run('parseDependencies', resource, deps, solution)
				.then(() => deps)
				;
		}
	
		var Types = {
			js (resource, solution) {
				return ScriptParser.getDependencies(resource, solution).then(info => {
					return ScriptParser.flatternDependencyInfos(info);
				});
			},
			css (resource, solution) {
				solution.assetsManager.rewriteCss(resource, solution);
				return new class_Dfr().resolve([]);
			},
			mask (resource, solution) {
				return MaskParser.getDependencies(resource, solution).then(info => {
					return MaskParser.flatternDependencies(info);
				});
			},
			html (resource, solution) {
				return HtmlParser.getDependencies(resource, solution);
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
			load (type, path, opts, solution) {
				var includeData = { type: type, url: path, module: 'root' };
				return ResourceLoader
					.load(includeData, null, opts, solution)
					.then(loader => loader.resource);
			},
			clearCache () {
				ResourceLoader.clearCache();
				return this;
			},
			getTypeFromPath (path) {
				var ext = path_getExtension(path);
				var type = Object.keys(types).find(type => {
					return types[type].indexOf(` ${ext} `) !== -1
				});
				if (type == null) {
					throw new Error('Resource type can`t be resolve from path ' + path);
				}
				return type;
			}
		};
	
		var types = {
			'js': ' es6 js ',
			'mask': ' mask ',
			'html': ' html ',
			'css': ' css scss less '
		};
	
		var ResourceLoader;
		(function(){
			ResourceLoader = {
				load (includeData, parent, opts, solution) {				
					var resource = new Resource(includeData, parent, solution);
					var loader = __loaders[resource.filename];
					if (loader) {
						return loader;
					}
					loader = __loaders[resource.filename] = new TreeLoader(resource, opts, solution);
					loader.process();
					return loader;
				},
				clearCache () {
					__loaders = {};
					return ResourceLoader;
				}
			};
			var TreeLoader = class_create(class_Dfr, {
				constructor: function(resource, opts, solution) {
					this.solution = solution;
					this.resource = resource;
					this.opts = opts;
				},
				process () {
					io.File.readAsync(this.resource.filename, this.opts).done(content => {					
						this.resource.content = content;
						this.processChildren();
					}).fail(error => this.reject(error));
				},
				processChildren () {
					Parser
						.getDependencies(this.resource, this.solution)
						.then(result => this.loadChildren(result), error => this.reject(error));
				},
				loadChildren: function (result) {
					assert(Array.isArray(result.dependencies), `Expects array of dependencies for ${this.resource.url}`);
					
					this.resource.meta = result.meta;
	
					var deps = result.dependencies;
					async_map(deps, dep => {
						return ResourceLoader
							.load(dep, this.resource, this.opts, this.solution)
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
	// source ./builder/Builder.js
	var Builder;
	(function(){
		Builder = {
			build (resources, solution) {
	
				return _middlewares
					.run('buildResources', resources, solution)
					.then(arr => {							
						resources = arr || resources;
	
						solution.outputResources.prepair(resources);
	
						solution.emit('rewriteDependencies', resources, solution);					
						return _middlewares
							.run('rewriteDependencies', resources, solution)
							.then(buildOutputItems)
							.then(rewriteRoot)
							.then(() => solution.outputResources.getAll());
					});
	
				function buildOutputItems () {
					var items = solution.outputResources.items;
					return async_map(items, buildBundle);
				}
				function buildBundle (outputItem) {
					return _middlewares
						.run('buildBundle', outputItem)
						.then(buildBundleInternal)
				}
				function buildBundleInternal (outputItem) {
					if (outputItem.resource.content) {
						return;
					}
					var builder = Builders[outputItem.type];
					if (builder == null)
						throw Error(`Unknown builder for type ${outputItem.type}`)
	
					return builder.buildDependencies(outputItem, solution);
				}
				function rewriteRoot () {
					var main = solution.outputResources.root;
					var dependencies = solution.outputResources.getForPage(solution.opts.mainPage);
					var builder = Builders[main.type];
					if (builder == null) {
						builder = Builders[path_getExtension(main.url)];
					}
					if (builder == null || builder.rewriteRoot == null) {
						throw new Error(`RootBuilder is not found for a resource ${main.url} and type ${main.type}`);
					}
								
					return builder.rewriteRoot(main, dependencies, solution);
				}					
			}
		};
	
		// source ./templates/exports.js
		var Templates = {};
		(function(){
		
			// source ./ITemplate.js
			class ITemplate {
			
				wrapBundle (str) {
			
				}
			
				wrapModule(path, str) {
					
				}
			
				build (resources, ctx, solution) {
			
				}
			}
			// end:source ./ITemplate.js
			// source ./common-js.js
			(function(){
			
			Templates['commonjs'] = class CommonJs extends ITemplate {
				
				wrapModule (resource, solution) {
					if (solution.opts.commonjs == null) {
						solution.opts.commonjs = {
							addHeading: true,
							hasHeading: false
						}
					};
			
					var body = '';
			
					if (solution.opts.commonjs.hasHeading === false && solution.opts.commonjs.addHeading === true) {			
						solution.opts.commonjs.hasHeading = true;
						body = Heading;
					}
			
					return body + wrapModule(resource);
				}
			
				rewriteRoot (root, dependencies, solution) {
					
					var body = dependencies
						.map(x => x.content)
						.concat([ root.content ])
						.join('\n');
			
					dependencies.forEach(x => x.embed = true);
					root.content = wrapRootModule(body);		
				}
			};
			
			function wrapRootModule (str, resources) {
				return RootModule.replace('%BUNDLE%', () => str);
			}
			
			function wrapModule (resource) {
				var {url, content} = resource;
				return Module
					.replace('%MODULE_PATH%', () => url)
					.replace('%MODULE%', () => content)
					;
			}
			
			let Heading = `
				var __register, __require, require;
			
				(function(){
			
					// source ./utils/path.js
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
							if (path_isRelative(url)) {
								url = path_normalize(path_combine(location || path_resolveCurrent(), url));
							}
							if (rgx_PROTOCOL.test(url) === false) {
								url = 'file://' + url;
							}
							return url;
						};
						path_isRelative = function(path) {
							var c = path.charCodeAt(0);
							switch (c) {
								case 47:
									// /
									return false;
								case 102:
								case 104:
									// f || h
									return rgx_PROTOCOL.test(path) === false;
							}
							return true;
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
					
					// end:source ./utils/path.js
			
					var __global = typeof global !== 'undefined' && global ? global : window;
					var __nativeRequire = __global.require;
					var __originalRequire = function (path_) {
						var location = this.location;
						var path = path_resolveUrl(path_, location);
			
						if (modules[path]) {
							return modules[path].runOnce();
						}
			
						return __nativeRequire(path_);
					};
			
					__register = function (path, factory) {
						var filename = path_resolveUrl(path);			
						modules[filename] = new Module(filename, factory);			
					};
			
					__require =__originalRequire.bind({ location: path_resolveCurrent() });
			
					var modules = {};
					var Module = function(filename, factory){	
						this.filename = filename;
						this.dirname = path_getDir(filename);
						this.factory = factory;
						this.exports = null;
					};
					Module.prototype.runOnce = function(){
						if (this.exports != null) {
							return this.exports;
						}
						var require = __originalRequire.bind({ 
							location: this.dirname 
						});
						this.exports = {};
						this.factory(
							require, 
							this, 
							this.exports, 
							this.filename, 
							this.dirname
						);
						return this.exports;
					};
					
					require = __require;
			
					if (__nativeRequire == null) {
						global.require = __require;
					}
				}());
			`
			
			let RootModule = `
			(function(){
				
				%BUNDLE%
			
			}());
			`;
			
			let Module = `
			__register("%MODULE_PATH%", function(require, module, exports, __filename, __dirname){
				%MODULE%
			});
			`;
			
			}());
			// end:source ./common-js.js
			// source ./global-js.js
			(function(){
			
				Templates['global'] = class CommonJs extends ITemplate {
					
					buildDependencies (resources, ctx, solution) {
						var body = resources.map(resource => {
							return resource.content;
						}).join('\n');
			
						var resourceUrl = `${ctx.page}_${ctx.bundle}.js`;
						var resource = new Resource({type: 'js', url: resourceUrl}, null, solution);
						var output = resource.toTarget(solution);
			
						output.content = body;
						return output;
					}
			
					wrapModule (resource, ctx, solution) {
						return resource.content;
					}
			
					buildRoot (resource, dependencies, ctx, solution) {
						
						var body = dependencies.map(x => x.content).join('\n');
						body += '\n' + resource.content;
			
						var output = resource.toTarget(solution);
						output.content = body;
						return output;
					}
				};
			
			}());
			// end:source ./global-js.js
			// source ./include-js.js	
			(function(){
			
			Templates['includejs'] = class CommonJs extends ITemplate {
				wrapBundle (str) {
					return str;
				}
			
				wrapModule (resource) {
					
				}
			};
			
			
			var MODULE_BEFORE = `
			include.setCurrent({ namespace: '#{namespace}', url: '#{url}'});
			`;
			
			var MODULE_AFTER = `
			include.setCurrent({ namespace: '#{namespace}', url: '#{url}'});
			`;
			
			
			}());
			
			// end:source ./include-js.js	
			// source ./mask.js
			(function(){
			
				Templates['mask'] = class CommonJs extends ITemplate {
					wrapBundle (str) {
						return str
					}
			
					wrapModule (resource, ctx, solution) {
						return Module
							.replace('%MODULE_PATH%', resource.url)
							.replace('%MODULE%', str)
							;
					}
				};
			
				let Module = `
				module path="%MODULE_PATH%" {
					%MODULE%
				}
				`;
			
			}());
			// end:source ./mask.js
			// source ./html.js
			(function(){
			
				Templates['html'] = class CommonJs extends ITemplate {
					wrapBundle (str) {
						return str
					}
			
					wrapModule (path, str) {
						return Module
							.replace('%MODULE_PATH%', path)
							.replace('%MODULE%', str)
							;
					}
				};
			
				let Module = `
				module path="%MODULE_PATH%" {
					%MODULE%
				}
				`;
			
			}());
			// end:source ./html.js
			// source ./css.js
			(function(){
			
				Templates['css'] = class CommonJs extends ITemplate {
					wrapBundle (str) {
						return str
					}
			
					wrapModule (path, str) {
						return str;
					}
				};
			
			}());
			// end:source ./css.js
		
			Templates.resolveForType = function(type, solution){
				var Ctor;
				switch (type) {
					case 'css':
						Ctor = Templates.css;
						break;
					case 'mask':
						Ctor = Templates.mask;
						break;
					case 'js': 
						Ctor = Templates[solution.opts.package.module];
						if (Ctor == null)				
							throw new Error('Unsupported module system');
		
						break;
					default:
						throw new Error('Unknown resource type');
				}
		
				return new Ctor();
			};
			Templates.resolveForResource = function(resource, solution){
				var type = resource.type, Ctor;
				switch (type) {
					case 'css':
						Ctor = Templates.css;
						break;
					case 'mask':
						Ctor = Templates.mask;
						break;
					case 'js': 
						var modules = resource.asModules;
						if (modules == null || modules.length === 0) {
							Ctor = Templates[solution.opts.package.module];
							break;
						}
						
						if (modules.length === 1) {
							Ctor = Templates[modules[0]];
							break;	
						}
		
						var arr = ['global', 'commonjs', 'amd', 'includejs'];
		
						var name = arr.find(name => modules.indexOf(name) !== -1);
						if (name == null) {
							name = modules[0];
						}
						Ctor = Templates[name];				
						break;
					default:
						throw new Error(`Unknown resource type ${type}`);
				}
				if (Ctor == null) {
					throw new Error(`Unknown type for a resource ${resource.url}`);	
				}
		
				return new Ctor();
			};
		}());
		// end:source ./templates/exports.js
		// source ./ScriptBuilder.js
		var ScriptBuilder;
		(function(){
			ScriptBuilder = {
				buildDependencies (outputItem, solution) {
					return buildDependencies(outputItem.resource, outputItem.resources, solution);
				},
				rewriteRoot (root, dependencies, solution) {
					var template = Templates.resolveForType('js', solution);
					
					return template.rewriteRoot(root, dependencies, solution);			
				}
			};
		
			// ctx: {bundle, page}
			function buildDependencies(resource, resources, solution) {
		
				var out = resources.map(res => {
					var template = Templates.resolveForResource(res, solution);
		
					return template.wrapModule(res, solution);
				});
				
				resource.content = out.join('\n');
				return resource;		
			}
		
		}());
		// end:source ./ScriptBuilder.js
		// source ./MaskBuilder.js
		var MaskBuilder;
		(function(){
			MaskBuilder = {
				buildDependencies (resources, ctx, solution) {
					var out = resources
						.filter(x => x.type === 'mask')
						.map(wrapModule);
		
					if (out.length === 0) {
						return null;
					}
					
					var resourceUrl = `${ctx.current.page}_${ctx.current.bundle}.mask`;
					var resource = new Resource({type: 'mask', url: resourceUrl}, null, solution);
					var output = resource.toTarget(solution);
		
					output.content = out.join('\n');		
					return output;
				},
		
				canBuildRoot (resource) {
					return resource.type === 'mask';
				},
		
				buildRoot(resource, dependencies, ctx, solution) {
					var body = dependencies.map(x => x.content).join('\n');
					body += '\n' + resource.content;
		
		
					var output = resource.toTarget(solution);
					output.content = body;
					return output;
				}
			};
		
		
			function wrapModule (resource) {
				var body = `module path="${resource.url}" { 
					${resource.content}
				}`;
		
				return body;
			}
		}());
		// end:source ./MaskBuilder.js
		// source ./HtmlBuilder.js
		var HtmlBuilder;
		(function(){
			HtmlBuilder = {
				buildDependencies (resources, solution) {
					
				},
		
				rewriteRoot (resource, dependencies, solution) {
		
					var $ = createDoc(resource.content);
		
					removeDependencies($);
					
					var css = serializeMany(dependencies, x => x.type === 'css', solution);
					if (css) {
						add($, 'head', css);
					}
		
					var html = serializeMany(dependencies, x => x.type !== 'css' && x.type !== 'js' && x.type !== 'mask', solution);
					if (html) {
						add($, 'body', html);
					}
		
					var mask = serializeMany(dependencies, x => x.type === 'mask', solution);
					if (mask) {				
						var anchor = $.root().find('script[type="text/mask"]');
						if (anchor.length !== 0) {
							anchor.before(mask);
						} else {
							$.root().append(mask);
						}
					}
		
					var js = serializeMany(dependencies, x => x.type === 'js', solution);
					if (js) {				
						add($, 'body', js);
					}
		
					resource.content = $.html();			
				}
			};
		
			function add($, selector, html) {
				var container = $(selector);
				if (container.length !== 0) {
					container.append(html);
				} else {
					$.root().append(html);
				}
			}
		
			function removeDependencies ($) {		
				$('script[src]')
					.filter(function(i, x){
						return x.attribs['data-bundler'] !== 'ignore';
					})
					.remove()
					;
					
				$('link[href]')
					.filter(function(i, x){
						return x.attribs['data-bundler'] !== 'ignore';
					})
					.remove()
					;
			}
		
			function serializeMany (dependencies, filter, solution) {
				return dependencies
					.filter(filter)
					.map(x => serializeSingle(x, solution))
					.join('\n');
			}
		
			var serializeSingle;
			(function(){
				serializeSingle = function(resource, solution){
		
					var serializer = Serializers[resource.type];
					if (serializer == null) {
						serializer = Serializers[path_getExtension(resource.url)];
					}
					if (serializer == null)
						throw new Error('Unknown html serializer for type ' + resource.type);
		
					return serializer(resource, solution);
				};
				var Serializers = {
					js (resource, solution) {
						var href = getUrl(resource, solution);
						return `<script src='${href}' type='text/javascript'></script>`;
					},
					css (resource,solution) {
						var href = getUrl(resource, solution);
						return `<link href='${href}' rel='stylesheet' />`;
					},
					html (resource, solution) {
						resource.embed = true;
						return resource.content;
					},
					mask (resource, solution) {
						resource.embed = true;
						return `<script type='text/mask' data-run='auto'>\n${resource.content}\n</script>`
					}
				};
		
				function getUrl(resource, solution) {
					var path = resource.url,
						v = solution.opts.version;
					if (v == null) {
						return path;
					}
					return path + '?v=' + v;
				}		
			}()); 
		
		
			var createDoc;
			(function(){
				createDoc = function(html){
					if (_cheerio == null) 
						_cheerio = require('cheerio');
						
					return _cheerio.load(html);
				};
				var _cheerio;
			}()); 
		
		}());
		// end:source ./HtmlBuilder.js
		// source ./CssBuilder.js
		var CssBuilder;
		(function(){
			CssBuilder = {
				buildDependencies (resources, ctx, solution) {
					var out = resources
						.filter(x => x.type === 'css')
						.map(res => res.content);
		
					if (out.length === 0) {
						return null;
					}
					
					var resourceUrl = `${ctx.current.page}_${ctx.current.bundle}.css`;
					var resource = new Resource({type: 'css', url: resourceUrl}, null, solution);
					var output = resource.toTarget(solution);
		
					output.content = out.join('\n');		
					return output;
				},
		
				canBuildRoot (resource) {
					return resource.type === 'css';
				},
		
				buildRoot(resource, dependencies, ctx, solution) {
		
				}
			}
		}());
		// end:source ./CssBuilder.js
	
		var Builders = {
			js: ScriptBuilder,
			mask: MaskBuilder,
			css: CssBuilder,
			html: HtmlBuilder
		};
	
	}());
	// end:source ./builder/Builder.js
	// source ./handlers/
	var Handlers;
	
	(function(){
		
		// source base/
		// source ./BaseHandler.js
		class BaseHandler {
			
		
			constructor (solution) {
				this.solution = solution;
		
				var { Parser, Rewriter, Builder } = this.constructor;
				
				this.parser = new Parser(solution);
				this.rewriter = new Rewriter(solution);
				this.builder = new Builder(solution);
			}
		};
		
		// end:source ./BaseHandler.js
		// source ./BaseParser.js
		class BaseParser {
		
			constructor (solution) {
				assert(solution instanceof Solution, 'Solution expected for Parser');		
				this.solution = solution;
			}
		
			getDependencies (content, ownerResource) {
				var IDependency = {
					url: 'string', 
					type: 'string', 
					page: 'string?',
					bundle: 'string?'
				};
		
				return [ IDependency ];
				return new Promise(resolve => resolve( [IDependency] ));
			}
		
			accepts (type) {
				return Boolean();
			}
		};
		// end:source ./BaseParser.js
		// source ./BaseRewriter.js
		class BaseRewriter {
			constructor (solution) {
				this.solution = solution;
			}
			
			rewritePartial (content, ownerResource) {
				throw Error('Not implemented');
				return content;
			}
		
			rewriteResource (resource) {
				throw Error('Not implemented');
				return void 0;
			}
		
			accepts (type) {
				throw Error('Not implemented');
				return Boolean();
			}
		}
		// end:source ./BaseRewriter.js
		// source ./BaseBuilder.js
		class BaseBuilder {
			constructor (solution) {
				assert(solution instanceof Solution, 'Solution expected for the Builder');
				this.solution = solution;
			}
			
			buildPage (resource, dependencies) {
				throw Error('Not implemented');
				return void 0;
			}
			
			accepts (type) {
				throw Error('Not implemented');
				return Boolean();
			}
		}
		// end:source ./BaseBuilder.js
		// end:source base/
		
	
		// source script/
		var ScriptHandler;
		
		(function () {
		
			// source ./utils/AstUtil.js
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
			
			// end:source ./utils/AstUtil.js
			
			// source ./amd-js/
			var AmdJsHandler
			(function(){
			
				// source ./AmdJsHandler.js
				AmdJsHandler = class AmdJsHandler extends BaseHandler {
					constructor () {
						super(...arguments);
					}
				};
				
				// end:source ./AmdJsHandler.js
				// source ./AmdJsBuilder.js
				AmdJsHandler.Builder = class AmdJsBuilder extends BaseBuilder {
				
					constructor () {
						super(...arguments);
					}
				
					buildRoot (resource, dependencies) {
				
					}
				
					accepts (type) {
						return type === 'mask';
					}
					
				};
				
				
				// end:source ./AmdJsBuilder.js
				// source ./AmdJsParser.js
				AmdJsHandler.Parser = class AmdJsParser extends BaseParser {
				
					constructor () {
						super(...arguments);
					}
					
					getDependencies (ast, ownerResource) {
						
						var info = {
							dependencies: []
						};
				
						AstUtil.each(ast, AstUtil.is.amdFunction, (node, descend) => {
							var scope = node.scope || ast;
							var deps = this._process(node, scope);
							if (deps) {
								info.dependencies.push(...deps);
							}
							return true;
						});
				
						return new class_Dfr().resolve(info);
				
					}
				
					_process (node, scope) {
						if (node.args.length < 2) {
							return;
						}
				
						var args = AstUtil.getArguments(node.args, scope);
						var include = new Include();
						var dependencies = args.find(x => Array.isArray(x));
						if (dependencies == null) {
							return;
						}
				
						var groups = Include.groupByType(dependencies, this.solution.opts);
						for(var type in groups) {
							include[type].apply(include, groups[type]);
						}
						include.includes.forEach(x => x.module = 'amd');
						return include.includes;
					}
				
				};
				
				// end:source ./AmdJsParser.js
				// source ./AmdJsRewriter.js
				AmdJsHandler.Rewriter = class AmdJsRewriter extends BaseRewriter {
				
					constructor () {
						super(...arguments);
					}
				
					rewritePartial (content, ownerResource) {
				
					}
				
					rewriteResource (resource) {
				
					}
				
					accepts (type) {
						return type === 'mask';
					}
				};
				// end:source ./AmdJsRewriter.js
			}());
			// end:source ./amd-js/
			// source ./common-js/
			var CommonJsHandler;
			
			(function(){
			
				// source ./CommonJsHandler.js
				CommonJsHandler = class CommonJsHandler extends BaseHandler {
					constructor () {
						super(...arguments);
					}
				};
				
				// end:source ./CommonJsHandler.js
				// source ./CommonJsParser.js
				CommonJsHandler.Parser = class CommonJsParser extends BaseParser {
				
					constructor () {
						super(...arguments);
					}
					
					getDependencies (ast, ownerResource) {
						
						var info = {
							dependencies: []
						};
				
						AstUtil.each(ast, AstUtil.is.commonJsFunction, (node, descend) => {
							var scope = node.scope || ast;
							var deps = this._process(node, scope);
							if (deps) {
								info.dependencies.push(...deps);
							}
							return true;
						});
				
						info.dependencies.forEach(x => x.module = 'commonjs');
						return new class_Dfr().resolve(info);
					}
				
					_process (node, scope) {
						if (node.args.length !== 1) {
							return null;
						}
				
						var args = AstUtil.getArguments(node.args, scope);
						var include = new Include();
						var path = args[0];
						if (typeof path !== 'string') {
							throw new Error('Path should be a string: ' + path);
						}
						var groups = Include.groupByType([ path ], this.solution.opts);
						for(var type in groups) {
							include[type].apply(include, groups[type]);
						}
						return include.includes;
					}
				
				};
				
				// end:source ./CommonJsParser.js
				// source ./CommonJsRewriter.js
				CommonJsHandler.Rewriter = class CommonJsRewriter extends BaseRewriter {
				
					constructor () {
						super(...arguments);
					}
				
					rewritePartial (content, ownerResource) {
				
					}
				
					rewriteResource (resource) {
				
					}
				
					accepts (type) {
						return type === 'mask';
					}
				};
				// end:source ./CommonJsRewriter.js
				// source ./CommonJsBuilder.js
				CommonJsHandler.Builder = class CommonJsBuilder extends BaseBuilder {
				
					constructor () {
						super(...arguments);
					}
				
					wrapModule (resource) {
						var opts = this.solution.opts;
						if (opts.commonjs == null) {
							opts.commonjs = {
								addHeading: true,
								hasHeading: false
							}
						};
				
						var body = '';
				
						if (opts.commonjs.hasHeading === false && opts.commonjs.addHeading === true) {			
							opts.commonjs.hasHeading = true;			
							body = Templates.Header;
						}
				
						var {url, content} = resource;
				
						var module = Templates
							.Module
							.replace('%MODULE_PATH%', () => url)
							.replace('%MODULE%', () => content);
						
				
						return body + module;
					}
				
					rewriteRoot (root, dependencies, solution) {
						dependencies.forEach(x => x.embed = true);
				
				
						var body = dependencies
							.map(x => x.content)
							.concat([ root.content ])
							.join('\n');
				
						body = RootModule.replace('%BUNDLE%', () => body);
				
						root.content = body;
					}
				
					accepts (module) {
						return module === 'commonjs';
					}
					
				};
				
				var Templates = {
					Module: `
				// source ./templates/Module.js
				__register("%MODULE_PATH%", function(require, module, exports, __filename, __dirname){
					%MODULE%
				});
				// end:source ./templates/Module.js
				`,
					Header: `
				// source ./templates/Header.js
				var __register, __require, require;
				
				(function(){
				
					// source ./path.js
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
							if (path_isRelative(url)) {
								url = path_normalize(path_combine(location || path_resolveCurrent(), url));
							}
							if (rgx_PROTOCOL.test(url) === false) {
								url = 'file://' + url;
							}
							return url;
						};
						path_isRelative = function(path) {
							var c = path.charCodeAt(0);
							switch (c) {
								case 47:
									// /
									return false;
								case 102:
								case 104:
									// f || h
									return rgx_PROTOCOL.test(path) === false;
							}
							return true;
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
					
					// end:source ./path.js
				
					var __global = typeof global !== 'undefined' && global ? global : window;
					var __nativeRequire = __global.require;
					var __originalRequire = function (path_) {
						var location = this.location;
						var path = path_resolveUrl(path_, location);
				
						if (modules[path]) {
							return modules[path].runOnce();
						}
				
						return __nativeRequire(path_);
					};
				
					__register = function (path, factory) {
						var filename = path_resolveUrl(path);			
						modules[filename] = new Module(filename, factory);			
					};
				
					__require =__originalRequire.bind({ location: path_resolveCurrent() });
				
					var modules = {};
					var Module = function(filename, factory){	
						this.filename = filename;
						this.dirname = path_getDir(filename);
						this.factory = factory;
						this.exports = null;
					};
					Module.prototype.runOnce = function(){
						if (this.exports != null) {
							return this.exports;
						}
						var require = __originalRequire.bind({ 
							location: this.dirname 
						});
						this.exports = {};
						this.factory(
							require, 
							this, 
							this.exports, 
							this.filename, 
							this.dirname
						);
						return this.exports;
					};
					
					require = __require;
				
					if (__nativeRequire == null) {
						global.require = __require;
					}
				}());
				// end:source ./templates/Header.js
				`,
					RootModule: `
				// source ./templates/RootModule.js
				(function(){
					
					%BUNDLE%
				
				}());
				// end:source ./templates/RootModule.js
				`,
				};
				// end:source ./CommonJsBuilder.js
			
			}());
			// end:source ./common-js/
			// source ./include-js/
			var IncludeJsHandler;
			
			(function(){
			
				// source ./IncludeJsHandler.js
				IncludeJsHandler = class IncludeJsHandler extends BaseHandler {
					constructor () {
						super(...arguments);
					}
				};
				
				// end:source ./IncludeJsHandler.js
				// source ./IncludeJsParser.js
				IncludeJsHandler.Parser = class IncludeJsParser extends BaseParser {
				
					constructor () {
						super(...arguments);
					}
					
					getDependencies (ast, ownerResource) {
						
						var info = {
							dependencies: [],
							meta: {
								includejs: {
									hasExports: false,
									hasResponseObject: false,
									responseAccessors: null,
								}
							}
						};
				
						AstUtil.each(ast, AstUtil.is.includeFunction, (node, descend) => {
							function isIncludeSymbolRef (node) {
								return AstUtil.is.type(node, 'AST_SymbolRef') && node.name == 'include';
							}
							var scope = AstUtil.findNode(node, isIncludeSymbolRef).scope || ast;
							this._process(info, node, scope);
							return true;
						});
				
						if (this._getPropertySetter('exports', ast) != null) {
							info.meta.includejs.hasExports = true;
						}
				
						return new class_Dfr().resolve(info);
				
					}
				
					_process(info, node, scope) {
				
						var arr = [];
						function isIncludeMethodCall (node) {
							return AstUtil.is.type(node, 'AST_Call') && node.start.value == 'include';
						};
				
						AstUtil.each(node, isIncludeMethodCall, (node) => {
				
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
								this._processIncludeCallback(info, node.args && node.args[0]);
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
								this.solution.reporter.warn('getIncludes: Unknown function call', node.expression);
								break;
							}
						});
				
						var include = new Include();
						arr.forEach(function(x) {
							include[x.type].apply(include, x.args);
						});
				
						info.dependencies.push(...include.includes);
					}
				
					_processIncludeCallback (info, CallbackNode) {
						if (AstUtil.is.type(CallbackNode, 'AST_Function') == false) {
							return;
						}
				
						var meta = info.meta.includejs, 
							args = CallbackNode.argnames,
							responseObjectName = args.length > 0 
								? args[args.length - 1].name 
								: null;
				
						if (responseObjectName) {
							meta.hasResponseObject = true;
							var names = this._getPropertyAccessors(responseObjectName, CallbackNode);
							if (names) {				
								meta.responseAccessors = (meta.responseAccessors || []).concat(names);
							}
						}
					}
				
					/**
					 *	resolve %name%.propertyAccessor
					 */
				
					_getPropertyAccessors(name, Fn) {
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
				
					_getPropertySetter(name, Fn) {
				
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
				};
				
				// end:source ./IncludeJsParser.js
				// source ./IncludeJsRewriter.js
				IncludeJsHandler.Rewriter = class IncludeJsRewriter extends BaseRewriter {
				
					constructor () {
						super(...arguments);
					}
				
					rewritePartial (content, ownerResource) {
				
					}
				
					rewriteResource (resource) {
				
					}
				
					accepts (type) {
						return type === 'mask';
					}
				};
				// end:source ./IncludeJsRewriter.js
				// source ./IncludeJsBuilder.js
				IncludeJsHandler.Builder = class IncludeJsBuilder extends BaseBuilder {
				
					constructor () {
						super(...arguments);
					}
				
					buildRoot (resource, dependencies) {
				
					}
				
					accepts (type) {
						return type === 'mask';
					}
					
				};
				
				
				// end:source ./IncludeJsBuilder.js
			
			}());
			// end:source ./include-js/
		
			// source ./ScriptHandler.js
			ScriptHandler = class ScriptHandler extends BaseHandler {
				constructor () {
					super(...arguments);
				}
			};
			
			// end:source ./ScriptHandler.js
			// source ./ScriptParser.js
			ScriptHandler.Parser = class ScriptParser extends BaseParser {
			
				constructor () {
					super(...arguments);
				}
				
				getDependencies (content, ownerResource) {
					var many = [
						new CommonJsHandler.Parser(this.solution),
						new AmdJsHandler.Parser(this.solution),
						new IncludeJsHandler.Parser(this.solution),
					];
			
					var opts = {
						filename: ownerResource.filename
					};
					var ast = AstUtil.parse(content, opts);
			
					var dfrs = many.map(parser => parser.getDependencies(ast, ownerResource));
					return async_whenAll(dfrs).then(results => ResourceInfo.merge(...arr_flattern(results)));
				}
			
				accepts (type) {
					return type === 'js';
				}
			};
			
			// end:source ./ScriptParser.js
			// source ./ScriptRewriter.js
			ScriptHandler.Rewriter = class ScriptRewriter extends BaseRewriter {
			
				constructor () {
					super(...arguments);
				}
			
				rewritePartial (content, ownerResource) {
			
				}
			
				rewriteResource (resource) {
			
				}
			
				accepts (type) {
					return type === 'mask';
				}
			};
			// end:source ./ScriptRewriter.js
			// source ./ScriptBuilder.js
			ScriptHandler.Builder = class ScriptBuilder extends BaseBuilder {
			
				constructor () {
					super(...arguments);
				}
			
				createModule (outputItem) {
			
					var out = outputItem.resources.map(res => {
						var template = Templates.resolveForResource(res, solution);
			
						return template.wrapModule(res, this.solution);
					});
					
					outputItem.resource.content = out.join('\n');
					return resource;	
				}
			
				rewriteRoot (resource, dependencies) {
			
				}
			
				accepts (type) {
					return type === 'mask';
				}
				
			};
			
			
			// end:source ./ScriptBuilder.js
		
		}());
		// end:source script/
		// source mask/
		var MaskHandler;
		
		(function(){
		
			// source ./MaskHandler.js
			MaskHandler = class MaskHandler extends BaseHandler {
				constructor () {
					super(...arguments);
				}
			};
			
			// end:source ./MaskHandler.js
			// source ./MaskParser.js
			MaskHandler.Parser = class MaskParser extends BaseParser {
			
				constructor () {
					super(...arguments);
				}
				
				getDependencies (content, ownerResource) {
					var ast = this._parse(content, ownerResource);
					var arr = [];
					this._forEachImports(ast, imports => arr.push(...imports));
					return async_resolve({ dependencies: arr });
				}
			
				accepts (type) {
					return type === 'mask';
				}
			
				_parse (content, resource) {
					mask.off('error');
					mask.off('warn');
			
					var reporter = this.solution.reporter;
					mask.on('error', error => reporter.error(resource && resource.url, error));
					mask.on('warn', warning => reporter.warn(resource && resource.url, warning));
			
					return mask.parse(content);
				}
			
				_forEachImports (ast, cb) {
					mask.TreeWalker.walk(ast,  node => {
						if (node.tagName !== 'imports') {
							return;
						}
			
						var imports = Array
							.from(node.nodes)
							.filter(x => x.tagName === 'import')
							.map(x => this._getDependencyFromNode(x));
			
						cb(imports);
					});
				}
			
				_getDependencyFromNode (node) {
					var path = node.path;
					if (path_getExtension(path) === '') {
						path += '.mask';
					}
			
					var type = mask.Module.getType(new mask.Module.Endpoint(node.path, node.contentType))
					var dependency = {
						url: path,
						type: MAPPING[type],
						module: 'mask',
						page: null
					};
			
					var owner = node.parent;
					if (owner != null && owner.tagName === 'imports') {
						owner = owner.parent;
					}
					if (owner == null || owner.type === mask.Dom.FRAGMENT) {
						return dependency;
					}
					var page = owner.attr['data-bundler-page'] || owner.attr.page || owner.attr.id || owner.attr.name;
					if (page == null) {
						solution.reporter.warn('Nested import found, but the container has no "data-bundler-page", "page", "id" or "name" in attributes');
					}
					dependency.page = page;
					return dependency;
				}
			};
			
			var MAPPING = { mask: 'mask', data: 'load', script: 'js', style: 'css' };
			
			
			// end:source ./MaskParser.js
			// source ./MaskRewriter.js
			MaskHandler.Rewriter = class MaskRewriter extends BaseRewriter {
			
				constructor () {
					super(...arguments);
				}
			
				rewritePartial (content, ownerResource) {
			
				}
			
				rewriteResource (resource) {
			
				}
			
				accepts (type) {
					return type === 'mask';
				}
			};
			// end:source ./MaskRewriter.js
			// source ./MaskBuilder.js
			MaskHandler.Builder = class MaskRewriter extends BaseBuilder {
			
				constructor () {
					super(...arguments);
				}
			
				buildRoot (resource, dependencies) {
			
				}
			
				accepts (type) {
					return type === 'mask';
				}
				
			};
			
			
			// end:source ./MaskBuilder.js
		
		}());
		// end:source mask/
		// source css/
		var CssHandler;
		(function(){
			
			// source ./CssHandler.js
			CssHandler = class CssHandler extends BaseHandler {
				constructor () {
					super(...arguments);
				}
			};
			
			// end:source ./CssHandler.js
			// source ./CssParser.js
			CssHandler.Parser = class CssParser extends BaseParser {
			
				constructor () {
					super(...arguments);
				}
				
				getDependencies (content, ownerResource) {
					
					this.solution.assetsManager.rewriteCss(ownerResource, this.solution);
					return async_resolve({ dependencies: [] });
				}
			
				accepts (type) {
					return type === 'css';
				}
			};
			
			// end:source ./CssParser.js
			// source ./CssBuilder.js
			CssHandler.Builder = class CssRewriter extends BaseBuilder {
			
				constructor () {
					super(...arguments);
				}
			
				buildRoot (resource, dependencies) {
			
				}
			
				accepts (type) {
					return type === 'css';
				}
				
			};
			
			
			// end:source ./CssBuilder.js
			// source ./CssRewriter.js
			CssHandler.Rewriter = class CssRewriter extends BaseRewriter {
			
				constructor () {
					super(...arguments);
				}
			
				rewritePartial (content, ownerResource) {
			
				}
			
				rewriteResource (resource) {
			
				}
			
				accepts (type) {
					return type === 'css';
				}
			};
			// end:source ./CssRewriter.js
		
		}());
		// end:source css/
		// source html/
		var HtmlHandler;
		(function(){
			
			// source ./HtmlHandler.js
			HtmlHandler = class HtmlHandler extends BaseHandler {
				constructor () {
					super(...arguments);
				}
			};
			
			// end:source ./HtmlHandler.js
			// source ./HtmlParser.js
			// source ./readers/MaskContentReader.js
			var MaskContentReader;
			(function(){
			
				MaskContentReader = class MaskContentReader {
					constructor (solution) {
						this.solution = solution;
					}
			
					canHandle (el) {
						var tagName = el.prop('tagName');
						if (tagName == null || tagName.toLowerCase() !== 'script') {
							return false;
						}
			
						var type = el.attr('type');
						if (type && type.toLowerCase().indexOf('mask') !== -1) {
							return true;
						}
								
						return false;
					}
			
					read (el) {
						var content = el.text();
						var handler = this.solution.handlers.find(x => x.parser.accepts('mask'));
						return handler.parser.getDependencies(content, {}).then(({dependencies}) => {
							
							//dependencies.forEach(x => x.module = 'global');
							return dependencies;
						});
					}
				};
			
			}());
			// end:source ./readers/MaskContentReader.js
			// source ./readers/StyleLinkReader.js
			class StyleLinkReader {
				canHandle (el) {
					var tagName = el.prop('tagName');
					if (tagName == null || tagName.toLowerCase() !== 'link') {
						return false;
					}
					if (el.attr('href') == null) {
						return false;
					}
			
					var rel = el.attr('rel');
					if (rel == null || rel.toLowerCase() !== 'stylesheet') 
						return false;
			
					return true
				}
			
				read (el) {
					var resource = {
						type: 'css',
						url: el.attr('href'),
						module: 'global'
					};
					return [resource];
				}
			}
			// end:source ./readers/StyleLinkReader.js
			// source ./readers/ScriptLinkReader.js
			class ScriptLinkReader {
				canHandle (el) {
					var tagName = el.prop('tagName');
					if (tagName == null || tagName.toLowerCase() !== 'script') {
						return false;
					}
					if (this.getSource(el) == null) {
						return false;
					}		
					var type = el.attr('type');
					if (type && type.toLowerCase().indexOf('javascript') === -1) {
						return false;
					}						
					return true
				}
			
				read (el) {
					var resource = {
						type: 'js',
						url: this.getSource(el),
						module: 'global',
						bundle: el.attr('data-bundler-bundle')
					};		
					return [ resource ];
				}
			
				getSource (el) {
					return el.attr('src') || el.attr('data-bundler-src')
				}
			}
			// end:source ./readers/ScriptLinkReader.js
			
			HtmlHandler.Parser = class HtmlParser extends BaseParser {
			
				constructor () {
					super(...arguments);
			
					this.readers = [
						new MaskContentReader(this.solution),
						new StyleLinkReader(this.solution),
						new ScriptLinkReader(this.solution)
					];
				}
				
				getDependencies (content, ownerResource) {
					
					var $ = this.createDocument(content);
					var queue = [];
					
					$('*').each((index, node) => {
						var $el = $(node);
						if ($el.attr('data-bundler') === 'ignore') {
							return;
						}
			
						var reader = this.readers.find(reader => reader.canHandle($el));
						if (reader) {
							queue.push({
								node: $el,
								reader: reader
							});
						}
					});
			
					return async_map(queue, x => x.reader.read(x.node))
						.then(arr_flattern)
						.then(deps => ({ dependencies: deps }));		
				}
			
				accepts (type) {
					return type === 'html';
				}
			
				createDocument (html) {
					return require('cheerio').load(html);
				}
			};
			
			// end:source ./HtmlParser.js
			// source ./HtmlBuilder.js
			HtmlHandler.Builder = class HtmlRewriter extends BaseBuilder {
			
				constructor () {
					super(...arguments);
				}
			
				buildRoot (resource, dependencies) {
			
				}
			
				accepts (type) {
					return type === 'css';
				}
				
			};
			
			
			// end:source ./HtmlBuilder.js
			// source ./HtmlRewriter.js
			HtmlHandler.Rewriter = class HtmlRewriter extends BaseRewriter {
			
				constructor () {
					super(...arguments);
				}
			
				rewritePartial (content, ownerResource) {
			
				}
			
				rewriteResource (resource) {
			
				}
			
				accepts (type) {
					return type === 'css';
				}
			};
			// end:source ./HtmlRewriter.js
		
		}());
		// end:source html/
	
		Handlers = [
			MaskHandler,
			ScriptHandler,
			CssHandler,
			HtmlHandler
		];
	
	}());
	// end:source ./handlers/

	module.exports = class Bundler {
		static clearCache() {
			Loader.clearCache();
			return Bundler;
		}

		constructor (path, opts) {
			this.solution = new Solution(path, opts);			
		}

		getResourceTree (opts) {
			var solution = this.solution,
				type = solution.opts.type,
				path = solution.path;
				
			return Loader
				.load(type, path, opts, solution)
				.then(x => x.toJSON());
		}

		static getResourceTree(path, opts) {
			return new Bundler(path, opts).getResourceTree();
		}

		getResources (opts) {
			var solution = this.solution,
				type = solution.opts.type,
				path = solution.path;
			
			return Loader.load(type, path, opts, solution).then(resource => {
				return res_flattern(resource).map(x => x);
			});
		}
		static getResources(path, opts) {
			return new Bundler(path, opts).getResources();
		}

		build (opts) {
			var solution = this.solution,
				type = solution.opts.type,
				path = solution.path;
			
			return Loader
				.load(type, path, opts, solution)
				.then(resource => res_flattern(resource))
				.then(resources => Builder.build(resources, solution))
				;
		}

		static build (path, opts) {
			return new Bundler(path, opts).build(opts);
		}

		defineMiddleware (name, fn) {
			_middlewares.define(name, fn);
		}

		static get Parser () {
			return { 
				getDependencies (content, type = 'js') {
					var solution = new Solution('', { type: type });
					var resource = new Resource({ type: type, content: content}, null, solution);
					return Parser.getDependencies(resource, solution);
				}
			}
		}

		static get AssetsManager () { return AssetsManager }
		static get Resource () { return Resource }
		static get Solution () { return Solution }		
	};

}());