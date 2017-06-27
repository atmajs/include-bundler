(function () {

	var mask = require('maskjs');
	var assert = require('assert');
	var logger = require('atma-logger');
	var io = global.io || require('atma-io');
	
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
				if (a[key] == null) {
					a[key] = b[key];
					continue;
				}
				if (key === 'toString' && a[key] === Object.prototype.toString) {
					a[key] = b[key];
				}
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
				var imax = arguments.length,
					args = new Array(imax),
					i = 0;
				for(; i<imax; i++) args[i] = arguments[i];
				return fn_apply(fn, ctx, args);
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
	var str_format,
		str_dedent;
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
		str_dedent = function(str) {
			var rgx = /^[\t ]*\S/gm,
				match = rgx.exec(str),
				count = -1;
			while(match != null) {			
				var x = match[0].length;
				if (count === -1 || x < count) count = x;
				match = rgx.exec(str);
			}		
			if (--count < 1)
				return str;
	
			var replacer = new RegExp('^[\\t ]{1,' + count + '}', 'gm');		
			return str
				.replace(replacer, '')
				.replace(/^[\t ]*\r?\n/,'')
				.replace(/\r?\n[\t ]*$/,'')
				;
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
	
				var Ctor;
	
				if (Proto.hasOwnProperty('constructor')) {
					Ctor = Proto.constructor;
					if (Ctor.prototype === void 0) {
						var es6Method = Ctor;
						Ctor = function ClassCtor () {
							var imax = arguments.length, i = -1, args = new Array(imax);
							while (++i < imax) args[i] = arguments[i];
							return es6Method.apply(this, args);
						};
					}
				}
				else {
					Ctor = function ClassCtor () {};
				}
	
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
		res_flattern,
		res_getTreeInfo,
		res_walk,
		res_find;
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
				return opts.mainPage;
				//@TODO pagebundles
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
				if (resource.resources) {
					resource.resources.forEach(x => toArray(x, out));
				}
				out['push'](resource);
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
	
		(function(){
			/* Array of resources or root resource */
			res_getTreeInfo = function (mix) {
				var arr = Array.isArray(mix) ? mix : flattern(mix);
	
				var paths = arr.map(x => {
					var pages = x.inPages.map(page => `bg_white<black<${page}>>`.color).join(' ');
					return `${x.url} ${pages}`;
				}).sort();
	
				return {
					count: arr.length,
					treeString: formatTree(paths)
				};
			};
	
			function flattern(resource){
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
				if (resource.resources) {
					resource.resources.forEach(x => toArray(x, out));
				}
				out['push'](resource);
				return out;
			}
	
			function formatTree(paths){
				var tree = tree_fromPaths(paths);
	
				tree = tree_collapse(tree);
	
				var str = '';
				formatArr(tree, 0);
				return str;
	
				function formatArr(items, indent) {
					
					items.forEach((item, index) => {
						str += getIndent(indent, index === items.length - 1);
						str += `yellow<${item.id}>`.color; 
						str += '\n';
	
						formatArr(item.items, indent + 1);
					});
				}
	
				function getIndent(indent, isLastEntry) {
					
					var i = -1;
					var str = '';
					while(++i < indent) {
						var leading = i === indent - 1 && isLastEntry ? '└' : '|';
						var seperator = i === indent - 1 ? '───' : '   ';
						str += leading + seperator;
					}	
					return str;
				}
			}
			function tree_collapse(arr) {
				arr.forEach(item => {
					if (item.items.length === 1) {
						item.id += '/' + item.items[0].id;
						item.items = item.items[0].items;
					}
					tree_collapse(item.items);
				})
				return arr;
			}
			function tree_fromPaths(model) {
	            var index = -1,
	                index_ = index,
	                i = 0,
	                imax = model.length;
	            for (; i < imax - 1; i++){
	                
	                index_ = str_lastSameIndex(model[i], model[++i]);
	                if (index === -1 || index > index_) {
	                    index = index_;
	                }
	            }
	            
	            if (imax === 1) 
	                model[0] = model[0].substring(model[0].lastIndexOf('/') + 1);
	            
	            
	            if (index > 0) {
	                index_ = model[0].lastIndexOf('/');
	                if (index_ < index) {
	                    index = index_
	                }
	                
	                for (i = 0; i< imax; i++) {
	                    model[i] = model[i].substring(index);
	                    
	                    if (model[i][0] === '/') 
	                        model[i] = model[i].substring(1);
	                    
	                }
	            }
	            
	            var tree = [],
	                parts;
	            
	            for (var i = 0, imax = model.length; i < imax; i++){
	                
	                tree_ensurePath(tree, model[i].split('/'));
	            }
	            
	            return tree;
	        }
	        function tree_getItem(items, id) {
	            for (var i = 0, x, imax = items.length; i < imax; i++){
	                x = items[i];
	                
	                if (x.id === id) 
	                    return x;
	            }
	            return null;
	        }
	        
	        function tree_ensurePath(rootItems, parts) {
	            var items = rootItems,
	                item_,
	                item;
	            for (var i = 0, imax = parts.length; i < imax; i++){
	                item_ = tree_getItem(items, parts[i]);
	                
	                if (item_ == null) {
	                    item_ = {
	                        id: parts[i],
	                        items: []
	                    };
	                    items.push(item_);
	                }
	                
	                items = item_.items;
	            }
	            return items;
	        }
	        function str_lastSameIndex(str, compare) {
	            var i = 0,
	                imax = str.length < compare.length
	                ? str.length
	                : compare.length
	                ;
	            
	            for (; i< imax; i++) {
	                if (str.charCodeAt(i) !== compare.charCodeAt(i)) {
	                    break;
	                }
	            }
	            
	            return i;
	        }
	        
	        function path_combine(_1, _2) {
	            if (_1[_1.length - 1] === '/') 
	                _1 = _1.substring(0, _1.length - 1);
	            
	            if (_2[0] !== '/') 
	                _2 = '/' + _2;
	                
	            return _1 + _2;
	        }
	               
		}());
	
		res_walk = function (res, fn) {
			var result = fn(res);
			if (result === false)
				return result;
	
			var arr = res.resources;
			if (arr == null) 
				return;
	
			var imax = arr.length,
				i = -1;
			while(++i < imax) {
				result = res_walk(arr[i], fn);
				if (result === false) {
					return result;
				}
			}		
		};
	
		res_find = function (res, matcher) {
			var out = null;
			res_walk(res, x => {
				if (matcher(x)) {
					out = x;
					return false;
				}
			});
			return out;
		}
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
		path_toAbsolute,
		path_withProtocol,
		path_sliceHash,
		path_sliceQuery,
		path_removeQuery
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
	
		path_withProtocol = function (path) {
			return /^\/\/|^file:|^https?:|^ftps?:/i.test(path);
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
	
		path_sliceHash = function (url) {
			if (url == null) return null;
			var i = url.indexOf('#');
			if (i === -1) return null;
			return url.substring(i);
		};
		path_sliceQuery = function (url) {
			if (url == null) return null;
			var i = url.indexOf('?');
			if (i === -1) return null;
			return url.substring(i);
		};
		path_removeQuery = function (url) {
			if (url == null) return null;
			var i = url.indexOf('#');
			if (i !== -1) url = url.substring(0, i);
	
			var i = url.indexOf('?');
			if (i !== -1) url = url.substring(0, i);
	
			return url;
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
	// source ./utils/tree.js
	var tree_async;
	(function () {
		tree_async = function (workerInfo) {
			var start = Date.now(),
				dfr = workerInfo.action(),
				reporter = workerInfo.reporter;
	
			dfr.done(() => {
				var end = Date.now();
				var seconds = ((end - start) / 1000).toFixed(2);
				var treeInfo = res_getTreeInfo(workerInfo.resources);
				reporter
					.info(workerInfo.message(treeInfo, seconds));
				reporter
					.info(treeInfo.treeString);			
			})
	
			return dfr;
		};
	}());
	// end:source ./utils/tree.js
	// source ./utils/async.js
	var async_map,
		async_whenAll,
		async_resolve,
		async_reject,
		async_await,
		async_waterfall;
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
	
		async_waterfall = function(arr, mapper) {
			var out = new Array(arr.length);
			var dfr = new class_Dfr;
			var i = -1;
	
			next();
					
			function next () {
				if (++i >= arr.length) {
					dfr.resolve(out);
					return;
				}
				var x = arr[i];
				if (x == null) {
					set(null, i);
					next();
					return;
				}
				var mix = mapper(x);
				if (mix == null || mix.then == null) {
					set(mix, i);
					next();
					return;
				}
				mix.then(x => {
					set(x, i);
					next();
				}, error => {
					dfr.reject(error);
				});
			}
			function set(value, i) {
				out[i] = value;			
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
	
		async_run = function(fn) {
			if (fn.length === 0) {
				var result = fn();
				if (result && result.then)
					return result;
	
				return async_resolve();
			}
			return class_Dfr.run((resolve, reject) => {
				fn(resolve, reject);
			});
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
		bundle: 'index',
		module: '',
	
		embed: false,
		asModules: null,
		inPages: null,
	
		constructor: function (includeData, parent, solution) {
			if (arguments.length === 0)
				return;
	
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
			this.page = includeData.page;
			this.asModules = [];
			this.inPages = [];
			this.source = null;
	
			if (includeData.bundle) {
				this.bundle = includeData.bundle;
			}
	
			if (includeData.module) {
				this.asModules = [ includeData.module ];
			}
			if (includeData.meta) {
				this.meta = includeData.meta;
			}
			if (includeData.page) {
				this.inPages = [ includeData.page ];	
			} else {
				var owner = parent;
				while(owner != null && owner.inPages.length === 0) {
					owner = owner.parent;
				}
				if (owner != null) {
					this.inPages = [ ...owner.inPages ];
				}
			}
	
			if (includeData.url == null) {
				return;
			}
			if (solution && solution.opts.mappings[includeData.url]) {
				includeData.url = solution.opts.mappings[includeData.url];
			}
	
			var url;
			
			var pathResolver = solution.handlers.findPathResolver(includeData);
			if (pathResolver) {
				url = pathResolver.resolve(includeData, parent);
			}
			if (url == null) {
				url = Include
					.PathResolver
					.resolveBasic(includeData.url, includeData.type, parent);
			}
	
			this.hash = path_sliceHash(url);
			if (this.hash) {
				url = url.replace(this.hash, '');
			}
			this.query = path_sliceQuery(url);
			if (this.query) {
				url = url.replace(this.query, '');
			}
	
			// System paths
			this.filename = path_toAbsolute(url, null, solution.opts.base);
			this.directory = path_getDir(this.filename);
	
			// Application paths
			this.url = '/' + path_toRelative(this.filename, solution.opts.base);
			if (url === 'baz') {
				console.log(new Error().stack);
			}
			this.location = path_getDir(this.url);
	
			if (this.query) {
				this.url += this.query;			
			}
			if (this.hash) {
				this.url += this.hash;			
			}
	
			var mapped = solution.opts.mapResource(this);
			if (mapped) {			
				return mapped;
			}
	
			this.solution = solution;
	
			return this;
		},
		clone () {
			var res = new Resource();
			res.resources = this.resource;
			res.parent = this.parent;
			res.filename = this.filename;
			res.directory = this.directory;
			res.content = this.content;
			res.url = this.url;
			res.location = this.location;
			res.namespace = this.namespace;
			res.type = this.type;
			res.bundle = this.bundle;
			res.module = this.module;
			res.embed = this.embed;
			res.asModules = this.asModules;
			res.inPages = this.inPages;
			res.source = this.source;
			return res;
		},
		toTarget (solution, settings) {
	
			var resource = settings && settings.targetType === 'static'
				? this._toStaticTarget(solution, settings)
				: this._toOutputTarget(solution, settings);
			
	
			resource.content = this.content;
			resource.asModules = this.asModules;
			resource.inPages = this.inPages;
			resource.bundle = this.bundle;
	
			if (solution.opts.version) {
				resource.url += '?v=' + solution.opts.version;
			}
	
			return resource;
		},
		_toStaticTarget (solution, settings) {
			var opts = solution.opts;
			var url = this.url;
	
			var filename = path_removeQuery(url);
			var resource = new Resource({ type: this.type }, this, solution);
			
			if (settings == null || settings.relative !== true) {
				url = path_combine(solution.opts.outputAppBase, url);
			}
			
	
			resource.url = url;
			resource.location = path_getDir(url);
			resource.filename = filename;
			resource.directory = path_getDir(filename);
			resource.source = this;
			return resource;
		},
		_toOutputTarget (solution, settings) {
			var opts = solution.opts;
			var url;
			if (solution.isMainResource(this)) {
				url = opts.outputMain;
			} else {
				url = path_combine(
					opts.getOutputFolder(this.type), 
					path_removeQuery(this.url)
				);			
			}
	
			var filename = path_combine(opts.outputBase, url);
			var resource = new Resource({ type: this.type }, this, solution);
	
			if (settings == null || settings.relative !== true && url.indexOf(solution.opts.outputAppBase) === -1) {
				url = path_combine(solution.opts.outputAppBase, url);
			}
	
			resource.url = url;
			resource.location = path_getDir(url);
			resource.filename = filename;
			resource.directory = path_getDir(filename);
			resource.source = this;
			return resource;
		},
		toRelative (resource) {
			var url = path_toRelative(this.filename, resource.filename);
			return url;
		},
		toTargetUrl (solution) {
			var url = this.url;
			if (url.indexOf(solution.opts.outputAppBase) === -1)
				url = path_combine(solution.opts.outputAppBase, url);
	
			return url;
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
		},
	
		getModule (solution) {
			var modules = this.asModules;
			if (modules == null || modules.length === 0) {
				return null;
			}
					
			if (modules.length === 1) {
				return modules[0];
			}
	
			var arr = ['global', 'commonjs', 'amd', 'includejs'];
			var name = arr.find(name => modules.indexOf(name) !== -1);
			if (name == null) {
				name = modules[0];
			}
			return name;
		},
	
		cdUrl (url) {
			if (url[0] === '/' || path_isRelative(url) === false)
				return url;
	
			return path_combine(this.location, url);
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
	// source ./class/ResourceMapping.js
	class ResourceMapping {
		constructor (resA, resB) {
			this.resA = resA;
			this.resB = resB;
		}
	
		map (resource) {
			var match = true;
			for(var key in this.resA) {
				var val = this.resA[key];
				if (val == null)
					continue;
	
				var currentVal = resource[key];
	
				if (typeof val === 'function') {
					match = val(currentVal);								
				}
				if (val instanceof RegExp) {
					match = val.exec(currentVal) != null;
				}
				if (typeof val === 'string' || typeof val === 'number') {
					match = val === currentVal;
				}
	
				if (match == false) 
					return resource;
			}
	
			var clone = resource.clone();
			for(var key in this.resB) {
				var val = this.resB[key];
				var currentVal = resource[key];
	
				if (typeof val === 'function') {
					clone[key] = val(currentVal, resource);
					continue;
				}
				if (typeof val === 'string' || typeof val === 'boolean') {
					clone[key] = val;
					continue;
				}
			}
	
			return clone;
		}
	}
	// end:source ./class/ResourceMapping.js
	// source ./class/Include.js
	var Include;
	(function(){
	
		var lib = require('includejs/lib/include.node.module.js');
		var Routes = lib.includeLib.Routes();
		var PathResolver = lib.includeLib.PathResolver
		var config = {};
	
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
						url: class_Uri.combine(this.base, route.path),
						route: route,
						namespace: namespace,
						module: 'includejs'
					});
				});
	
				return this;
			},
			cfg: function() {
				if (arguments.length === 2) {
					var key = arguments[0],
						val = arguments[1];
					config[key] = val;
				}
				if (arguments.length === 1) {
					mask.obj.extend(config, arguments[0]);
				}
				var result = lib.include.cfg.apply(lib.include, arguments);
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
		Include.getConfig = function () {
			return config;
		};
	
	
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
	
		// source ./VarDefinitions.js
		class VarDefinitions {
			constructor (solution, defs) {
				this.solution = solution;
				this.code = serializeVars(defs);
			}
		
			evaluate (expression) {
				try {
					var code = `${this.code}\n return ${expression};`;
					var fn = new Function(code);
					return fn();
				}
				catch (error) {
					var msg = `Expression evaluation failed: ${expression}. With message ${error.message}`;
					this.solution.reporter.error(msg);
				}
			}
		}
		
		function serializeVars (map) {
			var code = [];
			for(var key in map) {
				var expr = JSON.stringify(map[key]);
				var line = `var ${key} = ${expr};`
				code.push(line);
			}
			return code.join('\n');
		}
		
		// end:source ./VarDefinitions.js
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
					outputAppBase: '/',
					outputMain: 'build/{build}/{filename}.{ext}',
					outputSources: 'build/{build}',
					outputAssets: 'build/{build}/assets',
					package: {
						module: 'commonjs', 
						modules: ['commonjs', 'includejs', 'global'],
		
						type: 'module',
						types: [ 'module', 'bundle'],
		
						moduleWrapper: 'iif',
						moduleWrappers: ['umd', 'iif', 'script'],
						moduleName: '',
					},
					extensions: {
						'': { type: 'js'},
						
						'js':  { type: 'js' },
						'es6': { type: 'js' },
						'jsx': { type: 'js' },
						'ts':  { type: 'js' },
		
						'mask': { type: 'mask' },
		
						'css': { type: 'css' },
						'less': { type: 'css' },
						'scss': { type: 'css' },
						'sass': { type: 'css' },
		
						'html': { type: 'html' },
						'json': { type: 'data' },
		
						'jpg': { type: 'asset' },
						'png': { type: 'asset' },
						'mp4': { type: 'asset' },
					},
					defaultExtensions: {
						'js': 'js',
						'mask': 'mask',
						'css': 'css',
						'load': 'load'
					},
					mappers: null,
					mappings: null,
					middlewares: null,
					varDefs: null,
					parserIgnoreDependencies: [
						'\\/bower_components\\/',
						'\\/node_modules\\/',
						'\\.min\\.'
					],
					dynamicDependencies: [
		
					],
					silent: false,
					watch: false
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
						var opts = Object.create(this.defaults.package);
						return Object.assign(opts, packageOpts);
					},
					varDefs (varDefs) {
						return new VarDefinitions(this.solution, varDefs);
					},
					mappers () {
						return []
					},
					mappings (val) {
						return val || {};
					},
					middlewares (val) {
						_config.define('middlewares', val);
					},
					version (val, opts) {
						if (typeof val === 'string') {
							if (val[0] === '#') {
								var path = val.replace('#{', '').replace('}', '');
								var json = require(process.cwd() + '/package.json');
								return obj_getProperty(json, path);
							}
							if (val === 'random') {
								return (Math.random() * 100000000 | 0).toString(32);
							}
						}
						return val;
					},
					parserIgnoreDependencies (arr) {
						return arr.map(x => new RegExp(x));
					},
					dynamicDependencies (arr) {
						return arr.map(x => new RegExp(x));
					},
					extensions (opts) {
						if (opts === this.defaults.extensions) {
							return opts;
						}
						let def = Object.create(this.defaults.extensions);
						return Object.assign(def, opts);
					},
					defaultExtensions (opts) {
						if (opts === this.defaults.defaultExtensions) {
							return opts;
						}
						/** REFACTOR **/
						Include.prototype.cfg('extentionDefault', opts);
						for (var type in opts) {
							switch (type) {
								case 'js':
									mask.Module.cfg('ext.script', opts[type]);
									break;
								case 'css':
									mask.Module.cfg('ext.style', opts[type]);
									break;
							}
						}
						let def = Object.create(this.defaults.defaultExtensions);
						return Object.assign(def, opts);
					}
				},
				constructor: function(solution, opts_){
					this.solution = solution;
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
				},
				mapResource (resource_) {
					var resource = resource_;
					this.mappers.forEach(mapper => {
						resource = mapper.map(resource);
					});
					return resource;
				},
				toAppUrl (filename) {
					return '/' + path_toRelative(filename, this.base);
				},
				fromAppUrl (url) {
					return path_combine(this.base, url);
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
								return match[1];
							}
							throw new Error('Filename can`t be parsed from: ' + opts.paths.join(','));
						case 'ext':
							var path = opts.paths[0];
							if (path === '') 
								return opts.type;
		
							var match = /\.(\w+)$/.exec(path);
							if (match) {
								return match[1];
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
			}
		
			prepair (resources) {
				this.resources = [];
				this.pagesInput = {};
				this.items = [];
				
				this.rootInput = resources.pop();
				this.rootOutput = this.rootInput.toTarget(this.solution);
				this.rootOutput.content = this.rootInput.content;
		
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
				if (this.rootOutput) {
					all.push(this.rootOutput);
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
				var resource = new Resource({
					type: type, 
					url: filename,
					bundle: bundle
				}, null, solution);
		
				this.resource = resource.toTarget(solution);
				this.resources = resources || [];
			}
		}
		// end:source ./OutputResources.js
		// source ./Reporter.js
		class IReporter {
			static create (opts) {
				if (opts.silent === true) {
					return new SilentReporter();
				}
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
			info (...args) {
				console.info(...args);
			}
			print (...args) {
				process.stdout.write(...args);
			}
		
			treeTime(action, messageProvider, resources) {
				var start = Date.now();
				var dfr = action();
		
				dfr.done(() => {
					var end = Date.now();
					var seconds = ((end - start) / 1000).toFixed(2);
					var treeInfo = res_getTreeInfo(resources);
					this
						.info(messageProvider(treeInfo));
					this
						.info(treeInfo.treeString);			
				})
		
				return dfr;
			}
		}
		
		
		class SilentReporter {
			error (...args) {
			}
			warn (...args) {
			}
			log (...args) {
			}
			info (...args) {
			}
			print (...args) {
			}
		
			treeTime(action, messageProvider, resources) {
				return action();
			}
		}
		// end:source ./Reporter.js
		// source ./HandlersUtils.js
		let HandlersUtils = {
			findPathResolver (includeData) {
				var handler = this.find(x => x.pathResolver && x.pathResolver.accepts && x.pathResolver.accepts(includeData));
				return handler && handler.pathResolver;
			}
		}
		// end:source ./HandlersUtils.js
	
		Solution = class Solution extends class_EventEmitter {
			constructor (path, opts) {
				super();
	
				this.path = path;
				this.opts = new SolutionOpts(this, opts || {});
				this.assetsManager = new AssetsManager(this);
				this.outputResources = new OutputResources(this);
				this.reporter = IReporter.create(this.opts);
	
				this.handlers = Handlers.map(Ctor => new Ctor(this));
				Object.assign(this.handlers, HandlersUtils);	
			}
	
			getOptionsForResource (resource) {
				var files = this.opts.files;
				if (files == null) {
					return null;
				}
				// @TODO support settings for a resource
			}
	
			isMainResource (resource) {
				return this.outputResources.rootInput === resource;
			}
		};
	
	}());
	
	// end:source ./class/Solution.js
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

	// source ./config/
	var _config;
	(function(){
		// source ./Configuration.js
		class Configuration {
			constructor () {
				this.opts = {};
			}
		
			define (key, value) {
				let obj = this.opts[key];
				if (obj == null) {
					this.opts[key] = {
						default: value,
						value: value
					};
				} else {
					obj.value = value;
				}
				if (key === 'middlewares') {
					io.File.registerExtensions(value);
				}
			}
		
			defineMany (options) {
				for (var key in options) {
					this.define(key, options[key]);
				}
			}
		
			get (key) {
				var entry = this.opts[key];
				if (entry == null) {
					throw Error('Invalid configuration key: ' + key);
				}
		
				return entry.value || entry.default;
			}
		
			reset () {
				for (var key in this.opts) {
					var entry = this.opts[key];
					entry.value = entry.default;
				}
			}
		}
		// end:source ./Configuration.js
		_config = new Configuration;
	
		// source ./File.js
		_config.defineMany({
			readFile: function (path, opts) {		
				return io.File.readAsync(path, opts)
			},
			writeFile: function(path, content, opts){
				return io.File.writeAsync(path, content, opts);
			}
		});
		
		// end:source ./File.js
	}());
	
	// end:source ./config/

	// source ./assets/AssetsManager.js
	var AssetsManager;
	(function(){
		
		//source ./CssAssets.js
		var CssAssets;
		(function(){
			CssAssets = {
				rewrite (resource, targetResource, solution) {			
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
		
							if (solution.assetsManager.shouldRewritePath(href, resource, targetResource)) {
								var asset = new Resource({ type: 'asset', url: href }, resource, solution);
								content = replace(
									href,
									match,
									content,
									asset.url,
									targetResource.url,
									solution
								);
							}
							continue;
						}
		
						var asset = new Resource({ type: 'asset', url: href }, resource, solution);
						if (asset.filename in hash === false) {
							assets.push(asset);
							hash[asset.filename] = 1;
						}
		
						var assetUrl = asset.toTarget(solution).url;
						content = replace(
							href, 
							match, 
							content, 
							assetUrl, 
							targetResource.url, 
							solution
						);
		
						// var before = content.substring(0, match.index),
						// 	after = content.substring(match.index + match[0].length);
		
						// var assetUrl = asset.toTarget(solution).url;
						// var styleUrl = targetResource.url;
						// var relUrl = path_toRelative(assetUrl, styleUrl, "/");
						// var entry = match[0].replace(href, relUrl);
						// content = before + entry + after;
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
		
			function formatUrl (assetUrl, targetUrl) {
				var styleUrl = targetUrl;
				return path_toRelative(assetUrl, styleUrl, "/");
			}
		
			function replace (href, match, content, assetUrl, targetUrl, solution) {
				var before = content.substring(0, match.index),
					after = content.substring(match.index + match[0].length);
		
				var relUrl = formatUrl(assetUrl, targetUrl);
				var entry = match[0].replace(href, relUrl);
				return before + entry + after;
			}
		}());
		//end:source ./CssAssets.js
	
		AssetsManager = class AssetsManager {
			constructor (solution) {
				this.assets = [];
				this.solution = solution;
			}
			rewriteCss (resource, targetResource, solution) {
				var arr = CssAssets.rewrite(resource, targetResource, solution);
				if (arr) {
					this.assets.push(...arr);
				}
			}
			shouldCopy (href, parent) {
				if (withProtocol(href)) {
					return false;
				}
				if (href[0] === '/' && this.solution.opts.isSameBase()) {
					return false;
				}
				return true;
			}
			shouldRewritePath (href, ownerResource, targetResource) {
				return this.shouldCopy(href);
			}
			getAssets () {
				return this.assets;
			}
			clearCache () {
				this.assets = [];
			}
	
			flush () {
				var i = -1, 
					arr = this.assets, 
					dfr = new class_Dfr,
					manager = this;
				function next () {
					if (++i >= arr.length) {
						dfr.resolve(); 
						return;
					}
					var asset = arr[i];
					var target = asset.toTarget(manager.solution)
					io
						.File
						.copyToAsync(asset.filename, target.filename)
						.then(next, error => dfr.reject(error));
				}
				next();
				return dfr; 
			}
		};
	
		function hrefIsAbsolute(href) {
			if (withProtocol(href)) {
				return true;
			}
			if (href[0] === '/') {
				return true;
			}
			return false;
		}
	
		function withProtocol (href) {		
			if (/^\s*data:/.test(href)) {
				return true;
			}
			if (/^[\w]{1,8}:\/\//.test(href)) {
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
						.then((deps) => filterDynamicDeps(deps, solution))
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
		}
		function getDependenciesExternal(deps, resource, solution) {
			return _middlewares
				.run('parseDependencies', resource, deps, solution)
				.then(() => deps)
				;
		}
		function filterDynamicDeps(info, solution) {		
			info.dependencies = info.dependencies.filter(dep => isDynamicDependency(dep, solution) === false);
			return info;
		}
		function isDynamicDependency(dep, solution) {
			var arr = solution.opts.dynamicDependencies;
	  		return arr.length !== 0 && arr.some(rgx => rgx.test(dep.url));
		}
	}());
	// end:source ./parser/Parser.js

	// source ./loader/Loader.js
	var Loader;
	(function(){
	
		Loader = {
			opts: null,
			solution: null,
	
			load (type, path, opts, solution) {
				this.opts = opts;
				this.solution = solution;
	
				var includeData = { type: type, url: path, module: 'root', page: solution.opts.mainPage };
				var start = Date.now();
				return ResourceLoader
					.load(includeData, null, opts, solution)
					.then(loader => {
						var end = Date.now();
						var seconds = ((end - start) / 1000).toFixed(2);
						var treeInfo = res_getTreeInfo(loader.resource);
						var reporter = solution.reporter;
						reporter
							.info(`Loaded bold<yellow<${treeInfo.count}>> files in bold<yellow<${seconds}>> sec.`.color);
						reporter
							.info(treeInfo.treeString);
						return loader.resource;
					});
			},
			loadResource (resource) {
				return ResourceLoader
					.loadResource(resource, this.opts, this.solution)
					.then(loader => loader.resource);
			},
			clearCache () {
				ResourceLoader.clearCache();
				return this;
			},
			removeCached (filename) {
				ResourceLoader.clearCacheSingle(filename);
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
					if (loader == null) {
						loader = __loaders[resource.filename] = new TreeLoader(resource, opts, solution);
						loader.process();
					}
					if (includeData.page) {
						loader.done(() => {
							this.definePageForAll(includeData.page, loader.resource);
						});
					}
					
					return loader;
				},
				loadResource (resource, opts, solution) {
					var loader = __loaders[resource.filename];
					if (loader == null) {
						loader = __loaders[resource.filename] = new TreeLoader(resource, opts, solution);
						loader.process();
					}
					return loader;
				},
				clearCache () {
					__loaders = {};
					return ResourceLoader;
				},
				clearCacheSingle (filename) {
					delete __loaders[filename];
					return ResourceLoader;
				},
				definePageForAll (name, resource) {				
					res_walk(resource, res => {
						if (res.page) return false;
	
						var arr = res.inPages;
						if (arr.indexOf(name) !== -1)
							return;
	
						res.inPages.push(name);
					});
				}
			};
			var TreeLoader = class_create(class_Dfr, {
				constructor: function(resource, opts, solution) {
					this.solution = solution;
					this.resource = resource;
					this.opts = opts;
				},
				process () {
					this
						.solution
						.reporter
						.print('Load ' + toMessage(this.resource.url));
	
					function toMessage(path) {
						var parts = path.replace(/^\/+/, '').split('/');
						var name = parts.pop();
						parts = parts.map(x => `bold<${x}>`.color);
						name = `green<${name}>`.color;
						parts.push(name);
						return parts.join('/');
					}
					
					var start = Date.now();	
					var reader = _config.get('readFile');
					reader(this.resource.filename, this.opts).done(content => {			
						var end = Date.now();
						this.solution.reporter.print(` cyan<${end - start}> ms \n`.color);
						this.resource.content = content;
						this.processChildren();
					}).fail(error => this.reject(error));
				},
				processChildren () {
					if (this.shouldSkipChildren()) {
						this.resolve(this);
						return;
					}
					Parser
						.getDependencies(this.resource, this.solution)
						.then(result => this.loadChildren(result), error => this.reject(error));
				},
				loadChildren: function (result) {
					assert(Array.isArray(result.dependencies), `Expects array of dependencies for ${this.resource.url}`);
					
					this.resource.meta = obj_extend(this.resource.meta, result.meta);
	
					var deps = result.dependencies;
					async_waterfall(deps, dep => {
						return ResourceLoader
							.load(dep, this.resource, this.opts, this.solution)
							.then(loader => loader.resource);
					})
					.fail(error => this.reject(error))
					.done(resources => {
						this.resource.resources = resources;
						this.resolve(this);
					});
				},
				shouldSkipChildren () {
					var arr = this.solution.opts.parserIgnoreDependencies;
					var shouldSkip = arr.some(rgx => rgx.test(this.resource.filename));
					if (shouldSkip) {
						return true;
					}
	
					var meta = this.resource.meta;
					if (meta && meta.skipDependencies) {
						return true;
					}
					return false;
				}
			});
	
			var __loaders = {};
		}());
	
	}());
	// end:source ./loader/Loader.js
	// source ./loader/Watcher.js
	var Watcher;
	(function(){
	
		Watcher = {
			watch (resource, solution) {
				return new WatcherFactory(resource, solution);
			}
		};
	
		var WatcherFactory = mask.class.create(mask.class.EventEmitter, {
			constructor (resource, solution) {
				this.solution = solution;
				this.rootResource = resource;
				this.watchers = {};
				this.changeId = 0;
				this.bind(resource);
			},
	
			bind (resource) {
				var toWatch = res_flattern(resource)
					.map(x => x.filename)
					.filter(filename => (filename in this.watchers) === false);
	
				
				toWatch.forEach(filename => this.watchers[filename] = new FileWatcher(filename, this));
				this.solution.reporter.info(`Watching bold<cyan<${toWatch.length}>> files`.color);
			},
	
			changed (filename) {
				var changeId = ++this.changeId;
				var reporter = this.solution.reporter;
	
				reporter.info(`File changed bold<cyan<${path_getFile(filename)}>>`.color);			
				
	
				Loader.removeCached(filename);
	
				io.File.clearCache(filename);
	
				var resource = res_find(this.rootResource, (res) => res.filename === filename);
				if (resource == null)
					throw Error('Resource not found ' + filename);
	
				Loader
					.loadResource(resource)
					.then(
						(resource) => {
							this.bind(resource);
	
							if (this.changeId === changeId) {
								this.emit('changed');
							}
						}, 
						(error) => {						
							if (this.changeId !== changeId) {
								return;
							}
							reporter.error(`Resource errored ${filename}`);
							reporter.error(error);
							reporter.log('yellow<Watcher resumed...>'.color);
						});
			}
		});
	
	
		var FileWatcher = mask.class.create({
			constructor (filename, factory) {
				this.filename = filename;
				this.factory = factory;
	
				new io.File(filename).watch(() => this.factory.changed(filename));
			}
		});
	}());
	// end:source ./loader/Watcher.js
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
		
						return _middlewares
							.run('rewriteDependencies', resources, solution)
							.then(() => rewriteDependenciesInternal(resources))
							.then(rewriteRoot)
							.then(buildOutputItems)
							.then(buildRoot)
							.then(() => solution.outputResources.getAll());
					});
				
				function rewriteDependenciesInternal (resources) {
					var dfrs = resources.map(resource => {
						var ext = path_getExtension(resource.url);
						var handler = solution.handlers.find(x => 
							x.rewriter.accepts(ext)
						);
						if (handler == null) {
							handler = solution.handlers.find(x => 
								x.rewriter.accepts(resource.type)
							);
						}					
						if (handler == null) {
							throw Error('Rewriter not found for the resource: ' + resource.url);
						}					
						return handler.rewriter.rewriteResource(resource);
					});
					return async_whenAll(dfrs);
				}
	
				function rewriteRoot () {
					return async_run(() => {
						var input = solution.outputResources.rootInput,
							output = solution.outputResources.rootOutput,
							ext = path_getExtension(input.url);
	
						var handler = solution.handlers.find(x => x.rewriter.accepts(input.type) || x.rewriter.accepts(ext))				
						if (handler == null || handler.rewriter.rewriteRoot == null) {
							//throw new Error(`RootRewriter is not found for a resource ${input.url} and type ${input.type}`);
							return;
						}
									
						return handler.rewriter.rewriteRoot(input, output);
					})
				}
	
				function buildOutputItems () {
					var items = solution.outputResources.items;
					return async_map(items, item => {
						var otherOutputItems = items.filter(x => {
							if (x === item) return false;
							if (x.page != item.page) return false;
							if (x.bundle != item.bundle) return false;
							return true;
						});
						return buildBundle(item, otherOutputItems);
					});
				}
				function buildBundle (outputItem, otherOutputItems) {
					return _middlewares
						.run('buildBundle', outputItem, otherOutputItems)
						.then(buildBundleInternal)
				}
				function buildBundleInternal (outputItem, otherOutputItems) {				
					if (outputItem.resource.content) {
						return;
					}
					var ext = path_getExtension(outputItem.resource.url);
					var handler = solution.handlers.find(x => x.builder.accepts(outputItem.type));
					if (handler == null) {
						handler = solution.handlers.find(x => x.builder.accepts(ext));
					}
					if (handler == null) {
						throw Error(`Unknown builder for type ${outputItem.type}`)
					}
	
					return handler.builder.createModule(outputItem, otherOutputItems);
				}
				function buildRoot () {
					var main = solution.outputResources.rootOutput;
					var dependencies = solution.outputResources.getForPage(solution.opts.mainPage);
					var ext = path_getExtension(main.url);
					var handler = solution.handlers.find(x => x.builder.accepts(main.type) || x.builder.accepts(ext))				
					if (handler == null || handler.builder.buildRoot == null) {
						throw new Error(`RootBuilder is not found for a resource ${main.url} and type ${main.type}`);
					}
								
					return handler.builder.buildRoot(main, dependencies, solution);
				}					
			}
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
		
				var { Parser, Rewriter, Builder, PathResolver } = this.constructor;
				
				this.parser = new Parser(solution, this);
				this.rewriter = new Rewriter(solution, this);
				this.builder = new Builder(solution, this);
				this.pathResolver = new PathResolver(solution, this);
			}
		};
		
		// end:source ./BaseHandler.js
		// source ./BaseParser.js
		class BaseParser {
		
			constructor (solution, handler) {
				assert(solution instanceof Solution, 'Solution expected for Parser');		
				assert(handler instanceof BaseHandler, 'BaseHandler expected for the Parser');
		
				this.solution = solution;
				this.handler = handler;
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
			constructor (solution, handler) {
				assert(solution instanceof Solution, 'Solution expected for Rewriter');		
				assert(handler instanceof BaseHandler, 'BaseHandler expected for the Rewriter');
		
				this.solution = solution;
				this.handler = handler;
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
			constructor (solution, handler) {
				assert(solution instanceof Solution, 'Solution expected for the Builder');
				assert(handler instanceof BaseHandler, 'BaseHandler expected for the Builder');
		
				this.solution = solution;
				this.handler = handler;
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
		// source ./BasePathResolver.js
		class BasePathResolver {
			constructor (solution, handler) {
				this.solution = solution;
				this.handler = handler;
			}
			
			resolve (includeData, resource) {
				throw Error('Not implemented');
				return String();
			}
		
			accepts (type) {
				throw Error('Not implemented');
				return Boolean();
			}
		}
		// end:source ./BasePathResolver.js
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
						case 'True':
						case 'False':
						case 'Boolean':
							return node.value;
						case 'Array':
							return Array.from(node.elements).map(function(x) {
								return evaluateNode(x, scope);
							});
						case 'Object':
							var aggr = {};
							Array.from(node.properties).forEach(function(x) {
								aggr[x.key] = evaluateNode(x.value, scope);
							});
							return aggr;
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
			
			
			
						args = Array.from(args).map(function(x) {
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
				
						var ignore = [ 'exports', 'require' ];
						include.includes = include.includes.filter(x => ignore.indexOf(x.url) === -1);
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
						// if (this._isNodeJsNative(path)) {
						// 	//@TODO: Should we provide the shims for browser bilds?
						// 	return null;
						// }
						var groups = Include.groupByType([ path ], this.solution.opts);
						for(var type in groups) {
							include[type].apply(include, groups[type]);
						}
						return include.includes;
					}
					// _isNodeJsNative (path) {
				
					// }
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
				
						var opts = this.solution.opts.package.commonjs;
						if (opts && opts.output === 'simplified') {
							this.wrapModule = CommonJsBuilderSimplified.wrapModule;
							this.getRootContent = CommonJsBuilderSimplified.getRootContent;
						}
					}
				
					accepts (resource) {
						if (resource.type !== 'js') {
							return false;
						}
						var module = resource.getModule();	
						if (module == null || module === 'root') 
							module = this.solution.opts.package.module;
				
						return module === 'commonjs';
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
				
							var mainUrl = this.solution.outputResources.rootInput.url;
				
							body = Templates
								.Header
								.replace('%ROOT_DIR%', () => mainUrl);
						}
				
						var {url, content} = resource;
				
						var module = Templates
							.Module
							.replace('%MODULE_PATH%', () => url)
							.replace('%MODULE%', () => content);
						
				
						return body + module;
					}
				
					buildRoot (root, dependencies) {
						dependencies.forEach(x => x.embed = true);
				
						var content = this.getRootContent(root);
						var body = dependencies
							.map(x => x.content)
							.concat([ content ])
							.join('\n');
				
				
						var wrapper = this.solution.opts.package.moduleWrapper;
						switch (wrapper) {
							case 'iif':
								body = this.wrapWithIIF(body);
								break;
							case 'umd':
								body = this.wrapWithUMD(body);
								break;
							case 'script':
								break;
							default:
								throw new Error('Uknown module wrapper: ' + wrapper);
						}		
				
						root.content = body;
					}
				
					getRootContent (root) {
						return  root.content;
					}
				
					wrapWithIIF (body) {
						return Templates
							.RootModule
							.replace('%BUNDLE%', () => body);
					}
					
					wrapWithUMD (body) {
						var opts = this.solution.opts.package;
						var name = opts.moduleName;
						if (!name) {
							throw Error('`moduleName` option is not set. Should be used for UMD wrapper');
						}
						return Templates
							.UMD
							.replace('%MODULE%', () => body)
							.replace('%NAME%', () => name)
							;
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
					ModuleSimplified: `
				// source ./templates/ModuleSimplified.js
				var %VAR_ID%;
				(function () {
					var exports = {};
					var module = { exports: exports };
					%MODULE%;
				
					%VAR_ID% = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
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
							if (/\\.\\w+$/.test(path) === false) {
								path += '.js';
							}
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
				
					__require =__originalRequire.bind({ location: path_getDir(path_resolveUrl('%ROOT_DIR%')) });
				
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
					UMD: `
				// source ./templates/UMD.js
				(function(factory){
					
					var _name = '%NAME%',
						_global = typeof window === 'undefined' ? global : window,
						_module = {
							exports: {}
						};
				
					factory(_module, _global);
				
					if (typeof define === 'function' && define.amd) {
				        define([], function () {
				        	return _module.exports;
				        });
				        return;
				    } 
				    if (typeof module === 'object' && module.exports) {
				    	module.exports = _module.exports;
				    	return;
				    }
				
				    _global[_name] = _module.exports;
				
				}(function(module, global){
					%MODULE%
				}));
				// end:source ./templates/UMD.js
				`,
				};
				// end:source ./CommonJsBuilder.js
				// source ./CommonJsPathResolver.js
				CommonJsHandler.PathResolver = class CommonJsPathResolver extends BasePathResolver {
				
					constructor () {
						super(...arguments);
					}
					
					accepts (includeData) {
						if (includeData.type !== 'js' || includeData.module !== 'commonjs') {
							return false;
						}
						if (!/^[\w\-/]+$/.test(includeData.url)) {
							return false;
						}
						if (nodeCoreModules.indexOf(includeData.url) !== -1) {
							return false;
						}
				
						return true;
					}
				
					resolve (includeData, parentResource) {		
						var filename = nodeModuleResolve(includeData.url, parentResource.directory);
						if (filename) {
							var url = this.solution.opts.toAppUrl(filename);
							this.solution.opts.mappings[includeData.url] = url;
						}
						return filename;
					}
				};
				
				
				var nodeCoreModules = ['assert', 'buffer', 'child_process', 'cluster', 'console', 'constants', 
				    'crypto', 'dgram', 'dns', 'domain', 'events', 'fs', 'http', 'https', 'module', 'net', 'os', 'path', 
				    'process', 'punycode', 'querystring', 'readline', 'repl', 'stream', 'string_decoder', 'sys', 'timers', 
				    'tls', 'tty', 'url', 'util', 'vm', 'zlib'];
				
				function nodeModuleResolve(path, location_){
					var location = location_.replace(/[\\\/]+$/, '');
					var name = /^([\w\-]+)/.exec(path)[0];
					var resource = path.substring(name.length + 1);
					if (resource && hasExt(resource) === false) {
						resource += '.js';
					}
					var current = location;
					var root_ = current + '/node_modules/' + name + '/';
					while (true)  {
						var nodeModules = current + '/node_modules/' + name + '/';
						var pckg = nodeModules + 'package.json';
						if (io.File.exists(pckg) === false) {
							var next = current.replace(/[^\/\\]+$/, '');
							if (next === current) {
								return root_ + 'package.json';
							}
							current = next;
							continue;
						}
				
						var json = io.File.read(pckg);
						if (typeof json === 'string') {
							json = JSON.parse(json);
						}
						if (resource) {
							return nodeModules + resource;
						}
						console.log(json.main, '>', path_combine(nodeModules, json.main))
						if (json.main) {
							return path_combine(nodeModules, json.main)
						}		
						return nodeModules + 'index.js';
					}
				}
				function hasExt(path) {
					return /\.[\w]{1,8}($|\?)/.test(path);
				}
				// end:source ./CommonJsPathResolver.js
			
				// source ./CommonJsBuilderSimplified.js
				var CommonJsBuilderSimplified;
				(function(){
					CommonJsBuilderSimplified = {
						wrapModule (resource) {
							
							var varId = getVarId(resource);
							var content = resource.content;
							var rgx_EXPORTS = /module\.\s*exports/g;
							var rgx_REQUIRE = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
				
							//content = content.replace(rgx_EXPORTS, () => varId);
							content = replaceWithVarIds(content, resource, this.solution);			
							return Templates
								.ModuleSimplified
								.replace(/%VAR_ID%/g, () => varId)
								.replace(/%MODULE%/g, () => content)
								;
							
						},
				
						getRootContent (root) {
							var content = root.content,
								rootInput = this.solution.outputResources.rootInput;
				
							return replaceWithVarIds(content, rootInput, this.solution);
						}
					};
				
					function replaceWithVarIds(content, resource, solution) {
						var rgx_REQUIRE = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
				
						return content.replace(rgx_REQUIRE, (full, path) => {
							var res = new Resource({ url: path, type: 'js'}, resource, solution);
							var current = resource.resources.find(x => x.url === res.url);
							if (current == null) {
								return full;
							}
							return getVarId(current);
						});
					}
					function getVarId (resource) {
						var str = resource.url.replace(/\.\w+$/, '');
						return str.replace(/[^\w\d]/g, '_');
					}
				}());
				// end:source ./CommonJsBuilderSimplified.js
			
			}());
			// end:source ./common-js/
			// source ./include-js/
			var IncludeJsHandler;
			
			(function(){
			
				// source ./IncludeJsHandler.js
				IncludeJsHandler = class IncludeJsHandler extends BaseHandler {
					constructor () {
						super(...arguments);
				
						if (this.solution.opts.package.module === 'includejs') {
							this.registerMappings_();
						}
					}
				
					accepts (resource) {
						if (resource.type !== 'js') {
							return false;
						}
						var module = resource.getModule();	
						if (module == null || module === 'root') 
							module = this.solution.opts.package.module;
				
						return module === 'includejs';
					}
				
					
				
					rewriteRoot (root, dependencies) {
						dependencies.forEach(x => x.embed = true);
				
				
						var body = dependencies
							.map(x => x.content)
							.concat([ root.content ])
							.join('\n');
				
						body = Templates.RootModule.replace('%BUNDLE%', () => body);
				
						root.content = body;
					}
				
					resolvePath (includeData, parent) {
						return Include
							.PathResolver
							.resolveBasic(includeData.url, includeData.type, parent);
					}
				};
				
				// end:source ./IncludeJsHandler.js
				// source ./IncludeJsParser.js
				IncludeJsHandler.Parser = class IncludeJsParser extends BaseParser {
				
					constructor (solution) {
						super(...arguments);
				
						if (this.solution.opts.package.module === 'includejs') {
							this.solution.opts.mappers.push(...IncludeJsMappings);
						}
					}
					
					getDependencies (ast, ownerResource) {
						
						var info = {
							dependencies: [],
							meta: {
								includejs: {
									hasIncludes: false,
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
							case 'cfg':
								var pckg = {
									type: node.expression.property,
									args: AstUtil.getArguments(node.args, scope),
								};
				
								if (pckg.args.length > 0) {
									arr.unshift(pckg);
								}
								info.meta.includejs.hasIncludes = true;
				
								break
							case 'done':
							case 'ready':
								this._processIncludeCallback(info, node.args && node.args[0]);
								break;			
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
				
				
				var IncludeJsMappings = [
					new ResourceMapping({
						asModules: (arr) => arr.indexOf('mask') > -1
					}, {
						asModules: (arr) => {
							var i = arr.indexOf('mask');
							arr[i] = 'includejs';
							return arr;
						}
					}),
					new ResourceMapping({
						asModules: (arr) => arr.indexOf('amd') > -1
					}, {
						asModules: (arr) => {
							var i = arr.indexOf('amd');
							arr[i] = 'includejs';
							return arr;
						}
					}),
					new ResourceMapping({
						type: 'mask'
					}, {
						type: 'load'
					})
				];
				// end:source ./IncludeJsParser.js
				// source ./IncludeJsRewriter.js
				IncludeJsHandler.Rewriter = class IncludeJsRewriter extends BaseRewriter {
				
					constructor () {
						super(...arguments);
					}
				
					rewritePartial (content, ownerResource) {
				
					}
				
					rewriteResource (resource) {
						if (resource.getModule() === 'global' && resource && resource.meta && resource.meta.includejs && resource.meta.includejs.hasIncludes) {
							resource.asModules = ['includejs'];
						}
					}
				
					accepts (type) {
						return type === 'js';
					}
				};
				// end:source ./IncludeJsRewriter.js
				// source ./IncludeJsBuilder.js
				IncludeJsHandler.Builder = class IncludeJsBuilder extends BaseBuilder {
				
					constructor () {
						super(...arguments);
					}
				
					wrapModule (resource, outputItem, otherOutputItems) {
						var opts = this.solution.opts;
						var page = res_getPage(resource, opts);
						
						if (opts.includejs == null) {
							opts.includejs = {};							
						}
						if (opts.includejs[page] == null) {
							opts.includejs[page] = {
								addHeading: true,
								hasHeading: false,
								lastItem: null
							};
						}
				
						var builderOpts = opts.includejs[page];
						var body = '';
				
						if (builderOpts.hasHeading === false && builderOpts.addHeading === true) {			
							builderOpts.hasHeading = true;			
							body = this._createHeading(builderOpts, resource, outputItem, otherOutputItems);
						}
				
						var content = resource.content,
							url = resource.toTargetUrl(this.solution);
				
				
						body += `include.setCurrent({ url: '${url}' });\n`
						body += content;
						body += `\ninclude.getResourceById('${url}', 'js').readystatechanged(3);`
				
						if (builderOpts.hasHeading && builderOpts.lastItem === resource) {
							body += `\ninclude.resumeStack();`
						}
				
						return body;
					}
				
					buildRoot (resource, dependencies) {
				
					}
				
					accepts (resource) {
						if (resource.type !== 'js') {
							return false;
						}
						var module = resource.getModule();			
						return module === 'includejs';
					}
				
				
					_createHeading (builderOpts, resource, outputItem, otherOutputItems) {
						var outputItems = [outputItem, ...otherOutputItems];
						var allResources = arr_flattern(outputItems.map(x => x.resources));
				
						var jsResources = allResources.filter(x => this.accepts(x));
						var cssResources = allResources.filter(x => x.type === 'css');
						var loadResources = allResources.filter(x => x.type === 'load');
				
				
				
				
						builderOpts.lastItem = jsResources[jsResources.length - 1];
				
						var jsRegister = this._serializeRegister(jsResources, 'js');
						var cssRegister = this._serializeRegister(cssResources, 'css');
						var loadRegister = this._serializeRegister(loadResources, 'load');
						var version = this._serializeVersion();
						var config = this._serializeConfig();
						var heading = `
						${version}
						${config}
						include.pauseStack();
						${jsRegister}
						${cssRegister}
						${loadRegister}
						`;
				
				
						return heading;
					}
				
					_serializeVersion () {
						var v = this.solution.opts.version;
						if (!v) return '';
						return `include.cfg('version', '${v}');`
					}
				
					_serializeConfig () {
						var opts = Include.getConfig();
						var json = JSON.stringify(opts);
						if (json === '{}') return '';
						return `include.cfg(${json});`
					}
				
					_serializeRegister (resources, type) {
						var paths = resources
							.filter(x => x.type === type)
							.map(x => {
								return { 
									type: type, 
									url: x.toTargetUrl(this.solution) 
								};
							});
				
						if (paths.length === 0) {
							return '';
						}
						var json = JSON.stringify({
							[type]: paths
						});
						return `
							include.register(${json});
						`;
					}
					
				};
				
				
				// end:source ./IncludeJsBuilder.js
			
			}());
			// end:source ./include-js/
			// source ./global-js/
			var GlobalJsHandler
			(function(){
			
				// source ./GlobalJsHandler.js
				GlobalJsHandler = class GlobalJsHandler extends BaseHandler {
					constructor () {
						super(...arguments);
					}
				};
				
				// end:source ./GlobalJsHandler.js
				// source ./GlobalJsBuilder.js
				GlobalJsHandler.Builder = class GlobalJsBuilder extends BaseBuilder {
				
					constructor () {
						super(...arguments);
					}
					wrapModule (resource) {
						return resource.content;
					}
					
					accepts (resource) {		
						return resource.type === 'js' && resource.getModule() === 'global';
					}
					
				};
				
				
				// end:source ./GlobalJsBuilder.js
				// source ./GlobalJsParser.js
				GlobalJsHandler.Parser = class GlobalJsParser extends BaseParser {
				
					constructor () {
						super(...arguments);
					}
					
					getDependencies (ast, ownerResource) {
						
					}
				};
				
				// end:source ./GlobalJsParser.js
				// source ./GlobalJsRewriter.js
				GlobalJsHandler.Rewriter = class GlobalJsRewriter extends BaseRewriter {
				
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
				// end:source ./GlobalJsRewriter.js
			}());
			// end:source ./global-js/
			// source ./mask-js/
			var MaskJsHandler
			(function(){
			
				// source ./MaskJsHandler.js
				MaskJsHandler = class MaskJsHandler extends BaseHandler {
					constructor () {
						super(...arguments);
					}
				};
				
				// end:source ./MaskJsHandler.js
				// source ./MaskJsBuilder.js
				MaskJsHandler.Builder = class MaskJsBuilder extends BaseBuilder {
				
					constructor () {
						super(...arguments);
					}
					wrapModule (resource) {
						return Templates
							.module
							.replace('%URL%', () => resource.url)
							.replace('%CONTENT%', () => resource.content);
					}
					
					accepts (resource) {		
						return resource.type === 'js' && resource.getModule() === 'mask';
					}
					
				};
				
				var Templates = {
					module: `
					var module = { exports: {} };
					
					%CONTENT%
				
					;(function(exports, Module){
						var endpoint = new Module.Endpoint('%URL%', 'script');
						Module.registerModule(exports, endpoint);
					}(module.exports, mask.Module));
				`
				}
				// end:source ./MaskJsBuilder.js
				// source ./MaskJsParser.js
				MaskJsHandler.Parser = class MaskJsParser extends BaseParser {
				
					constructor () {
						super(...arguments);
					}
					
					getDependencies (ast, ownerResource) {
						
					}
				};
				
				// end:source ./MaskJsParser.js
				// source ./MaskJsRewriter.js
				MaskJsHandler.Rewriter = class MaskJsRewriter extends BaseRewriter {
				
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
				// end:source ./MaskJsRewriter.js
			}());
			// end:source ./mask-js/
		
			// source ./ScriptHandler.js
			ScriptHandler = class ScriptHandler extends BaseHandler {
				constructor () {
					super(...arguments);
				}
				accepts (type) {
					return type === 'js';
				}
			};
			
			// end:source ./ScriptHandler.js
			// source ./ScriptParser.js
			ScriptHandler.Parser = class ScriptParser extends BaseParser {
			
				constructor () {
					super(...arguments);
			
					this.parsers = [
						new CommonJsHandler.Parser(this.solution, this.handler),
						new AmdJsHandler.Parser(this.solution, this.handler),
						new IncludeJsHandler.Parser(this.solution, this.handler),
					];
				}
				
				getDependencies (content, ownerResource) {
					var opts = {
						filename: ownerResource.filename
					};
					var ast;
					try {
						ast = AstUtil.parse(content, opts);
					} catch (error) {
						if (/^throw\s+(new\s+)?Error/i.test(content)) {
							var error = new Error(content);
							error.filename = ownerResource.filename;
							throw error;
						}
						if (error.filename == null) {
							error.filename = ownerResource.filename
						}
						return async_reject(error);
					}
			
					var dfrs = this.parsers.map(parser => parser.getDependencies(ast, ownerResource));
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
			
					this.rewriters =  [
						new IncludeJsHandler.Rewriter(this.solution, this.handler)			
					];
				}
			
				rewritePartial (content, ownerResource) {
			
				}
			
				rewriteResource (resource) {
					this.rewriters.forEach(rewriter => {
						rewriter.rewriteResource(resource);
					});
				}
			
				accepts (type) {
					return type === 'js';
				}
			};
			// end:source ./ScriptRewriter.js
			// source ./ScriptBuilder.js
			ScriptHandler.Builder = class ScriptBuilder extends BaseBuilder {
			
				constructor () {
					super(...arguments);
			
					this.builders =  [
						new GlobalJsHandler.Builder(this.solution, this.handler),
						new CommonJsHandler.Builder(this.solution, this.handler),
						new AmdJsHandler.Builder(this.solution, this.handler),
						new IncludeJsHandler.Builder(this.solution, this.handler),
						new MaskJsHandler.Builder(this.solution, this.handler)
					];
				}
			
				createModule (outputItem, otherOutputItems) {
					var out = outputItem.resources.map(res => {
			
						var builder = this.builders.find(x => x.accepts(res));
						if (builder == null)
							throw new Error('Builder is not found for ' + res.url);
			
						return builder.wrapModule(res, outputItem, otherOutputItems);
					});
					
					outputItem.resource.content = out.join('\n');
				}
			
				buildRoot (resource, dependencies) {
					var builder = this.builders.find(x => x.accepts(resource));
					if (builder == null)
						throw new Error('Builder is not found for ' + resource.url);
			
					return builder.buildRoot(resource, dependencies);
				}
			
				accepts (type) {
					return type === 'js';
				}
				
			};
			
			
			// end:source ./ScriptBuilder.js
			// source ./ScriptPathResolver.js
			ScriptHandler.PathResolver = class ScriptPathResolver extends BasePathResolver {
			
				constructor () {
					super(...arguments);
					this.resolvers = [
						new CommonJsHandler.PathResolver(this.solution, this.handler)
					];
				}
				
				accepts (includeData) {
					if (includeData.type !== 'js') {
						return false;
					}
					var resolver = this._getInnerResolver(includeData);
					return resolver != null;
				}
			
				resolve (includeData, parentResource) {
					var resolver = this._getInnerResolver(includeData);		
					return resolver.resolve(includeData, parentResource);
				}
			
				_getInnerResolver (includeData) {
					return this.resolvers.find(x => x.accepts(includeData));
				}
			};
			
			// end:source ./ScriptPathResolver.js
		
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
			
				resolvePath (includeData, parent) {
					var endpoint = {
						path: includeData.url
					};
					return mask.Module.resolvePath(endpoint, parent, parent, parent);
				}
			
				accepts (type) {
					return type === 'mask';
				}
				
			};
			
			// end:source ./MaskHandler.js
			// source ./MaskParser.js
			(function () {
				
				MaskHandler.Parser = class MaskParser extends BaseParser {
			
					constructor () {
						super(...arguments);
			
						mask.Module.cfg('base', '');
					}
					
					getDependencies (content, ownerResource) {
						var ast = this._parse(content, ownerResource);
						var arr = [];
						this._forEachImports(ast, imports => {
							arr.push(...imports);
						});		
						return async_resolve({ dependencies: arr });
					}
			
					accepts (type) {
						return type === 'mask';
					}
			
					_parse (content, resource) {
						mask.off('error');
						mask.off('warn');
			
						var reporter = this.solution.reporter;
						mask.on('error', error => reporter.error(toMessage(error)));
						mask.on('warn', warning => reporter.warn(toMessage(warning)));
			
						function toMessage (warning) {
							var msg = '';
							if (resource) msg += `yellow<${resource.url}>\n`.color;
							msg += warning.message;
							return msg;
						}
			
						return mask.parse(content);
					}
			
					_forEachImports (ast, cb) {
						mask.TreeWalker.walk(ast,  node => {
							if (node.tagName === 'imports') {				
								var imports = Array
									.from(node.nodes)
									.filter(x => x.tagName === 'import')
									.map(x => this._getDependenciesFromNode(x))
									.reduce((aggr, x) => aggr.concat(...x), []);
			
								cb(imports);
							}
							if (node.tagName === 'import:cfg') {
								var arr = mask.Utils.Expression.evalStatements(node.expression);
								mask.Module.cfg.apply(mask.Module, arr);
							}
						});
					}
			
					_getDependenciesFromNode (node) {
						var page = this._getPageForNode(node),
							path = mask.Module.resolvePath(node, null, null, null, false),
							type = mask.Module.getType(new mask.Module.Endpoint(path, node.contentType));			
			
						if (path[0] === '/') {
							var base = mask.Module.cfg('base');
							if (base) {
								path = path_combine(base, path);
							}
						}		
						return [ this._createDependency(path, type, page) ];
					}
			
					_cfg_getExtensionForType (type) {
						return mask.Module.cfg('ext')[type];
					}
			
					_cfg_getBaseForNs (type) {
						return mask.Module.cfg('nsBase') || '';
					}
			
					_createDependency (path, type, page) {
						return {
							url: path,
							type: MAPPING[type],
							module: 'mask',
							page: page
						};		
					}
			
					_getPageForNode (node) {
						var owner = node.parent;
						if (owner != null && owner.tagName === 'imports') {
							owner = owner.parent;
						}
						if (owner == null || owner.type === mask.Dom.FRAGMENT) {
							return null;
						}
						var page = owner.attr['data-bundler-page'] || owner.attr.page || owner.attr.id || owner.attr.name;
						if (page == null) {
							this.solution.reporter.warn('Nested import found, but the container has no "data-bundler-page", "page", "id" or "name" in attributes');
						}
						return page;
					}
				};
			
				var MAPPING = { mask: 'mask', data: 'load', script: 'js', style: 'css' };
			
			}());
			// end:source ./MaskParser.js
			// source ./MaskRewriter.js
			MaskHandler.Rewriter = class MaskRewriter extends BaseRewriter {
			
				constructor () {
					super(...arguments);
				}
			
				rewritePartial (content, ownerResource) {
					var parser = this.handler.parser;
					var ast = parser._parse(content, ownerResource);
					var found = false;
			
					mask.TreeWalker.walk(ast,  node => {
						if (node.tagName !== 'imports') {
							return;
						}
			
						if (ownerResource.source && ownerResource.location !== ownerResource.source.location) {
							node
								.nodes
								.filter(x => path_isRelative(x.path))
								.forEach(x => {
									let ownerSource = ownerResource.source.url,
										ownerTarget = ownerResource.url,
										currentUrl = path_normalize(path_combine(path_getDir(ownerSource), x.path)),
										targetUrl = path_toRelative(currentUrl, ownerTarget);
			
									x.path = currentUrl;//targetUrl;
								});
				
						}
						
						var page = parser._getPageForNode(node.nodes[0]);
						if (page == null) {
							return;
						}
			
						found = true;
						var template = this
							.solution
							.outputResources
							.getForPage(page)
							.sort((a, b) => {
								if (a.type === b.type) {
									return 0;
								}
								if (a.type === 'js') {
									return 1;
								}
								return 0;
							})
							.map(x => {
								let url = x.url; //x.toRelative(ownerResource); 
								return `import sync from '${url}';`
							})
							.join('');
			
						var imports = mask.parse(template);
						node.nodes.unshift(...(imports.nodes));
					});
					if (found === false) {
						return;
					}
					return mask.stringify(ast, {
						indent: this.solution.opts.minify ? 0 : 4 
					});
				}
			
				rewriteResource (resource) {
					var meta = resource.meta;
					if (meta != null && meta.hasPages === false) {
						return;
					}
			
					var result = this.rewritePartial(resource.content, resource);
					if (result && result !== resource.content) {
						resource.content = result;
					}
				}
			
				rewriteRoot (resourceInput, resourceOutput) {
					var ast = this.handler.parser._parse(resourceInput.content);
					mask.TreeWalker.walk(ast, (node) => {
						if (node.tagName !== 'import')
							return;
			
						if (path_isRelative(node.path) === false)
							return;
			
						var path = path_combine(path_getDir(resourceInput.url), node.path);
						
						node.path = path_toRelative(path, resourceOutput.url);
					});
			
					resourceOutput.content = mask.stringify(ast, { indent: 4 });
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
			
				createModule (outputItem, otherOutputItems) {
					var out = [], arr;
			
					otherOutputItems.forEach(item => {
						if (item.resource.type === 'css') {
							var arr = this.registerStyles(item.resources);
							out.push(...arr);
						}
					})
			
					arr = outputItem.resources.map(resource => {
						var url = resource.url;//resource.toRelative(outputItem.resource);
						return `module path="${url}" { 
							${resource.content}
						}`
					});
					out.push(...arr);
			
					
					outputItem.resource.content = out.join('\n');
				}
			
				buildRoot (resource, dependencies) {
			
					var maskDeps = dependencies.filter(x => x.type === 'mask');
			
					maskDeps.forEach(x => x.embed = true);
					
					var body = maskDeps.map(x => x.content).join('\n');
					var imports = dependencies
						.filter(x => x.type !== 'mask')
						.map(x => {
							var url = x.toRelative(resource);				
							return `import sync from '${url}';`;
						})
						.join('\n');
			
					
					
					resource.content = `${body}\n${imports}\n${resource.content}`;
				}
			
				accepts (type) {
					return type === 'mask';
				}
			
				registerStyles (resources) {
					return resources.filter(x => x.getModule() === 'mask').map(resource => {
						return `module path="${resource.url}";`
					});
				}
				
			};
			
			
			// end:source ./MaskBuilder.js
			// source ./MaskPathResolver.js
			(function () {
			
				MaskHandler.PathResolver = class MaskPathResolver extends BasePathResolver {
			
					constructor () {
						super(...arguments);
					}
					resolve (includeData, resource) {
						var node = {
							path: includeData.url,
							type: MAPPING[includeData.type]
						};
						var module = {
							path: resource.url,
							location: resource.location
						};
						return mask.Module.resolvePath(node, null, null, module);
					}
					accepts (includeData) {
						return includeData.module === 'mask';
					}
				};
			
			
				var MAPPING = { mask: 'mask', load: 'data', js: 'script', css: 'style' };
			
			}());
			// end:source ./MaskPathResolver.js
		
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
				accepts (type) {
					return type === 'css';
				}
			};
			
			// end:source ./CssHandler.js
			// source ./CssParser.js
			CssHandler.Parser = class CssParser extends BaseParser {
			
				constructor () {
					super(...arguments);
				}
				
				getDependencies (content, ownerResource) {		
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
			
				createModule (outputItem) {
					var out = outputItem
						.resources
						.map(res => {
							this.solution.assetsManager.rewriteCss(res, outputItem.resource, this.solution);
							return res.content;
						});
					
					outputItem.resource.content = out.join('\n');
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
			// source ./CssPathResolver.js
			CssHandler.PathResolver = class CssPathResolver extends BasePathResolver {
			
				constructor () {
					super(...arguments);
				}
				
				accepts (type) {
					return false;
				}
			};
			
			// end:source ./CssPathResolver.js
		
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
						module: 'global',
						bundle: el.attr('data-bundler-bundle')
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
						bundle: el.attr('data-bundler-bundle'),
						meta: {
							skipDependencies: el.attr('data-bundler-dependencies') === 'ignore'
						}
					};		
					return [ resource ];
				}
			
				getSource (el) {
					return el.attr('src') || el.attr('data-bundler-src')
				}
			}
			// end:source ./readers/ScriptLinkReader.js
			// source ./readers/ScriptContentReader.js
			class ScriptContentReader {
				constructor (solution) {
					this.solution = solution;
				}
			
				canHandle (el) {
					var tagName = el.prop('tagName');
					if (tagName == null || tagName.toLowerCase() !== 'script') {
						return false;
					}
			
					var type = el.attr('type');
					if (type && type.toLowerCase().indexOf('javascript') === -1) {
						return false;
					}
			
					return true;
				}
			
				read (el) {
					var content = el.text();
					var handler = this.solution.handlers.find(x => x.parser.accepts('js'));
					return handler.parser.getDependencies(content, {}).then(({dependencies}) => {
						
						return dependencies;
					});
				}
			}
			// end:source ./readers/ScriptContentReader.js
			
			HtmlHandler.Parser = class HtmlParser extends BaseParser {
			
				constructor () {
					super(...arguments);
			
					this.readers = [
						new MaskContentReader(this.solution),
						new StyleLinkReader(this.solution),
						new ScriptLinkReader(this.solution),
						new ScriptContentReader(this.solution)
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
			
						var condition = $el.attr('data-bundler-if');
						if (condition) {
							var result = this.solution.opts.varDefs.evaluate(condition)
							if (!result) {
								return;
							}
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
			// source ./serializers/BaseSerializer.js
			class BaseSerializer {
				constructor (solution, builder) {
					this.solution = solution;
					this.builder = builder;
				}
			
				removeDependencies ($) {
					throw new Error('Not implemented');
					return void 0;
				}
			
				serialize ($, allDependencies) {
					throw new Error('Not implemented');
					return void 0;
				}
			
				rewrite ($, ownerResource) {
					throw new Error('Not implemented');
					return void 0;	
				}
			
				clean ($) {
					return void 0;
				}
			
			
				_replaceWithPlaceholder ($el, type) {
					var bundle = $el.attr('data-bundler-bundle') || 'index';
					var html = `<placeholder id="bundlers-placeholder" type="${type}" bundle="${bundle}" />`;
					$el.replaceWith(html);
				}
			
				_insertDependency ($, resource, html) {
					var bundle = resource.bundle;
					var type = resource.type;
					var getSelector = (bundle) => {
						return `placeholder#bundlers-placeholder[type="${type}"][bundle="${bundle}"]`
					};
					
					var bundleSelector = getSelector(resource.bundle);
					var globalSelector = getSelector('index');
					var el = $(bundleSelector).first();
					if (el.length !== 0) {
						el.before(html);
						return true;
					}
					el = $(globalSelector).first();
					if (el.length !== 0) {
						el.before(html);
						return true;
					}
			
					return false;
				}
			
				_rewriteStaticUrls (ownerResource, $, selector, pathAttrName) {
					$(selector)
						.each((i, el) => {
							var path = $(el).attr(pathAttrName);
							if (!path || path_withProtocol(path))
								return;
			
							var resource = new Resource({url: path, module: 'html'}, ownerResource, this.solution);
							var url = resource.toTarget(this.solution, { targetType: 'static' }).url;
			
			
							$(el).attr(pathAttrName, url);
						});
				}
			
				_inlineResources (ownerResource, $, selector, pathAttrName, createHtmlFn) {
					var reporter = this.solution.reporter;
					$(selector)
						.each((i, el) => {
							var path = $(el).attr(pathAttrName);
							if (/^https?:/.test(path)) {
								reporter.error('Only local resources can be inlined. Current: ' + path);
								return;
							}
			
							var resource = new Resource({url: path, module: 'html'}, ownerResource, this.solution);
							if (io.File.exists(resource.filename) === false) {
								reporter.error('File not found: ' + resource.filename);
								return;
							}
			
							var content = io.File.read(resource.filename);
							var html = createHtmlFn(content);
							$(el).replaceWith(html);
			
							reporter.info('Inlined resource from ' + resource.url);
						});
				}
			}
			// end:source ./serializers/BaseSerializer.js
			// source ./serializers/MaskSerializer.js
			class MaskSerializer extends BaseSerializer {
			
				constructor (...args) {
					super(...args);
				}
			
				removeDependencies ($) {
					return void 0;
				}
			
				serialize ($, resources) {
					var arr = resources.filter(x => x.type === 'mask');
					if (arr.length === 0)
						return;
			
					arr.forEach(x => x.embed = true);
					var html = arr
						.map(x => `<script type='text/mask' data-run='auto'>\n${x.content}\n</script>`)
						.join('\n');
			
					this
						.builder
						.insertBefore($, 'script[type="text/mask"]', html);
				}
			
				rewrite ($, resource) {
					$('script[type="text/mask"]').each((i, node) => {
						var content = $(node).text();
						var handler = this.solution.handlers.find(x => x.rewriter.accepts('mask'));
						var result = handler.rewriter.rewritePartial(content, resource);
						if (result && result !== content) {
							$(node).text(result);
						}
					});
				}
			}
			// end:source ./serializers/MaskSerializer.js
			// source ./serializers/StyleSerializer.js
			class StyleSerializer extends BaseSerializer {
			
				constructor (...args) {
					super(...args);
				}
			
				removeDependencies ($) {
					$('link[href]')
						.filter(function(i, x){
							return x.attribs['data-bundler'] !== 'ignore';
						})
						.each((i, el) => {
							this._replaceWithPlaceholder($(el), 'css');
						})
						;
				}
				
				serialize ($, resources) {
					var arr = resources.filter(x => x.type === 'css');
					if (arr.length === 0)
						return;
			
			
					arr.forEach(resource => {
						var url = resource.url;
						if (this.solution.opts.version) {
							url += '?v=' + this.solution.opts.version;
						}
						var html = `<link href='${url}' rel='stylesheet' />`; 
			
						var inserted = this._insertDependency($, resource, html);
						if (inserted === false) {
							this.builder.append($, 'head', html);
							return;
						}
					});		
				}
			
				rewrite ($, resource) {
					this._inlineResources(
						resource,
						$,
						'link[href][data-bundler-content="inline"]',
						'href',
						content => `<style>${content}</style>`			
					);
					this._rewriteStaticUrls(
						resource,
						$,
						'link[rel="stylesheet"][data-bundler="ignore"]',
						'href'
					);
				}
			}
			// end:source ./serializers/StyleSerializer.js
			// source ./serializers/ScriptSerializer.js
			class ScriptSerializer extends BaseSerializer {
			
				constructor (...args) {
					super(...args);
				}
				
				removeDependencies ($) {
					$('script[src]')
						.filter(function(i, x){
							return x.attribs['data-bundler'] !== 'ignore';
						})
						.each((i, el) => {
							this._replaceWithPlaceholder($(el), 'js');
						})
						;
				}
			
				serialize ($, resources) {
					var arr = resources.filter(x => x.type === 'js');
					if (arr.length === 0)
						return;
			
					arr.forEach(resource => {
						var url = resource.url;
						if (this.solution.opts.version) {
							url += '?v=' + this.solution.opts.version;
						}
						var html = `<script src='${url}' type='text/javascript'></script>`; 
			
						var inserted = this._insertDependency($, resource, html);
						if (inserted === false) {
							this.builder.append($, 'body', html);
							return;
						}
					});
				}
			
				rewrite ($, resource) {
					this._inlineResources(
						resource,
						$,
						'script[src][data-bundler-content="inline"]',
						'src',
						content => `<script type='text/javascript'>${content}</script>`	
					);
					this._rewriteStaticUrls(
						resource,
						$,
						'script[data-bundler="ignore"]',
						'src'
					);
				}
			
				clean ($) {
					
				}
			}
			// end:source ./serializers/ScriptSerializer.js
			// source ./serializers/HtmlSerializer.js
			class HtmlSerializer extends BaseSerializer {
			
				constructor (...args) {
					super(...args);
				}
			
				removeDependencies ($) {
					$('[data-bundler-if]')
						.filter((i, x) => {
							var condition = x.attribs['data-bundler-if'];
							var result = !!this.solution.opts.varDefs.evaluate(condition);
							if (result) {
								this.solution.reporter.info('Removing resource from HTML with condition ' + condition);
							}
							return result;
						})
						.remove()
						;
			
				}
			
				serialize ($, resources) {
					var arr = resources.filter(x => x.type === 'html');
					if (arr.length === 0)
						return;
			
					arr.forEach(x => x.embed = true);
			
					var html = arr
						.map(x => x.content)
						.join('\n');
			
					this
						.builder
						.insertBefore($, 'script', html);
				}
			
				rewrite ($, resource) {
					return void 0;
				}
			}
			// end:source ./serializers/HtmlSerializer.js
			// source ./serializers/LoadSerializer.js
			class LoadSerializer extends BaseSerializer {
			
				constructor (...args) {
					super(...args);
				}
			
				removeDependencies ($) {
					return void 0;
				}
			
				serialize ($, resources) {
			
					var arr = resources.filter(x => x.type === 'load');
					if (arr.length === 0)
						return;
			
					arr.forEach(x => x.embed = true);
					var html = arr
						.map(resource => {
							var url = resource.toTargetUrl(this.solution);
							return `<script type='text/plain' data-bundler-path='${url}'>			
								${resource.content}
							</script>`
						})
						.join('\n');
			
					this
						.builder
						.insertBefore($, 'script', html);
				}
			
				rewrite ($, resource) {
					return void 0;
				}
			}
			// end:source ./serializers/LoadSerializer.js
			
			
			HtmlHandler.Builder = class HtmlBuilder extends BaseBuilder {
			
				constructor (solution) {
					super(...arguments);
			
					this.serializers = [
						new MaskSerializer(solution, this),
						new StyleSerializer(solution, this),
						new ScriptSerializer(solution, this),
						new HtmlSerializer(solution, this),
						new LoadSerializer(solution, this)
					];
				}
			
				createModule (outputItem, otherOutputItems) {
					var arr = outputItem.resources.map(resource => {
						var url = resource.toTargetUrl(this.solution);
						return `<script type='text/plain' name='bunder-item' data-bundler-path='${url}'>
							${resource.content}
						</script>`
					});
					outputItem.resource.content = arr.join('\n');
				}
			
				buildRoot (resource, dependencies) {
					var $ = this.createDocument(resource.content);
			
					dependencies.forEach(x => x.url = x.toRelative(resource));
			
					this.serializers.forEach(x => x.removeDependencies($));
					this.serializers.forEach(x => x.rewrite($, resource));		
					this.serializers.forEach(x => x.serialize($, dependencies));
					this.serializers.forEach(x => x.clean($));
			
					this.clean($);
					resource.content = $.html();
				}
			
				append ($, selector, html) {
					var container = $.root().find(selector).first();
					if (container.length !== 0) {
						container.append(html);
					} else {
						$.root().append(html);
					}
				}
				insertBefore ($, selector, html) {
					var anchor = $.root().find(selector).first();
					if (anchor.length !== 0) {
						anchor.before(html);
					} else {
						$.root().append(html);
					}
				}
			
				accepts (type) {
					return type === 'html';
				}
			
				createDocument (html) {
					return require('cheerio').load(html);
				}
			
				clean ($) {
					$('[data-bundler-if]')
						.filter((i, x) => {
							var condition = x.attribs['data-bundler-if'];
							var result = this.solution.opts.varDefs.evaluate(condition);
							return !!result;
						})
						.remove()
						;
			
					$('placeholder#bundlers-placeholder')
						.remove()
						;
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
					return type === 'html';
				}
			};
			// end:source ./HtmlRewriter.js
			// source ./HtmlPathResolver.js
			HtmlHandler.PathResolver = class HtmlPathResolver extends BasePathResolver {
			
				constructor () {
					super(...arguments);
				}
				resolve (includeData, resource) {
					return (resource.source || resource).cdUrl(includeData.url);
				}
				accepts (includeData) {
					return includeData.module === 'html';
				}
			};
			
			// end:source ./HtmlPathResolver.js
		
		}());
		// end:source html/
		// source load/
		var LoadHandler;
		
		(function () {
		
		
			// source ./LoadHandler.js
			LoadHandler = class LoadHandler extends BaseHandler {
				constructor () {
					super(...arguments);
				}
			};
			
			// end:source ./LoadHandler.js
			// source ./LoadParser.js
			LoadHandler.Parser = class LoadParser extends BaseParser {
			
				constructor () {
					super(...arguments);
				}
				
				getDependencies (content, ownerResource) {
					return null;
				}
			
				accepts (resource) {
					return false;
				}
			};
			
			// end:source ./LoadParser.js
			// source ./LoadRewriter.js
			LoadHandler.Rewriter = class LoadRewriter extends BaseRewriter {
			
				constructor () {
					super(...arguments);
				}
			
				rewritePartial (content, ownerResource) {
			
				}
			
				rewriteResource (resource) {
					
				}
			
				accepts (type) {
					return type === 'load';
				}
			};
			// end:source ./LoadRewriter.js
			// source ./LoadBuilder.js
			LoadHandler.Builder = class LoadBuilder extends BaseBuilder {
			
				constructor () {
					super(...arguments);
			
				}
			
				createModule (outputItem, otherOutputItems) {
					var html = outputItem
						.resources
						.map(resource => {
							var url = resource.toTargetUrl(this.solution);
							return `<script type='text/plain' data-bundler-path='${url}'>			
								${resource.content}
							</script>`
						})
						.join('\n');
			
					outputItem.resource.content = html;
					outputItem.resource.type = 'html';
				}
			
				buildRoot (resource, dependencies) {		
					throw new Error('Right now only rewriter is supported')	
				}
			
				accepts (type) {
					return type === 'load';
				}
				
			};
			
			
			// end:source ./LoadBuilder.js
			// source ./LoadPathResolver.js
			LoadHandler.PathResolver = class LoadPathResolver extends BasePathResolver {
			
				constructor () {
					super(...arguments);
				}
				
				accepts (type) {
					return false;
				}
			};
			
			// end:source ./LoadPathResolver.js
		
		
		}());
		// end:source load/
	
		Handlers = [
			LoadHandler,
			MaskHandler,
			ScriptHandler,
			CssHandler,
			HtmlHandler
		];
	
	}());
	// end:source ./handlers/

	module.exports = class Bundler extends mask.class.EventEmitter {
		static clearCache() {
			Loader.clearCache();
			return Bundler;
		}		
		static get Config () {
			return _config;
		}

		constructor (path, opts) {
			super();
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
				path = solution.path,
				shouldRebuild = false,
				isBuilding = false,
				isRebuilding = false,
				rootResource = null,
				self = this;


			function build(resource) {
				isBuilding = true;
				var resources = res_flattern(resource);				
				return tree_async({
					resources,
					reporter: solution.reporter,
					action: () => Builder.build(resources, solution),
					message: (treeInfo, seconds) => 
						`Created bold<yellow<${treeInfo.count}>> files in bold<yellow<${seconds}>> sec.`.color
				}).done(buildComplete).fail(buildFailed);
			}
			function buildComplete (resources) {
				isBuilding = false;
				if (shouldRebuild) {
					shouldRebuild = false;
					isRebuilding = true;
					build(rootResource);
					return;
				}
				if (isRebuilding) {
					isRebuilding = false;
					self.emit('rebuild', resources);
				}
			}
			function buildFailed (error) {
				isBuilding = false;
				if (isRebuilding) {
					solution.reporter.error('red<Build Failed>'.color);
					solution.reporter.error(error);
					isRebuilding = false;
				}				
				if (shouldRebuild) {
					shouldRebuild = false;
					isRebuilding = true;
					build(rootResource);
					return;	
				}
			}
			function rebuild() {
				if (isBuilding) {
					shouldRebuild = true;
					return;
				}
				isRebuilding = true;
				build(rootResource);
			}
			
			return Loader
				.load(type, path, opts, solution)
				.then(resource => {
					rootResource = resource;
					if (opts && opts.watch === true) {
						Watcher
							.watch(resource, solution)
							.on('changed', rebuild);
					}
					return build(resource);
				});
		}

		static build (path, opts) {
			return new Bundler(path, opts).build(opts);
		}

		static process (path, opts) {
			var bundler = new Bundler(path, opts);
			var solution = bundler.solution;

			function builderComplete (resources) {
				resources.forEach(res => {
					io.File.write(res.filename, res.content);
				});
				return solution
					.assetsManager
					.flush()
					.then(() => {
						return solution 
					});
			}
			if (opts && opts.watch === true) {
				bundler.on('rebuild', builderComplete);
			}			
			return bundler
				.build(opts)
				.then(builderComplete);
		}

		defineMiddleware (name, fn) {
			_middlewares.define(name, fn);
		}

		static get Parser () {
			return { 
				getDependencies (content, opts = { type : 'js'}) {
					if (typeof opts === 'string') opts = { type: opts };

					var solution = new Solution('', opts);
					var resource = new Resource({ type: opts.type, content: content}, null, solution);
					return Parser.getDependencies(resource, solution);
				}
			}
		}

		static get io () {
			return io;
		}

		static get AssetsManager () { return AssetsManager }
		static get Resource () { return Resource }
		static get Solution () { return Solution }		
	};

}());