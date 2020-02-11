var _node_modules_tslib_tslib = {};
var _src_Bundler = {};
var _src_assets_AssetsManager = {};
var _src_assets_CssAssets = {};
var _src_builder_Builder = {};
var _src_class_HandlersUtils = {};
var _src_class_Include = {};
var _src_class_Middlewares = {};
var _src_class_OutputResources = {};
var _src_class_Reporter = {};
var _src_class_Resource = {};
var _src_class_ResourceInfo = {};
var _src_class_ResourceMapping = {};
var _src_class_Solution = {};
var _src_class_SolutionOpts = {};
var _src_class_VarDefinitions = {};
var _src_config_Configuration = {};
var _src_config_File = {};
var _src_global = {};
var _src_handlers_base_BaseBuilder = {};
var _src_handlers_base_BaseHandler = {};
var _src_handlers_base_BaseParser = {};
var _src_handlers_base_BasePathResolver = {};
var _src_handlers_base_BaseRewriter = {};
var _src_handlers_css_CssBuilder = {};
var _src_handlers_css_CssHandler = {};
var _src_handlers_css_CssParser = {};
var _src_handlers_css_CssPathResolver = {};
var _src_handlers_css_CssRewriter = {};
var _src_handlers_exports = {};
var _src_handlers_html_HtmlBuilder = {};
var _src_handlers_html_HtmlHandler = {};
var _src_handlers_html_HtmlParser = {};
var _src_handlers_html_HtmlPathResolver = {};
var _src_handlers_html_HtmlRewriter = {};
var _src_handlers_html_readers_BaseTagReader = {};
var _src_handlers_html_readers_MaskContentReader = {};
var _src_handlers_html_readers_ScriptContentReader = {};
var _src_handlers_html_readers_ScriptLinkReader = {};
var _src_handlers_html_readers_StyleLinkReader = {};
var _src_handlers_html_serializers_BaseSerializer = {};
var _src_handlers_html_serializers_HtmlSerializer = {};
var _src_handlers_html_serializers_LoadSerializer = {};
var _src_handlers_html_serializers_MaskSerializer = {};
var _src_handlers_html_serializers_ScriptSerializer = {};
var _src_handlers_html_serializers_StyleSerializer = {};
var _src_handlers_load_LoadBuilder = {};
var _src_handlers_load_LoadHandler = {};
var _src_handlers_load_LoadParser = {};
var _src_handlers_load_LoadPathResolver = {};
var _src_handlers_load_LoadRewriter = {};
var _src_handlers_mask_MaskBuilder = {};
var _src_handlers_mask_MaskHandler = {};
var _src_handlers_mask_MaskParser = {};
var _src_handlers_mask_MaskPathResolver = {};
var _src_handlers_mask_MaskRewriter = {};
var _src_handlers_mask_MaskScriptable = {};
var _src_handlers_script_ModuleTree = {};
var _src_handlers_script_ScriptBuilder = {};
var _src_handlers_script_ScriptHandler = {};
var _src_handlers_script_ScriptParser = {};
var _src_handlers_script_ScriptPathResolver = {};
var _src_handlers_script_ScriptRewriter = {};
var _src_handlers_script_amd_js_AmdJsBuilder = {};
var _src_handlers_script_amd_js_AmdJsHandler = {};
var _src_handlers_script_amd_js_AmdJsParser = {};
var _src_handlers_script_amd_js_AmdJsRewriter = {};
var _src_handlers_script_base_BaseScriptBuilder = {};
var _src_handlers_script_common_js_CommonJsBuilder = {};
var _src_handlers_script_common_js_CommonJsBuilderSimplified = {};
var _src_handlers_script_common_js_CommonJsHandler = {};
var _src_handlers_script_common_js_CommonJsParser = {};
var _src_handlers_script_common_js_CommonJsPathResolver = {};
var _src_handlers_script_common_js_CommonJsRewriter = {};
var _src_handlers_script_common_js_ModuleWrapper = {};
var _src_handlers_script_common_js_templates_Templates = {};
var _src_handlers_script_global_js_GlobalJsBuilder = {};
var _src_handlers_script_global_js_GlobalJsHandler = {};
var _src_handlers_script_global_js_GlobalJsParser = {};
var _src_handlers_script_global_js_GlobalJsRewriter = {};
var _src_handlers_script_import_js_Builder = {};
var _src_handlers_script_import_js_Dictionary = {};
var _src_handlers_script_import_js_ImportJsBuilder = {};
var _src_handlers_script_import_js_ImportJsHandler = {};
var _src_handlers_script_import_js_ImportJsParser = {};
var _src_handlers_script_import_js_ImportJsRewriter = {};
var _src_handlers_script_import_js_ModuleFile = {};
var _src_handlers_script_import_js_Parser = {};
var _src_handlers_script_import_js_String = {};
var _src_handlers_script_import_js_utils = {};
var _src_handlers_script_include_js_IncludeJsBuilder = {};
var _src_handlers_script_include_js_IncludeJsHandler = {};
var _src_handlers_script_include_js_IncludeJsParser = {};
var _src_handlers_script_include_js_IncludeJsRewriter = {};
var _src_handlers_script_mask_js_MaskJsBuilder = {};
var _src_handlers_script_mask_js_MaskJsHandler = {};
var _src_handlers_script_mask_js_MaskJsParser = {};
var _src_handlers_script_mask_js_MaskJsRewriter = {};
var _src_handlers_script_utils_AstUtil = {};
var _src_loader_Loader = {};
var _src_loader_Watcher = {};
var _src_parser_Parser = {};
var _src_utils_arr = {};
var _src_utils_async = {};
var _src_utils_color = {};
var _src_utils_npm = {};
var _src_utils_obj = {};
var _src_utils_path = {};
var _src_utils_res = {};
var _src_utils_template = {};
var _src_utils_tree = {};

				// source ./templates/ModuleSimplified.js
				var _node_modules_tslib_tslib;
				(function () {
					var exports = {};
					var module = { exports: exports };
					/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global global, define, System, Reflect, Promise */
var __extends;
var __assign;
var __rest;
var __decorate;
var __param;
var __metadata;
var __awaiter;
var __generator;
var __exportStar;
var __values;
var __read;
var __spread;
var __await;
var __asyncGenerator;
var __asyncDelegator;
var __asyncValues;
var __makeTemplateObject;
var __importStar;
var __importDefault;
(function (factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function (exports) { factory(createExporter(root, createExporter(exports))); });
    }
    else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
    }
    else {
        factory(createExporter(root));
    }
    function createExporter(exports, previous) {
        if (exports !== root) {
            if (typeof Object.create === "function") {
                Object.defineProperty(exports, "__esModule", { value: true });
            }
            else {
                exports.__esModule = true;
            }
        }
        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
    }
})
(function (exporter) {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    __extends = function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    __rest = function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    };

    __decorate = function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    __param = function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };

    __metadata = function (metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    };

    __awaiter = function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    __generator = function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };

    __exportStar = function (m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    };

    __values = function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };

    __read = function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };

    __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };

    __await = function (v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };

    __asyncGenerator = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    };

    __asyncDelegator = function (o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    };

    __asyncValues = function (o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    };

    __makeTemplateObject = function (cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    __importStar = function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };

    __importDefault = function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };

    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate);
    exporter("__param", __param);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
    exporter("__makeTemplateObject", __makeTemplateObject);
    exporter("__importStar", __importStar);
    exporter("__importDefault", __importDefault);
});
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_node_modules_tslib_tslib) && isObject(module.exports)) {
						Object.assign(_node_modules_tslib_tslib, module.exports);
						return;
					}
					_node_modules_tslib_tslib = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_global;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var g = global;
var mask = require('maskjs');
exports.mask = mask;
var assert = require('assert');
exports.assert = assert;
var logger = require('atma-logger');
exports.logger = logger;
var io = g.io || require('atma-io');
exports.io = io;
/* Make compatible with previous atma-loaders */
g.Class = require('atma-class');
//# sourceMappingURL=api.js.map
//# sourceMappingURL=global.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_global) && isObject(module.exports)) {
						Object.assign(_src_global, module.exports);
						return;
					}
					_src_global = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_utils_path;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var isWeb = true;
function path_getDir(path) {
    return path.substring(0, path.lastIndexOf('/') + 1);
}
exports.path_getDir = path_getDir;
;
function path_getFile(path) {
    path = path
        .replace('file://', '')
        .replace(/\\/g, '/')
        .replace(/\?[^\n]+$/, '');
    if (/^\/\w+:\/[^\/]/i.test(path)) {
        // win32 drive
        return path.substring(1);
    }
    return path;
}
exports.path_getFile = path_getFile;
;
function path_getExtension(path) {
    var query = path.indexOf('?');
    if (query !== -1) {
        path = path.substring(0, query);
    }
    var match = rgx_EXT.exec(path);
    return match == null ? '' : match[1];
}
exports.path_getExtension = path_getExtension;
;
function path_appendQuery(path, key, val) {
    var conjunctor = path.indexOf('?') === -1 ? '?' : '&';
    return path + conjunctor + key + '=' + val;
}
exports.path_appendQuery = path_appendQuery;
;
function path_withProtocol(path) {
    return /^\/\/|^file:|^https?:|^ftps?:/i.test(path);
}
exports.path_withProtocol = path_withProtocol;
;
var current_;
function path_resolveCurrent() {
    if (current_ != null)
        return current_;
    return (current_ = path_win32Normalize(process.cwd()));
}
exports.path_resolveCurrent = path_resolveCurrent;
;
function path_normalize(path) {
    var path_ = path
        .replace(/\\/g, '/')
        // remove double slashes, but not near protocol
        .replace(/([^:\/])\/{2,}/g, '$1/')
        // './xx' to relative string
        .replace(/^\.\//, '')
        // join 'xx/./xx'
        .replace(/\/\.\//g, '/');
    // use triple slashes by file protocol
    if (/^file:\/\/[^\/]/.test(path_)) {
        path_ = path_.replace('file://', 'file:///');
    }
    return path_collapse(path_);
}
exports.path_normalize = path_normalize;
;
function path_resolveUrl(path, base) {
    var url = path_normalize(path);
    if (path_isRelative(url)) {
        return path_normalize(path_combine(base || path_resolveCurrent(), url));
    }
    if (rgx_PROTOCOL.test(url))
        return url;
    if (url.charCodeAt(0) === 47 /*/*/) {
    }
    return url;
}
exports.path_resolveUrl = path_resolveUrl;
;
function path_isRelative(path) {
    return rgx_PROTOCOL.test(path) === false;
}
exports.path_isRelative = path_isRelative;
;
function path_toRelative(path, anchor, base) {
    var path_ = path_resolveUrl(path_normalize(path), base), absolute_ = path_resolveUrl(path_normalize(anchor), base);
    if (path_getExtension(absolute_) !== '') {
        absolute_ = path_getDir(absolute_);
    }
    absolute_ = path_combine(absolute_, '/');
    if (path_.toUpperCase().indexOf(absolute_.toUpperCase()) === 0) {
        return path_.substring(absolute_.length);
    }
    else {
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
            sub += '../';
        }
    }
    return path;
}
exports.path_toRelative = path_toRelative;
;
function path_combine() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var out = '', imax = args.length, i = -1, x;
    while (++i < imax) {
        x = args[i];
        if (!x)
            continue;
        x = path_normalize(x);
        if (out === '') {
            out = x;
            continue;
        }
        if (out[out.length - 1] !== '/') {
            out += '/';
        }
        if (x[0] === '/') {
            x = x.substring(1);
        }
        out += x;
    }
    return path_collapse(out);
}
exports.path_combine = path_combine;
;
function path_sliceHash(url) {
    if (url == null)
        return null;
    var i = url.indexOf('#');
    if (i === -1)
        return null;
    return url.substring(i);
}
exports.path_sliceHash = path_sliceHash;
;
function path_sliceQuery(url) {
    if (url == null)
        return null;
    var i = url.indexOf('?');
    if (i === -1)
        return null;
    return url.substring(i);
}
exports.path_sliceQuery = path_sliceQuery;
;
function path_removeQuery(url) {
    if (url == null)
        return null;
    var i = url.indexOf('#');
    if (i !== -1)
        url = url.substring(0, i);
    var i = url.indexOf('?');
    if (i !== -1)
        url = url.substring(0, i);
    return url;
}
exports.path_removeQuery = path_removeQuery;
;
function path_toAbsolute(path, parentLocation, rootLocation) {
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
}
exports.path_toAbsolute = path_toAbsolute;
;
var _cwd;
function cwd() {
    return _cwd || (_cwd = path_normalize(process.cwd()));
}
var rgx_PROTOCOL = /^(file|https?):/i, rgx_SUB_DIR = /[^\/\.]+\/\.\.\//, rgx_FILENAME = /\/[^\/]+\.\w+(\?.*)?(#.*)?$/, rgx_EXT = /\.(\w+)$/, rgx_win32Drive = /(^\/?\w{1}:)(\/|$)/;
function path_win32Normalize(path) {
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
//# sourceMappingURL=api.js.map
//# sourceMappingURL=path.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_utils_path) && isObject(module.exports)) {
						Object.assign(_src_utils_path, module.exports);
						return;
					}
					_src_utils_path = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_utils_color;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
function color(str) {
    return str.color;
}
exports.color = color;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=color.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_utils_color) && isObject(module.exports)) {
						Object.assign(_src_utils_color, module.exports);
						return;
					}
					_src_utils_color = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_utils_res;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var path_1 = _src_utils_path;
var color_1 = _src_utils_color;
function res_groupByType(arr, opts) {
    var pckg = {}, imax = arr.length, i = -1;
    while (++i < imax) {
        var path = arr[i];
        var ext = path_1.path_getExtension(path);
        var type = opts.getTypeForExt(ext);
        append(pckg, type, path);
    }
    return pckg;
}
exports.res_groupByType = res_groupByType;
;
function res_groupByPage(arr, opts) {
    var pages = {}, imax = arr.length, i = -1;
    while (++i < imax) {
        var resource = arr[i];
        var name = res_getPage(resource, opts);
        append(pages, name, resource);
    }
    return pages;
}
exports.res_groupByPage = res_groupByPage;
;
function res_groupByBundle(arr) {
    var bundles = {}, imax = arr.length, i = -1;
    while (++i < imax) {
        var resource = arr[i];
        var name = resource.bundle;
        append(bundles, name, resource);
    }
    return bundles;
}
exports.res_groupByBundle = res_groupByBundle;
;
function res_groupByPageAndBundles(arr, opts) {
    var pages = res_groupByPage(arr, opts);
    for (var key in pages) {
        pages[key] = res_groupByBundle(pages[key]);
    }
    return pages;
}
exports.res_groupByPageAndBundles = res_groupByPageAndBundles;
;
function res_groupResourcesByType(arr, opts) {
    var out = {}, imax = arr.length, i = -1;
    while (++i < imax) {
        var resource = arr[i];
        var type = resource.type;
        append(out, type, resource);
    }
    return out;
}
exports.res_groupResourcesByType = res_groupResourcesByType;
;
function res_getPage(resource, opts) {
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
}
exports.res_getPage = res_getPage;
;
function append(pckg, name, x) {
    var arr = pckg[name];
    if (arr == null) {
        arr = pckg[name] = [];
    }
    arr.push(x);
}
function res_flattern(resource) {
    return ResFlatternUtils.flattern(resource);
}
exports.res_flattern = res_flattern;
;
var ResFlatternUtils;
(function (ResFlatternUtils) {
    function flattern(resource, copyInfo, out, hash) {
        if (copyInfo === void 0) { copyInfo = false; }
        if (out === void 0) { out = []; }
        if (hash === void 0) { hash = {}; }
        if (resource.url in hash) {
            return out;
        }
        if (resource.resources) {
            resource
                .resources
                .filter(function (x) { return x.isCyclic !== true; })
                .forEach(function (x) { return flattern(x, copyInfo, out, hash); });
        }
        var cached = hash[resource.url];
        if (cached == null) {
            hash[resource.url] = resource;
            out.push(resource);
        }
        else {
            if (copyInfo) {
                takeModuleDescriptions(cached, resource);
                takePageDefinitions(cached, resource);
            }
        }
        return out;
    }
    ResFlatternUtils.flattern = flattern;
    // export function distinct(stack) {
    // 	for (var i = 0; i < stack.length; i++) {
    // 		for (var j = i + 1; j < stack.length; j++) {
    // 			if (stack[i].url === stack[j].url) {
    // 				takeModuleDescriptions(stack[i], stack[j]);
    // 				takePageDefinitions(stack[i], stack[j]);
    // 				stack.splice(j, 1);
    // 				j--;
    // 			}
    // 		}
    // 	}
    // 	return stack;
    // }
    // export function toArray(resource, out) {
    // 	if (resource.resources) {
    // 		resource
    // 			.resources
    // 			.filter(x => x.isCyclic !== true)
    // 			.forEach(x => toArray(x, out));
    // 	}
    // 	out['push'](resource);
    // 	return out;
    // }
    function takeModuleDescriptions(resA, resB) {
        if (resB.asModules == null || resB.asModules.length === 0) {
            return;
        }
        resB
            .asModules
            .filter(function (name) { return resA.asModules.indexOf(name) === -1; })
            .forEach(function (name) { return resA.asModules.push(name); });
    }
    function takePageDefinitions(resA, resB) {
        if (resB.inPages == null || resB.inPages.length === 0) {
            return;
        }
        resB
            .inPages
            .filter(function (name) { return resA.inPages.indexOf(name) === -1; })
            .forEach(function (name) { return resA.inPages.push(name); });
    }
})(ResFlatternUtils || (ResFlatternUtils = {}));
/* Array of resources or root resource */
function res_getTreeInfo(mix) {
    var arr = Array.isArray(mix) ? mix : ResFlatternUtils.flattern(mix);
    var paths = arr.map(function (x) {
        var pages = x.inPages.map(function (page) { return color_1.color("bg_white<black<" + page + ">>"); }).join(' ');
        return x.url + " " + pages;
    }).sort();
    return {
        count: arr.length,
        treeString: ResGetTreeInfo.formatTree(paths)
    };
}
exports.res_getTreeInfo = res_getTreeInfo;
;
var ResGetTreeInfo;
(function (ResGetTreeInfo) {
    // export function flattern(resource: Resource) {
    // 	return toUniqueArray(resource, [], {});
    // };
    //- function distinct(stack) {
    // 	for (var i = 0; i < stack.length; i++) {
    // 		for (var j = i + 1; j < stack.length; j++) {
    // 			if (stack[i].url === stack[j].url) {
    // 				stack.splice(j, 1);
    // 				j--;
    // 			}
    // 		}
    // 	}
    // 	return stack;
    // }
    function toUniqueArray(resource, out, hash) {
        if (resource.resources) {
            resource
                .resources
                .filter(function (x) { return x.isCyclic !== true; })
                .forEach(function (x) { return toUniqueArray(x, out, hash); });
        }
        if (hash[resource.url] == null) {
            hash[resource.url] = true;
            out.push(resource);
        }
        return out;
    }
    function formatTree(paths) {
        var tree = tree_fromPaths(paths);
        tree = tree_collapse(tree);
        var str = '';
        formatArr(tree, 0);
        return str;
        function formatArr(items, indent) {
            items.forEach(function (item, index) {
                str += getIndent(indent, index === items.length - 1);
                str += color_1.color("yellow<" + item.id + ">");
                str += '\n';
                formatArr(item.items, indent + 1);
            });
        }
        function getIndent(indent, isLastEntry) {
            var i = -1;
            var str = '';
            while (++i < indent) {
                var leading = i === indent - 1 && isLastEntry ? '└' : '|';
                var seperator = i === indent - 1 ? '───' : '   ';
                str += leading + seperator;
            }
            return str;
        }
    }
    ResGetTreeInfo.formatTree = formatTree;
    function tree_collapse(arr) {
        arr.forEach(function (item) {
            if (item.items.length === 1) {
                item.id += '/' + item.items[0].id;
                item.items = item.items[0].items;
            }
            tree_collapse(item.items);
        });
        return arr;
    }
    function tree_fromPaths(model) {
        var index = -1, index_ = index, i = 0, imax = model.length;
        for (; i < imax - 1; i++) {
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
                index = index_;
            }
            for (i = 0; i < imax; i++) {
                model[i] = model[i].substring(index);
                if (model[i][0] === '/')
                    model[i] = model[i].substring(1);
            }
        }
        var tree = [], parts;
        for (var i = 0, imax = model.length; i < imax; i++) {
            tree_ensurePath(tree, model[i].split('/'));
        }
        return tree;
    }
    function tree_getItem(items, id) {
        for (var i = 0, x, imax = items.length; i < imax; i++) {
            x = items[i];
            if (x.id === id)
                return x;
        }
        return null;
    }
    function tree_ensurePath(rootItems, parts) {
        var items = rootItems, item_, item;
        for (var i = 0, imax = parts.length; i < imax; i++) {
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
        var i = 0, imax = str.length < compare.length
            ? str.length
            : compare.length;
        for (; i < imax; i++) {
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
})(ResGetTreeInfo || (ResGetTreeInfo = {}));
function res_walk(res, fn) {
    var result = fn(res);
    if (result === false)
        return result;
    var arr = res.resources;
    if (arr == null)
        return;
    var imax = arr.length, i = -1;
    while (++i < imax) {
        var x = arr[i];
        if (x.isCyclic === true) {
            continue;
        }
        result = res_walk(x, fn);
        if (result === false) {
            return result;
        }
    }
}
exports.res_walk = res_walk;
;
function res_find(res, matcher) {
    var out = null;
    res_walk(res, function (x) {
        if (matcher(x)) {
            out = x;
            return false;
        }
    });
    return out;
}
exports.res_find = res_find;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=res.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_utils_res) && isObject(module.exports)) {
						Object.assign(_src_utils_res, module.exports);
						return;
					}
					_src_utils_res = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_utils_async;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var atma_utils_1 = require("atma-utils");
function async_map(arr, mapper) {
    var out = new Array(arr.length);
    var dfr = new atma_utils_1.class_Dfr;
    var errored = false;
    var wait = arr.length;
    if (wait === 0) {
        return dfr.resolve(out);
    }
    arr.forEach(function (x, i) {
        if (x == null) {
            set(null, i);
            return;
        }
        var mix = mapper(x);
        if (mix == null || mix.then == null) {
            set(mix, i);
            return;
        }
        mix.then(function (x) { return set(x, i); }, function (error) {
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
exports.async_map = async_map;
;
function async_waterfall(arr, mapper) {
    var out = new Array(arr.length);
    var dfr = new atma_utils_1.class_Dfr;
    var i = -1;
    next();
    function next() {
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
        mix.then(function (x) {
            set(x, i);
            next();
        }, function (error) {
            dfr.reject(error);
        });
    }
    function set(value, i) {
        out[i] = value;
    }
    return dfr;
}
exports.async_waterfall = async_waterfall;
;
function async_whenAll(mix) {
    var arr = Array.isArray(mix) ? mix : Array.from(arguments);
    var out = new Array(arr.length);
    var dfr = new atma_utils_1.class_Dfr;
    var errored = false;
    var wait = arr.length;
    if (wait === 0) {
        return dfr.resolve(out);
    }
    arr.forEach(function (x, i) {
        if (x == null) {
            set(null, i);
            return;
        }
        var mix = x;
        if (mix == null || mix.then == null) {
            set(mix, i);
            return;
        }
        mix.then(function (x) { return set(x, i); }, function (error) {
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
exports.async_whenAll = async_whenAll;
;
function async_resolve() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var _a;
    return (_a = (new atma_utils_1.class_Dfr())).resolve.apply(_a, args);
}
exports.async_resolve = async_resolve;
;
function async_reject() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var _a;
    return (_a = (new atma_utils_1.class_Dfr())).reject.apply(_a, args);
}
exports.async_reject = async_reject;
;
function async_run(fn) {
    if (fn.length === 0) {
        var result = fn();
        if (result && result.then)
            return result;
        return async_resolve();
    }
    return atma_utils_1.class_Dfr.run(function (resolve, reject) {
        fn(resolve, reject);
    });
}
exports.async_run = async_run;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=async.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_utils_async) && isObject(module.exports)) {
						Object.assign(_src_utils_async, module.exports);
						return;
					}
					_src_utils_async = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_class_Middlewares;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var atma_utils_1 = require("atma-utils");
var Middlewares = /** @class */ (function () {
    function Middlewares() {
        this.runners = {};
        this.supports = {
            'parseDependencies': function (resource, deps, opts, solution) {
                return new atma_utils_1.class_Dfr();
            },
            'buildResources': function (resources, solution) {
                return new atma_utils_1.class_Dfr();
            },
            'rewriteDependencies': function (resources, solution) {
                var outputItems = solution.outputResources.items;
                return new atma_utils_1.class_Dfr();
            },
            'buildBundle': function (outputItem) {
                return new atma_utils_1.class_Dfr();
            }
        };
        this.runners = {};
        this.supports = {
            'parseDependencies': function (resource, deps, opts, solution) {
                return new atma_utils_1.class_Dfr();
            },
            'buildResources': function (resources, solution) {
                return new atma_utils_1.class_Dfr();
            },
            'rewriteDependencies': function (resources, solution) {
                var outputItems = solution.outputResources.items;
                return new atma_utils_1.class_Dfr();
            },
            'buildBundle': function (outputItem) {
                return new atma_utils_1.class_Dfr();
            }
        };
    }
    Middlewares.prototype.define = function (name, fn) {
        if (this.supports[name] === void 0) {
            throw new Error('Unsupported middleware name: ' + name);
        }
        var fns = this.runners[name];
        if (fns == null) {
            fns = this.runners[name] = [];
        }
        fns.push(fn);
    };
    Middlewares.prototype.run = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.supports[name] === void 0) {
            throw new Error('Unsupported middleware name: ' + name);
        }
        var dfr = new atma_utils_1.class_Dfr;
        var fns = this.runners[name];
        if (fns == null || fns.length === 0) {
            return dfr.resolve.apply(dfr, args);
        }
        var arr = fns.slice();
        function next() {
            var transformedArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                transformedArgs[_i] = arguments[_i];
            }
            var nextArgs = transformedArgs.length === 0 ? args : transformedArgs;
            if (arr.length === 0) {
                dfr.resolve.apply(dfr, (nextArgs || []));
                return;
            }
            args = nextArgs;
            var fn = arr.shift();
            var result = fn.call.apply(fn, [null].concat(args));
            if (result != null) {
                if (result.then) {
                    result.then(next, function (error) { return dfr.reject(error); });
                    return;
                }
                if (Array.isArray(result)) {
                    args = result;
                }
                else {
                    args = [result];
                }
            }
            next();
        }
        next();
        return dfr;
    };
    return Middlewares;
}());
exports._middlewares = new Middlewares;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=Middlewares.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_class_Middlewares) && isObject(module.exports)) {
						Object.assign(_src_class_Middlewares, module.exports);
						return;
					}
					_src_class_Middlewares = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_class_Include;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var res_1 = _src_utils_res;
var atma_utils_1 = require("atma-utils");
var global_1 = _src_global;
debugger;
var lib = require('includejs/lib/include.node.module.js');
var Routes = lib.includeLib.Routes();
var PathResolver = lib.includeLib.PathResolver;
var config = {};
var Include = /** @class */ (function () {
    function Include(resource) {
        this.includes = [];
        if (resource) {
            this.url = resource.url;
            this.location = resource.location;
        }
    }
    Include.prototype.include = function (type, mix) {
        var _this = this;
        var pckg = mix;
        if (typeof pckg === 'string' && arguments.length > 2) {
            pckg = Array.prototype.slice.call(arguments, 1);
        }
        Routes.each(type, pckg, function (namespace, route) {
            var item = new Include();
            item.type = type;
            item.url = atma_utils_1.class_Uri.combine(_this.base, route.path);
            item.route = route;
            item.namespace = namespace;
            item.module = 'includejs';
            _this.includes.push(item);
        });
        return this;
    };
    Include.prototype.cfg = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 2) {
            var key = args[0], val = args[1];
            config[key] = val;
        }
        if (args.length === 1) {
            global_1.mask.obj.extend(config, args[0]);
        }
        var result = lib.include.cfg.apply(lib.include, args);
        return this;
    };
    Include.prototype.setBase = function (path) {
        this.base = path;
        return this;
    };
    Include.prototype.routes = function (arg) {
        if (arg == null) {
            return Routes.getRoutes();
        }
        // register namespaces at include, used later in resolve url
        lib.include.routes(arg);
        for (var key in arg) {
            Routes.register(key, arg[key], this);
        }
        return this;
    };
    Include.getConfig = function () {
        return config;
    };
    Include.toJsonRoutes = function () {
        var result = {}, routes = Routes.getRoutes();
        for (var key in routes) {
            result[key] = _join(routes[key]);
        }
        function _join(route) {
            var result = '';
            for (var i = 0, x, imax = route.length; i < imax; i++) {
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
    ;
    Include.groupByType = res_1.res_groupByType;
    Include.PathResolver = PathResolver;
    return Include;
}());
exports.Include = Include;
;
['js', 'css', 'load', 'lazy', 'mask'].forEach(function (type) {
    Include.prototype[type] = function () {
        var mix = arguments.length > 1 ? Array.from(arguments) : arguments[0];
        return this.include(type, mix);
    };
});
//# sourceMappingURL=api.js.map
//# sourceMappingURL=Include.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_class_Include) && isObject(module.exports)) {
						Object.assign(_src_class_Include, module.exports);
						return;
					}
					_src_class_Include = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_class_HandlersUtils;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
exports.HandlersUtils = {
    findPathResolver: function (handlers, includeData) {
        var handler = handlers.find(function (x) { return x.pathResolver && x.pathResolver.accepts && x.pathResolver.accepts(includeData); });
        return handler && handler.pathResolver;
    }
};
//# sourceMappingURL=api.js.map
//# sourceMappingURL=HandlersUtils.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_class_HandlersUtils) && isObject(module.exports)) {
						Object.assign(_src_class_HandlersUtils, module.exports);
						return;
					}
					_src_class_HandlersUtils = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_utils_npm;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var path_1 = _src_utils_path;
var global_1 = _src_global;
var Npm;
(function (Npm) {
    function resolveAppUrl(path, currentLocation, base) {
        var name = /^(@?[^\\\/]+)/.exec(path)[0];
        var resource = path.substring(name.length + 1);
        if (resource && hasExt(resource) === false) {
            resource += '.js';
        }
        while (path != null) {
            var dirname = path_1.path_combine(currentLocation, 'node_modules', name);
            var pckg = path_1.path_combine(dirname, 'package.json');
            if (global_1.io.File.exists(pckg)) {
                var json = global_1.io.File.read(pckg);
                if (json) {
                    var filename = combineMain(dirname, json.main);
                    if (base) {
                        if (base.endsWith('/') === false) {
                            // Base path must be a folder
                            base += '/';
                        }
                        // in-case CWD path is not equal to BASE path, make sure resolved FS module path is relative to BASE folder
                        var relative = global_1.io.env.currentDir.toRelativeString(base);
                        if (relative) {
                            filename = path_1.path_combine(relative, filename);
                        }
                    }
                    return filename;
                }
            }
            var next = currentLocation.replace(/[^\/]+\/?$/, '');
            if (next === currentLocation) {
                return null;
            }
            currentLocation = next;
        }
        return null;
    }
    Npm.resolveAppUrl = resolveAppUrl;
    function combineMain(cwd, filename) {
        if (filename == null) {
            filename = 'index.js';
        }
        if (hasExt(filename) === false) {
            filename += '.js';
        }
        var path = path_1.path_combine(cwd, filename);
        if (global_1.io.File.exists(path)) {
            return path;
        }
        console.log("Entry File does not exist: " + filename);
    }
    function hasExt(path) {
        return /\.[\w]{1,8}($|\?|#)/.test(path);
    }
})(Npm = exports.Npm || (exports.Npm = {}));
//# sourceMappingURL=npm.js.map
//# sourceMappingURL=npm.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_utils_npm) && isObject(module.exports)) {
						Object.assign(_src_utils_npm, module.exports);
						return;
					}
					_src_utils_npm = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_class_Resource;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var path_1 = _src_utils_path;
var Include_1 = _src_class_Include;
var HandlersUtils_1 = _src_class_HandlersUtils;
var npm_1 = _src_utils_npm;
debugger;
var Resource = /** @class */ (function () {
    function Resource(includeData, parent, solution) {
        this.parent = parent;
        this.solution = solution;
        this.resources = [];
        this.filename = '';
        this.directory = '';
        this.content = '';
        this.url = '';
        this.location = '';
        this.query = '';
        this.hash = '';
        this.namespace = '';
        this.type = null;
        this.bundle = 'index';
        this.module = '';
        this.page = '';
        /** Target Resource will contain the Source Resource */
        this.source = null;
        this.embed = false;
        this.asModules = null;
        this.inPages = null;
        this.isCyclic = false;
        this.meta = null;
        this.aliases = [];
        if (arguments.length === 0)
            return;
        if (includeData == null) {
            includeData = {
                type: solution && solution.opts.type || null,
                url: null
            };
        }
        if (includeData.type == null) {
            if (includeData.url) {
                includeData.type = solution.opts.getTypeForExt(path_1.path_getExtension(includeData.url));
            }
            else {
                includeData.type = solution && solution.opts.type || null;
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
            this.asModules = [includeData.module];
        }
        if (includeData.meta) {
            this.meta = includeData.meta;
        }
        if (includeData.page) {
            this.inPages = [includeData.page];
        }
        else {
            var owner = parent;
            while (owner != null && owner.inPages.length === 0) {
                owner = owner.parent;
            }
            if (owner != null) {
                this.inPages = owner.inPages.slice();
            }
        }
        if (includeData.url == null) {
            return;
        }
        if (solution && solution.opts.mappings[includeData.url]) {
            includeData.url = solution.opts.mappings[includeData.url];
        }
        var url;
        var pathResolver = HandlersUtils_1.HandlersUtils.findPathResolver(solution.handlers, includeData);
        if (pathResolver) {
            url = pathResolver.resolve(includeData, parent || {
                location: solution.opts.base
            });
        }
        if (url == null) {
            url = Include_1.Include.PathResolver.resolveBasic(includeData.url, includeData.type, parent || {
                location: solution.opts.base
            });
        }
        if (Include_1.Include.PathResolver.isNpm(includeData.url)) {
            this.aliases.push(includeData.url);
            url = npm_1.Npm.resolveAppUrl(includeData.url, parent && parent.location, solution.opts.base);
            if (url == null) {
                // Fix. `resolveAppUrl` returns undefined on native nodejs modules
                url = includeData.url;
            }
        }
        this.hash = path_1.path_sliceHash(url);
        if (this.hash) {
            url = url.replace(this.hash, '');
        }
        this.query = path_1.path_sliceQuery(url);
        if (this.query) {
            url = url.replace(this.query, '');
        }
        // System paths
        this.filename = path_1.path_toAbsolute(url, null, solution.opts.base);
        this.directory = path_1.path_getDir(this.filename);
        // Application paths
        this.url = '/' + path_1.path_toRelative(this.filename, solution.opts.base);
        this.location = path_1.path_getDir(this.url);
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
    }
    Resource.prototype.clone = function () {
        var res = new Resource();
        res.resources = this.resources;
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
        res.isCyclic = this.isCyclic;
        res.aliases = this.aliases;
        return res;
    };
    Resource.prototype.toTarget = function (solution, settings) {
        var resource = settings && settings.targetType === 'static'
            ? this._toStaticTarget(solution, settings)
            : this._toOutputTarget(solution, settings);
        resource.content = this.content;
        resource.asModules = this.asModules;
        resource.inPages = this.inPages;
        resource.bundle = this.bundle;
        resource.aliases = this.aliases;
        if (solution.opts.version) {
            resource.url += '?v=' + solution.opts.version;
        }
        return resource;
    };
    Resource.prototype._toStaticTarget = function (solution, settings) {
        var opts = solution.opts;
        var url = this.url;
        var filename = path_1.path_removeQuery(url);
        var resource = new Resource({ type: this.type, url: null }, this, solution);
        if (settings == null || settings.relative !== true) {
            url = path_1.path_combine(solution.opts.outputAppBase, url);
        }
        resource.url = url;
        resource.location = path_1.path_getDir(url);
        resource.filename = filename;
        resource.directory = path_1.path_getDir(filename);
        resource.source = this;
        return resource;
    };
    Resource.prototype._toOutputTarget = function (solution, settings) {
        var opts = solution.opts;
        var url;
        if (solution.isMainResource(this)) {
            url = opts.outputMain;
        }
        else {
            url = path_1.path_combine(opts.getOutputFolder(this.type), path_1.path_removeQuery(this.url));
        }
        var filename = path_1.path_combine(opts.outputBase, url);
        var resource = new Resource({ type: this.type }, this, solution);
        if (settings == null || settings.relative !== true && url.indexOf(solution.opts.outputAppBase) === -1) {
            url = path_1.path_combine(solution.opts.outputAppBase, url);
        }
        resource.url = url;
        resource.location = path_1.path_getDir(url);
        resource.filename = filename;
        resource.directory = path_1.path_getDir(filename);
        resource.source = this;
        return resource;
    };
    Resource.prototype.toRelative = function (resource) {
        var url = path_1.path_toRelative(this.filename, resource.filename);
        return url;
    };
    Resource.prototype.toTargetUrl = function (solution) {
        var url = this.url;
        if (url.indexOf(solution.opts.outputAppBase) === -1)
            url = path_1.path_combine(solution.opts.outputAppBase, url);
        return url;
    };
    Resource.prototype.toJSON = function (deep) {
        return {
            type: this.type,
            namespace: this.namespace,
            filename: this.filename,
            directory: this.directory,
            url: this.url,
            location: this.location,
            asModules: this.asModules,
            resources: deep === false ? void 0 : this.resources.map(function (x) { return x.toJSON(); })
        };
    };
    Resource.prototype.setModuleType = function (type) {
        if (this.isModuleType(type)) {
            return;
        }
        this.module = this
            .module
            .split(',')
            .splice(0, 0, type)
            .join(',');
    };
    Resource.prototype.isModuleType = function (type) {
        return this.module.indexOf(type) !== -1;
    };
    Resource.prototype.getModule = function (solution) {
        var modules = this.asModules;
        if (modules == null || modules.length === 0) {
            return null;
        }
        if (modules.length === 1) {
            return modules[0];
        }
        var arr = ['global', 'commonjs', 'amd', 'includejs', 'import'];
        var name = arr.find(function (name) { return modules.indexOf(name) !== -1; });
        if (name == null) {
            name = modules[0];
        }
        return name;
    };
    Resource.prototype.cdUrl = function (url) {
        if (url[0] === '/' || path_1.path_isRelative(url) === false)
            return url;
        return path_1.path_combine(this.location, url);
    };
    return Resource;
}());
exports.Resource = Resource;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=Resource.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_class_Resource) && isObject(module.exports)) {
						Object.assign(_src_class_Resource, module.exports);
						return;
					}
					_src_class_Resource = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_assets_CssAssets;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var path_1 = _src_utils_path;
var Resource_1 = _src_class_Resource;
exports.CssAssets = {
    rewrite: function (resource, targetResource, solution) {
        var regexp = /url[\s]*\(('|")?([^)'"]+)('|")?\)/gi, assets = [], hash = {}, match;
        var content = resource.content;
        while (match = regexp.exec(content)) {
            var href = match[2].trim();
            if (href === '') {
                continue;
            }
            if (solution.assetsManager.shouldCopy(href) === false) {
                if (solution.assetsManager.shouldRewritePath(href, resource, targetResource)) {
                    var asset = new Resource_1.Resource({ type: 'asset', url: href }, resource, solution);
                    content = replace(href, match, content, asset.url, targetResource.url, solution);
                }
                continue;
            }
            var asset = new Resource_1.Resource({ type: 'asset', url: href }, resource, solution);
            if (asset.filename in hash === false) {
                assets.push(asset);
                hash[asset.filename] = 1;
            }
            var assetUrl = asset.toTarget(solution).url;
            content = replace(href, match, content, assetUrl, targetResource.url, solution);
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
function formatUrl(assetUrl, targetUrl) {
    var styleUrl = targetUrl;
    return path_1.path_toRelative(assetUrl, styleUrl, "/");
}
function replace(href, match, content, assetUrl, targetUrl, solution) {
    var before = content.substring(0, match.index), after = content.substring(match.index + match[0].length);
    var relUrl = formatUrl(assetUrl, targetUrl);
    var entry = match[0].replace(href, relUrl);
    return before + entry + after;
}
//# sourceMappingURL=api.js.map
//# sourceMappingURL=CssAssets.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_assets_CssAssets) && isObject(module.exports)) {
						Object.assign(_src_assets_CssAssets, module.exports);
						return;
					}
					_src_assets_CssAssets = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_assets_AssetsManager;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var CssAssets_1 = _src_assets_CssAssets;
var atma_utils_1 = require("atma-utils");
var global_1 = _src_global;
var AssetsManager = /** @class */ (function () {
    function AssetsManager(solution) {
        this.solution = solution;
        this.assets = [];
    }
    AssetsManager.prototype.rewriteCss = function (resource, targetResource, solution) {
        var _a;
        var arr = CssAssets_1.CssAssets.rewrite(resource, targetResource, solution);
        if (arr) {
            (_a = this.assets).push.apply(_a, arr);
        }
    };
    AssetsManager.prototype.shouldCopy = function (href) {
        if (withProtocol(href)) {
            return false;
        }
        if (href[0] === '/' && this.solution.opts.isSameBase()) {
            return false;
        }
        return true;
    };
    AssetsManager.prototype.shouldRewritePath = function (href, ownerResource, targetResource) {
        return this.shouldCopy(href);
    };
    AssetsManager.prototype.getAssets = function () {
        return this.assets;
    };
    AssetsManager.prototype.clearCache = function () {
        this.assets = [];
    };
    AssetsManager.prototype.flush = function () {
        var i = -1, arr = this.assets, dfr = new atma_utils_1.class_Dfr, manager = this;
        function next() {
            if (++i >= arr.length) {
                dfr.resolve();
                return;
            }
            var asset = arr[i];
            var target = asset.toTarget(manager.solution);
            global_1.io
                .File
                .copyToAsync(asset.filename, target.filename)
                .then(next, function (error) { return dfr.reject("AssetsManager can't copy a file " + asset.filename + " to " + target.filename); });
        }
        next();
        return dfr;
    };
    return AssetsManager;
}());
exports.AssetsManager = AssetsManager;
;
function hrefIsAbsolute(href) {
    if (withProtocol(href)) {
        return true;
    }
    if (href[0] === '/') {
        return true;
    }
    return false;
}
function withProtocol(href) {
    if (/^\s*data:/.test(href)) {
        return true;
    }
    if (/^[\w]{1,8}:\/\//.test(href)) {
        return true;
    }
    return false;
}
//# sourceMappingURL=api.js.map
//# sourceMappingURL=AssetsManager.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_assets_AssetsManager) && isObject(module.exports)) {
						Object.assign(_src_assets_AssetsManager, module.exports);
						return;
					}
					_src_assets_AssetsManager = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_class_VarDefinitions;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var VarDefinitions = /** @class */ (function () {
    function VarDefinitions(solution, defs) {
        this.solution = solution;
        this.code = serializeVars(defs);
    }
    VarDefinitions.prototype.evaluate = function (expression) {
        try {
            var code = this.code + "\n return " + expression + ";";
            var fn = new Function(code);
            return fn();
        }
        catch (error) {
            var msg = "Expression evaluation failed: " + expression + ". With message " + error.message;
            this.solution.reporter.error(msg);
        }
    };
    return VarDefinitions;
}());
exports.VarDefinitions = VarDefinitions;
function serializeVars(map) {
    var code = [];
    for (var key in map) {
        var expr = JSON.stringify(map[key]);
        var line = "var " + key + " = " + expr + ";";
        code.push(line);
    }
    return code.join('\n');
}
//# sourceMappingURL=api.js.map
//# sourceMappingURL=VarDefinitions.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_class_VarDefinitions) && isObject(module.exports)) {
						Object.assign(_src_class_VarDefinitions, module.exports);
						return;
					}
					_src_class_VarDefinitions = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_config_File;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var global_1 = _src_global;
exports.FileActions = {
    readFile: function (path, opts) {
        return global_1.io.File.readAsync(path, opts);
    },
    writeFile: function (path, content, opts) {
        return global_1.io.File.writeAsync(path, content, opts);
    },
    clearFileCache: function () {
        global_1.io.File.clearCache();
    }
};
//# sourceMappingURL=api.js.map
//# sourceMappingURL=File.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_config_File) && isObject(module.exports)) {
						Object.assign(_src_config_File, module.exports);
						return;
					}
					_src_config_File = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_config_Configuration;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var File_1 = _src_config_File;
var global_1 = _src_global;
var Configuration = /** @class */ (function () {
    function Configuration() {
        this.opts = {};
    }
    Configuration.prototype.define = function (key, value) {
        var obj = this.opts[key];
        if (obj == null) {
            this.opts[key] = {
                "default": value,
                value: value
            };
        }
        else {
            obj.value = value;
        }
        if (key === 'middlewares') {
            global_1.io.File.registerExtensions(value, /* clean previous */ true);
        }
    };
    Configuration.prototype.defineMany = function (options) {
        for (var key in options) {
            this.define(key, options[key]);
        }
    };
    Configuration.prototype.get = function (key) {
        var entry = this.opts[key];
        if (entry == null) {
            throw Error('Invalid configuration key: ' + key);
        }
        return entry.value || entry["default"];
    };
    Configuration.prototype.reset = function () {
        for (var key in this.opts) {
            var entry = this.opts[key];
            entry.value = entry["default"];
        }
    };
    Object.defineProperty(Configuration, "Instance", {
        get: function () {
            return _instance;
        },
        enumerable: true,
        configurable: true
    });
    return Configuration;
}());
exports.Configuration = Configuration;
var _instance = new Configuration();
_instance.defineMany(File_1.FileActions);
//# sourceMappingURL=api.js.map
//# sourceMappingURL=Configuration.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_config_Configuration) && isObject(module.exports)) {
						Object.assign(_src_config_Configuration, module.exports);
						return;
					}
					_src_config_Configuration = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_utils_obj;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
function obj_deepDefaults(target, defaults) {
    if (target == null) {
        return defaults;
    }
    for (var key in defaults) {
        if (target[key] == null) {
            target[key] = defaults[key];
            continue;
        }
        if (typeof target[key] === 'object' && defaults[key] != null && typeof defaults[key] === 'object') {
            obj_deepDefaults(target[key], defaults[key]);
        }
    }
    return target;
}
exports.obj_deepDefaults = obj_deepDefaults;
function obj_deepExtend(target, source) {
    if (target == null || source == null) {
        return target || obj_deepExtend({}, source);
    }
    for (var key in source) {
        var targetValue = target[key];
        var sourceValue = source[key];
        if (sourceValue != null && targetValue != null
            && typeof targetValue === 'object'
            && typeof sourceValue === 'object'
            && false === Array.isArray(targetValue)
            && false === Array.isArray(sourceValue)) {
            obj_deepExtend(targetValue, sourceValue);
            continue;
        }
        target[key] = sourceValue;
    }
    return target;
}
exports.obj_deepExtend = obj_deepExtend;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=obj.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_utils_obj) && isObject(module.exports)) {
						Object.assign(_src_utils_obj, module.exports);
						return;
					}
					_src_utils_obj = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_class_SolutionOpts;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var path_1 = _src_utils_path;
var atma_utils_1 = require("atma-utils");
var Include_1 = _src_class_Include;
var global_1 = _src_global;
var VarDefinitions_1 = _src_class_VarDefinitions;
var Configuration_1 = _src_config_Configuration;
var obj_1 = _src_utils_obj;
var SolutionOptsBase = /** @class */ (function () {
    function SolutionOptsBase() {
        this.mappers = [];
        this.options = {};
        this.copyFiles = null;
    }
    return SolutionOptsBase;
}());
exports.SolutionOptsBase = SolutionOptsBase;
var SolutionOpts = /** @class */ (function (_super) {
    tslib_1.__extends(SolutionOpts, _super);
    function SolutionOpts(solution, opts_) {
        var _this = _super.call(this) || this;
        _this.solution = solution;
        _this.defaults = {
            build: 'release',
            type: '',
            base: '',
            version: null,
            mainPage: 'main',
            mainBundle: '',
            mainContent: null,
            outputBase: '',
            outputAppBase: '/',
            output: '',
            outputMain: '{output}/build/{build}/{filename}.{ext}',
            outputSources: '{output}/build/{build}',
            outputAssets: '{output}/build/{build}/assets',
            outputShareBase: null,
            package: {
                module: 'commonjs',
                modules: ['commonjs', 'includejs', 'global', 'import'],
                type: 'module',
                types: ['module', 'bundle'],
                moduleWrapper: 'iif',
                moduleWrappers: ['umd', 'iif', 'script', 'custom'],
                moduleName: '',
                "import": null
            },
            extensions: {
                '': { type: 'js' },
                'js': { type: 'js' },
                'es6': { type: 'js' },
                'jsx': { type: 'js' },
                'ts': { type: 'js' },
                'mask': { type: 'mask' },
                'css': { type: 'css' },
                'less': { type: 'css' },
                'scss': { type: 'css' },
                'sass': { type: 'css' },
                'html': { type: 'html' },
                'json': { type: 'data' },
                'jpg': { type: 'asset' },
                'png': { type: 'asset' },
                'mp4': { type: 'asset' }
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
            dynamicDependencies: [],
            prebuild: [],
            postbuild: [],
            silent: false,
            watch: false,
            minify: false,
            options: {
                mask: {
                    Module: {
                        base: ''
                    }
                }
            },
            copyFiles: null
        };
        _this.resolvers = {
            base: function (basePath) {
                return basePath
                    ? path_1.path_toAbsolute(basePath)
                    : path_1.path_resolveCurrent();
            },
            outputBase: function (outputBase, opts) {
                return outputBase
                    ? path_1.path_toAbsolute(outputBase)
                    : opts.base;
            },
            outputMain: prepairPath,
            outputSources: prepairPath,
            outputAssets: prepairPath,
            package: function (packageOpts) {
                if (packageOpts == null) {
                    return this.package;
                }
                var opts = Object.create(this.defaults.package);
                return Object.assign(opts, packageOpts);
            },
            varDefs: function (varDefs) {
                return new VarDefinitions_1.VarDefinitions(this.solution, varDefs);
            },
            mappers: function () {
                return [];
            },
            mappings: function (val) {
                return val || {};
            },
            middlewares: function (val) {
                Configuration_1.Configuration.Instance.define('middlewares', val);
            },
            version: function (val, opts) {
                if (typeof val === 'string') {
                    if (val[0] === '#') {
                        var path = val.replace('#{', '').replace('}', '');
                        var json = require(process.cwd() + '/package.json');
                        return atma_utils_1.obj_getProperty(json, path);
                    }
                    if (val === 'random') {
                        return (Math.random() * 100000000 | 0).toString(32);
                    }
                }
                return val;
            },
            parserIgnoreDependencies: function (arr) {
                return arr.map(function (x) { return new RegExp(x); });
            },
            dynamicDependencies: function (arr) {
                return arr.map(function (x) { return new RegExp(x); });
            },
            extensions: function (opts) {
                if (opts === this.defaults.extensions) {
                    return opts;
                }
                var def = Object.create(this.defaults.extensions);
                return Object.assign(def, opts);
            },
            defaultExtensions: function (opts) {
                if (opts === this.defaults.defaultExtensions) {
                    return opts;
                }
                /** REFACTOR **/
                Include_1.Include.prototype.cfg('extentionDefault', opts);
                for (var type in opts) {
                    switch (type) {
                        case 'js':
                            global_1.mask.Module.cfg('ext.script', opts[type]);
                            break;
                        case 'css':
                            global_1.mask.Module.cfg('ext.style', opts[type]);
                            break;
                    }
                }
                var def = Object.create(this.defaults.defaultExtensions);
                return Object.assign(def, opts);
            },
            options: function (opts) {
                if (opts == null) {
                    return {};
                }
                if (opts.mask) {
                    if (opts.mask.Module) {
                        for (var key in opts.mask.Module) {
                            global_1.mask.Module.cfg(key, opts.mask.Module[key]);
                        }
                    }
                    for (var key in opts.mask)
                        if (key !== 'Module') {
                            global_1.mask.cfg(key, opts.mask.Module[key]);
                        }
                }
                if (opts.include) {
                    if (opts.include.routes) {
                        Include_1.Include.prototype.routes(opts.include.routes);
                    }
                }
                return opts;
            }
        };
        _this.paths = [solution.path];
        var opts = opts_ || {};
        for (var key in _this.defaults) {
            _this[key] = obj_1.obj_deepDefaults(opts[key], _this.defaults[key]);
        }
        for (var key in _this.resolvers) {
            _this[key] = _this.resolvers[key].call(_this, _this[key], _this);
        }
        if (!_this.type && solution.path) {
            _this.type = _this.getTypeForExt(path_1.path_getExtension(solution.path));
        }
        return _this;
    }
    SolutionOpts.prototype.getOutputFolder = function (type) {
        if (type === 'asset') {
            return this.outputAssets;
        }
        return this.outputSources;
    };
    SolutionOpts.prototype.isSameBase = function () {
        if (this.outputShareBase === false) {
            return false;
        }
        return this.base === this.outputBase;
    };
    SolutionOpts.prototype.getExtForType = function (type) {
        var match = this.defaultExtensions[type];
        if (match == null)
            throw new Error('Type is not supported: ' + type);
        return match;
    };
    SolutionOpts.prototype.getTypeForExt = function (ext) {
        var match = this.extensions[ext];
        if (match == null)
            throw new Error('Extension is not configurated: ' + ext);
        return match.type;
    };
    SolutionOpts.prototype.mapResource = function (resource_) {
        var resource = resource_;
        this.mappers.forEach(function (mapper) {
            resource = mapper.map(resource);
        });
        return resource;
    };
    SolutionOpts.prototype.toAppUrl = function (filename) {
        return '/' + path_1.path_toRelative(filename, this.base);
    };
    SolutionOpts.prototype.fromAppUrl = function (url) {
        return path_1.path_combine(this.base, url);
    };
    return SolutionOpts;
}(SolutionOptsBase));
exports.SolutionOpts = SolutionOpts;
;
function prepairPath(path, opts) {
    return interpolateStr(path, opts);
}
function interpolateStr(str, opts) {
    return str.replace(/{(\w+)}/g, function (full, name) {
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
//# sourceMappingURL=api.js.map
//# sourceMappingURL=SolutionOpts.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_class_SolutionOpts) && isObject(module.exports)) {
						Object.assign(_src_class_SolutionOpts, module.exports);
						return;
					}
					_src_class_SolutionOpts = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_class_Reporter;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var res_1 = _src_utils_res;
var IReporter = /** @class */ (function () {
    function IReporter() {
    }
    IReporter.create = function (opts) {
        if (opts.silent === true) {
            return new SilentReporter();
        }
        return new ConsoleReporter();
    };
    return IReporter;
}());
exports.IReporter = IReporter;
;
var ConsoleReporter = /** @class */ (function () {
    function ConsoleReporter() {
    }
    ConsoleReporter.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.error.apply(console, args);
    };
    ConsoleReporter.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.warn.apply(console, args);
    };
    ConsoleReporter.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply(console, args);
    };
    ConsoleReporter.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.info.apply(console, args);
    };
    ConsoleReporter.prototype.print = function (x) {
        process.stdout.write(x);
    };
    ConsoleReporter.prototype.treeTime = function (action, messageProvider, resources) {
        var _this = this;
        var start = Date.now();
        var dfr = action();
        dfr.done(function () {
            var end = Date.now();
            var seconds = ((end - start) / 1000).toFixed(2);
            var treeInfo = res_1.res_getTreeInfo(resources);
            _this
                .info(messageProvider(treeInfo));
            _this
                .info(treeInfo.treeString);
        });
        return dfr;
    };
    return ConsoleReporter;
}());
var SilentReporter = /** @class */ (function () {
    function SilentReporter() {
    }
    SilentReporter.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    SilentReporter.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    SilentReporter.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    SilentReporter.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    SilentReporter.prototype.print = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    SilentReporter.prototype.treeTime = function (action, messageProvider, resources) {
        return action();
    };
    return SilentReporter;
}());
//# sourceMappingURL=api.js.map
//# sourceMappingURL=Reporter.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_class_Reporter) && isObject(module.exports)) {
						Object.assign(_src_class_Reporter, module.exports);
						return;
					}
					_src_class_Reporter = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_class_OutputResources;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var Resource_1 = _src_class_Resource;
var res_1 = _src_utils_res;
var OutputResources = /** @class */ (function () {
    function OutputResources(solution) {
        this.solution = solution;
        this.items = [];
        this.resources = [];
        this.pagesInput = {};
    }
    OutputResources.prototype.prepair = function (resources) {
        var _this = this;
        this.resources = [];
        this.pagesInput = {};
        this.items = [];
        this.rootInput = resources.pop();
        this.rootOutput = this.rootInput.toTarget(this.solution);
        this.rootOutput.content = this.rootInput.content;
        this.pagesInput = res_1.res_groupByPageAndBundles(resources, this.solution.opts);
        Object.keys(this.pagesInput).forEach(function (page) {
            Object.keys(_this.pagesInput[page]).forEach(function (bundle) {
                var resources = _this.pagesInput[page][bundle];
                var byType = res_1.res_groupResourcesByType(resources, _this.solution.opts);
                Object.keys(byType).forEach(function (type) {
                    var arr = byType[type];
                    var item = new OutputItem({
                        page: page,
                        bundle: bundle,
                        type: type,
                        solution: _this.solution,
                        resources: arr
                    });
                    _this.items.push(item);
                });
                if (byType['js'] == null) {
                    var item = new OutputItem({
                        page: page,
                        bundle: bundle,
                        type: 'js',
                        solution: _this.solution,
                        resources: []
                    });
                    _this.items.push(item);
                }
            });
        });
    };
    OutputResources.prototype.getForPage = function (page) {
        return this.items.filter(function (x) { return x.page === page; }).map(function (x) { return x.resource; });
    };
    OutputResources.prototype.getAll = function () {
        var all = this
            .items
            .map(function (x) { return x.resource; })
            .filter(function (x) { return x.embed !== true; })
            .filter(function (x) { return Boolean(x.content); });
        if (this.rootOutput) {
            all.push(this.rootOutput);
        }
        return all;
    };
    return OutputResources;
}());
exports.OutputResources = OutputResources;
var OutputItem = /** @class */ (function () {
    function OutputItem(_a) {
        var page = _a.page, bundle = _a.bundle, type = _a.type, solution = _a.solution, resources = _a.resources;
        this.page = page;
        this.bundle = bundle;
        this.type = type;
        var ext = solution.opts.getExtForType(type);
        var filename = page + "_" + bundle + "." + ext;
        var resource = new Resource_1.Resource({
            type: type,
            url: filename,
            bundle: bundle
        }, null, solution);
        this.resource = resource.toTarget(solution);
        this.resources = resources || [];
    }
    return OutputItem;
}());
exports.OutputItem = OutputItem;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=OutputResources.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_class_OutputResources) && isObject(module.exports)) {
						Object.assign(_src_class_OutputResources, module.exports);
						return;
					}
					_src_class_OutputResources = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_base_BaseHandler;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var BaseHandler = /** @class */ (function () {
    function BaseHandler(solution) {
        this.solution = solution;
        var _a = this.constructor, Parser = _a.Parser, Rewriter = _a.Rewriter, Builder = _a.Builder, PathResolver = _a.PathResolver;
        this.parser = new Parser(solution, this);
        this.rewriter = new Rewriter(solution, this);
        this.builder = new Builder(solution, this);
        this.pathResolver = new PathResolver(solution, this);
    }
    return BaseHandler;
}());
exports.BaseHandler = BaseHandler;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=BaseHandler.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_base_BaseHandler) && isObject(module.exports)) {
						Object.assign(_src_handlers_base_BaseHandler, module.exports);
						return;
					}
					_src_handlers_base_BaseHandler = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_base_BaseRewriter;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var Solution_1 = _src_class_Solution;
var BaseHandler_1 = _src_handlers_base_BaseHandler;
var assert = require("assert");
var BaseRewriter = /** @class */ (function () {
    function BaseRewriter(solution, handler) {
        this.solution = solution;
        this.handler = handler;
        assert(solution instanceof Solution_1.Solution, 'Solution expected for Rewriter');
        assert(handler instanceof BaseHandler_1.BaseHandler, 'BaseHandler expected for the Rewriter');
    }
    BaseRewriter.prototype.rewritePartial = function (content, ownerResource) {
        throw Error('Not implemented');
    };
    BaseRewriter.prototype.rewriteResource = function (resource) {
        throw Error('Not implemented');
    };
    BaseRewriter.prototype.accepts = function (type) {
        throw Error('Not implemented');
    };
    return BaseRewriter;
}());
exports.BaseRewriter = BaseRewriter;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=BaseRewriter.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_base_BaseRewriter) && isObject(module.exports)) {
						Object.assign(_src_handlers_base_BaseRewriter, module.exports);
						return;
					}
					_src_handlers_base_BaseRewriter = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_load_LoadRewriter;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseRewriter_1 = _src_handlers_base_BaseRewriter;
var LoadRewriter = /** @class */ (function (_super) {
    tslib_1.__extends(LoadRewriter, _super);
    function LoadRewriter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadRewriter.prototype.rewritePartial = function (content, ownerResource) {
    };
    LoadRewriter.prototype.rewriteResource = function (resource) {
    };
    LoadRewriter.prototype.accepts = function (type) {
        return type === 'load';
    };
    return LoadRewriter;
}(BaseRewriter_1.BaseRewriter));
exports.LoadRewriter = LoadRewriter;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=LoadRewriter.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_load_LoadRewriter) && isObject(module.exports)) {
						Object.assign(_src_handlers_load_LoadRewriter, module.exports);
						return;
					}
					_src_handlers_load_LoadRewriter = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_base_BaseBuilder;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var assert = require("assert");
var Solution_1 = _src_class_Solution;
var BaseHandler_1 = _src_handlers_base_BaseHandler;
var BaseBuilder = /** @class */ (function () {
    function BaseBuilder(solution, handler) {
        this.solution = solution;
        this.handler = handler;
        assert(solution instanceof Solution_1.Solution, 'Solution expected for the Builder');
        assert(handler instanceof BaseHandler_1.BaseHandler, 'BaseHandler expected for the Builder');
    }
    BaseBuilder.prototype.buildPage = function (resource, dependencies) {
        throw Error('Not implemented');
    };
    return BaseBuilder;
}());
exports.BaseBuilder = BaseBuilder;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=BaseBuilder.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_base_BaseBuilder) && isObject(module.exports)) {
						Object.assign(_src_handlers_base_BaseBuilder, module.exports);
						return;
					}
					_src_handlers_base_BaseBuilder = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_load_LoadBuilder;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseBuilder_1 = _src_handlers_base_BaseBuilder;
var LoadBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(LoadBuilder, _super);
    function LoadBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadBuilder.prototype.createModule = function (outputItem, otherOutputItems) {
        var _this = this;
        var html = outputItem
            .resources
            .map(function (resource) {
            var url = resource.toTargetUrl(_this.solution);
            return "<script type='text/plain' data-bundler-path='" + url + "'>\t\t\t\n\t\t\t\t\t" + resource.content + "\n\t\t\t\t</script>";
        })
            .join('\n');
        outputItem.resource.content = html;
        outputItem.resource.type = 'html';
    };
    LoadBuilder.prototype.buildRoot = function (resource, dependencies) {
        throw new Error('Right now only rewriter is supported');
    };
    LoadBuilder.prototype.accepts = function (type) {
        return type === 'load';
    };
    return LoadBuilder;
}(BaseBuilder_1.BaseBuilder));
exports.LoadBuilder = LoadBuilder;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=LoadBuilder.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_load_LoadBuilder) && isObject(module.exports)) {
						Object.assign(_src_handlers_load_LoadBuilder, module.exports);
						return;
					}
					_src_handlers_load_LoadBuilder = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_base_BasePathResolver;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var BasePathResolver = /** @class */ (function () {
    function BasePathResolver(solution, handler) {
        this.solution = solution;
        this.handler = handler;
    }
    BasePathResolver.prototype.resolve = function (includeData, resource) {
        throw Error('Not implemented');
    };
    BasePathResolver.prototype.accepts = function (type) {
        throw Error('Not implemented');
    };
    return BasePathResolver;
}());
exports.BasePathResolver = BasePathResolver;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=BasePathResolver.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_base_BasePathResolver) && isObject(module.exports)) {
						Object.assign(_src_handlers_base_BasePathResolver, module.exports);
						return;
					}
					_src_handlers_base_BasePathResolver = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_load_LoadPathResolver;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BasePathResolver_1 = _src_handlers_base_BasePathResolver;
var LoadPathResolver = /** @class */ (function (_super) {
    tslib_1.__extends(LoadPathResolver, _super);
    function LoadPathResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadPathResolver.prototype.accepts = function (type) {
        return false;
    };
    return LoadPathResolver;
}(BasePathResolver_1.BasePathResolver));
exports.LoadPathResolver = LoadPathResolver;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=LoadPathResolver.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_load_LoadPathResolver) && isObject(module.exports)) {
						Object.assign(_src_handlers_load_LoadPathResolver, module.exports);
						return;
					}
					_src_handlers_load_LoadPathResolver = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_base_BaseParser;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var Solution_1 = _src_class_Solution;
var BaseHandler_1 = _src_handlers_base_BaseHandler;
var assert = require("assert");
var BaseParser = /** @class */ (function () {
    function BaseParser(solution, handler) {
        this.solution = solution;
        this.handler = handler;
        assert(solution instanceof Solution_1.Solution, 'Solution expected for Parser');
        assert(handler instanceof BaseHandler_1.BaseHandler, 'BaseHandler expected for the Parser');
    }
    BaseParser.prototype.getDependencies = function (content, ownerResource) {
        throw new Error('Not implemented');
    };
    BaseParser.prototype.accepts = function (type) {
        throw new Error('Not implemented');
    };
    return BaseParser;
}());
exports.BaseParser = BaseParser;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=BaseParser.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_base_BaseParser) && isObject(module.exports)) {
						Object.assign(_src_handlers_base_BaseParser, module.exports);
						return;
					}
					_src_handlers_base_BaseParser = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_load_LoadParser;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseParser_1 = _src_handlers_base_BaseParser;
var LoadParser = /** @class */ (function (_super) {
    tslib_1.__extends(LoadParser, _super);
    function LoadParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadParser.prototype.getDependencies = function (content, ownerResource) {
        return null;
    };
    LoadParser.prototype.accepts = function (resource) {
        return false;
    };
    return LoadParser;
}(BaseParser_1.BaseParser));
exports.LoadParser = LoadParser;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=LoadParser.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_load_LoadParser) && isObject(module.exports)) {
						Object.assign(_src_handlers_load_LoadParser, module.exports);
						return;
					}
					_src_handlers_load_LoadParser = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_load_LoadHandler;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var LoadRewriter_1 = _src_handlers_load_LoadRewriter;
var LoadBuilder_1 = _src_handlers_load_LoadBuilder;
var LoadPathResolver_1 = _src_handlers_load_LoadPathResolver;
var BaseHandler_1 = _src_handlers_base_BaseHandler;
var LoadParser_1 = _src_handlers_load_LoadParser;
var LoadHandler = /** @class */ (function (_super) {
    tslib_1.__extends(LoadHandler, _super);
    function LoadHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadHandler.Parser = LoadParser_1.LoadParser;
    LoadHandler.Rewriter = LoadRewriter_1.LoadRewriter;
    LoadHandler.Builder = LoadBuilder_1.LoadBuilder;
    LoadHandler.PathResolver = LoadPathResolver_1.LoadPathResolver;
    return LoadHandler;
}(BaseHandler_1.BaseHandler));
exports.LoadHandler = LoadHandler;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=LoadHandler.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_load_LoadHandler) && isObject(module.exports)) {
						Object.assign(_src_handlers_load_LoadHandler, module.exports);
						return;
					}
					_src_handlers_load_LoadHandler = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_mask_MaskRewriter;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseRewriter_1 = _src_handlers_base_BaseRewriter;
var path_1 = _src_utils_path;
var global_1 = _src_global;
var MaskRewriter = /** @class */ (function (_super) {
    tslib_1.__extends(MaskRewriter, _super);
    function MaskRewriter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaskRewriter.prototype.rewritePartial = function (content, ownerResource) {
        var _this = this;
        var parser = this.handler.parser;
        var ast = parser._parse(content, ownerResource);
        var found = false;
        global_1.mask.TreeWalker.walk(ast, function (node) {
            var _a;
            if (node.tagName !== 'imports') {
                return;
            }
            if (ownerResource.source && ownerResource.location !== ownerResource.source.location) {
                node
                    .nodes
                    .filter(function (x) { return path_1.path_isRelative(x.path); })
                    .forEach(function (x) {
                    var ownerSource = ownerResource.source.url, ownerTarget = ownerResource.url, currentUrl = path_1.path_normalize(path_1.path_combine(path_1.path_getDir(ownerSource), x.path)), targetUrl = path_1.path_toRelative(currentUrl, ownerTarget);
                    x.path = currentUrl; //targetUrl;
                });
            }
            var page = parser._getPageForNode(node.nodes[0]);
            if (page == null) {
                return;
            }
            found = true;
            var template = _this
                .solution
                .outputResources
                .getForPage(page)
                .sort(function (a, b) {
                if (a.type === b.type) {
                    return 0;
                }
                if (a.type === 'js') {
                    return 1;
                }
                return 0;
            })
                .map(function (x) {
                var url = x.url; //x.toRelative(ownerResource); 
                return "import sync from '" + url + "';";
            })
                .join('');
            var imports = global_1.mask.parse(template);
            (_a = node.nodes).unshift.apply(_a, (imports.nodes));
        });
        if (found === false) {
            return;
        }
        return global_1.mask.stringify(ast, {
            indent: this.solution.opts.minify ? 0 : 4
        });
    };
    MaskRewriter.prototype.rewriteResource = function (resource) {
        var meta = resource.meta;
        if (meta != null && meta.hasPages === false) {
            return;
        }
        var result = this.rewritePartial(resource.content, resource);
        if (result && result !== resource.content) {
            resource.content = result;
        }
    };
    MaskRewriter.prototype.rewriteRoot = function (resourceInput, resourceOutput) {
        var ast = this.handler.parser._parse(resourceInput.content);
        global_1.mask.TreeWalker.walk(ast, function (node) {
            if (node.tagName !== 'import') {
                return;
            }
            if (node.path == null || path_1.path_isRelative(node.path) === false) {
                return;
            }
            if (node.path[0] === '@') {
                // MaskJS prefixed path
                return;
            }
            var path = path_1.path_combine(path_1.path_getDir(resourceInput.url), node.path);
            node.path = path_1.path_toRelative(path, resourceOutput.url);
        });
        resourceOutput.content = global_1.mask.stringify(ast, { indent: 4 });
    };
    MaskRewriter.prototype.accepts = function (type) {
        return type === 'mask';
    };
    return MaskRewriter;
}(BaseRewriter_1.BaseRewriter));
exports.MaskRewriter = MaskRewriter;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=MaskRewriter.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_mask_MaskRewriter) && isObject(module.exports)) {
						Object.assign(_src_handlers_mask_MaskRewriter, module.exports);
						return;
					}
					_src_handlers_mask_MaskRewriter = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_mask_MaskScriptable;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var MaskScriptable = /** @class */ (function () {
    function MaskScriptable(solution) {
        this.solution = solution;
    }
    MaskScriptable.prototype.convert = function (template, resource, resources) {
        //let ast = 
    };
    return MaskScriptable;
}());
exports.MaskScriptable = MaskScriptable;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=MaskScriptable.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_mask_MaskScriptable) && isObject(module.exports)) {
						Object.assign(_src_handlers_mask_MaskScriptable, module.exports);
						return;
					}
					_src_handlers_mask_MaskScriptable = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_mask_MaskBuilder;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseBuilder_1 = _src_handlers_base_BaseBuilder;
var MaskScriptable_1 = _src_handlers_mask_MaskScriptable;
var MaskBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(MaskBuilder, _super);
    function MaskBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaskBuilder.prototype.createModule = function (outputItem, otherOutputItems) {
        var _this = this;
        var out = [], arr;
        otherOutputItems.forEach(function (item) {
            if (item.resource.type === 'css') {
                var arr = _this.registerStyles(item.resources);
                out.push.apply(out, arr);
            }
        });
        arr = outputItem.resources.map(function (resource) {
            /*
            * @TODO consider to use relative paths instead of applications root
            */
            //-let url = resource.toRelative(outputItem.resource);
            var url = resource.url;
            return "module path=\"" + url + "\" { \n\t\t\t\t" + resource.content + "\n\t\t\t}";
        });
        out.push.apply(out, arr);
        outputItem.resource.content = out.join('\n');
    };
    MaskBuilder.prototype.buildRoot = function (resource, dependencies) {
        if (this.solution.opts.package.type === 'bundle') {
            var scriptable = new MaskScriptable_1.MaskScriptable(this.solution);
            resource.content = scriptable.convert(resource.content, resource, dependencies);
            return;
        }
        var maskDeps = dependencies.filter(function (x) { return x.type === 'mask'; });
        maskDeps.forEach(function (x) { return x.embed = true; });
        var body = maskDeps.map(function (x) { return x.content; }).join('\n');
        var imports = dependencies
            .filter(function (x) { return x.type !== 'mask'; })
            .filter(function (x) { return Boolean(x.content); })
            .map(function (x) {
            var url = x.toRelative(resource);
            return "import sync from '" + url + "';";
        })
            .join('\n');
        resource.content = body + "\n" + imports + "\n" + resource.content;
    };
    MaskBuilder.prototype.accepts = function (type) {
        return type === 'mask';
    };
    MaskBuilder.prototype.registerStyles = function (resources) {
        return resources.filter(function (x) { return x.getModule() === 'mask'; }).map(function (resource) {
            return "module path=\"" + resource.url + "\";";
        });
    };
    return MaskBuilder;
}(BaseBuilder_1.BaseBuilder));
exports.MaskBuilder = MaskBuilder;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=MaskBuilder.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_mask_MaskBuilder) && isObject(module.exports)) {
						Object.assign(_src_handlers_mask_MaskBuilder, module.exports);
						return;
					}
					_src_handlers_mask_MaskBuilder = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_mask_MaskPathResolver;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BasePathResolver_1 = _src_handlers_base_BasePathResolver;
var global_1 = _src_global;
var MaskPathResolver = /** @class */ (function (_super) {
    tslib_1.__extends(MaskPathResolver, _super);
    function MaskPathResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaskPathResolver.prototype.resolve = function (includeData, resource) {
        var node = {
            path: includeData.url,
            type: MAPPING[includeData.type]
        };
        var module = {
            path: resource.url,
            location: resource.location
        };
        return global_1.mask.Module.resolvePath(node, null, null, module);
    };
    MaskPathResolver.prototype.accepts = function (includeData) {
        return includeData.module === 'mask';
    };
    return MaskPathResolver;
}(BasePathResolver_1.BasePathResolver));
exports.MaskPathResolver = MaskPathResolver;
;
var MAPPING = { mask: 'mask', load: 'data', js: 'script', css: 'style' };
//# sourceMappingURL=api.js.map
//# sourceMappingURL=MaskPathResolver.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_mask_MaskPathResolver) && isObject(module.exports)) {
						Object.assign(_src_handlers_mask_MaskPathResolver, module.exports);
						return;
					}
					_src_handlers_mask_MaskPathResolver = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_mask_MaskParser;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseParser_1 = _src_handlers_base_BaseParser;
var async_1 = _src_utils_async;
var global_1 = _src_global;
var color_1 = _src_utils_color;
var MaskParser = /** @class */ (function (_super) {
    tslib_1.__extends(MaskParser, _super);
    function MaskParser(solution, handler) {
        var _this = _super.call(this, solution, handler) || this;
        _this.solution = solution;
        _this.handler = handler;
        return _this;
    }
    MaskParser.prototype.getDependencies = function (content, ownerResource) {
        var ast = this._parse(content, ownerResource);
        var arr = [];
        this._forEachImports(ast, function (imports) {
            arr.push.apply(arr, imports);
        });
        return async_1.async_resolve({ dependencies: arr });
    };
    MaskParser.prototype.accepts = function (type) {
        return type === 'mask';
    };
    MaskParser.prototype._parse = function (content, resource) {
        global_1.mask.off('error');
        global_1.mask.off('warn');
        var reporter = this.solution.reporter;
        global_1.mask.on('error', function (error) { return reporter.error(toMessage(error)); });
        global_1.mask.on('warn', function (warning) { return reporter.warn(toMessage(warning)); });
        function toMessage(warning) {
            var msg = '';
            if (resource)
                msg += color_1.color("yellow<" + resource.url + ">\n");
            msg += warning.message;
            return msg;
        }
        return global_1.mask.parse(content);
    };
    MaskParser.prototype._forEachImports = function (ast, cb) {
        var _this = this;
        global_1.mask.TreeWalker.walk(ast, function (node) {
            if (node.tagName === 'imports') {
                var imports = Array
                    .from(node.nodes)
                    .filter(function (x) { return x.tagName === 'import'; })
                    .map(function (x) { return _this._getDependenciesFromNode(x); })
                    .reduce(function (aggr, x) { return aggr.concat.apply(aggr, x); }, []);
                cb(imports);
            }
            if (node.tagName === 'import:cfg') {
                var arr = global_1.mask.Utils.Expression.evalStatements(node.expression);
                global_1.mask.Module.cfg.apply(global_1.mask.Module, arr);
            }
        });
    };
    MaskParser.prototype._getDependenciesFromNode = function (node) {
        var page = this._getPageForNode(node), path = global_1.mask.Module.resolvePath(node, null, null, null, false), type = global_1.mask.Module.getType(new global_1.mask.Module.Endpoint(path, node.contentType));
        if (path[0] === '/') {
            // @NextIteration base will be handled in mask.Module.resolvePath
            // var base = mask.Module.cfg('base');
            // if (base) {
            // 	path = path_combine(base, path);
            // }
        }
        return [this._createDependency(path, type, page)];
    };
    MaskParser.prototype._cfg_getExtensionForType = function (type) {
        return global_1.mask.Module.cfg('ext')[type];
    };
    MaskParser.prototype._cfg_getBaseForNs = function (type) {
        return global_1.mask.Module.cfg('nsBase') || '';
    };
    MaskParser.prototype._createDependency = function (path, type, page) {
        return {
            url: path,
            type: MAPPING[type],
            module: 'mask',
            page: page
        };
    };
    MaskParser.prototype._getPageForNode = function (node) {
        var owner = node.parent;
        if (owner != null && owner.tagName === 'imports') {
            owner = owner.parent;
        }
        if (owner == null || owner.type === global_1.mask.Dom.FRAGMENT) {
            return null;
        }
        var page = owner.attr['data-bundler-page'] || owner.attr.page || owner.attr.id || owner.attr.name;
        if (page == null) {
            this.solution.reporter.warn('Nested import found, but the container has no "data-bundler-page", "page", "id" or "name" in attributes');
        }
        return page;
    };
    return MaskParser;
}(BaseParser_1.BaseParser));
exports.MaskParser = MaskParser;
;
var MAPPING = { mask: 'mask', data: 'load', script: 'js', style: 'css' };
//# sourceMappingURL=api.js.map
//# sourceMappingURL=MaskParser.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_mask_MaskParser) && isObject(module.exports)) {
						Object.assign(_src_handlers_mask_MaskParser, module.exports);
						return;
					}
					_src_handlers_mask_MaskParser = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_mask_MaskHandler;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var MaskRewriter_1 = _src_handlers_mask_MaskRewriter;
var MaskBuilder_1 = _src_handlers_mask_MaskBuilder;
var MaskPathResolver_1 = _src_handlers_mask_MaskPathResolver;
var BaseHandler_1 = _src_handlers_base_BaseHandler;
var MaskParser_1 = _src_handlers_mask_MaskParser;
var global_1 = _src_global;
var MaskHandler = /** @class */ (function (_super) {
    tslib_1.__extends(MaskHandler, _super);
    function MaskHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaskHandler.prototype.resolvePath = function (includeData, parent) {
        var endpoint = {
            path: includeData.url
        };
        return global_1.mask.Module.resolvePath(endpoint, parent, parent, parent);
    };
    MaskHandler.prototype.accepts = function (type) {
        return type === 'mask';
    };
    MaskHandler.Parser = MaskParser_1.MaskParser;
    MaskHandler.Rewriter = MaskRewriter_1.MaskRewriter;
    MaskHandler.Builder = MaskBuilder_1.MaskBuilder;
    MaskHandler.PathResolver = MaskPathResolver_1.MaskPathResolver;
    return MaskHandler;
}(BaseHandler_1.BaseHandler));
exports.MaskHandler = MaskHandler;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=MaskHandler.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_mask_MaskHandler) && isObject(module.exports)) {
						Object.assign(_src_handlers_mask_MaskHandler, module.exports);
						return;
					}
					_src_handlers_mask_MaskHandler = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_utils_AstUtil;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var UglifyJS = require("uglify-es");
var nope = function () {
    return true;
}, variableOverrides = null, walk = function (node, fn) {
    var walker = new UglifyJS.TreeWalker(function (node, descend) {
        return fn.call(this, node, descend);
    });
    node.walk(walker);
}, findNode = function (node, fn, options) {
    if (options === void 0) { options = { scopeOnly: false }; }
    var result, intop = true;
    walk(node, function (node) {
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
}, each = function (node, selector, fn) {
    walk(node, function (node) {
        return selector(node) ? fn.call(this, node, selector) : null;
    });
}, getVariableValue = function (scope, varName) {
    if (variableOverrides && varName in variableOverrides) {
        return variableOverrides[varName];
    }
    var varDef = findNode(scope, function (node) {
        return node instanceof UglifyJS.AST_VarDef && node.name.name == varName;
    }, {
        scopeOnly: true
    });
    if (varDef) {
        return evaluateNode(varDef.value, scope);
    }
    varDef = findNode(scope, function (node) {
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
}, evaluateNode = function (node, scope) {
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
            return Array.from(node.elements).map(function (x) {
                return evaluateNode(x, scope);
            });
        case 'Object':
            var aggr = {};
            Array.from(node.properties).forEach(function (x) {
                aggr[x.key] = evaluateNode(x.value, scope);
            });
            return aggr;
        case 'Binary':
            var left = evaluateNode(node.left, scope), right = evaluateNode(node.right, scope);
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
}, getArguments = function (args, scope) {
    if (scope == null) {
        console.warn('getArguments: scope is undefined', args);
    }
    args = Array.prototype.slice.call(args);
    args = Array.from(args).map(function (x) {
        return evaluateNode(x, scope);
    });
    return cleanArgs(args);
}, cleanArgs = function (args) {
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
}, getPropertyChain = function (node, stack) {
    if ((node instanceof UglifyJS.AST_SymbolRef) == false) {
        console.warn('Current node is not a sumbol referencing');
    }
    var i = stack.length - 1, chain = [], key;
    while (--i > -1) {
        var x = stack[i];
        if (x instanceof UglifyJS.AST_PropAccess) {
            chain.push(typeof x.property === 'string' ? x.property : x.property.value);
            continue;
        }
        break;
    }
    return chain;
}, transform = function (node, fn) {
    var transform = new UglifyJS.TreeTransformer(fn);
    node.transform(transform);
};
exports.AstUtil = {
    findNode: findNode,
    each: each,
    evaluateNode: evaluateNode,
    getArguments: getArguments,
    getPropertyChain: getPropertyChain,
    transform: transform,
    parse: function (code, opts) {
        var options = {
            parse: {},
            compress: false,
            mangle: false,
            output: {
                ast: true,
                code: false
            }
        };
        var result = UglifyJS.minify(code, options);
        if (result.error) {
            var error_1 = result.error;
            error_1.filename = opts.filename;
            error_1.toString = function () {
                var str = error_1.message;
                str += '\n' + opts.filename;
                str += '\n' + code.split(/\r?\n/g)[result.error.line - 1];
                var i = error_1.col, pad = '';
                while (--i > -1)
                    pad += ' ';
                str += "\n" + pad + '^';
                return str;
            };
            throw error_1;
        }
        return result.ast;
    },
    is: {
        includeFunction: function (node) {
            return !!(node instanceof UglifyJS.AST_Call && node.start && node.start.value == 'include');
        },
        amdFunction: function (node) {
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
                if (exports.AstUtil.is.string(args[0])) {
                    // is commonjs require
                    return false;
                }
                return true;
            }
            return false;
        },
        commonJsFunction: function (node) {
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
                if (args.length !== 1) {
                    return false;
                }
                if (exports.AstUtil.is.string(args[0])) {
                    // is commonjs require
                    return true;
                }
            }
            return false;
        },
        type: function (obj, type) {
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
        string: function (node) {
            return node instanceof UglifyJS.AST_Node && node.TYPE === 'String';
        }
    }
};
//# sourceMappingURL=api.js.map
//# sourceMappingURL=AstUtil.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_utils_AstUtil) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_utils_AstUtil, module.exports);
						return;
					}
					_src_handlers_script_utils_AstUtil = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_class_ResourceInfo;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var ResourceMeta = /** @class */ (function () {
    function ResourceMeta() {
    }
    return ResourceMeta;
}());
exports.ResourceMeta = ResourceMeta;
var ResourceInfo = /** @class */ (function () {
    function ResourceInfo() {
        this.dependencies = [];
    }
    ResourceInfo.merge = function () {
        var infos = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            infos[_i] = arguments[_i];
        }
        var result = new ResourceInfo;
        infos.forEach(function (x) {
            var _a;
            if (x.dependencies) {
                if (result.dependencies == null) {
                    result.dependencies = [];
                }
                (_a = result.dependencies).push.apply(_a, x.dependencies);
            }
            if (x.meta) {
                if (result.meta == null) {
                    result.meta = {};
                }
                Object.assign(result.meta, x.meta);
            }
        });
        return result;
    };
    return ResourceInfo;
}());
exports.ResourceInfo = ResourceInfo;
var ImportNode = /** @class */ (function () {
    function ImportNode() {
    }
    return ImportNode;
}());
exports.ImportNode = ImportNode;
var ExportNode = /** @class */ (function () {
    function ExportNode() {
        this.dependents = [];
        this.builder = { movedToOuter: false };
    }
    ExportNode.prototype.clone = function () {
        var node = new ExportNode();
        node.position = this.position;
        node.length = this.length;
        node.str = this.str;
        node.ref = this.ref;
        node.refs = this.refs;
        node.type = this.type;
        node.dependents = this.dependents;
        return node;
    };
    ExportNode.prototype.hasExport = function (ref) {
        if (this.ref === ref) {
            return true;
        }
        if (this.refs != null && this.refs.includes(ref)) {
            return true;
        }
        return false;
    };
    return ExportNode;
}());
exports.ExportNode = ExportNode;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=ResourceInfo.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_class_ResourceInfo) && isObject(module.exports)) {
						Object.assign(_src_class_ResourceInfo, module.exports);
						return;
					}
					_src_class_ResourceInfo = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_utils_arr;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
function arr_flattern(arr) {
    var out = [];
    arr.forEach(function (x) {
        if (Array.isArray(x) === false) {
            out.push(x);
            return;
        }
        var flat = arr_flattern(x);
        out.push.apply(out, flat);
    });
    return out.filter(function (x) { return x != null; });
}
exports.arr_flattern = arr_flattern;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=arr.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_utils_arr) && isObject(module.exports)) {
						Object.assign(_src_utils_arr, module.exports);
						return;
					}
					_src_utils_arr = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_common_js_CommonJsParser;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var AstUtil_1 = _src_handlers_script_utils_AstUtil;
var Include_1 = _src_class_Include;
var BaseParser_1 = _src_handlers_base_BaseParser;
var atma_utils_1 = require("atma-utils");
var CommonJsParser = /** @class */ (function (_super) {
    tslib_1.__extends(CommonJsParser, _super);
    function CommonJsParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonJsParser.prototype.getDependencies = function (ast, ownerResource) {
        var _this = this;
        var info = {
            dependencies: []
        };
        AstUtil_1.AstUtil.each(ast, AstUtil_1.AstUtil.is.commonJsFunction, function (node, descend) {
            var _a;
            var scope = node.scope || ast;
            var deps = _this._process(node, scope);
            if (deps) {
                (_a = info.dependencies).push.apply(_a, deps);
            }
            return true;
        });
        info.dependencies.forEach(function (x) { return x.module = 'commonjs'; });
        return new atma_utils_1.class_Dfr().resolve(info);
    };
    CommonJsParser.prototype._process = function (node, scope) {
        if (node.args.length !== 1) {
            return null;
        }
        var args = AstUtil_1.AstUtil.getArguments(node.args, scope);
        var include = new Include_1.Include();
        var path = args[0];
        if (typeof path !== 'string') {
            throw new Error('Path should be a string: ' + path);
        }
        if (this._isNodeJsNative(path)) {
            //@TODO: Should we provide the shims for browser builds?
            return null;
        }
        var groups = Include_1.Include.groupByType([path], this.solution.opts);
        for (var type in groups) {
            include[type].apply(include, groups[type]);
        }
        var includes = include.includes;
        includes.forEach(function (x, i) {
            var arg = node.args[i];
            x.pos = arg.start.pos;
        });
        return include.includes;
    };
    CommonJsParser.prototype._isNodeJsNative = function (path) {
        return false;
    };
    return CommonJsParser;
}(BaseParser_1.BaseParser));
exports.CommonJsParser = CommonJsParser;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=CommonJsParser.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_common_js_CommonJsParser) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_common_js_CommonJsParser, module.exports);
						return;
					}
					_src_handlers_script_common_js_CommonJsParser = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_common_js_CommonJsRewriter;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseRewriter_1 = _src_handlers_base_BaseRewriter;
var CommonJsRewriter = /** @class */ (function (_super) {
    tslib_1.__extends(CommonJsRewriter, _super);
    function CommonJsRewriter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonJsRewriter.prototype.rewritePartial = function (content, ownerResource) {
    };
    CommonJsRewriter.prototype.rewriteResource = function (resource) {
    };
    CommonJsRewriter.prototype.accepts = function (type) {
        return type === 'mask';
    };
    return CommonJsRewriter;
}(BaseRewriter_1.BaseRewriter));
exports.CommonJsRewriter = CommonJsRewriter;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=CommonJsRewriter.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_common_js_CommonJsRewriter) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_common_js_CommonJsRewriter, module.exports);
						return;
					}
					_src_handlers_script_common_js_CommonJsRewriter = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_common_js_templates_Templates;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var global_1 = _src_global;
exports.Templates = {
    Module: "\n// source ./Module.js\n__register(\"%MODULE_PATH%\", function(require, module, exports, __filename, __dirname){\n\t%MODULE%\n});\n// end:source ./Module.js\n",
    ModuleSimplified: "\n// source ./ModuleSimplified.js\nvar %VAR_ID%;\n(function () {\n    // ensure AMD is not active for the model, so that any UMD exports as commonjs\n    var define = null;\n\tvar exports = {};\n\tvar module = { exports: exports };\n\t%MODULE%;\n\n\tfunction isObject(x) {\n\t\treturn x != null && typeof x === 'object' && x.constructor === Object;\n\t}\n\tif (isObject(%VAR_ID%) && isObject(module.exports)) {\n\t\tObject.assign(%VAR_ID%, module.exports);\n\t\treturn;\n\t}\n\t%VAR_ID% = module.exports;\n}());\n// end:source ./ModuleSimplified.js\n",
    Header: "\n// source ./Header.js\nvar __register, __require, require;\n\n(function(){\n\n\t// source ./path.js\n\tvar path_getDir,\n\t\tpath_resolveCurrent,\n\t\tpath_normalize,\n\t\tpath_resolveUrl,\n\t\tpath_combine\t\n\t\t;\n\t(function(){\n\t\tvar isNodeJS = typeof process !== 'undefined' \n\t\t\t&& typeof window === 'undefined' \n\t\t\t&& typeof navigator === 'undefined';\n\t\n\t\tpath_getDir = function(path) {\n\t\t\treturn path.substring(0, path.lastIndexOf('/') + 1);\n\t\t};\n\t\n\t\t(function(){\n\t\t\tvar current_;\t\t\n\t\t\tif (isNodeJS === false) {\n\t\t\t\tpath_resolveCurrent = function(){\n\t\t\t\t\tif (current_ != null) return current_;\n\t\n\t\t\t\t\tvar fn = 'baseURI' in window.document\n\t\t\t\t\t\t\t? fromBase\n\t\t\t\t\t\t\t: fromLocation;\n\t\t\t\t\treturn (current_ = path_sliceFilename(fn()));\n\t\t\t\t};\n\t\t\t\tfunction fromBase() {\n\t\t\t\t\tvar path = window.document.baseURI;\n\t\t\t\t\tvar i = path.indexOf('?');\n\t\t\t\t\treturn i === -1 ? path : path.substring(0, i);\n\t\t\t\t}\n\t\t\t\tfunction fromLocation() {\n\t\t\t\t\treturn window.location.origin + window.location.pathname;\n\t\t\t\t}\n\t\t\t}\n\t\t\telse {\n\t\t\t\n\t\t\t\tpath_resolveCurrent = function(){\n\t\t\t\t\tif (current_ != null) return current_;\n\t\t\t\t\treturn (current_ = path_win32Normalize(__dirname));\n\t\t\t\t};\n\t\t\t}\n\t\t}());\n\t\n\t\n\t\tpath_normalize = function(path) {\n\t\t\tvar path_ = path\n\t\t\t\t.replace(new RegExp(\"\\\\\\\\\", \"g\"), '/')\n\t\t\t\t// remove double slashes, but not near protocol\n\t\t\t\t.replace(new RegExp(\"([^:\\\\/])\\\\/{2,}\", \"g\"), '$1/')\n\t\t\t\t// './xx' to relative string\n\t\t\t\t.replace(new RegExp(\"^\\\\.\\\\/\"), '')\n\t\t\t\t// join 'xx/./xx'\n\t\t\t\t.replace(new RegExp(\"\\\\/\\\\.\\\\//\", \"g\"), '/')\n\t\t\t\t;\n\t\t\tpath_ = path_collapse(path_);\t\t\n\t\t\treturn path_;\n\t\t};\n\t\tpath_resolveUrl = function(path, location) {\n\t\t\tif (/\\.\\w+$/.test(path) === false) {\n\t\t\t\tpath += '.js';\n\t\t\t}\n\t\t\tvar url = path_normalize(path);\n\t\t\tif (url[0] === '/') {\n\t\t\t\turl = path_combine(path_resolveCurrent(), url);\n\t\t\t} else if (rgx_PROTOCOL.test(url) === false) {\n\t\t\t\turl = path_normalize(path_combine(location || path_resolveCurrent(), url));\n\t\t\t}\n\t\t\tif (rgx_PROTOCOL.test(url) === false) {\n\t\t\t\turl = 'file://' + url;\n\t\t\t}\n\t\t\treturn url;\n\t\t};\n\t\t\n\t\tpath_combine = function() {\n\t\t\tvar out = '',\n\t\t\t\timax = arguments.length,\n\t\t\t\ti = -1, x;\n\t\t\twhile ( ++i < imax ){\n\t\t\t\tx = arguments[i];\n\t\t\t\tif (!x)  continue;\n\t\n\t\t\t\tx = path_normalize(x);\n\t\t\t\tif (out === '') {\n\t\t\t\t\tout = x;\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\t\t\t\tif (out[out.length - 1] !== '/') {\n\t\t\t\t\tout += '/'\n\t\t\t\t}\n\t\t\t\tif (x[0] === '/') {\n\t\t\t\t\tx = x.substring(1);\n\t\t\t\t}\n\t\t\t\tout += x;\n\t\t\t}\n\t\t\treturn path_collapse(out);\n\t\t};\n\t\n\t\tvar rgx_PROTOCOL = /^(file|https?):/i,\n\t\t\trgx_SUB_DIR  = new RegExp(\"[^\\\\/\\\\.]+/\\\\.\\\\.\\\\/\"),\n\t\t\trgx_FILENAME = new RegExp(\"\\\\/[^\\\\/]+\\\\.\\\\w+(\\\\?.*)?(#.*)?$\"),\n\t\t\trgx_EXT      = new RegExp(\"\\\\.(\\\\w+)$\"),\n\t\t\trgx_win32Drive = new RegExp(\"(^\\\\/?\\\\w{1}:)(\\\\/|$)\")\n\t\t\t;\n\t\n\t\tfunction path_win32Normalize (path){\n\t\t\tpath = path_normalize(path);\n\t\t\tif (path.substring(0, 5) === 'file:')\n\t\t\t\treturn path;\n\t\n\t\t\treturn 'file://' + path;\n\t\t}\n\t\n\t\tfunction path_collapse(url_) {\n\t\t\tvar url = url_;\n\t\t\twhile (rgx_SUB_DIR.test(url)) {\n\t\t\t\turl = url.replace(rgx_SUB_DIR, '');\n\t\t\t}\n\t\t\treturn url;\n\t\t}\n\t\tfunction path_ensureTrailingSlash(path) {\n\t\t\tif (path.charCodeAt(path.length - 1) === 47 /* / */)\n\t\t\t\treturn path;\n\t\n\t\t\treturn path + '/';\n\t\t}\n\t\tfunction path_sliceFilename(path) {\n\t\t\treturn path_ensureTrailingSlash(path.replace(rgx_FILENAME, ''));\n\t\t}\n\t\n\t}());\n\t\n\t// end:source ./path.js\n\n\tvar __global = typeof global !== 'undefined' && global ? global : window;\n\tvar __nativeRequire = __global.require;\n\tvar __originalRequire = function (path_) {\n\t\tvar location = this.location;\n\t\tvar path = path_resolveUrl(path_, location);\n\n\t\tif (modules[path]) {\n\t\t\treturn modules[path].runOnce();\n\t\t}\n\n\t\treturn __nativeRequire(path_);\n\t};\n\n\t__register = function (path, factory) {\n\t\tvar filename = path_resolveUrl(path);\t\n\t\tmodules[filename] = new Module(filename, factory);\t\t\t\n\t};\n\n\t__require =__originalRequire.bind({ location: path_getDir(path_resolveUrl('%ROOT_DIR%')) });\n\n\tvar modules = {};\n\tvar Module = function(filename, factory){\t\n\t\tthis.filename = filename;\n\t\tthis.dirname = path_getDir(filename);\n\t\tthis.factory = factory;\n\t\tthis.exports = null;\n\t};\n\tModule.prototype.runOnce = function(){\n\t\tif (this.exports != null) {\n\t\t\treturn this.exports;\n\t\t}\n\t\tvar require = __originalRequire.bind({ \n\t\t\tlocation: this.dirname \n\t\t});\n\t\tthis.exports = {};\n\t\tthis.factory(\n\t\t\trequire, \n\t\t\tthis, \n\t\t\tthis.exports, \n\t\t\tthis.filename, \n\t\t\tthis.dirname\n\t\t);\n\t\treturn this.exports;\n\t};\n\t\n\trequire = __require;\n\n\tif (__nativeRequire == null) {\n\t\t__global.require = __require;\n\t}\n}());\n// end:source ./Header.js\n",
    RootModule: "\n// source ./RootModule.js\n(function(){\n\t\n\t%BUNDLE%\n\n}());\n// end:source ./RootModule.js\n",
    UMD: "\n// source ./UMD.js\n(function (factory) {\n\n    var _name = '%NAME%',\n        _global = typeof window === 'undefined' ? global : window,\n        _module = {\n            exports: {}\n        };\n\n    factory(_module, _module.exports, _global);\n\n    if (typeof module === 'object' && module.exports) {\n        module.exports = _module.exports;\n        return;\n    }\n\n    if (typeof define === 'function' && define.amd) {\n        define([], function () {\n            return _module.exports;\n        });\n        return;\n    }\n    \n    if (_name) {\n        _global[_name] = _module.exports;\n    }\n\n}(function (module, exports, global) {\n\n    %MODULE%\n\n}));\n\n// end:source ./UMD.js\n",
    Style: "\n// source ./Style.js\n// %url%\n(function (d) {\n    if (d == null) {\n        return;\n    }\n    var s = d.createElement('style');\n    s.textContent = '%body%';\n    (d.body || d.head).appendChild(s);\n}(typeof document === 'undefined' ? null : document));\n// end:source ./Style.js\n",
    Mask: "\n// source ./Mask.js\n//%url%\nmask.define(\"%body%\");\n// end:source ./Mask.js\n",
    load: function (path) {
        var template = global_1.io.File.read(path);
        if (!template) {
            throw new Error("Custom module wrapper not found: " + path);
        }
        return template;
    }
};
//# sourceMappingURL=Templates.js.map
//# sourceMappingURL=Templates.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_common_js_templates_Templates) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_common_js_templates_Templates, module.exports);
						return;
					}
					_src_handlers_script_common_js_templates_Templates = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_common_js_CommonJsBuilderSimplified;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var Resource_1 = _src_class_Resource;
var Templates_1 = _src_handlers_script_common_js_templates_Templates;
exports.CommonJsBuilderSimplified = {
    wrapModule: function (resource) {
        var varId = getVarId(resource);
        var content = resource.content;
        content = replaceWithVarIds(content, resource, this.solution);
        content = Templates_1.Templates
            .ModuleSimplified
            .replace(/%VAR_ID%/g, function () { return varId; })
            .replace(/%MODULE%/g, function () { return content; });
        var opts = this.solution.iteration;
        if (opts.commonjs == null) {
            opts.commonjs = {
                addHeading: true,
                hasHeading: false
            };
        }
        ;
        if (opts.commonjs.hasHeading === false && opts.commonjs.addHeading === true) {
            opts.commonjs.hasHeading = true;
            content = this.getHeaderContent() + content;
        }
        return content;
    },
    getRootContent: function (root) {
        var rootInput = this.solution.outputResources.rootInput, content = replaceWithVarIds(root.content, rootInput, this.solution);
        return content;
    },
    getHeaderContent: function () {
        var resources = this
            .solution
            .outputResources
            .items
            .map(function (x) { return x.resources; })
            .reduce(function (aggr, x) { return aggr.concat(x); }, []);
        return getModuleVars(resources);
    }
};
function replaceWithVarIds(content, resource, solution) {
    var rgx_REQUIRE = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
    return content.replace(rgx_REQUIRE, function (full, path) {
        var res = new Resource_1.Resource({ url: path, type: 'js' }, resource, solution);
        var current = resource.resources.find(function (x) { return x.url === res.url; });
        if (current == null) {
            return full;
        }
        return getVarId(current);
    });
}
function getVarId(resource) {
    var str = resource.url.replace(/\.\w+$/, '');
    return str.replace(/[^\w\d]/g, '_');
}
function getModuleVars(resources) {
    return resources.map(getVarId).sort().map(function (x) { return "var " + x + " = {};"; }).join('\n') + '\n';
}
//# sourceMappingURL=api.js.map
//# sourceMappingURL=CommonJsBuilderSimplified.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_common_js_CommonJsBuilderSimplified) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_common_js_CommonJsBuilderSimplified, module.exports);
						return;
					}
					_src_handlers_script_common_js_CommonJsBuilderSimplified = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_base_BaseScriptBuilder;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseBuilder_1 = _src_handlers_base_BaseBuilder;
var BaseScriptBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(BaseScriptBuilder, _super);
    function BaseScriptBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** When a module has no js script, only other resource imports.
     *  You may want to add some resource registration code
     */
    BaseScriptBuilder.prototype.wrapScriptlessModule = function (otherOutputItems) {
        return '';
    };
    BaseScriptBuilder.prototype.isMainBuilder = function (solution) {
        return false;
    };
    BaseScriptBuilder.prototype.createModule = function (outputItem, otherOutputItems) {
        throw new Error("Method not implemented.");
    };
    BaseScriptBuilder.prototype.wrapModule = function (resource, outputItem, otherOutputItems) {
        if (outputItem === void 0) { outputItem = null; }
        if (otherOutputItems === void 0) { otherOutputItems = null; }
        throw Error('Not implemented');
    };
    BaseScriptBuilder.prototype.buildRoot = function (resource, dependencies) {
        throw Error('Not implemented');
    };
    return BaseScriptBuilder;
}(BaseBuilder_1.BaseBuilder));
exports.BaseScriptBuilder = BaseScriptBuilder;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=BaseScriptBuilder.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_base_BaseScriptBuilder) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_base_BaseScriptBuilder, module.exports);
						return;
					}
					_src_handlers_script_base_BaseScriptBuilder = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_utils_template;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var atma_utils_1 = require("atma-utils");
function template_interpolate(template, model) {
    template = template.replace(/%([\w\.\d]+)%/g, function (full, property) {
        return atma_utils_1.obj_getProperty(model, property);
    });
    return template;
}
exports.template_interpolate = template_interpolate;
function template_stringifyContent(str) {
    return str
        .replace(/[\n]/g, '\\n')
        .replace(/[\r]/g, '')
        .replace(/["]/g, '\\"');
}
exports.template_stringifyContent = template_stringifyContent;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=template.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_utils_template) && isObject(module.exports)) {
						Object.assign(_src_utils_template, module.exports);
						return;
					}
					_src_utils_template = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_common_js_ModuleWrapper;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var Templates_1 = _src_handlers_script_common_js_templates_Templates;
var ModuleWrapper = /** @class */ (function () {
    function ModuleWrapper(solution) {
        this.solution = solution;
    }
    ModuleWrapper.prototype.wrap = function (body) {
        var wrapper = this.solution.opts.package.moduleWrapper;
        switch (wrapper) {
            case 'iif':
                body = this.wrapWithIIF(body);
                break;
            case 'umd':
                body = this.wrapWithUMD(body);
                break;
            case 'custom':
                body = this.wrapWithCustom(body);
                break;
            case 'script':
                break;
            default:
                throw new Error('Uknown module wrapper: ' + wrapper);
        }
        return body;
    };
    ModuleWrapper.prototype.wrapWithIIF = function (body) {
        return Templates_1.Templates
            .RootModule
            .replace('%BUNDLE%', function () { return body; });
    };
    ModuleWrapper.prototype.wrapWithUMD = function (body) {
        var opts = this.solution.opts.package;
        var name = opts.moduleName || '';
        return Templates_1.Templates
            .UMD
            .replace('%MODULE%', function () { return body; })
            .replace('%NAME%', function () { return name; });
    };
    ModuleWrapper.prototype.wrapWithCustom = function (body) {
        var opts = this.solution.opts.package;
        var template = Templates_1.Templates.load(opts.moduleWrapperCustomPath);
        return template
            .replace('/**MODULE**/', function () { return body; });
    };
    return ModuleWrapper;
}());
exports.ModuleWrapper = ModuleWrapper;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=ModuleWrapper.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_common_js_ModuleWrapper) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_common_js_ModuleWrapper, module.exports);
						return;
					}
					_src_handlers_script_common_js_ModuleWrapper = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_common_js_CommonJsBuilder;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var CommonJsBuilderSimplified_1 = _src_handlers_script_common_js_CommonJsBuilderSimplified;
var Templates_1 = _src_handlers_script_common_js_templates_Templates;
var BaseScriptBuilder_1 = _src_handlers_script_base_BaseScriptBuilder;
var template_1 = _src_utils_template;
var ModuleWrapper_1 = _src_handlers_script_common_js_ModuleWrapper;
var CommonJsBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(CommonJsBuilder, _super);
    function CommonJsBuilder(solution, handler) {
        var _this = _super.call(this, solution, handler) || this;
        _this.solution = solution;
        _this.handler = handler;
        var opts = _this.solution.opts.package.commonjs;
        if (opts && opts.output === 'simplified') {
            _this.wrapModule = CommonJsBuilderSimplified_1.CommonJsBuilderSimplified.wrapModule;
            _this.getRootContent = CommonJsBuilderSimplified_1.CommonJsBuilderSimplified.getRootContent;
            _this.getHeaderContent = CommonJsBuilderSimplified_1.CommonJsBuilderSimplified.getHeaderContent;
        }
        return _this;
    }
    CommonJsBuilder.prototype.accepts = function (resource) {
        if (resource.type !== 'js') {
            return false;
        }
        var module = resource.getModule();
        if (module == null || module === 'root') {
            module = this.solution.opts.package.module;
        }
        return module === 'commonjs';
    };
    CommonJsBuilder.prototype.wrapModule = function (resource) {
        var opts = this.solution.iteration;
        if (opts.commonjs == null) {
            opts.commonjs = {
                addHeading: true,
                hasHeading: false
            };
        }
        ;
        var body = '';
        if (opts.commonjs.hasHeading === false && opts.commonjs.addHeading === true) {
            opts.commonjs.hasHeading = true;
            body = this.getHeaderContent();
        }
        var url = resource.url, content = resource.content;
        var module = Templates_1.Templates
            .Module
            .replace('%MODULE_PATH%', function () { return url; })
            .replace('%MODULE%', function () { return content; });
        return body + module;
    };
    CommonJsBuilder.prototype.getHeaderContent = function () {
        var mainUrl = this.solution.outputResources.rootInput.url;
        return Templates_1.Templates
            .Header
            .replace('%ROOT_DIR%', function () { return mainUrl; });
    };
    CommonJsBuilder.prototype.buildRoot = function (root, outputDependencies) {
        outputDependencies.forEach(function (x) { return x.embed = true; });
        var content = this.getRootContent(root, outputDependencies);
        var body = outputDependencies
            .map(function (x) {
            var content = x.content;
            if (x.type === 'css') {
                content = template_1.template_interpolate(Templates_1.Templates.Style, { body: template_1.template_stringifyContent(content), url: x.url });
            }
            if (x.type === 'mask') {
                content = template_1.template_interpolate(Templates_1.Templates.Mask, { body: template_1.template_stringifyContent(content), url: x.url });
            }
            return content;
        })
            .concat([content])
            .join('\n');
        var wrapper = new ModuleWrapper_1.ModuleWrapper(this.solution);
        root.content = wrapper.wrap(body);
    };
    CommonJsBuilder.prototype.getRootContent = function (root, outputDependencies) {
        return root.content;
    };
    return CommonJsBuilder;
}(BaseScriptBuilder_1.BaseScriptBuilder));
exports.CommonJsBuilder = CommonJsBuilder;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=CommonJsBuilder.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_common_js_CommonJsBuilder) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_common_js_CommonJsBuilder, module.exports);
						return;
					}
					_src_handlers_script_common_js_CommonJsBuilder = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_common_js_CommonJsPathResolver;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BasePathResolver_1 = _src_handlers_base_BasePathResolver;
var path_1 = _src_utils_path;
var global_1 = _src_global;
var CommonJsPathResolver = /** @class */ (function (_super) {
    tslib_1.__extends(CommonJsPathResolver, _super);
    function CommonJsPathResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonJsPathResolver.prototype.accepts = function (includeData) {
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
    };
    CommonJsPathResolver.prototype.resolve = function (includeData, parentResource) {
        var filename = nodeModuleResolve(includeData.url, parentResource.directory);
        if (filename) {
            var url = this.solution.opts.toAppUrl(filename);
            this.solution.opts.mappings[includeData.url] = url;
        }
        return filename;
    };
    return CommonJsPathResolver;
}(BasePathResolver_1.BasePathResolver));
exports.CommonJsPathResolver = CommonJsPathResolver;
;
var nodeCoreModules = [
    'assert', 'buffer', 'child_process', 'cluster', 'console', 'constants',
    'crypto', 'dgram', 'dns', 'domain', 'events', 'fs', 'http', 'https', 'module', 'net', 'os', 'path',
    'process', 'punycode', 'querystring', 'readline', 'repl', 'stream', 'string_decoder', 'sys', 'timers',
    'tls', 'tty', 'url', 'util', 'vm', 'zlib'
];
function nodeModuleResolve(path, location_) {
    var location = location_.replace(/[\\\/]+$/, '');
    var name = /^([\w\-]+)/.exec(path)[0];
    var resource = path.substring(name.length + 1);
    if (resource && hasExt(resource) === false) {
        resource += '.js';
    }
    var current = location;
    var root_ = current + '/node_modules/' + name + '/';
    while (true) {
        var nodeModules = path_1.path_combine(current, '/node_modules/' + name + '/');
        var pckg = nodeModules + 'package.json';
        if (global_1.io.File.exists(pckg) === false) {
            var next = current.replace(/[^\/\\]+[\/\\]?$/, '');
            if (next === current) {
                return root_ + 'package.json';
            }
            current = next;
            continue;
        }
        var json = global_1.io.File.read(pckg);
        if (typeof json === 'string') {
            json = JSON.parse(json);
        }
        if (resource) {
            return nodeModules + resource;
        }
        console.log(json.main, '>', path_1.path_combine(nodeModules, json.main));
        if (json.main) {
            return path_1.path_combine(nodeModules, json.main);
        }
        return nodeModules + 'index.js';
    }
}
function hasExt(path) {
    return /\.[\w]{1,8}($|\?)/.test(path);
}
//# sourceMappingURL=api.js.map
//# sourceMappingURL=CommonJsPathResolver.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_common_js_CommonJsPathResolver) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_common_js_CommonJsPathResolver, module.exports);
						return;
					}
					_src_handlers_script_common_js_CommonJsPathResolver = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_common_js_CommonJsHandler;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var CommonJsParser_1 = _src_handlers_script_common_js_CommonJsParser;
var CommonJsRewriter_1 = _src_handlers_script_common_js_CommonJsRewriter;
var CommonJsBuilder_1 = _src_handlers_script_common_js_CommonJsBuilder;
var CommonJsPathResolver_1 = _src_handlers_script_common_js_CommonJsPathResolver;
var BaseHandler_1 = _src_handlers_base_BaseHandler;
var CommonJsHandler = /** @class */ (function (_super) {
    tslib_1.__extends(CommonJsHandler, _super);
    function CommonJsHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonJsHandler.Parser = CommonJsParser_1.CommonJsParser;
    CommonJsHandler.Rewriter = CommonJsRewriter_1.CommonJsRewriter;
    CommonJsHandler.Builder = CommonJsBuilder_1.CommonJsBuilder;
    CommonJsHandler.PathResolver = CommonJsPathResolver_1.CommonJsPathResolver;
    return CommonJsHandler;
}(BaseHandler_1.BaseHandler));
exports.CommonJsHandler = CommonJsHandler;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=CommonJsHandler.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_common_js_CommonJsHandler) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_common_js_CommonJsHandler, module.exports);
						return;
					}
					_src_handlers_script_common_js_CommonJsHandler = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_amd_js_AmdJsParser;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseParser_1 = _src_handlers_base_BaseParser;
var AstUtil_1 = _src_handlers_script_utils_AstUtil;
var atma_utils_1 = require("atma-utils");
var Include_1 = _src_class_Include;
var AmdJsParser = /** @class */ (function (_super) {
    tslib_1.__extends(AmdJsParser, _super);
    function AmdJsParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AmdJsParser.prototype.getDependencies = function (ast, ownerResource) {
        var _this = this;
        var info = {
            dependencies: []
        };
        AstUtil_1.AstUtil.each(ast, AstUtil_1.AstUtil.is.amdFunction, function (node, descend) {
            var _a;
            var scope = node.scope || ast;
            var deps = _this._process(node, scope);
            if (deps) {
                (_a = info.dependencies).push.apply(_a, deps);
            }
            return true;
        });
        return new atma_utils_1.class_Dfr().resolve(info);
    };
    AmdJsParser.prototype._process = function (node, scope) {
        if (node.args.length < 2) {
            return;
        }
        var args = AstUtil_1.AstUtil.getArguments(node.args, scope);
        var res = new Include_1.Include();
        var dependencies = args.find(function (x) { return Array.isArray(x); });
        if (dependencies == null) {
            return;
        }
        var groups = Include_1.Include.groupByType(dependencies, this.solution.opts);
        for (var type in groups) {
            res[type].apply(res, groups[type]);
        }
        res.includes.forEach(function (x) { return x.module = 'amd'; });
        var ignore = ['exports', 'require'];
        res.includes = res.includes.filter(function (x) { return ignore.indexOf(x.url) === -1; });
        return res.includes;
    };
    return AmdJsParser;
}(BaseParser_1.BaseParser));
exports.AmdJsParser = AmdJsParser;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=AmdJsParser.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_amd_js_AmdJsParser) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_amd_js_AmdJsParser, module.exports);
						return;
					}
					_src_handlers_script_amd_js_AmdJsParser = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_amd_js_AmdJsRewriter;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseRewriter_1 = _src_handlers_base_BaseRewriter;
var AmdJsRewriter = /** @class */ (function (_super) {
    tslib_1.__extends(AmdJsRewriter, _super);
    function AmdJsRewriter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AmdJsRewriter.prototype.rewritePartial = function (content, ownerResource) {
    };
    AmdJsRewriter.prototype.rewriteResource = function (resource) {
    };
    AmdJsRewriter.prototype.accepts = function (type) {
        return type === 'mask';
    };
    return AmdJsRewriter;
}(BaseRewriter_1.BaseRewriter));
exports.AmdJsRewriter = AmdJsRewriter;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=AmdJsRewriter.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_amd_js_AmdJsRewriter) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_amd_js_AmdJsRewriter, module.exports);
						return;
					}
					_src_handlers_script_amd_js_AmdJsRewriter = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_amd_js_AmdJsBuilder;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseScriptBuilder_1 = _src_handlers_script_base_BaseScriptBuilder;
var AmdJsBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(AmdJsBuilder, _super);
    function AmdJsBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AmdJsBuilder.prototype.buildRoot = function (resource, dependencies) {
    };
    AmdJsBuilder.prototype.accepts = function (type) {
        return false;
    };
    return AmdJsBuilder;
}(BaseScriptBuilder_1.BaseScriptBuilder));
exports.AmdJsBuilder = AmdJsBuilder;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=AmdJsBuilder.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_amd_js_AmdJsBuilder) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_amd_js_AmdJsBuilder, module.exports);
						return;
					}
					_src_handlers_script_amd_js_AmdJsBuilder = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_amd_js_AmdJsHandler;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var AmdJsParser_1 = _src_handlers_script_amd_js_AmdJsParser;
var AmdJsRewriter_1 = _src_handlers_script_amd_js_AmdJsRewriter;
var AmdJsBuilder_1 = _src_handlers_script_amd_js_AmdJsBuilder;
var BaseHandler_1 = _src_handlers_base_BaseHandler;
var AmdJsHandler = /** @class */ (function (_super) {
    tslib_1.__extends(AmdJsHandler, _super);
    function AmdJsHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AmdJsHandler.Parser = AmdJsParser_1.AmdJsParser;
    AmdJsHandler.Rewriter = AmdJsRewriter_1.AmdJsRewriter;
    AmdJsHandler.Builder = AmdJsBuilder_1.AmdJsBuilder;
    AmdJsHandler.PathResolver = null;
    return AmdJsHandler;
}(BaseHandler_1.BaseHandler));
exports.AmdJsHandler = AmdJsHandler;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=AmdJsHandler.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_amd_js_AmdJsHandler) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_amd_js_AmdJsHandler, module.exports);
						return;
					}
					_src_handlers_script_amd_js_AmdJsHandler = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_class_ResourceMapping;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var ResourceMapping = /** @class */ (function () {
    function ResourceMapping(resA, resB) {
        this.resA = resA;
        this.resB = resB;
    }
    ResourceMapping.prototype.map = function (resource) {
        var match = true;
        for (var key in this.resA) {
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
        for (var key in this.resB) {
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
    };
    return ResourceMapping;
}());
exports.ResourceMapping = ResourceMapping;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=ResourceMapping.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_class_ResourceMapping) && isObject(module.exports)) {
						Object.assign(_src_class_ResourceMapping, module.exports);
						return;
					}
					_src_class_ResourceMapping = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_include_js_IncludeJsParser;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var AstUtil_1 = _src_handlers_script_utils_AstUtil;
var Include_1 = _src_class_Include;
var ResourceMapping_1 = _src_class_ResourceMapping;
var BaseParser_1 = _src_handlers_base_BaseParser;
var atma_utils_1 = require("atma-utils");
var IncludeJsParser = /** @class */ (function (_super) {
    tslib_1.__extends(IncludeJsParser, _super);
    function IncludeJsParser(solution, handler) {
        var _a;
        var _this = _super.call(this, solution, handler) || this;
        if (_this.solution.opts.package.module === 'includejs') {
            (_a = _this.solution.opts.mappers).push.apply(_a, IncludeJsMappings);
        }
        return _this;
    }
    IncludeJsParser.prototype.getDependencies = function (ast, ownerResource) {
        var _this = this;
        var info = {
            type: null,
            url: null,
            dependencies: [],
            meta: {
                includejs: {
                    hasIncludes: false,
                    hasExports: false,
                    hasResponseObject: false,
                    responseAccessors: null
                }
            }
        };
        AstUtil_1.AstUtil.each(ast, AstUtil_1.AstUtil.is.includeFunction, function (node, descend) {
            function isIncludeSymbolRef(node) {
                return AstUtil_1.AstUtil.is.type(node, 'AST_SymbolRef') && node.name == 'include';
            }
            var scope = AstUtil_1.AstUtil.findNode(node, isIncludeSymbolRef).scope || ast;
            _this._process(info, node, scope);
            return true;
        });
        if (this._getPropertySetter('exports', ast) != null) {
            info.meta.includejs.hasExports = true;
        }
        return new atma_utils_1.class_Dfr().resolve(info);
    };
    IncludeJsParser.prototype._process = function (info, node, scope) {
        var _this = this;
        var _a;
        var arr = [];
        function isIncludeMethodCall(node) {
            return AstUtil_1.AstUtil.is.type(node, 'AST_Call') && node.start.value == 'include';
        }
        ;
        AstUtil_1.AstUtil.each(node, isIncludeMethodCall, function (node) {
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
                        args: AstUtil_1.AstUtil.getArguments(node.args, scope)
                    };
                    if (pckg.args.length > 0) {
                        arr.unshift(pckg);
                    }
                    info.meta.includejs.hasIncludes = true;
                    break;
                case 'done':
                case 'ready':
                    _this._processIncludeCallback(info, node.args && node.args[0]);
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
                    _this.solution.reporter.warn('getIncludes: Unknown function call', node.expression);
                    break;
            }
        });
        var include = new Include_1.Include();
        arr.forEach(function (x) {
            include[x.type].apply(include, x.args);
        });
        (_a = info.dependencies).push.apply(_a, include.includes);
    };
    IncludeJsParser.prototype._processIncludeCallback = function (info, CallbackNode) {
        if (AstUtil_1.AstUtil.is.type(CallbackNode, 'AST_Function') == false) {
            return;
        }
        var meta = info.meta.includejs, args = CallbackNode.argnames, responseObjectName = args.length > 0
            ? args[args.length - 1].name
            : null;
        if (responseObjectName) {
            meta.hasResponseObject = true;
            var names = this._getPropertyAccessors(responseObjectName, CallbackNode);
            if (names) {
                meta.responseAccessors = (meta.responseAccessors || []).concat(names);
            }
        }
    };
    /**
     *	resolve %name%.propertyAccessor
     */
    IncludeJsParser.prototype._getPropertyAccessors = function (name, Fn) {
        var references = [];
        Fn.body.forEach(function (x) {
            function isSymbolName(node) {
                return AstUtil_1.AstUtil.is.type(node, 'AST_SymbolRef') && node.name === name;
            }
            AstUtil_1.AstUtil.each(x, isSymbolName, function (node) {
                var chain = AstUtil_1.AstUtil.getPropertyChain(node, this.stack);
                if (chain) {
                    references.push(chain);
                }
            });
        });
        return references;
    };
    /**
     *	aim to find all **.exports = X
     */
    IncludeJsParser.prototype._getPropertySetter = function (name, Fn) {
        var result = null;
        Fn.body.forEach(function (x) {
            function isPropertyName(node) {
                AstUtil_1.AstUtil.is.type(node, 'AST_Assign') && node.left.property === name;
            }
            AstUtil_1.AstUtil.each(x, isPropertyName, function (node) {
                var arr = ['include', 'module', 'exports'];
                if (arr.indexOf(node.start.value) > -1) {
                    result = node;
                }
            });
        });
        return result;
    };
    return IncludeJsParser;
}(BaseParser_1.BaseParser));
exports.IncludeJsParser = IncludeJsParser;
;
var IncludeJsMappings = [
    new ResourceMapping_1.ResourceMapping({
        asModules: function (arr) { return arr.indexOf('mask') > -1; }
    }, {
        asModules: function (arr) {
            var i = arr.indexOf('mask');
            arr[i] = 'includejs';
            return arr;
        }
    }),
    new ResourceMapping_1.ResourceMapping({
        asModules: function (arr) { return arr.indexOf('amd') > -1; }
    }, {
        asModules: function (arr) {
            var i = arr.indexOf('amd');
            arr[i] = 'includejs';
            return arr;
        }
    }),
    new ResourceMapping_1.ResourceMapping({
        type: 'mask'
    }, {
        type: 'load'
    })
];
//# sourceMappingURL=api.js.map
//# sourceMappingURL=IncludeJsParser.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_include_js_IncludeJsParser) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_include_js_IncludeJsParser, module.exports);
						return;
					}
					_src_handlers_script_include_js_IncludeJsParser = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_include_js_IncludeJsBuilder;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var arr_1 = _src_utils_arr;
var Include_1 = _src_class_Include;
var res_1 = _src_utils_res;
var BaseScriptBuilder_1 = _src_handlers_script_base_BaseScriptBuilder;
var IncludeJsBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(IncludeJsBuilder, _super);
    function IncludeJsBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IncludeJsBuilder.prototype.wrapScriptlessModule = function (otherOutputItems) {
        var _this = this;
        var allResources = arr_1.arr_flattern(otherOutputItems.map(function (x) { return x.resources; }));
        var jsResources = allResources.filter(function (x) { return _this.accepts(x); });
        var cssResources = allResources.filter(function (x) { return x.type === 'css'; });
        var loadResources = allResources.filter(function (x) { return x.type === 'load'; });
        var jsRegister = this._serializeRegister(jsResources, 'js');
        var cssRegister = this._serializeRegister(cssResources, 'css');
        var loadRegister = this._serializeRegister(loadResources, 'load');
        return "\n            " + jsRegister + "\n            " + cssRegister + "\n            " + loadRegister + "\n        ";
    };
    IncludeJsBuilder.prototype.isMainBuilder = function (solution) {
        var KEY = 'includejs';
        var packageInfo = solution.opts.package;
        return packageInfo.module === KEY || packageInfo.moduleName === KEY;
    };
    IncludeJsBuilder.prototype.wrapModule = function (resource, outputItem, otherOutputItems) {
        var opts = this.solution.opts;
        var page = res_1.res_getPage(resource, opts);
        var iteration = this.solution.iteration;
        if (iteration.includejs == null) {
            iteration.includejs = {};
        }
        if (iteration.includejs[page] == null) {
            iteration.includejs[page] = {
                addHeading: true,
                hasHeading: false,
                lastItem: null
            };
        }
        var builderOpts = iteration.includejs[page];
        var body = '';
        if (builderOpts.hasHeading === false && builderOpts.addHeading === true) {
            builderOpts.hasHeading = true;
            body = this._createHeading(builderOpts, resource, outputItem, otherOutputItems);
        }
        var content = resource.content;
        var url = resource.toTargetUrl(this.solution);
        var aliases = resource.aliases == null ? 'null' : '[' + resource.aliases.map(function (x) { return "'" + x + "'"; }).join(',') + ']';
        body += "include.setCurrent({ url: '" + url + "', aliases: " + aliases + " });\n";
        body += content;
        body += "\ninclude.getResourceById('" + url + "', 'js').readystatechanged(3);";
        if (builderOpts.hasHeading && builderOpts.lastItem === resource) {
            body += "\ninclude.resumeStack();";
        }
        return body;
    };
    IncludeJsBuilder.prototype.accepts = function (resource) {
        if (resource.type !== 'js') {
            return false;
        }
        var module = resource.getModule();
        return module === 'includejs';
    };
    IncludeJsBuilder.prototype._createHeading = function (builderOpts, resource, outputItem, otherOutputItems) {
        var _this = this;
        var outputItems = [outputItem].concat(otherOutputItems);
        var allResources = arr_1.arr_flattern(outputItems.map(function (x) { return x.resources; }));
        var jsResources = allResources.filter(function (x) { return _this.accepts(x); });
        var cssResources = allResources.filter(function (x) { return x.type === 'css'; });
        var loadResources = allResources.filter(function (x) { return x.type === 'load'; });
        builderOpts.lastItem = jsResources[jsResources.length - 1];
        var jsRegister = this._serializeRegister(jsResources, 'js');
        var cssRegister = this._serializeRegister(cssResources, 'css');
        var loadRegister = this._serializeRegister(loadResources, 'load');
        var version = this._serializeVersion();
        var config = this._serializeConfig();
        var heading = "\n            " + version + "\n            " + config + "\n            include.pauseStack();\n            " + jsRegister + "\n            " + cssRegister + "\n            " + loadRegister + "\n        ";
        return heading;
    };
    IncludeJsBuilder.prototype._serializeVersion = function () {
        var v = this.solution.opts.version;
        if (!v)
            return '';
        return "include.cfg('version', '" + v + "');";
    };
    IncludeJsBuilder.prototype._serializeConfig = function () {
        var opts = Include_1.Include.getConfig();
        var json = JSON.stringify(opts);
        if (json === '{}')
            return '';
        return "include.cfg(" + json + ");";
    };
    IncludeJsBuilder.prototype._serializeRegister = function (resources, type) {
        var _this = this;
        var _a;
        var paths = resources
            .filter(function (x) { return x.type === type; })
            .map(function (x) {
            return {
                type: type,
                url: x.toTargetUrl(_this.solution)
            };
        });
        if (paths.length === 0) {
            return '';
        }
        var json = JSON.stringify((_a = {},
            _a[type] = paths,
            _a));
        return "\n            include.register(" + json + ");\n        ";
    };
    return IncludeJsBuilder;
}(BaseScriptBuilder_1.BaseScriptBuilder));
exports.IncludeJsBuilder = IncludeJsBuilder;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=IncludeJsBuilder.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_include_js_IncludeJsBuilder) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_include_js_IncludeJsBuilder, module.exports);
						return;
					}
					_src_handlers_script_include_js_IncludeJsBuilder = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_include_js_IncludeJsRewriter;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseRewriter_1 = _src_handlers_base_BaseRewriter;
var IncludeJsRewriter = /** @class */ (function (_super) {
    tslib_1.__extends(IncludeJsRewriter, _super);
    function IncludeJsRewriter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IncludeJsRewriter.prototype.rewritePartial = function (content, ownerResource) {
    };
    IncludeJsRewriter.prototype.rewriteResource = function (resource) {
        if (resource.getModule() === 'global' && resource && resource.meta && resource.meta.includejs && resource.meta.includejs.hasIncludes) {
            resource.asModules = ['includejs'];
        }
    };
    IncludeJsRewriter.prototype.accepts = function (type) {
        return type === 'js';
    };
    return IncludeJsRewriter;
}(BaseRewriter_1.BaseRewriter));
exports.IncludeJsRewriter = IncludeJsRewriter;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=IncludeJsRewriter.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_include_js_IncludeJsRewriter) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_include_js_IncludeJsRewriter, module.exports);
						return;
					}
					_src_handlers_script_include_js_IncludeJsRewriter = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_include_js_IncludeJsHandler;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var Templates_1 = _src_handlers_script_common_js_templates_Templates;
var Include_1 = _src_class_Include;
var IncludeJsParser_1 = _src_handlers_script_include_js_IncludeJsParser;
var IncludeJsBuilder_1 = _src_handlers_script_include_js_IncludeJsBuilder;
var BaseHandler_1 = _src_handlers_base_BaseHandler;
var IncludeJsRewriter_1 = _src_handlers_script_include_js_IncludeJsRewriter;
var IncludeJsHandler = /** @class */ (function (_super) {
    tslib_1.__extends(IncludeJsHandler, _super);
    function IncludeJsHandler(solution) {
        return _super.call(this, solution) || this;
        // if (this.solution.opts.package.module === 'includejs') {
        // 	this.registerMappings_();
        // }
    }
    IncludeJsHandler.prototype.accepts = function (resource) {
        if (resource.type !== 'js') {
            return false;
        }
        var module = resource.getModule();
        if (module == null || module === 'root')
            module = this.solution.opts.package.module;
        return module === 'includejs';
    };
    IncludeJsHandler.prototype.rewriteRoot = function (root, dependencies) {
        dependencies.forEach(function (x) { return x.embed = true; });
        var body = dependencies
            .map(function (x) { return x.content; })
            .concat([root.content])
            .join('\n');
        body = Templates_1.Templates.RootModule.replace('%BUNDLE%', function () { return body; });
        root.content = body;
    };
    IncludeJsHandler.prototype.resolvePath = function (includeData, parent) {
        return Include_1.Include
            .PathResolver
            .resolveBasic(includeData.url, includeData.type, parent);
    };
    IncludeJsHandler.Parser = IncludeJsParser_1.IncludeJsParser;
    IncludeJsHandler.Rewriter = IncludeJsRewriter_1.IncludeJsRewriter;
    IncludeJsHandler.Builder = IncludeJsBuilder_1.IncludeJsBuilder;
    IncludeJsHandler.PathResolver = null;
    return IncludeJsHandler;
}(BaseHandler_1.BaseHandler));
exports.IncludeJsHandler = IncludeJsHandler;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=IncludeJsHandler.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_include_js_IncludeJsHandler) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_include_js_IncludeJsHandler, module.exports);
						return;
					}
					_src_handlers_script_include_js_IncludeJsHandler = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_import_js_utils;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
function u_getNewLine(str, io) {
    var match = /(\r\n)|(\r)|(\n)/.exec(str);
    return (match && match[0]) || io.env.newLine;
}
exports.u_getNewLine = u_getNewLine;
;
function u_getIndent(str) {
    var match = /^[ \t]+/.exec(str);
    return match && match[0] || '';
}
exports.u_getIndent = u_getIndent;
;
function u_makeIndent(str, indent, io) {
    if (!indent || !str)
        return str;
    var newline = u_getNewLine(str, io);
    return str
        .split(newline)
        .map(function (line) { return indent + line; })
        .join(newline);
}
exports.u_makeIndent = u_makeIndent;
;
function u_getFilesFromPath(path, io) {
    var file = new io.File(path);
    if (file.exists() === false) {
        console.error('File not found', file.uri.toLocalFile());
        return [];
    }
    return [file];
}
exports.u_getFilesFromPath = u_getFilesFromPath;
;
function u_readFile(io, file, indent, insertFileName) {
    var content = file.read().toString();
    var newline = u_getNewLine(content, io);
    if (indent) {
        content = content
            .split(newline)
            .map(function (line) { return indent + line; })
            .join(newline);
    }
    if (insertFileName) {
        content = indent
            + '// source '
            + file.uri.file
            + newline
            + content;
    }
    return content;
}
exports.u_readFile = u_readFile;
;
function u_asString(str) {
    str = str
        .replace(/[\n\r]/g, '\\n')
        .replace(/"/g, '\\"');
    return "\"" + str + "\"";
}
exports.u_asString = u_asString;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=utils.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_import_js_utils) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_import_js_utils, module.exports);
						return;
					}
					_src_handlers_script_import_js_utils = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_import_js_Dictionary;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var Dictionary = /** @class */ (function () {
    function Dictionary() {
        this.hash = {};
        this.arr = [];
    }
    Dictionary.prototype.add = function () {
        var arr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arr[_i] = arguments[_i];
        }
        for (var i = 0; i < arr.length; i++) {
            var x = arr[i];
            if (this.hash[x.id] != null) {
                continue;
            }
            this.hash[x.id] = x;
            this.arr.push(x);
        }
    };
    Dictionary.prototype.insert = function (x, i) {
        if (this.hash[x.id] != null) {
            this.remove(x);
        }
        this.hash[x.id] = x;
        this.arr.splice(i, 0, x);
    };
    Dictionary.prototype.has = function (x) {
        return this.hash[x.id] != null;
    };
    Dictionary.prototype.indexOf = function (x) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].id === x.id) {
                return i;
            }
        }
        return -1;
    };
    Dictionary.prototype.remove = function (x) {
        delete this.hash[x.id];
        var i = this.arr.findIndex(function (module) { return module.id === x.id; });
        this.arr.splice(i, 1);
    };
    Dictionary.prototype.removeByFn = function (fn) {
        var handled = new Dictionary();
        while (true) {
            var i = -1, length = this.arr.length;
            while (++i < length) {
                var x = this.arr[i];
                if (handled.has(x)) {
                    continue;
                }
                handled.add(x);
                if (fn(x)) {
                    this.arr.splice(i, 1);
                    delete this.hash[x.id];
                }
                break;
            }
            if (i === length) {
                break;
            }
        }
    };
    Dictionary.prototype.forEach = function (fn) {
        var handled = new Dictionary();
        while (true) {
            var i = -1, length = this.arr.length;
            while (++i < length) {
                var x = this.arr[i];
                if (handled.has(x)) {
                    continue;
                }
                handled.add(x);
                fn(x, i);
                break;
            }
            if (i === length) {
                break;
            }
        }
    };
    return Dictionary;
}());
exports.Dictionary = Dictionary;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=Dictionary.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_import_js_Dictionary) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_import_js_Dictionary, module.exports);
						return;
					}
					_src_handlers_script_import_js_Dictionary = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_import_js_String;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var String;
(function (String) {
    function replace(str, i, length, ins) {
        if (ins === void 0) { ins = ''; }
        return str.substring(0, i) + ins + str.substring(i + length);
    }
    String.replace = replace;
})(String = exports.String || (exports.String = {}));
//# sourceMappingURL=api.js.map
//# sourceMappingURL=String.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_import_js_String) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_import_js_String, module.exports);
						return;
					}
					_src_handlers_script_import_js_String = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_import_js_ModuleFile;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var io = require("atma-io");
var utils_1 = _src_handlers_script_import_js_utils;
var Dictionary_1 = _src_handlers_script_import_js_Dictionary;
var String_1 = _src_handlers_script_import_js_String;
var IImporterOptions = /** @class */ (function () {
    function IImporterOptions() {
        this.removeUnusedExports = true;
        this.wrapper = 'iif';
        this.lazy = null;
    }
    return IImporterOptions;
}());
exports.IImporterOptions = IImporterOptions;
var ModuleFile = /** @class */ (function () {
    function ModuleFile(content, file) {
        this.content = content;
        this.file = file;
        this.outer = new Dictionary_1.Dictionary();
        this.scoped = new Dictionary_1.Dictionary();
        this.imports = [];
        this.exports = [];
        this.scopedVars = [];
        this.id = file.uri.toLocalFile();
        this.path = file.uri.toRelativeString(io.env.currentDir);
    }
    ModuleFile.prototype.hasDeep = function (x, ignore, hash) {
        if (hash === void 0) { hash = new Dictionary_1.Dictionary(); }
        function check(arr) {
            for (var i = 0; i < arr.length; i++) {
                var module = arr[i];
                if (module == ignore || hash.has(module)) {
                    continue;
                }
                hash.add(module);
                var has = module.hasDeep(x, ignore, hash);
                if (has) {
                    return true;
                }
            }
            return false;
        }
        if (this.id === x.id) {
            return true;
        }
        return check(this.outer.arr) || check(this.scoped.arr);
    };
    ModuleFile.prototype.getAllModules = function () {
        var dict = new Dictionary_1.Dictionary();
        function add(module) {
            if (dict.has(module)) {
                return;
            }
            dict.add(module);
            module.outer.forEach(add);
            module.scoped.forEach(add);
        }
        add(this);
        return dict.arr;
    };
    ModuleFile.getAllImports = function (modules) {
        var arr = [];
        modules.filter(function (x) { return x.imports != null; }).forEach(function (x) { return arr.push.apply(arr, x.imports); });
        return arr;
        // function read (module: ModuleFile, stack: ModuleFile[] = []): ImportNode[] {
        //     if (stack.includes(module) || module.imports == null) {
        //         return [];
        //     }
        //     stack.push(module);
        //     let arr = [...module.imports];
        //     module.imports.forEach(x => arr.push(...read(x.module, stack)));
        //     return arr;
        // }
        // return read(this);
    };
    ModuleFile.prototype.toScript = function (parents, options, indent) {
        var _this = this;
        if (parents === void 0) { parents = []; }
        if (indent === void 0) { indent = ''; }
        var newLine = utils_1.u_getNewLine(this.content, io);
        var outerContent = this
            .outer
            .arr
            .map(function (x) { return x.toScript(parents.concat([_this]), options); })
            .map(function (x) { return x.replace(/[\s]*$/, ''); })
            .join(newLine);
        var scopedContent = this
            .scoped
            .arr
            .map(function (x) { return x.toScript(parents.concat([_this]), options); })
            .map(function (x) { return x.replace(/[\s]*$/, ''); })
            .join(newLine);
        var scopedRefs = this
            .scopedVars
            .filter(function (x) { return !options.removeUnusedExports || x.dependents.length > 0; })
            .map(function (x) { return "    " + x.ref; })
            .join("," + newLine);
        if (scopedRefs) {
            scopedRefs = String_1.String.replace(scopedRefs, 0, 3, 'var');
            scopedRefs += ';';
            scopedContent = scopedRefs + newLine + scopedContent;
        }
        var content = this.content;
        // normalize exports
        this.exports.reverse().forEach(function (x) {
            if (options.removeUnusedExports && x.dependents.length === 0) {
                var str = content.substring(x.position, x.position + x.length);
                str = str.replace(/\s*export\s*/g, '');
                content = String_1.String.replace(content, x.position, x.length, str);
                return;
            }
            switch (x.type) {
                case 'ref':
                    content = String_1.String.replace(content, x.position, x.length, x.ref);
                    break;
                case 'function':
                    content = String_1.String.replace(content, x.position, x.length, x.ref + " = function ");
                    break;
                case 'named':
                    content = String_1.String.replace(content, x.position, x.length, '');
                    break;
                case 'scoped':
                    if (x.length > 0) {
                        content = String_1.String.replace(content, x.position, x.length, '');
                    }
                    break;
            }
        });
        // remove imports
        this.imports.reverse().forEach(function (x) {
            content = String_1.String.replace(content, x.position, x.length, '');
        });
        // create var declaration
        var externalRefs = '';
        if (this.exports.length > 0) {
            this
                .exports
                .filter(function (x) {
                return x.dependents.length > 0 || options.removeUnusedExports === false;
            })
                .forEach(function (x) {
                /** Remove local scoped var declaration and make it global scoped */
                if (x.type === 'scoped') {
                    var rgx = new RegExp("\\b(var|let|const|function)\\s+" + x.ref);
                    content = content.replace(rgx, x.ref);
                }
                return x;
            });
            externalRefs = this
                .exports
                .reverse()
                .filter(function (x) {
                if (x.builder.movedToOuter) {
                    return false;
                }
                if (options.removeUnusedExports === false) {
                    return true;
                }
                if (x.dependents.length === 0) {
                    console.warn("Module " + _this.id + " has unused export " + x.ref);
                    return false;
                }
                return true;
            })
                .filter(function (x) {
                var exportInOuter = parents
                    .some(function (p) {
                    var parentsExport = p.exports.find(function (e) { return e.hasExport(x.ref); });
                    if (parentsExport == null) {
                        return false;
                    }
                    if (options.removeUnusedExports && parentsExport.dependents.length === 0) {
                        return false;
                    }
                    return true;
                });
                return exportInOuter === false;
            })
                .map(function (x) { return "    " + x.ref; })
                .join("," + newLine);
            if (externalRefs.length > 0) {
                externalRefs = String_1.String.replace(externalRefs, 0, 3, 'var');
                externalRefs += ';';
            }
        }
        var SPACE = '\t';
        var indentScopedContent = "" + utils_1.u_makeIndent(scopedContent || '', SPACE, io);
        var indentContent = "" + utils_1.u_makeIndent(content, SPACE, io);
        var scopeLess = parents.length === 0 && options.wrapper !== 'iif';
        content = [
            "" + outerContent || '',
            "" + externalRefs || '',
            !scopeLess && (indentScopedContent || indentContent) ? "(function(){" : '',
            indentScopedContent,
            indentContent,
            !scopeLess && (indentScopedContent || indentContent) ? "}());" : ''
        ]
            .filter(function (x) { return !!x; })
            .join(newLine);
        return utils_1.u_makeIndent(content, indent, io);
    };
    ModuleFile.prototype.toImportsJson = function () {
        function toJSON(module) {
            var json = {
                id: module.id,
                imports: null
            };
            if (module.imports) {
                json.imports = module.imports.map(function (x) { return toJSON(x.module); });
            }
            return json;
        }
        return toJSON(this);
    };
    ModuleFile.prototype.toModulesJson = function () {
        function toJSON(module) {
            var json = {
                id: module.id,
                outer: module.outer.arr.map(function (x) { return toJSON(x); }),
                scoped: module.scoped.arr.map(function (x) { return toJSON(x); })
            };
            if (json.outer.length === 0) {
                delete json.outer;
            }
            if (json.scoped.length === 0) {
                delete json.scoped;
            }
            return json;
        }
        return toJSON(this);
    };
    return ModuleFile;
}());
exports.ModuleFile = ModuleFile;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=ModuleFile.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_import_js_ModuleFile) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_import_js_ModuleFile, module.exports);
						return;
					}
					_src_handlers_script_import_js_ModuleFile = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_import_js_Parser;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var ModuleFile_1 = _src_handlers_script_import_js_ModuleFile;
var ResourceInfo_1 = _src_class_ResourceInfo;
var Rgx = {
    Imports: {
        full: {
            rgx: /^[ \t]*import\s*['"]([^'"]+)['"][\t ;]*[\r\n]{0,2}/gm,
            map: function (match) {
                var $import = new ResourceInfo_1.ImportNode();
                $import.position = match.index;
                $import.length = match[0].length;
                $import.type = 'full';
                $import.path = match[1];
                return $import;
            }
        },
        refs: {
            rgx: /^[ \t]*import\s*\{([^}]+)}\s*from\s*['"]([^'"]+)['"][\t ;]*[\r\n]{0,2}/gm,
            map: function (match) {
                var $import = new ResourceInfo_1.ImportNode();
                $import.position = match.index;
                $import.length = match[0].length;
                $import.type = 'refs';
                $import.path = match[2];
                $import.refs = match[1].split(',').map(function (x) { return x.trim(); });
                return $import;
            }
        },
        exportAll: {
            rgx: /^[ \t]*export\s+\*\s+from\s*['"]([^'"]+)['"][\t ;]*[\r\n]{0,2}/gm,
            map: function (match) {
                var $import = new ResourceInfo_1.ImportNode();
                $import.position = match.index;
                $import.length = match[0].length;
                $import.type = 'exportAll';
                $import.path = match[1];
                $import.exportAll = true;
                return $import;
            }
        },
        exportRefs: {
            rgx: /^[ \t]*export\s*\{([^}]+)}\s*from\s*['"]([^'"]+)['"][\t ;]*[\r\n]{0,2}/gm,
            map: function (match) {
                var $import = new ResourceInfo_1.ImportNode();
                $import.position = match.index;
                $import.length = match[0].length;
                $import.type = 'exportRefs';
                $import.path = match[2];
                $import.refs = match[1].split(',').map(function (x) { return x.trim(); });
                $import.exportRefs = true;
                return $import;
            }
        }
    },
    Exports: {
        ref: {
            rgx: /^[ \t]*export\s*(const|let|var)\s+([\w\d_$]+)(?=\s*[^\w\d_$;])/gm,
            map: function (match) {
                var $export = new ResourceInfo_1.ExportNode();
                $export.position = match.index;
                $export.length = match[0].length;
                $export.type = 'ref';
                $export.ref = match[2];
                return $export;
            }
        },
        named: {
            rgx: /^[ \t]*export\s*(const|let|var)\s+([\w\d_$]+)(?=\s*[;])/gm,
            map: function (match) {
                var $export = new ResourceInfo_1.ExportNode();
                $export.position = match.index;
                $export.length = match[0].length;
                $export.type = 'named';
                $export.ref = match[2];
                return $export;
            }
        },
        scoped: {
            rgx: /^[ \t]*export\s*\{([^}]+)}\s*;?(?!\s*from)/gm,
            map: function (match) {
                var refs = match[1].split(',').map(function (x) { return x.trim(); });
                var $export = new ResourceInfo_1.ExportNode();
                $export.position = match.index;
                $export.length = match[0].length;
                $export.type = 'scoped';
                $export.ref = refs[0];
                var other = refs.slice(1).map(function (ref) {
                    var $export = new ResourceInfo_1.ExportNode();
                    $export.position = match.index;
                    $export.length = 0;
                    $export.type = 'scoped';
                    $export.ref = ref;
                    return $export;
                });
                return [$export].concat(other);
            }
        },
        "function": {
            rgx: /^[ \t]*export\s*function\s+([\w\d_$]+)/gm,
            map: function (match) {
                var $export = new ResourceInfo_1.ExportNode();
                $export.position = match.index;
                $export.length = match[0].length;
                $export.type = 'function';
                $export.ref = match[1];
                return $export;
            }
        }
    }
};
var Parser = /** @class */ (function () {
    function Parser() {
    }
    Parser.supports = function (content) {
        for (var type in Rgx) {
            for (var key in Rgx[type]) {
                var rgx = Rgx[type][key].rgx;
                rgx.lastIndex = 0;
                if (rgx.test(content)) {
                    return true;
                }
            }
        }
        return false;
    };
    Parser.parse = function (content, file) {
        var _a, _b;
        var module = new ModuleFile_1.ModuleFile(content, file);
        if (Parser.supports(content) === false) {
            return module;
        }
        for (var key in Rgx.Imports) {
            var x = Rgx.Imports[key];
            x.rgx.lastIndex = 0;
            for (var match = x.rgx.exec(content); match != null; match = x.rgx.exec(content)) {
                var result = x.map(match, content);
                if (Array.isArray(result)) {
                    (_a = module.imports).push.apply(_a, result);
                }
                else {
                    module.imports.push(result);
                }
            }
        }
        for (var key in Rgx.Exports) {
            var x = Rgx.Exports[key];
            x.rgx.lastIndex = 0;
            for (var match = x.rgx.exec(content); match != null; match = x.rgx.exec(content)) {
                var result = x.map(match, content);
                if (Array.isArray(result)) {
                    (_b = module.exports).push.apply(_b, result);
                }
                else {
                    module.exports.push(result);
                }
            }
        }
        module.imports.forEach(function (m) { return m.parent = module; });
        module.imports.filter(function (x) { return x.type === 'exportRefs'; }).forEach(function (imp) {
            imp.refs.forEach(function (ref) {
                var exp = new ResourceInfo_1.ExportNode();
                exp.position = 0;
                exp.length = 0;
                exp.ref = ref;
                module.exports.push(exp);
            });
        });
        module.imports.sort(function (a, b) { return a.position < b.position ? -1 : 1; });
        module.exports.sort(function (a, b) { return a.position < b.position ? -1 : 1; });
        return module;
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=Parser.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_import_js_Parser) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_import_js_Parser, module.exports);
						return;
					}
					_src_handlers_script_import_js_Parser = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_import_js_ImportJsParser;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseParser_1 = _src_handlers_base_BaseParser;
var Parser_1 = _src_handlers_script_import_js_Parser;
var io = require("atma-io");
var ResourceInfo_1 = _src_class_ResourceInfo;
var ImportJsParser = /** @class */ (function (_super) {
    tslib_1.__extends(ImportJsParser, _super);
    function ImportJsParser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @TODO: set to false and handle ast in ScriptParser */
        _this.asText = true;
        return _this;
    }
    ImportJsParser.prototype.getDependencies = function (content, ownerResource) {
        if (Parser_1.Parser.supports(content) === false) {
            return null;
        }
        var module = Parser_1.Parser.parse(content, new io.File(ownerResource.filename));
        var deps = module.imports.map(function (imp) {
            var res = new ResourceInfo_1.ResourceInfo;
            res.url = imp.path;
            res.pos = imp.position;
            res.length = imp.length;
            res.module = 'import';
            res["import"] = imp;
            return res;
        });
        return {
            dependencies: deps,
            meta: {
                "import": {
                    imports: module.imports,
                    exports: module.exports
                }
            }
        };
    };
    return ImportJsParser;
}(BaseParser_1.BaseParser));
exports.ImportJsParser = ImportJsParser;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=ImportJsParser.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_import_js_ImportJsParser) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_import_js_ImportJsParser, module.exports);
						return;
					}
					_src_handlers_script_import_js_ImportJsParser = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_import_js_ImportJsRewriter;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseRewriter_1 = _src_handlers_base_BaseRewriter;
var ImportJsRewriter = /** @class */ (function (_super) {
    tslib_1.__extends(ImportJsRewriter, _super);
    function ImportJsRewriter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImportJsRewriter.prototype.rewritePartial = function (content, ownerResource) {
    };
    ImportJsRewriter.prototype.rewriteResource = function (resource) {
    };
    ImportJsRewriter.prototype.accepts = function (type) {
        return type === 'mask';
    };
    return ImportJsRewriter;
}(BaseRewriter_1.BaseRewriter));
exports.ImportJsRewriter = ImportJsRewriter;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=ImportJsRewriter.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_import_js_ImportJsRewriter) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_import_js_ImportJsRewriter, module.exports);
						return;
					}
					_src_handlers_script_import_js_ImportJsRewriter = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_ModuleTree;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var atma_utils_1 = require("atma-utils");
var global_1 = _src_global;
var Dictionary_1 = _src_handlers_script_import_js_Dictionary;
function warnTransModuleChildDependencies(root) {
    var modules = {};
    root
        .getAllModules()
        .filter(function (x) { return /exports\.\w+$/.test(x.path); })
        .map(function (x) { return x.path; })
        .forEach(function (path) {
        var uri = new atma_utils_1.class_Uri(path);
        var local = uri.toLocalFile();
        modules[local] = local;
    });
    var handled = new Dictionary_1.Dictionary();
    check(root);
    function check(m) {
        if (handled.has(m)) {
            return;
        }
        handled.add(m);
        m.imports && m.imports.forEach(function (imp) {
            checkSingle(m, imp);
            if (imp.isCyclic !== true) {
                check(imp.module);
            }
            ;
        });
    }
    function checkSingle(m, imp) {
        if (secondIsSubPath(m.path, imp.module.path)) {
            return;
        }
        var exports = secondHasCommonExports(m.path, imp.module.path);
        if (exports == null || exports.isSubPath) {
            return;
        }
        console.warn("Transmodule import " + imp.module.path + " in " + m.path + ". Should import " + exports.exportPath + " ");
    }
    function secondIsSubPath(a, b) {
        var uriA = new atma_utils_1.class_Uri(a);
        var uriB = new atma_utils_1.class_Uri(b);
        a = uriA.toLocalDir();
        b = uriB.toLocalFile();
        return b.includes(a);
    }
    function secondHasCommonExports(a, b) {
        var FILE = 'exports.ts';
        if (b.endsWith(FILE)) {
            return null;
        }
        var uriA = new atma_utils_1.class_Uri(a);
        var uriB = new atma_utils_1.class_Uri(b);
        var uriExports = null;
        var dir = new atma_utils_1.class_Uri(uriB.toLocalDir());
        var prev = dir.toLocalDir();
        while (uriExports == null) {
            var exp = dir.combine(FILE);
            if (global_1.io.File.exists(exp)) {
                uriExports = exp;
                break;
            }
            dir = dir.cdUp();
            if (dir.toLocalDir() === prev) {
                break;
            }
            prev = dir.toLocalDir();
        }
        if (uriExports == null) {
            return null;
        }
        var local = uriExports.toLocalFile();
        if (local in modules === false) {
            return null;
        }
        return {
            exportPath: local,
            isSubPath: secondIsSubPath(local, a)
        };
    }
}
exports.warnTransModuleChildDependencies = warnTransModuleChildDependencies;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=ModuleTree.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_ModuleTree) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_ModuleTree, module.exports);
						return;
					}
					_src_handlers_script_ModuleTree = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_import_js_Builder;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var io = require("atma-io");
var ModuleFile_1 = _src_handlers_script_import_js_ModuleFile;
var Dictionary_1 = _src_handlers_script_import_js_Dictionary;
var ModuleTree_1 = _src_handlers_script_ModuleTree;
var cache = {};
var Builder;
(function (Builder) {
    function clearCache() {
        cache = {};
    }
    Builder.clearCache = clearCache;
    function getModuleFromResource(resource) {
        if (resource.content == null) {
            throw new Error("Content is no loaded: " + resource.filename);
        }
        var file = new io.File(resource.filename);
        var module = new ModuleFile_1.ModuleFile(resource.content, file);
        if (cache[module.id]) {
            return cache[module.id];
        }
        cache[module.id] = module;
        if (resource.dependencies) {
            var scoped = resource.dependencies.map(function (dep) {
                //let res = new Resource(dep, resource, resource.solution);
                return Builder.getModuleFromResource(dep.resource);
            });
            var scopedDict = new Dictionary_1.Dictionary();
            scopedDict.add.apply(scopedDict, scoped);
            module.scoped = scopedDict;
            module.imports = resource
                .dependencies
                .filter(function (x) { return x["import"] != null; })
                .map(function (dep) {
                var imp = dep["import"];
                imp.module = Builder.getModuleFromResource(dep.resource);
                return imp;
            });
        }
        if (resource.meta["import"] && resource.meta["import"].exports) {
            module.exports = resource.meta["import"].exports;
        }
        return module;
    }
    Builder.getModuleFromResource = getModuleFromResource;
    function build(root, options) {
        if (options === void 0) { options = new ModuleFile_1.IImporterOptions; }
        markLazyImports(root, options);
        markCyclicImports(root);
        ModuleTree_1.warnTransModuleChildDependencies(root);
        moveImportsToScoped(root);
        removeNestedScopedModules(root);
        moveToCommonParent(root);
        moveExportAllImportsToOuter(root);
        distinctOuter(root);
        markUsedExports(root);
        distinct(root);
        return root.toScript([], options);
    }
    Builder.build = build;
})(Builder = exports.Builder || (exports.Builder = {}));
function moveImportsToScoped(module, handled) {
    if (handled === void 0) { handled = new Dictionary_1.Dictionary(); }
    module
        .imports
        .forEach(function (x) {
        if (x.isCyclic === true || handled.has(x.module)) {
            return;
        }
        handled.add(x.module);
        moveImportsToScoped(x.module, handled);
        module.scoped.add(x.module);
    });
}
exports.moveImportsToScoped = moveImportsToScoped;
function removeNestedScopedModules(module, parent, parents, handled) {
    if (parent === void 0) { parent = null; }
    if (parents === void 0) { parents = []; }
    if (handled === void 0) { handled = new Dictionary_1.Dictionary(); }
    if (handled.has(module)) {
        return;
    }
    handled.add(module);
    module.scoped.removeByFn(function (x) {
        var inOuter = parents.some(function (p) { return p.module.outer.has(x); });
        if (inOuter) {
            return true;
        }
        var parentsScope = parents.find(function (p) { return p.module.scoped.has(x); });
        if (parentsScope != null) {
            var imp = module.imports.find(function (x) { return x.module.id === x.module.id; });
            if (imp && imp.isLazy) {
                return true;
            }
            var ancestor = parentsScope.module;
            var foundIndex = ancestor.scoped.indexOf(x);
            var selfIndex = ancestor.scoped.indexOf(parentsScope.child);
            if (foundIndex === -1 || selfIndex === -1) {
                throw new Error("0_o. Parents conflict. Self: " + selfIndex + ". Found: " + foundIndex);
            }
            if (foundIndex > selfIndex) {
                var x_1 = ancestor.scoped.arr[foundIndex];
                ancestor.scoped.arr.splice(foundIndex, 1);
                ancestor.scoped.arr.splice(selfIndex, 0, x_1);
            }
            return true;
        }
    });
    module.scoped.forEach(function (x) { return removeNestedScopedModules(x, module, parents.concat([{ child: x, module: module }]), handled); });
}
function moveToCommonParent(module, parent, parents, handled) {
    if (parent === void 0) { parent = null; }
    if (parents === void 0) { parents = []; }
    if (handled === void 0) { handled = new Dictionary_1.Dictionary(); }
    if (handled.has(module)) {
        return;
    }
    handled.add(module);
    module.scoped.forEach(function (x) {
        var topCommonParent;
        for (var i = parents.length - 1; i > -1; i--) {
            var item = parents[i];
            var p = item.module;
            var hasDeep = p.hasDeep(x, item.child);
            if (hasDeep) {
                topCommonParent = p;
            }
        }
        if (topCommonParent) {
            x.exports.forEach(function (exp) {
                var clone = exp.clone();
                exp.builder.movedToOuter = true;
                clone.position = 0;
                clone.length = 0;
                topCommonParent.scopedVars.push(clone);
            });
            // for (let i = 0; i < topCommonParent.outer.arr.length; i++) {
            //     let child = topCommonParent.outer.arr[i];
            //     if (child.hasDeep(x)) {
            //         topCommonParent.outer.insert(x, i);
            //         return true;
            //     }
            // }
            // for (let i = 0; i < topCommonParent.scoped.arr.length; i++) {
            //     let child = topCommonParent.scoped.arr[i];
            //     if (child.hasDeep(x)) {
            //         topCommonParent.scoped.insert(x, i);
            //         return true;
            //     }
            // }
            // throw new Error('O_o: Child not found');            
            // return true;
        }
        //return false;
    });
    module.scoped.forEach(function (x, i) { return moveToCommonParent(x, module, parents.concat([{ child: x, module: module }]), handled); });
}
function distinctOuter(module, index, parents, handled) {
    if (index === void 0) { index = 0; }
    if (parents === void 0) { parents = []; }
    if (handled === void 0) { handled = new Dictionary_1.Dictionary(); }
    if (handled.has(module)) {
        return;
    }
    handled.add(module);
    module.outer.forEach(function (x, i) { return distinctOuter(x, i, parents.concat([{ index: index, module: module }]), handled); });
    module.outer.removeByFn(function (x) {
        return parents.some(function (p) { return p.module.outer.has(x); });
    });
}
function distinct(module, handled) {
    if (handled === void 0) { handled = new Dictionary_1.Dictionary(); }
    if (handled.has(module)) {
        return;
    }
    handled.add(module);
    module.outer.removeByFn(function (x) {
        if (handled.has(x)) {
            return true;
        }
        distinct(x, handled);
        return false;
    });
    module.scoped.removeByFn(function (x) {
        if (handled.has(x)) {
            console.log('Remove ', x.id);
            return true;
        }
        distinct(x, handled);
        return false;
    });
}
function moveExportAllImportsToOuter(module, handled) {
    if (handled === void 0) { handled = new Dictionary_1.Dictionary(); }
    if (handled.has(module)) {
        return;
    }
    handled.add(module);
    module
        .imports
        .filter(function (imp) { return imp.exportAll && module.scoped.has(imp.module) && imp.isCyclic !== true; })
        .forEach(function (imp) {
        module.outer.add(imp.module);
        module.scoped.remove(imp.module);
    });
    module.scoped.forEach(function (m) {
        moveExportAllImportsToOuter(m, handled);
    });
}
function markUsedExports(module) {
    var modules = module.getAllModules();
    var imports = ModuleFile_1.ModuleFile.getAllImports(modules);
    modules.forEach(function (module) {
        // Search all imports for module
        imports.filter(function (x) { return x.module.id === module.id; }).forEach(function ($import) {
            if ($import.exportAll || $import.refs == null) {
                module.exports.forEach(function (exp) {
                    if (exp.dependents.includes(module) === false) {
                        exp.dependents.push(module);
                    }
                });
                return;
            }
            $import.refs.forEach(function (ref) {
                var exp = module.exports.find(function (x) { return x.hasExport(ref); });
                if (exp == null) {
                    throw new Error("Imported reference " + ref + " in " + $import.parent.id + " is not exported from " + module.id);
                }
                if (exp.dependents.includes(module) === false) {
                    exp.dependents.push(module);
                }
            });
        });
    });
}
function markLazyImports(module, options, parentIds, handled) {
    if (parentIds === void 0) { parentIds = {}; }
    if (handled === void 0) { handled = new Dictionary_1.Dictionary(); }
    var _a;
    if (!options || !options.lazy) {
        return;
    }
    if (handled.has(module)) {
        return;
    }
    handled.add(module);
    var hash = tslib_1.__assign({}, parentIds, (_a = {}, _a[module.id] = 1, _a));
    module.imports.forEach(function (imp) {
        mark(module, imp);
        markLazyImports(imp.module, options, hash, handled);
    });
    function mark(owner, imp) {
        outer: for (var str in options.lazy) {
            var rgx = new RegExp(str);
            if (rgx.test(owner.id)) {
                var paths = options.lazy[str];
                for (var i = 0; i < paths.length; i++) {
                    var rgxPath = new RegExp(paths[i]);
                    if (rgxPath.test(imp.module.id)) {
                        imp.isCyclic = true;
                        imp.isLazy = true;
                        break outer;
                    }
                }
            }
        }
    }
}
function markCyclicImports(module, parentIds, handled) {
    if (parentIds === void 0) { parentIds = {}; }
    if (handled === void 0) { handled = new Dictionary_1.Dictionary(); }
    var _a;
    if (handled.has(module)) {
        return;
    }
    handled.add(module);
    var hash = tslib_1.__assign({}, parentIds, (_a = {}, _a[module.id] = 1, _a));
    module.imports.forEach(function (imp) {
        if (imp.module.id in hash) {
            imp.isCyclic = true;
            return;
        }
        markCyclicImports(imp.module, hash, handled);
    });
}
//# sourceMappingURL=api.js.map
//# sourceMappingURL=Builder.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_import_js_Builder) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_import_js_Builder, module.exports);
						return;
					}
					_src_handlers_script_import_js_Builder = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_import_js_ImportJsBuilder;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseScriptBuilder_1 = _src_handlers_script_base_BaseScriptBuilder;
var Builder_1 = _src_handlers_script_import_js_Builder;
var Templates_1 = _src_handlers_script_common_js_templates_Templates;
var ModuleFile_1 = _src_handlers_script_import_js_ModuleFile;
var ImportJsBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(ImportJsBuilder, _super);
    function ImportJsBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImportJsBuilder.prototype.buildRoot = function (outputRoot, outputDependencies) {
        outputDependencies.forEach(function (x) { return x.embed = true; });
        Builder_1.Builder.clearCache();
        var root = outputRoot.source;
        var module = Builder_1.Builder.getModuleFromResource(root);
        var $package = this.solution.opts.package;
        var options = $package["import"] || new ModuleFile_1.IImporterOptions;
        options.wrapper = $package.moduleWrapper;
        var body = Builder_1.Builder.build(module, options);
        switch (options.wrapper) {
            case 'custom':
                body = this.wrapWithCustom(body);
                break;
            case 'script':
            case 'iif':
                break;
            default:
                throw new Error("Unsupported module wrapper \"" + options.wrapper + "\" for import");
        }
        outputRoot.content = body;
    };
    ImportJsBuilder.prototype.wrapModule = function (resource, outputItem) {
        return resource.content;
    };
    ImportJsBuilder.prototype.accepts = function (resource) {
        if (resource.type !== 'js') {
            return false;
        }
        var module = resource.getModule();
        if (module === 'root' && resource.solution.opts.package.module === 'import') {
            module = 'import';
        }
        return module === 'import';
    };
    ImportJsBuilder.prototype.wrapWithCustom = function (body) {
        var opts = this.solution.opts.package;
        var template = Templates_1.Templates.load(opts.moduleWrapperCustomPath);
        return template
            .replace('/**MODULE**/', function () { return body; });
    };
    return ImportJsBuilder;
}(BaseScriptBuilder_1.BaseScriptBuilder));
exports.ImportJsBuilder = ImportJsBuilder;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=ImportJsBuilder.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_import_js_ImportJsBuilder) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_import_js_ImportJsBuilder, module.exports);
						return;
					}
					_src_handlers_script_import_js_ImportJsBuilder = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_import_js_ImportJsHandler;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseHandler_1 = _src_handlers_base_BaseHandler;
var ImportJsParser_1 = _src_handlers_script_import_js_ImportJsParser;
var ImportJsRewriter_1 = _src_handlers_script_import_js_ImportJsRewriter;
var ImportJsBuilder_1 = _src_handlers_script_import_js_ImportJsBuilder;
var ImportJsHandler = /** @class */ (function (_super) {
    tslib_1.__extends(ImportJsHandler, _super);
    function ImportJsHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImportJsHandler.Parser = ImportJsParser_1.ImportJsParser;
    ImportJsHandler.Rewriter = ImportJsRewriter_1.ImportJsRewriter;
    ImportJsHandler.Builder = ImportJsBuilder_1.ImportJsBuilder;
    ImportJsHandler.PathResolver = null;
    return ImportJsHandler;
}(BaseHandler_1.BaseHandler));
exports.ImportJsHandler = ImportJsHandler;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=ImportJsHandler.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_import_js_ImportJsHandler) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_import_js_ImportJsHandler, module.exports);
						return;
					}
					_src_handlers_script_import_js_ImportJsHandler = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_ScriptParser;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var AstUtil_1 = _src_handlers_script_utils_AstUtil;
var async_1 = _src_utils_async;
var ResourceInfo_1 = _src_class_ResourceInfo;
var arr_1 = _src_utils_arr;
var CommonJsHandler_1 = _src_handlers_script_common_js_CommonJsHandler;
var AmdJsHandler_1 = _src_handlers_script_amd_js_AmdJsHandler;
var IncludeJsHandler_1 = _src_handlers_script_include_js_IncludeJsHandler;
var BaseParser_1 = _src_handlers_base_BaseParser;
var ImportJsHandler_1 = _src_handlers_script_import_js_ImportJsHandler;
var ScriptParser = /** @class */ (function (_super) {
    tslib_1.__extends(ScriptParser, _super);
    function ScriptParser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.parsers = [
            new CommonJsHandler_1.CommonJsHandler.Parser(_this.solution, _this.handler),
            new AmdJsHandler_1.AmdJsHandler.Parser(_this.solution, _this.handler),
            new IncludeJsHandler_1.IncludeJsHandler.Parser(_this.solution, _this.handler),
            new ImportJsHandler_1.ImportJsHandler.Parser(_this.solution, _this.handler),
        ];
        return _this;
    }
    ScriptParser.prototype.getDependencies = function (content, ownerResource) {
        if (!content) {
            throw new Error("Content is undefined for " + ownerResource.filename);
        }
        var opts = {
            filename: ownerResource.filename
        };
        var asTextDfrs = this
            .parsers
            .filter(function (x) { return x.asText === true; })
            .map(function (parser) { return parser.getDependencies(content, ownerResource); });
        var ast;
        try {
            ast = AstUtil_1.AstUtil.parse(content, opts);
        }
        catch (error) {
            if (/^throw\s+(new\s+)?Error/i.test(content)) {
                var error = new Error(content);
                error.filename = ownerResource.filename;
                throw error;
            }
            if (error.filename == null) {
                error.filename = ownerResource.filename;
            }
            return async_1.async_reject(error);
        }
        var dfrs = this
            .parsers
            .filter(function (x) { return x.asText !== true; })
            .map(function (parser) { return parser.getDependencies(ast, ownerResource); });
        dfrs.unshift.apply(dfrs, asTextDfrs);
        return async_1.async_whenAll(dfrs).then(function (results) {
            var arr = arr_1.arr_flattern(results);
            return ResourceInfo_1.ResourceInfo.merge.apply(ResourceInfo_1.ResourceInfo, arr);
        });
    };
    ScriptParser.prototype.accepts = function (type) {
        return type === 'js';
    };
    return ScriptParser;
}(BaseParser_1.BaseParser));
exports.ScriptParser = ScriptParser;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=ScriptParser.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_ScriptParser) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_ScriptParser, module.exports);
						return;
					}
					_src_handlers_script_ScriptParser = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_ScriptRewriter;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var IncludeJsHandler_1 = _src_handlers_script_include_js_IncludeJsHandler;
var BaseRewriter_1 = _src_handlers_base_BaseRewriter;
var ScriptRewriter = /** @class */ (function (_super) {
    tslib_1.__extends(ScriptRewriter, _super);
    function ScriptRewriter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rewriters = [
            new IncludeJsHandler_1.IncludeJsHandler.Rewriter(_this.solution, _this.handler)
        ];
        return _this;
    }
    ScriptRewriter.prototype.rewritePartial = function (content, ownerResource) {
    };
    ScriptRewriter.prototype.rewriteResource = function (resource) {
        this.rewriters.forEach(function (rewriter) {
            rewriter.rewriteResource(resource);
        });
    };
    ScriptRewriter.prototype.accepts = function (type) {
        return type === 'js';
    };
    return ScriptRewriter;
}(BaseRewriter_1.BaseRewriter));
exports.ScriptRewriter = ScriptRewriter;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=ScriptRewriter.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_ScriptRewriter) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_ScriptRewriter, module.exports);
						return;
					}
					_src_handlers_script_ScriptRewriter = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_global_js_GlobalJsParser;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseParser_1 = _src_handlers_base_BaseParser;
var GlobalJsParser = /** @class */ (function (_super) {
    tslib_1.__extends(GlobalJsParser, _super);
    function GlobalJsParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GlobalJsParser.prototype.getDependencies = function (ast, ownerResource) {
        return null;
    };
    return GlobalJsParser;
}(BaseParser_1.BaseParser));
exports.GlobalJsParser = GlobalJsParser;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=GlobalJsParser.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_global_js_GlobalJsParser) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_global_js_GlobalJsParser, module.exports);
						return;
					}
					_src_handlers_script_global_js_GlobalJsParser = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_global_js_GlobalJsRewriter;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseRewriter_1 = _src_handlers_base_BaseRewriter;
var GlobalJsRewriter = /** @class */ (function (_super) {
    tslib_1.__extends(GlobalJsRewriter, _super);
    function GlobalJsRewriter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GlobalJsRewriter.prototype.rewritePartial = function (content, ownerResource) {
    };
    GlobalJsRewriter.prototype.rewriteResource = function (resource) {
    };
    GlobalJsRewriter.prototype.accepts = function (type) {
        return type === 'mask';
    };
    return GlobalJsRewriter;
}(BaseRewriter_1.BaseRewriter));
exports.GlobalJsRewriter = GlobalJsRewriter;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=GlobalJsRewriter.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_global_js_GlobalJsRewriter) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_global_js_GlobalJsRewriter, module.exports);
						return;
					}
					_src_handlers_script_global_js_GlobalJsRewriter = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_global_js_GlobalJsBuilder;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseScriptBuilder_1 = _src_handlers_script_base_BaseScriptBuilder;
var atma_utils_1 = require("atma-utils");
var path_1 = _src_utils_path;
var ModuleWrapper_1 = _src_handlers_script_common_js_ModuleWrapper;
var Templates_1 = _src_handlers_script_common_js_templates_Templates;
var template_1 = _src_utils_template;
var GlobalJsBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(GlobalJsBuilder, _super);
    function GlobalJsBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GlobalJsBuilder.prototype.wrapModule = function (resource, outputItem) {
        var content = resource.content, dependencies = resource.dependencies;
        var offset = 0;
        dependencies && dependencies.filter(function (x) { return x.pos != null && path_1.path_isRelative(x.url); }).forEach(function (dep) {
            var resUrl = new atma_utils_1.class_Uri(resource.url);
            var resDep = new atma_utils_1.class_Uri(dep.url);
            var url = resUrl.combine(resDep).toLocalFile();
            var start = dep.pos + offset + 1;
            var c = content[start - 1];
            var end = content.indexOf(c, start);
            var oldLength = end - start;
            var newLength = url.length;
            content = content.substring(0, start) + url + content.substring(end);
            offset += newLength - oldLength;
        });
        return content;
    };
    GlobalJsBuilder.prototype.buildRoot = function (root, outputDependencies) {
        outputDependencies.forEach(function (x) { return x.embed = true; });
        var content = this.getRootContent(root, outputDependencies);
        var body = outputDependencies
            .map(function (x) {
            var content = x.content;
            if (x.type === 'css') {
                content = template_1.template_interpolate(Templates_1.Templates.Style, { body: template_1.template_stringifyContent(content), url: x.url });
            }
            if (x.type === 'mask') {
                throw new Error('Mask modules are not implemented for global modules');
            }
            return content;
        })
            .concat([content])
            .join('\n');
        var wrapper = new ModuleWrapper_1.ModuleWrapper(this.solution);
        root.content = wrapper.wrap(body);
    };
    GlobalJsBuilder.prototype.getRootContent = function (root, outputDependencies) {
        return root.content;
    };
    GlobalJsBuilder.prototype.accepts = function (resource) {
        if (resource.type !== 'js') {
            return false;
        }
        var module = resource.getModule();
        if (module == null || module === 'root') {
            module = this.solution.opts.package.module;
        }
        return module === 'global';
    };
    return GlobalJsBuilder;
}(BaseScriptBuilder_1.BaseScriptBuilder));
exports.GlobalJsBuilder = GlobalJsBuilder;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=GlobalJsBuilder.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_global_js_GlobalJsBuilder) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_global_js_GlobalJsBuilder, module.exports);
						return;
					}
					_src_handlers_script_global_js_GlobalJsBuilder = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_global_js_GlobalJsHandler;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseHandler_1 = _src_handlers_base_BaseHandler;
var GlobalJsParser_1 = _src_handlers_script_global_js_GlobalJsParser;
var GlobalJsRewriter_1 = _src_handlers_script_global_js_GlobalJsRewriter;
var GlobalJsBuilder_1 = _src_handlers_script_global_js_GlobalJsBuilder;
var GlobalJsHandler = /** @class */ (function (_super) {
    tslib_1.__extends(GlobalJsHandler, _super);
    function GlobalJsHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GlobalJsHandler.Parser = GlobalJsParser_1.GlobalJsParser;
    GlobalJsHandler.Rewriter = GlobalJsRewriter_1.GlobalJsRewriter;
    GlobalJsHandler.Builder = GlobalJsBuilder_1.GlobalJsBuilder;
    GlobalJsHandler.PathResolver = null;
    return GlobalJsHandler;
}(BaseHandler_1.BaseHandler));
exports.GlobalJsHandler = GlobalJsHandler;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=GlobalJsHandler.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_global_js_GlobalJsHandler) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_global_js_GlobalJsHandler, module.exports);
						return;
					}
					_src_handlers_script_global_js_GlobalJsHandler = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_mask_js_MaskJsParser;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseParser_1 = _src_handlers_base_BaseParser;
var MaskJsParser = /** @class */ (function (_super) {
    tslib_1.__extends(MaskJsParser, _super);
    function MaskJsParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaskJsParser.prototype.getDependencies = function (ast, ownerResource) {
        return null;
    };
    return MaskJsParser;
}(BaseParser_1.BaseParser));
exports.MaskJsParser = MaskJsParser;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=MaskJsParser.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_mask_js_MaskJsParser) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_mask_js_MaskJsParser, module.exports);
						return;
					}
					_src_handlers_script_mask_js_MaskJsParser = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_mask_js_MaskJsRewriter;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseRewriter_1 = _src_handlers_base_BaseRewriter;
var MaskJsRewriter = /** @class */ (function (_super) {
    tslib_1.__extends(MaskJsRewriter, _super);
    function MaskJsRewriter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaskJsRewriter.prototype.rewriteRoot = function (resourceInput, resourceOutput) {
    };
    MaskJsRewriter.prototype.rewritePartial = function (content, ownerResource) {
    };
    MaskJsRewriter.prototype.rewriteResource = function (resource) {
    };
    MaskJsRewriter.prototype.accepts = function (type) {
        return type === 'mask';
    };
    return MaskJsRewriter;
}(BaseRewriter_1.BaseRewriter));
exports.MaskJsRewriter = MaskJsRewriter;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=MaskJsRewriter.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_mask_js_MaskJsRewriter) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_mask_js_MaskJsRewriter, module.exports);
						return;
					}
					_src_handlers_script_mask_js_MaskJsRewriter = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_mask_js_MaskJsBuilder;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseScriptBuilder_1 = _src_handlers_script_base_BaseScriptBuilder;
var MaskJsBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(MaskJsBuilder, _super);
    function MaskJsBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaskJsBuilder.prototype.wrapModule = function (resource) {
        return Templates
            .module
            .replace('%URL%', function () { return resource.url; })
            .replace('%CONTENT%', function () { return resource.content; });
    };
    MaskJsBuilder.prototype.accepts = function (resource) {
        return resource.type === 'js' && resource.getModule() === 'mask';
    };
    return MaskJsBuilder;
}(BaseScriptBuilder_1.BaseScriptBuilder));
exports.MaskJsBuilder = MaskJsBuilder;
;
var Templates = {
    module: "\n\tvar module = { exports: {} };\n\t\n\t%CONTENT%\n\n\t;(function(exports, Module){\n\t\tvar endpoint = new Module.Endpoint('%URL%', 'script');\n\t\tModule.registerModule(exports, endpoint);\n\t}(module.exports, mask.Module));\n"
};
//# sourceMappingURL=api.js.map
//# sourceMappingURL=MaskJsBuilder.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_mask_js_MaskJsBuilder) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_mask_js_MaskJsBuilder, module.exports);
						return;
					}
					_src_handlers_script_mask_js_MaskJsBuilder = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_mask_js_MaskJsHandler;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var MaskJsParser_1 = _src_handlers_script_mask_js_MaskJsParser;
var MaskJsRewriter_1 = _src_handlers_script_mask_js_MaskJsRewriter;
var MaskJsBuilder_1 = _src_handlers_script_mask_js_MaskJsBuilder;
var BaseHandler_1 = _src_handlers_base_BaseHandler;
var MaskJsHandler = /** @class */ (function (_super) {
    tslib_1.__extends(MaskJsHandler, _super);
    function MaskJsHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaskJsHandler.Parser = MaskJsParser_1.MaskJsParser;
    MaskJsHandler.Rewriter = MaskJsRewriter_1.MaskJsRewriter;
    MaskJsHandler.Builder = MaskJsBuilder_1.MaskJsBuilder;
    MaskJsHandler.PathResolver = null;
    return MaskJsHandler;
}(BaseHandler_1.BaseHandler));
exports.MaskJsHandler = MaskJsHandler;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=MaskJsHandler.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_mask_js_MaskJsHandler) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_mask_js_MaskJsHandler, module.exports);
						return;
					}
					_src_handlers_script_mask_js_MaskJsHandler = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_ScriptBuilder;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseBuilder_1 = _src_handlers_base_BaseBuilder;
var GlobalJsHandler_1 = _src_handlers_script_global_js_GlobalJsHandler;
var CommonJsHandler_1 = _src_handlers_script_common_js_CommonJsHandler;
var AmdJsHandler_1 = _src_handlers_script_amd_js_AmdJsHandler;
var IncludeJsHandler_1 = _src_handlers_script_include_js_IncludeJsHandler;
var MaskJsHandler_1 = _src_handlers_script_mask_js_MaskJsHandler;
var ImportJsHandler_1 = _src_handlers_script_import_js_ImportJsHandler;
var ScriptBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(ScriptBuilder, _super);
    function ScriptBuilder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.builders = [
            new GlobalJsHandler_1.GlobalJsHandler.Builder(_this.solution, _this.handler),
            new CommonJsHandler_1.CommonJsHandler.Builder(_this.solution, _this.handler),
            new AmdJsHandler_1.AmdJsHandler.Builder(_this.solution, _this.handler),
            new IncludeJsHandler_1.IncludeJsHandler.Builder(_this.solution, _this.handler),
            new MaskJsHandler_1.MaskJsHandler.Builder(_this.solution, _this.handler),
            new ImportJsHandler_1.ImportJsHandler.Builder(_this.solution, _this.handler),
        ];
        return _this;
    }
    ScriptBuilder.prototype.createModule = function (outputItem, otherOutputItems) {
        var _this = this;
        var code = '';
        var resArr = outputItem.resources;
        if (resArr == null || resArr.length === 0) {
            var builder = this.builders.find(function (x) { return x.isMainBuilder(_this.solution); });
            if (builder) {
                code = builder.wrapScriptlessModule(otherOutputItems);
            }
        }
        else {
            var out = resArr.map(function (res) {
                var builder = _this.builders.find(function (x) { return x.accepts(res); });
                if (builder == null)
                    throw new Error('Module Builder not found for ' + res.url);
                return builder.wrapModule(res, outputItem, otherOutputItems);
            });
            code = out.join('\n');
        }
        outputItem.resource.content = code;
    };
    ScriptBuilder.prototype.buildRoot = function (resource, dependencies) {
        var builder = this.builders.find(function (x) { return x.accepts(resource); });
        if (builder == null) {
            throw new Error("Root Builder not found for " + resource.url + " (" + resource.getModule() + ")");
        }
        return builder.buildRoot(resource, dependencies);
    };
    ScriptBuilder.prototype.accepts = function (type) {
        return type === 'js';
    };
    return ScriptBuilder;
}(BaseBuilder_1.BaseBuilder));
exports.ScriptBuilder = ScriptBuilder;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=ScriptBuilder.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_ScriptBuilder) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_ScriptBuilder, module.exports);
						return;
					}
					_src_handlers_script_ScriptBuilder = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_ScriptPathResolver;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var CommonJsHandler_1 = _src_handlers_script_common_js_CommonJsHandler;
var BasePathResolver_1 = _src_handlers_base_BasePathResolver;
var ScriptPathResolver = /** @class */ (function (_super) {
    tslib_1.__extends(ScriptPathResolver, _super);
    function ScriptPathResolver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.resolvers = [
            new CommonJsHandler_1.CommonJsHandler.PathResolver(_this.solution, _this.handler)
        ];
        return _this;
    }
    ScriptPathResolver.prototype.accepts = function (includeData) {
        if (includeData.type !== 'js') {
            return false;
        }
        var resolver = this._getInnerResolver(includeData);
        return resolver != null;
    };
    ScriptPathResolver.prototype.resolve = function (includeData, parentResource) {
        var resolver = this._getInnerResolver(includeData);
        return resolver.resolve(includeData, parentResource);
    };
    ScriptPathResolver.prototype._getInnerResolver = function (includeData) {
        return this.resolvers.find(function (x) { return x.accepts(includeData); });
    };
    return ScriptPathResolver;
}(BasePathResolver_1.BasePathResolver));
exports.ScriptPathResolver = ScriptPathResolver;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=ScriptPathResolver.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_ScriptPathResolver) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_ScriptPathResolver, module.exports);
						return;
					}
					_src_handlers_script_ScriptPathResolver = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_script_ScriptHandler;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var ScriptParser_1 = _src_handlers_script_ScriptParser;
var ScriptRewriter_1 = _src_handlers_script_ScriptRewriter;
var ScriptBuilder_1 = _src_handlers_script_ScriptBuilder;
var ScriptPathResolver_1 = _src_handlers_script_ScriptPathResolver;
var BaseHandler_1 = _src_handlers_base_BaseHandler;
var ScriptHandler = /** @class */ (function (_super) {
    tslib_1.__extends(ScriptHandler, _super);
    function ScriptHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScriptHandler.prototype.accepts = function (type) {
        return type === 'js';
    };
    ScriptHandler.Parser = ScriptParser_1.ScriptParser;
    ScriptHandler.Rewriter = ScriptRewriter_1.ScriptRewriter;
    ScriptHandler.Builder = ScriptBuilder_1.ScriptBuilder;
    ScriptHandler.PathResolver = ScriptPathResolver_1.ScriptPathResolver;
    return ScriptHandler;
}(BaseHandler_1.BaseHandler));
exports.ScriptHandler = ScriptHandler;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=ScriptHandler.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_script_ScriptHandler) && isObject(module.exports)) {
						Object.assign(_src_handlers_script_ScriptHandler, module.exports);
						return;
					}
					_src_handlers_script_ScriptHandler = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_css_CssParser;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseParser_1 = _src_handlers_base_BaseParser;
var async_1 = _src_utils_async;
var CssParser = /** @class */ (function (_super) {
    tslib_1.__extends(CssParser, _super);
    function CssParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CssParser.prototype.getDependencies = function (content, ownerResource) {
        return async_1.async_resolve({ dependencies: [] });
    };
    CssParser.prototype.accepts = function (type) {
        return type === 'css';
    };
    return CssParser;
}(BaseParser_1.BaseParser));
exports.CssParser = CssParser;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=CssParser.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_css_CssParser) && isObject(module.exports)) {
						Object.assign(_src_handlers_css_CssParser, module.exports);
						return;
					}
					_src_handlers_css_CssParser = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_css_CssPathResolver;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BasePathResolver_1 = _src_handlers_base_BasePathResolver;
var CssPathResolver = /** @class */ (function (_super) {
    tslib_1.__extends(CssPathResolver, _super);
    function CssPathResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CssPathResolver.prototype.accepts = function (type) {
        return false;
    };
    return CssPathResolver;
}(BasePathResolver_1.BasePathResolver));
exports.CssPathResolver = CssPathResolver;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=CssPathResolver.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_css_CssPathResolver) && isObject(module.exports)) {
						Object.assign(_src_handlers_css_CssPathResolver, module.exports);
						return;
					}
					_src_handlers_css_CssPathResolver = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_css_CssRewriter;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseRewriter_1 = _src_handlers_base_BaseRewriter;
var CssRewriter = /** @class */ (function (_super) {
    tslib_1.__extends(CssRewriter, _super);
    function CssRewriter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CssRewriter.prototype.rewritePartial = function (content, ownerResource) {
    };
    CssRewriter.prototype.rewriteResource = function (resource) {
    };
    CssRewriter.prototype.accepts = function (type) {
        return type === 'css';
    };
    return CssRewriter;
}(BaseRewriter_1.BaseRewriter));
exports.CssRewriter = CssRewriter;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=CssRewriter.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_css_CssRewriter) && isObject(module.exports)) {
						Object.assign(_src_handlers_css_CssRewriter, module.exports);
						return;
					}
					_src_handlers_css_CssRewriter = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_css_CssBuilder;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseBuilder_1 = _src_handlers_base_BaseBuilder;
var CssBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(CssBuilder, _super);
    function CssBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CssBuilder.prototype.createModule = function (outputItem) {
        var _this = this;
        var out = outputItem
            .resources
            .map(function (res) {
            _this.solution.assetsManager.rewriteCss(res, outputItem.resource, _this.solution);
            return res.content;
        });
        outputItem.resource.content = out.join('\n');
    };
    CssBuilder.prototype.accepts = function (type) {
        return type === 'css';
    };
    return CssBuilder;
}(BaseBuilder_1.BaseBuilder));
exports.CssBuilder = CssBuilder;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=CssBuilder.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_css_CssBuilder) && isObject(module.exports)) {
						Object.assign(_src_handlers_css_CssBuilder, module.exports);
						return;
					}
					_src_handlers_css_CssBuilder = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_css_CssHandler;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var CssParser_1 = _src_handlers_css_CssParser;
var BaseHandler_1 = _src_handlers_base_BaseHandler;
var CssPathResolver_1 = _src_handlers_css_CssPathResolver;
var CssRewriter_1 = _src_handlers_css_CssRewriter;
var CssBuilder_1 = _src_handlers_css_CssBuilder;
var CssHandler = /** @class */ (function (_super) {
    tslib_1.__extends(CssHandler, _super);
    function CssHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CssHandler.prototype.accepts = function (type) {
        return type === 'css';
    };
    CssHandler.Parser = CssParser_1.CssParser;
    CssHandler.Rewriter = CssRewriter_1.CssRewriter;
    CssHandler.Builder = CssBuilder_1.CssBuilder;
    CssHandler.PathResolver = CssPathResolver_1.CssPathResolver;
    return CssHandler;
}(BaseHandler_1.BaseHandler));
exports.CssHandler = CssHandler;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=CssHandler.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_css_CssHandler) && isObject(module.exports)) {
						Object.assign(_src_handlers_css_CssHandler, module.exports);
						return;
					}
					_src_handlers_css_CssHandler = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_html_HtmlRewriter;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseRewriter_1 = _src_handlers_base_BaseRewriter;
var HtmlRewriter = /** @class */ (function (_super) {
    tslib_1.__extends(HtmlRewriter, _super);
    function HtmlRewriter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtmlRewriter.prototype.rewritePartial = function (content, ownerResource) {
    };
    HtmlRewriter.prototype.rewriteResource = function (resource) {
    };
    HtmlRewriter.prototype.accepts = function (type) {
        return type === 'html';
    };
    return HtmlRewriter;
}(BaseRewriter_1.BaseRewriter));
exports.HtmlRewriter = HtmlRewriter;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=HtmlRewriter.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_html_HtmlRewriter) && isObject(module.exports)) {
						Object.assign(_src_handlers_html_HtmlRewriter, module.exports);
						return;
					}
					_src_handlers_html_HtmlRewriter = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_html_readers_BaseTagReader;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var BaseTagReader = /** @class */ (function () {
    function BaseTagReader(solution) {
        this.solution = solution;
    }
    BaseTagReader.prototype.canHandle = function (el) {
        throw Error('Not implemented');
    };
    BaseTagReader.prototype.read = function (el) {
        throw Error('Not implemented');
    };
    return BaseTagReader;
}());
exports.BaseTagReader = BaseTagReader;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=BaseTagReader.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_html_readers_BaseTagReader) && isObject(module.exports)) {
						Object.assign(_src_handlers_html_readers_BaseTagReader, module.exports);
						return;
					}
					_src_handlers_html_readers_BaseTagReader = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_html_readers_MaskContentReader;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseTagReader_1 = _src_handlers_html_readers_BaseTagReader;
var MaskContentReader = /** @class */ (function (_super) {
    tslib_1.__extends(MaskContentReader, _super);
    function MaskContentReader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaskContentReader.prototype.canHandle = function (el) {
        var tagName = el.prop('tagName');
        if (tagName == null || tagName.toLowerCase() !== 'script') {
            return false;
        }
        var type = el.attr('type');
        if (type && type.toLowerCase().indexOf('mask') !== -1) {
            return true;
        }
        return false;
    };
    MaskContentReader.prototype.read = function (el) {
        var content = el.text();
        var handler = this.solution.handlers.find(function (x) { return x.parser.accepts('mask'); });
        return handler.parser.getDependencies(content, {}).then(function (_a) {
            var dependencies = _a.dependencies;
            //dependencies.forEach(x => x.module = 'global');
            return dependencies;
        });
    };
    return MaskContentReader;
}(BaseTagReader_1.BaseTagReader));
exports.MaskContentReader = MaskContentReader;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=MaskContentReader.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_html_readers_MaskContentReader) && isObject(module.exports)) {
						Object.assign(_src_handlers_html_readers_MaskContentReader, module.exports);
						return;
					}
					_src_handlers_html_readers_MaskContentReader = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_html_readers_StyleLinkReader;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseTagReader_1 = _src_handlers_html_readers_BaseTagReader;
var StyleLinkReader = /** @class */ (function (_super) {
    tslib_1.__extends(StyleLinkReader, _super);
    function StyleLinkReader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StyleLinkReader.prototype.canHandle = function (el) {
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
        return true;
    };
    StyleLinkReader.prototype.read = function (el) {
        var resource = {
            type: 'css',
            url: el.attr('href'),
            module: 'global',
            bundle: el.attr('data-bundler-bundle')
        };
        return [resource];
    };
    return StyleLinkReader;
}(BaseTagReader_1.BaseTagReader));
exports.StyleLinkReader = StyleLinkReader;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=StyleLinkReader.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_html_readers_StyleLinkReader) && isObject(module.exports)) {
						Object.assign(_src_handlers_html_readers_StyleLinkReader, module.exports);
						return;
					}
					_src_handlers_html_readers_StyleLinkReader = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_html_readers_ScriptLinkReader;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseTagReader_1 = _src_handlers_html_readers_BaseTagReader;
var ScriptLinkReader = /** @class */ (function (_super) {
    tslib_1.__extends(ScriptLinkReader, _super);
    function ScriptLinkReader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScriptLinkReader.prototype.canHandle = function (el) {
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
        return true;
    };
    ScriptLinkReader.prototype.read = function (el) {
        var resource = {
            type: 'js',
            url: this.getSource(el),
            module: 'global',
            bundle: el.attr('data-bundler-bundle'),
            meta: {
                skipDependencies: el.attr('data-bundler-dependencies') === 'ignore'
            }
        };
        return [resource];
    };
    ScriptLinkReader.prototype.getSource = function (el) {
        return el.attr('src') || el.attr('data-bundler-src');
    };
    return ScriptLinkReader;
}(BaseTagReader_1.BaseTagReader));
exports.ScriptLinkReader = ScriptLinkReader;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=ScriptLinkReader.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_html_readers_ScriptLinkReader) && isObject(module.exports)) {
						Object.assign(_src_handlers_html_readers_ScriptLinkReader, module.exports);
						return;
					}
					_src_handlers_html_readers_ScriptLinkReader = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_html_readers_ScriptContentReader;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseTagReader_1 = _src_handlers_html_readers_BaseTagReader;
var ScriptContentReader = /** @class */ (function (_super) {
    tslib_1.__extends(ScriptContentReader, _super);
    function ScriptContentReader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScriptContentReader.prototype.canHandle = function (el) {
        var tagName = el.prop('tagName');
        if (tagName == null || tagName.toLowerCase() !== 'script') {
            return false;
        }
        var type = el.attr('type');
        if (type && type.toLowerCase().indexOf('javascript') === -1) {
            return false;
        }
        return true;
    };
    ScriptContentReader.prototype.read = function (el) {
        var content = el.text();
        var handler = this.solution.handlers.find(function (x) { return x.parser.accepts('js'); });
        return handler.parser.getDependencies(content, {}).then(function (_a) {
            var dependencies = _a.dependencies;
            return dependencies;
        });
    };
    return ScriptContentReader;
}(BaseTagReader_1.BaseTagReader));
exports.ScriptContentReader = ScriptContentReader;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=ScriptContentReader.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_html_readers_ScriptContentReader) && isObject(module.exports)) {
						Object.assign(_src_handlers_html_readers_ScriptContentReader, module.exports);
						return;
					}
					_src_handlers_html_readers_ScriptContentReader = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_html_HtmlParser;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var arr_1 = _src_utils_arr;
var MaskContentReader_1 = _src_handlers_html_readers_MaskContentReader;
var StyleLinkReader_1 = _src_handlers_html_readers_StyleLinkReader;
var ScriptLinkReader_1 = _src_handlers_html_readers_ScriptLinkReader;
var ScriptContentReader_1 = _src_handlers_html_readers_ScriptContentReader;
var BaseParser_1 = _src_handlers_base_BaseParser;
var async_1 = _src_utils_async;
var HtmlParser = /** @class */ (function (_super) {
    tslib_1.__extends(HtmlParser, _super);
    function HtmlParser(solution, handler) {
        var _this = _super.call(this, solution, handler) || this;
        _this.solution = solution;
        _this.handler = handler;
        _this.readers = [
            new MaskContentReader_1.MaskContentReader(_this.solution),
            new StyleLinkReader_1.StyleLinkReader(_this.solution),
            new ScriptLinkReader_1.ScriptLinkReader(_this.solution),
            new ScriptContentReader_1.ScriptContentReader(_this.solution)
        ];
        return _this;
    }
    HtmlParser.prototype.getDependencies = function (content, ownerResource) {
        var _this = this;
        var $ = this.createDocument(content);
        var queue = [];
        $('*').each(function (index, node) {
            var $el = $(node);
            if ($el.attr('data-bundler') === 'ignore') {
                return;
            }
            var condition = $el.attr('data-bundler-if');
            if (condition) {
                var result = _this.solution.opts.varDefs.evaluate(condition);
                if (!result) {
                    return;
                }
            }
            var reader = _this.readers.find(function (reader) { return reader.canHandle($el); });
            if (reader) {
                queue.push({
                    node: $el,
                    reader: reader
                });
            }
        });
        return async_1.async_map(queue, function (x) { return x.reader.read(x.node); })
            .then(arr_1.arr_flattern)
            .then(function (deps) { return ({ dependencies: deps }); });
    };
    HtmlParser.prototype.accepts = function (type) {
        return type === 'html';
    };
    HtmlParser.prototype.createDocument = function (html) {
        return require('cheerio').load(html);
    };
    return HtmlParser;
}(BaseParser_1.BaseParser));
exports.HtmlParser = HtmlParser;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=HtmlParser.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_html_HtmlParser) && isObject(module.exports)) {
						Object.assign(_src_handlers_html_HtmlParser, module.exports);
						return;
					}
					_src_handlers_html_HtmlParser = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_html_serializers_BaseSerializer;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var path_1 = _src_utils_path;
var Resource_1 = _src_class_Resource;
var global_1 = _src_global;
var BaseSerializer = /** @class */ (function () {
    function BaseSerializer(solution, builder) {
        this.solution = solution;
        this.builder = builder;
    }
    BaseSerializer.prototype.removeDependencies = function ($) {
        throw new Error('Not implemented');
    };
    BaseSerializer.prototype.serialize = function ($, allDependencies) {
        throw new Error('Not implemented');
    };
    BaseSerializer.prototype.rewrite = function ($, ownerResource) {
        throw new Error('Not implemented');
    };
    BaseSerializer.prototype.clean = function ($) {
        return void 0;
    };
    BaseSerializer.prototype._replaceWithPlaceholder = function ($el, type) {
        var bundle = $el.attr('data-bundler-bundle') || 'index';
        var html = "<placeholder id=\"bundlers-placeholder\" type=\"" + type + "\" bundle=\"" + bundle + "\" />";
        $el.replaceWith(html);
    };
    BaseSerializer.prototype._insertDependency = function ($, resource, html) {
        var bundle = resource.bundle;
        var type = resource.type;
        var getSelector = function (bundle) {
            return "placeholder#bundlers-placeholder[type=\"" + type + "\"][bundle=\"" + bundle + "\"]";
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
    };
    BaseSerializer.prototype._rewriteStaticUrls = function (ownerResource, $, selector, pathAttrName) {
        var _this = this;
        $(selector)
            .each(function (i, el) {
            var path = $(el).attr(pathAttrName);
            if (!path || path_1.path_withProtocol(path))
                return;
            var resource = new Resource_1.Resource({ url: path, module: 'html' }, ownerResource, _this.solution);
            var url = resource.toTarget(_this.solution, { targetType: 'static' }).url;
            $(el).attr(pathAttrName, url);
        });
    };
    BaseSerializer.prototype._inlineResources = function (ownerResource, $, selector, pathAttrName, createHtmlFn) {
        var _this = this;
        var reporter = this.solution.reporter;
        $(selector)
            .each(function (i, el) {
            var path = $(el).attr(pathAttrName);
            if (/^https?:/.test(path)) {
                reporter.error('Only local resources can be inlined. Current: ' + path);
                return;
            }
            var resource = new Resource_1.Resource({ url: path, module: 'html' }, ownerResource, _this.solution);
            if (global_1.io.File.exists(resource.filename) === false) {
                reporter.error('File not found: ' + resource.filename);
                return;
            }
            var content = global_1.io.File.read(resource.filename);
            var html = createHtmlFn(content);
            $(el).replaceWith(html);
            reporter.info('Inlined resource from ' + resource.url);
        });
    };
    return BaseSerializer;
}());
exports.BaseSerializer = BaseSerializer;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=BaseSerializer.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_html_serializers_BaseSerializer) && isObject(module.exports)) {
						Object.assign(_src_handlers_html_serializers_BaseSerializer, module.exports);
						return;
					}
					_src_handlers_html_serializers_BaseSerializer = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_html_serializers_MaskSerializer;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseSerializer_1 = _src_handlers_html_serializers_BaseSerializer;
var MaskSerializer = /** @class */ (function (_super) {
    tslib_1.__extends(MaskSerializer, _super);
    function MaskSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaskSerializer.prototype.removeDependencies = function ($) {
        return void 0;
    };
    MaskSerializer.prototype.serialize = function ($, resources) {
        var arr = resources.filter(function (x) { return x.type === 'mask'; });
        if (arr.length === 0)
            return;
        arr.forEach(function (x) { return x.embed = true; });
        var html = arr
            .map(function (x) { return "<script type='text/mask' data-run='auto'>\n" + x.content + "\n</script>"; })
            .join('\n');
        this
            .builder
            .insertBefore($, 'script[type="text/mask"]', html);
    };
    MaskSerializer.prototype.rewrite = function ($, resource) {
        var _this = this;
        $('script[type="text/mask"]').each(function (i, node) {
            var content = $(node).text();
            var handler = _this.solution.handlers.find(function (x) { return x.rewriter.accepts('mask'); });
            var result = handler.rewriter.rewritePartial(content, resource);
            if (result && result !== content) {
                $(node).text(result);
            }
        });
    };
    return MaskSerializer;
}(BaseSerializer_1.BaseSerializer));
exports.MaskSerializer = MaskSerializer;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=MaskSerializer.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_html_serializers_MaskSerializer) && isObject(module.exports)) {
						Object.assign(_src_handlers_html_serializers_MaskSerializer, module.exports);
						return;
					}
					_src_handlers_html_serializers_MaskSerializer = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_html_serializers_StyleSerializer;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseSerializer_1 = _src_handlers_html_serializers_BaseSerializer;
var StyleLinkReader_1 = _src_handlers_html_readers_StyleLinkReader;
var StyleSerializer = /** @class */ (function (_super) {
    tslib_1.__extends(StyleSerializer, _super);
    function StyleSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StyleSerializer.prototype.removeDependencies = function ($) {
        var _this = this;
        var reader = new StyleLinkReader_1.StyleLinkReader();
        $('link[href]')
            .filter(function (i, el) {
            var $el = $(el);
            return $el.attr('data-bundler') !== 'ignore' && reader.canHandle($el);
        })
            .each(function (i, el) {
            _this._replaceWithPlaceholder($(el), 'css');
        });
    };
    StyleSerializer.prototype.serialize = function ($, resources) {
        var _this = this;
        var arr = resources.filter(function (x) { return x.type === 'css'; });
        if (arr.length === 0)
            return;
        arr.forEach(function (resource) {
            var url = resource.url;
            if (_this.solution.opts.version) {
                url += '?v=' + _this.solution.opts.version;
            }
            var html = "<link href='" + url + "' rel='stylesheet' />";
            var inserted = _this._insertDependency($, resource, html);
            if (inserted === false) {
                _this.builder.append($, 'head', html);
                return;
            }
        });
    };
    StyleSerializer.prototype.rewrite = function ($, resource) {
        this._inlineResources(resource, $, 'link[href][data-bundler-content="inline"]', 'href', function (content) { return "<style>" + content + "</style>"; });
        this._rewriteStaticUrls(resource, $, 'link[rel="stylesheet"][data-bundler="ignore"]', 'href');
    };
    return StyleSerializer;
}(BaseSerializer_1.BaseSerializer));
exports.StyleSerializer = StyleSerializer;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=StyleSerializer.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_html_serializers_StyleSerializer) && isObject(module.exports)) {
						Object.assign(_src_handlers_html_serializers_StyleSerializer, module.exports);
						return;
					}
					_src_handlers_html_serializers_StyleSerializer = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_html_serializers_ScriptSerializer;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseSerializer_1 = _src_handlers_html_serializers_BaseSerializer;
var ScriptSerializer = /** @class */ (function (_super) {
    tslib_1.__extends(ScriptSerializer, _super);
    function ScriptSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScriptSerializer.prototype.removeDependencies = function ($) {
        var _this = this;
        $('script[src]')
            .filter(function (i, x) {
            return x.attribs['data-bundler'] !== 'ignore';
        })
            .each(function (i, el) {
            _this._replaceWithPlaceholder($(el), 'js');
        });
    };
    ScriptSerializer.prototype.serialize = function ($, resources) {
        var _this = this;
        var arr = resources.filter(function (x) { return x.type === 'js'; });
        if (arr.length === 0)
            return;
        arr.forEach(function (resource) {
            var url = resource.url;
            if (_this.solution.opts.version) {
                url += '?v=' + _this.solution.opts.version;
            }
            var html = "<script src='" + url + "' type='text/javascript'></script>";
            var inserted = _this._insertDependency($, resource, html);
            if (inserted === false) {
                _this.builder.append($, 'body', html);
                return;
            }
        });
    };
    ScriptSerializer.prototype.rewrite = function ($, resource) {
        this._inlineResources(resource, $, 'script[src][data-bundler-content="inline"]', 'src', function (content) { return "<script type='text/javascript'>" + content + "</script>"; });
        this._rewriteStaticUrls(resource, $, 'script[data-bundler="ignore"]', 'src');
    };
    ScriptSerializer.prototype.clean = function ($) {
    };
    return ScriptSerializer;
}(BaseSerializer_1.BaseSerializer));
exports.ScriptSerializer = ScriptSerializer;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=ScriptSerializer.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_html_serializers_ScriptSerializer) && isObject(module.exports)) {
						Object.assign(_src_handlers_html_serializers_ScriptSerializer, module.exports);
						return;
					}
					_src_handlers_html_serializers_ScriptSerializer = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_html_serializers_HtmlSerializer;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseSerializer_1 = _src_handlers_html_serializers_BaseSerializer;
var HtmlSerializer = /** @class */ (function (_super) {
    tslib_1.__extends(HtmlSerializer, _super);
    function HtmlSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtmlSerializer.prototype.removeDependencies = function ($) {
        var _this = this;
        $('[data-bundler-if]')
            .filter(function (i, x) {
            var condition = x.attribs['data-bundler-if'];
            var result = !!_this.solution.opts.varDefs.evaluate(condition);
            if (result) {
                _this.solution.reporter.info('Removing resource from HTML with condition ' + condition);
            }
            return result;
        })
            .remove();
    };
    HtmlSerializer.prototype.serialize = function ($, resources) {
        var arr = resources.filter(function (x) { return x.type === 'html'; });
        if (arr.length === 0)
            return;
        arr.forEach(function (x) { return x.embed = true; });
        var html = arr
            .map(function (x) { return x.content; })
            .join('\n');
        this
            .builder
            .insertBefore($, 'script', html);
    };
    HtmlSerializer.prototype.rewrite = function ($, resource) {
        return void 0;
    };
    return HtmlSerializer;
}(BaseSerializer_1.BaseSerializer));
exports.HtmlSerializer = HtmlSerializer;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=HtmlSerializer.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_html_serializers_HtmlSerializer) && isObject(module.exports)) {
						Object.assign(_src_handlers_html_serializers_HtmlSerializer, module.exports);
						return;
					}
					_src_handlers_html_serializers_HtmlSerializer = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_html_serializers_LoadSerializer;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseSerializer_1 = _src_handlers_html_serializers_BaseSerializer;
var LoadSerializer = /** @class */ (function (_super) {
    tslib_1.__extends(LoadSerializer, _super);
    function LoadSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadSerializer.prototype.removeDependencies = function ($) {
        return void 0;
    };
    LoadSerializer.prototype.serialize = function ($, resources) {
        var _this = this;
        var arr = resources.filter(function (x) { return x.type === 'load'; });
        if (arr.length === 0)
            return;
        arr.forEach(function (x) { return x.embed = true; });
        var html = arr
            .map(function (resource) {
            var url = resource.toTargetUrl(_this.solution);
            return "<script type='text/plain' data-bundler-path='" + url + "'>\t\t\t\n\t\t\t\t\t" + resource.content + "\n\t\t\t\t</script>";
        })
            .join('\n');
        this
            .builder
            .insertBefore($, 'script', html);
    };
    LoadSerializer.prototype.rewrite = function ($, resource) {
        return void 0;
    };
    return LoadSerializer;
}(BaseSerializer_1.BaseSerializer));
exports.LoadSerializer = LoadSerializer;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=LoadSerializer.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_html_serializers_LoadSerializer) && isObject(module.exports)) {
						Object.assign(_src_handlers_html_serializers_LoadSerializer, module.exports);
						return;
					}
					_src_handlers_html_serializers_LoadSerializer = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_html_HtmlBuilder;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BaseBuilder_1 = _src_handlers_base_BaseBuilder;
var MaskSerializer_1 = _src_handlers_html_serializers_MaskSerializer;
var StyleSerializer_1 = _src_handlers_html_serializers_StyleSerializer;
var ScriptSerializer_1 = _src_handlers_html_serializers_ScriptSerializer;
var HtmlSerializer_1 = _src_handlers_html_serializers_HtmlSerializer;
var LoadSerializer_1 = _src_handlers_html_serializers_LoadSerializer;
var HtmlBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(HtmlBuilder, _super);
    function HtmlBuilder(solution, handler) {
        var _this = _super.call(this, solution, handler) || this;
        _this.solution = solution;
        _this.handler = handler;
        _this.serializers = [
            new MaskSerializer_1.MaskSerializer(solution, _this),
            new StyleSerializer_1.StyleSerializer(solution, _this),
            new ScriptSerializer_1.ScriptSerializer(solution, _this),
            new HtmlSerializer_1.HtmlSerializer(solution, _this),
            new LoadSerializer_1.LoadSerializer(solution, _this)
        ];
        return _this;
    }
    HtmlBuilder.prototype.createModule = function (outputItem, otherOutputItems) {
        var _this = this;
        var arr = outputItem.resources.map(function (resource) {
            var url = resource.toTargetUrl(_this.solution);
            return "<script type='text/plain' name='bunder-item' data-bundler-path='" + url + "'>\n\t\t\t\t" + resource.content + "\n\t\t\t</script>";
        });
        outputItem.resource.content = arr.join('\n');
    };
    HtmlBuilder.prototype.buildRoot = function (resource, dependencies) {
        var $ = this.createDocument(resource.content);
        dependencies.forEach(function (x) { return x.url = x.toRelative(resource); });
        this.serializers.forEach(function (x) { return x.removeDependencies($); });
        this.serializers.forEach(function (x) { return x.rewrite($, resource); });
        this.serializers.forEach(function (x) { return x.serialize($, dependencies); });
        this.serializers.forEach(function (x) { return x.clean($); });
        this.clean($);
        resource.content = $.html();
    };
    HtmlBuilder.prototype.append = function ($, selector, html) {
        var container = $.root().find(selector).first();
        if (container.length !== 0) {
            container.append(html);
        }
        else {
            $.root().append(html);
        }
    };
    HtmlBuilder.prototype.insertBefore = function ($, selector, html) {
        var anchor = $.root().find(selector).first();
        if (anchor.length !== 0) {
            anchor.before(html);
        }
        else {
            $.root().append(html);
        }
    };
    HtmlBuilder.prototype.accepts = function (type) {
        return type === 'html';
    };
    HtmlBuilder.prototype.createDocument = function (html) {
        return require('cheerio').load(html);
    };
    HtmlBuilder.prototype.clean = function ($) {
        var _this = this;
        $('[data-bundler-if]')
            .filter(function (i, x) {
            var condition = x.attribs['data-bundler-if'];
            var result = _this.solution.opts.varDefs.evaluate(condition);
            return !!result;
        })
            .remove();
        $('placeholder#bundlers-placeholder')
            .remove();
    };
    return HtmlBuilder;
}(BaseBuilder_1.BaseBuilder));
exports.HtmlBuilder = HtmlBuilder;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=HtmlBuilder.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_html_HtmlBuilder) && isObject(module.exports)) {
						Object.assign(_src_handlers_html_HtmlBuilder, module.exports);
						return;
					}
					_src_handlers_html_HtmlBuilder = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_html_HtmlPathResolver;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var BasePathResolver_1 = _src_handlers_base_BasePathResolver;
var HtmlPathResolver = /** @class */ (function (_super) {
    tslib_1.__extends(HtmlPathResolver, _super);
    function HtmlPathResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtmlPathResolver.prototype.resolve = function (includeData, resource) {
        return (resource.source || resource).cdUrl(includeData.url);
    };
    HtmlPathResolver.prototype.accepts = function (includeData) {
        return includeData.module === 'html';
    };
    return HtmlPathResolver;
}(BasePathResolver_1.BasePathResolver));
exports.HtmlPathResolver = HtmlPathResolver;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=HtmlPathResolver.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_html_HtmlPathResolver) && isObject(module.exports)) {
						Object.assign(_src_handlers_html_HtmlPathResolver, module.exports);
						return;
					}
					_src_handlers_html_HtmlPathResolver = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_html_HtmlHandler;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var HtmlRewriter_1 = _src_handlers_html_HtmlRewriter;
var BaseHandler_1 = _src_handlers_base_BaseHandler;
var HtmlParser_1 = _src_handlers_html_HtmlParser;
var HtmlBuilder_1 = _src_handlers_html_HtmlBuilder;
var HtmlPathResolver_1 = _src_handlers_html_HtmlPathResolver;
var HtmlHandler = /** @class */ (function (_super) {
    tslib_1.__extends(HtmlHandler, _super);
    function HtmlHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtmlHandler.Parser = HtmlParser_1.HtmlParser;
    HtmlHandler.Rewriter = HtmlRewriter_1.HtmlRewriter;
    HtmlHandler.Builder = HtmlBuilder_1.HtmlBuilder;
    HtmlHandler.PathResolver = HtmlPathResolver_1.HtmlPathResolver;
    return HtmlHandler;
}(BaseHandler_1.BaseHandler));
exports.HtmlHandler = HtmlHandler;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=HtmlHandler.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_html_HtmlHandler) && isObject(module.exports)) {
						Object.assign(_src_handlers_html_HtmlHandler, module.exports);
						return;
					}
					_src_handlers_html_HtmlHandler = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_handlers_exports;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var LoadHandler_1 = _src_handlers_load_LoadHandler;
var MaskHandler_1 = _src_handlers_mask_MaskHandler;
var ScriptHandler_1 = _src_handlers_script_ScriptHandler;
var CssHandler_1 = _src_handlers_css_CssHandler;
var HtmlHandler_1 = _src_handlers_html_HtmlHandler;
exports.Handlers = [
    LoadHandler_1.LoadHandler,
    MaskHandler_1.MaskHandler,
    ScriptHandler_1.ScriptHandler,
    CssHandler_1.CssHandler,
    HtmlHandler_1.HtmlHandler
];
//# sourceMappingURL=api.js.map
//# sourceMappingURL=exports.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_handlers_exports) && isObject(module.exports)) {
						Object.assign(_src_handlers_exports, module.exports);
						return;
					}
					_src_handlers_exports = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_class_Solution;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var AssetsManager_1 = _src_assets_AssetsManager;
var async_1 = _src_utils_async;
var atma_utils_1 = require("atma-utils");
var SolutionOpts_1 = _src_class_SolutionOpts;
var Reporter_1 = _src_class_Reporter;
var HandlersUtils_1 = _src_class_HandlersUtils;
var OutputResources_1 = _src_class_OutputResources;
var exports_1 = _src_handlers_exports;
var global_1 = _src_global;
var Solution = /** @class */ (function (_super) {
    tslib_1.__extends(Solution, _super);
    function Solution(path, opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this) || this;
        _this.iteration = {};
        _this.path = path;
        _this.opts = new SolutionOpts_1.SolutionOpts(_this, opts);
        _this.assetsManager = new AssetsManager_1.AssetsManager(_this);
        _this.outputResources = new OutputResources_1.OutputResources(_this);
        _this.reporter = Reporter_1.IReporter.create(_this.opts);
        _this.handlers = exports_1.Handlers.map(function (Ctor) { return new Ctor(_this); });
        Object.assign(_this.handlers, HandlersUtils_1.HandlersUtils);
        return _this;
    }
    Solution.prototype.getOptionsForResource = function (resource) {
        // var files = this.opts.files;
        // if (files == null) {
        //     return null;
        // }
        // @TODO support settings for a resource
    };
    Solution.prototype.isMainResource = function (resource) {
        return this.outputResources.rootInput === resource;
    };
    Solution.prototype.runScripts = function (name) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return async_1.async_run(function (resolve, reject) {
            var arr = _this.opts[name];
            if (arr == null || arr.length === 0) {
                resolve.apply(void 0, args);
                return;
            }
            async_1.async_waterfall(arr, function (path) {
                var mix = require(atma_utils_1.class_Uri.combine(process.cwd(), path));
                if (mix && mix.process) {
                    return mix.process();
                }
            }).then(function () { return resolve.apply(void 0, args); }, reject);
        });
    };
    Solution.prototype.onBuildReady = function (result) {
        for (var source in this.opts.copyFiles) {
            if (source.endsWith('/')) {
                global_1.io.Directory.copyTo(source, this.opts.copyFiles[source], { verbose: true });
                continue;
            }
            global_1.io.File.copyTo(source, this.opts.copyFiles[source]);
        }
        return result;
    };
    return Solution;
}(atma_utils_1.class_EventEmitter));
exports.Solution = Solution;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=Solution.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_class_Solution) && isObject(module.exports)) {
						Object.assign(_src_class_Solution, module.exports);
						return;
					}
					_src_class_Solution = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_parser_Parser;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var Middlewares_1 = _src_class_Middlewares;
var path_1 = _src_utils_path;
var async_1 = _src_utils_async;
var atma_utils_1 = require("atma-utils");
var Solution_1 = _src_class_Solution;
var assert = require("assert");
exports.Parser = {
    getDependencies: function (resource, solution) {
        assert(resource != null, 'Resource is empty');
        assert(solution instanceof Solution_1.Solution, 'Solution is not passed');
        var dfr = new atma_utils_1.class_Dfr;
        getDependenciesInternal(resource, solution)
            .done(_runMiddlewares)
            .fail(function (error) { return dfr.reject(error); });
        function _runMiddlewares(deps) {
            getDependenciesExternal(deps, resource, solution)
                .then(function (deps) { return filterDynamicDeps(deps, solution); })
                .done(function (deps) { return dfr.resolve(deps); })
                .fail(function (error) { return dfr.reject(error); });
        }
        return dfr;
    }
};
function getDependenciesInternal(resource, solution) {
    assert(typeof resource.url === 'string', 'Path is expected');
    var ext = path_1.path_getExtension(resource.url);
    var handler = solution.handlers.find(function (x) { return x.parser.accepts(resource.type) || x.parser.accepts(ext); });
    if (handler == null) {
        console.warn('GetDependenciesInternal: Skip uknown resource type', resource.type);
        return async_1.async_resolve({ dependencies: [] });
    }
    return handler.parser.getDependencies(resource.content, resource);
}
function getDependenciesExternal(deps, resource, solution) {
    return Middlewares_1._middlewares
        .run('parseDependencies', resource, deps, solution)
        .then(function () { return deps; });
}
function filterDynamicDeps(info, solution) {
    info.dependencies = info.dependencies.filter(function (dep) { return isDynamicDependency(dep, solution) === false; });
    return info;
}
function isDynamicDependency(dep, solution) {
    var arr = solution.opts.dynamicDependencies;
    return arr.length !== 0 && arr.some(function (rgx) { return rgx.test(dep.url); });
}
//# sourceMappingURL=api.js.map
//# sourceMappingURL=Parser.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_parser_Parser) && isObject(module.exports)) {
						Object.assign(_src_parser_Parser, module.exports);
						return;
					}
					_src_parser_Parser = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_loader_Loader;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var atma_utils_1 = require("atma-utils");
var res_1 = _src_utils_res;
var path_1 = _src_utils_path;
var async_1 = _src_utils_async;
var Parser_1 = _src_parser_Parser;
var assert = require("assert");
var Resource_1 = _src_class_Resource;
var Configuration_1 = _src_config_Configuration;
var color_1 = _src_utils_color;
exports.Loader = {
    opts: null,
    solution: null,
    load: function (type, path, opts, solution) {
        this.opts = opts;
        this.solution = solution;
        var includeData = {
            type: type,
            url: path,
            module: 'root',
            page: solution.opts.mainPage
        };
        var start = Date.now();
        return ResourceLoader
            .load(includeData, null, opts, solution)
            .then(function (loader) {
            var end = Date.now();
            var seconds = ((end - start) / 1000).toFixed(2);
            var treeInfo = res_1.res_getTreeInfo(loader.resource);
            var reporter = solution.reporter;
            reporter
                .info(color_1.color("Loaded bold<yellow<" + treeInfo.count + ">> files in bold<yellow<" + seconds + ">> sec."));
            reporter
                .info(treeInfo.treeString);
            return loader.resource;
        });
    },
    loadResource: function (resource) {
        return ResourceLoader
            .loadResource(resource, this.opts, this.solution)
            .then(function (loader) { return loader.resource; });
    },
    clearCache: function () {
        ResourceLoader.clearCache();
        return this;
    },
    removeCached: function (filename) {
        ResourceLoader.clearCacheSingle(filename);
        return this;
    },
    getTypeFromPath: function (path) {
        var ext = path_1.path_getExtension(path);
        var type = Object.keys(types).find(function (type) {
            return types[type].indexOf(" " + ext + " ") !== -1;
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
(function (ResourceLoader) {
    function load(includeData, parent, opts, solution) {
        var _this = this;
        var resource = new Resource_1.Resource(includeData, parent, solution);
        var loader = __loaders[resource.filename];
        if (loader == null) {
            loader = __loaders[resource.filename] = new TreeLoader(resource, opts, solution);
            loader.process();
        }
        else {
            // Try to find the resource in ancestors
            var res = tryGetCyclicRoot(resource);
            if (res != null) {
                solution.reporter.warn("Caution. Cyclic dependency detected. '" + includeData.url + "' in '" + parent.url + "'");
                return async_1.async_resolve({ resource: res });
            }
        }
        if (includeData.page) {
            loader.done(function () {
                _this.definePageForAll(includeData.page, loader.resource);
            });
        }
        return loader;
    }
    ResourceLoader.load = load;
    function loadResource(resource, opts, solution) {
        var loader = __loaders[resource.filename];
        if (loader == null) {
            loader = __loaders[resource.filename] = new TreeLoader(resource, opts, solution);
            loader.process();
        }
        return loader;
    }
    ResourceLoader.loadResource = loadResource;
    function clearCache() {
        __loaders = {};
        var cacheCleaner = Configuration_1.Configuration.Instance.get('clearFileCache');
        cacheCleaner && cacheCleaner();
        return ResourceLoader;
    }
    ResourceLoader.clearCache = clearCache;
    function clearCacheSingle(filename) {
        delete __loaders[filename];
        return ResourceLoader;
    }
    ResourceLoader.clearCacheSingle = clearCacheSingle;
    function definePageForAll(name, resource) {
        res_1.res_walk(resource, function (res) {
            if (res.page)
                return false;
            var arr = res.inPages;
            if (arr.indexOf(name) !== -1)
                return;
            res.inPages.push(name);
        });
    }
    ResourceLoader.definePageForAll = definePageForAll;
    function tryGetCyclicRoot(resource) {
        var x = resource.parent;
        while (x != null) {
            if (x.filename === resource.filename) {
                var res = x.clone();
                res.isCyclic = true;
                return res;
            }
            x = x.parent;
        }
        return null;
    }
    ResourceLoader.tryGetCyclicRoot = tryGetCyclicRoot;
    var TreeLoader = /** @class */ (function (_super) {
        tslib_1.__extends(TreeLoader, _super);
        function TreeLoader(resource, opts, solution) {
            var _this = _super.call(this) || this;
            _this.resource = resource;
            _this.opts = opts;
            _this.solution = solution;
            return _this;
        }
        TreeLoader.prototype.process = function () {
            var _this = this;
            this
                .solution
                .reporter
                .print('Load ' + toMessage(this.resource.url));
            function toMessage(path) {
                var parts = path.replace(/^\/+/, '').split('/');
                var name = parts.pop();
                parts = parts.map(function (x) { return color_1.color("bold<" + x + ">"); });
                name = color_1.color("green<" + name + ">");
                parts.push(name);
                return parts.join('/');
            }
            if (this.resource.parent == null && this.solution.opts.mainContent) {
                this.resource.content = this.solution.opts.mainContent;
                this.processChildren();
                return;
            }
            var start = Date.now();
            var reader = Configuration_1.Configuration.Instance.get('readFile');
            reader(this.resource.filename, this.opts).done(function (content) {
                var end = Date.now();
                _this.solution.reporter.print(color_1.color(" cyan<" + (end - start) + "> ms \n"));
                _this.resource.content = content;
                _this.processChildren();
            }).fail(function (error) { return _this.reject(error); });
        };
        TreeLoader.prototype.processChildren = function () {
            var _this = this;
            if (this.shouldSkipChildren()) {
                this.resolve(this);
                return;
            }
            Parser_1.Parser
                .getDependencies(this.resource, this.solution)
                .then(function (result) { return _this.loadChildren(result); }, function (error) { return _this.reject(error); });
        };
        TreeLoader.prototype.loadChildren = function (result) {
            var _this = this;
            assert(Array.isArray(result.dependencies), "Expects array of dependencies for " + this.resource.url);
            this.resource.meta = atma_utils_1.obj_extend(this.resource.meta, result.meta);
            this.resource.dependencies = result.dependencies;
            var deps = result.dependencies;
            async_1.async_waterfall(deps, function (dep) {
                return ResourceLoader
                    .load(dep, _this.resource, _this.opts, _this.solution)
                    .then(function (loader) {
                    dep.resource = loader.resource;
                    return loader.resource;
                });
            })
                .fail(function (error) { return _this.reject(error); })
                .done(function (resources) {
                var _a;
                (_a = _this.resource.resources).push.apply(_a, resources);
                _this.resolve(_this);
            });
        };
        TreeLoader.prototype.shouldSkipChildren = function () {
            var _this = this;
            var arr = this.solution.opts.parserIgnoreDependencies;
            var shouldSkip = arr.some(function (rgx) { return rgx.test(_this.resource.filename); });
            if (shouldSkip) {
                return true;
            }
            var meta = this.resource.meta;
            if (meta && meta.skipDependencies) {
                return true;
            }
            return false;
        };
        return TreeLoader;
    }(atma_utils_1.class_Dfr));
    var __loaders = {};
})(ResourceLoader || (ResourceLoader = {}));
//# sourceMappingURL=api.js.map
//# sourceMappingURL=Loader.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_loader_Loader) && isObject(module.exports)) {
						Object.assign(_src_loader_Loader, module.exports);
						return;
					}
					_src_loader_Loader = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_loader_Watcher;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var global_1 = _src_global;
var atma_utils_1 = require("atma-utils");
var Loader_1 = _src_loader_Loader;
var res_1 = _src_utils_res;
var path_1 = _src_utils_path;
var color_1 = _src_utils_color;
exports.Watcher = {
    watch: function (resource, solution) {
        return new WatcherFactory(resource, solution);
    }
};
var WatcherFactory = /** @class */ (function (_super) {
    tslib_1.__extends(WatcherFactory, _super);
    function WatcherFactory(resource, solution) {
        var _this = _super.call(this) || this;
        _this.watchers = {};
        _this.changeId = 0;
        _this.solution = solution;
        _this.rootResource = resource;
        _this.bind(resource);
        return _this;
    }
    WatcherFactory.prototype.bind = function (resource) {
        var _this = this;
        var toWatch = res_1.res_flattern(resource)
            .map(function (x) { return x.filename; })
            .filter(function (filename) { return (filename in _this.watchers) === false; });
        toWatch.forEach(function (filename) { return _this.watchers[filename] = new FileWatcher(filename, _this); });
        this.solution.reporter.info(color_1.color("Watching bold<cyan<" + toWatch.length + ">> files"));
    };
    WatcherFactory.prototype.changed = function (filename) {
        var _this = this;
        var changeId = ++this.changeId;
        var reporter = this.solution.reporter;
        reporter.info(color_1.color("File changed bold<cyan<" + path_1.path_getFile(filename) + ">>"));
        Loader_1.Loader.removeCached(filename);
        global_1.io.File.clearCache(filename);
        var resource = res_1.res_find(this.rootResource, function (res) { return res.filename === filename; });
        if (resource == null)
            throw Error('Resource not found ' + filename);
        Loader_1.Loader
            .loadResource(resource)
            .then(function (resource) {
            _this.bind(resource);
            if (_this.changeId === changeId) {
                _this.emit('changed');
            }
        }, function (error) {
            if (_this.changeId !== changeId) {
                return;
            }
            reporter.error("Resource errored " + filename);
            reporter.error(error);
            reporter.log(color_1.color('yellow<Watcher resumed...>'));
        });
    };
    return WatcherFactory;
}(atma_utils_1.class_EventEmitter));
;
var FileWatcher = /** @class */ (function () {
    function FileWatcher(filename, factory) {
        var _this = this;
        this.filename = filename;
        this.factory = factory;
        new global_1.io.File(filename).watch(function () { return _this.factory.changed(filename); });
    }
    return FileWatcher;
}());
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=Watcher.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_loader_Watcher) && isObject(module.exports)) {
						Object.assign(_src_loader_Watcher, module.exports);
						return;
					}
					_src_loader_Watcher = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_utils_tree;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var res_1 = _src_utils_res;
var tree_async;
exports.tree_async = tree_async;
(function () {
    exports.tree_async = tree_async = function (workerInfo) {
        var start = Date.now(), dfr = workerInfo.action(), reporter = workerInfo.reporter;
        dfr.done(function (resources) {
            var end = Date.now();
            var seconds = ((end - start) / 1000).toFixed(2);
            var treeInfo = res_1.res_getTreeInfo(resources);
            reporter
                .info(workerInfo.message(treeInfo, seconds));
            reporter
                .info(treeInfo.treeString);
        });
        return dfr;
    };
}());
//# sourceMappingURL=api.js.map
//# sourceMappingURL=tree.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_utils_tree) && isObject(module.exports)) {
						Object.assign(_src_utils_tree, module.exports);
						return;
					}
					_src_utils_tree = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_builder_Builder;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var Middlewares_1 = _src_class_Middlewares;
var path_1 = _src_utils_path;
var async_1 = _src_utils_async;
exports.Builder = {
    build: function (resources, solution) {
        return Middlewares_1._middlewares
            .run('buildResources', resources, solution)
            .then(function (arr) {
            resources = arr || resources;
            solution.outputResources.prepair(resources);
            return Middlewares_1._middlewares
                .run('rewriteDependencies', resources, solution)
                .then(function () { return rewriteDependenciesInternal(resources); })
                .then(rewriteRoot)
                .then(buildOutputItems)
                .then(buildRoot)
                .then(function () { return solution.outputResources.getAll(); });
        });
        function rewriteDependenciesInternal(resources) {
            var dfrs = resources.map(function (resource) {
                var ext = path_1.path_getExtension(resource.url);
                var handler = solution.handlers.find(function (x) {
                    return x.rewriter.accepts(ext);
                });
                if (handler == null) {
                    handler = solution.handlers.find(function (x) {
                        return x.rewriter.accepts(resource.type);
                    });
                }
                if (handler == null) {
                    throw Error('Rewriter not found for the resource: ' + resource.url);
                }
                return handler.rewriter.rewriteResource(resource);
            });
            return async_1.async_whenAll(dfrs);
        }
        function rewriteRoot() {
            return async_1.async_run(function () {
                var input = solution.outputResources.rootInput, output = solution.outputResources.rootOutput, ext = path_1.path_getExtension(input.url);
                var handler = solution.handlers.find(function (x) { return x.rewriter.accepts(input.type) || x.rewriter.accepts(ext); });
                if (handler == null || handler.rewriter.rewriteRoot == null) {
                    //throw new Error(`RootRewriter is not found for a resource ${input.url} and type ${input.type}`);
                    return;
                }
                return handler.rewriter.rewriteRoot(input, output);
            });
        }
        function buildOutputItems() {
            var items = solution.outputResources.items;
            return async_1.async_map(items, function (item) {
                var otherOutputItems = items.filter(function (x) {
                    if (x === item)
                        return false;
                    if (x.page != item.page)
                        return false;
                    if (x.bundle != item.bundle)
                        return false;
                    return true;
                });
                return buildBundle(item, otherOutputItems);
            });
        }
        function buildBundle(outputItem, otherOutputItems) {
            return Middlewares_1._middlewares
                .run('buildBundle', outputItem, otherOutputItems)
                .then(buildBundleInternal);
        }
        function buildBundleInternal(outputItem, otherOutputItems) {
            if (outputItem.resource.content) {
                return;
            }
            var ext = path_1.path_getExtension(outputItem.resource.url);
            var handler = solution.handlers.find(function (x) { return x.builder.accepts(outputItem.type); });
            if (handler == null) {
                handler = solution.handlers.find(function (x) { return x.builder.accepts(ext); });
            }
            if (handler == null) {
                throw Error("Unknown builder for type " + outputItem.type);
            }
            return handler.builder.createModule(outputItem, otherOutputItems);
        }
        function buildRoot() {
            var main = solution.outputResources.rootOutput;
            var dependencies = solution.outputResources.getForPage(solution.opts.mainPage);
            var ext = path_1.path_getExtension(main.url);
            var handler = solution.handlers.find(function (x) { return x.builder.accepts(main.type) || x.builder.accepts(ext); });
            if (handler == null || handler.builder.buildRoot == null) {
                throw new Error("RootBuilder is not found for a resource " + main.url + " and type " + main.type);
            }
            return handler.builder.buildRoot(main, dependencies, solution);
        }
    }
};
//# sourceMappingURL=api.js.map
//# sourceMappingURL=Builder.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_builder_Builder) && isObject(module.exports)) {
						Object.assign(_src_builder_Builder, module.exports);
						return;
					}
					_src_builder_Builder = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_Bundler;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var tslib_1 = _node_modules_tslib_tslib;
var Watcher_1 = _src_loader_Watcher;
var Middlewares_1 = _src_class_Middlewares;
var Parser_1 = _src_parser_Parser;
var Resource_1 = _src_class_Resource;
var AssetsManager_1 = _src_assets_AssetsManager;
var Loader_1 = _src_loader_Loader;
var atma_utils_1 = require("atma-utils");
var Solution_1 = _src_class_Solution;
var global_1 = _src_global;
var Configuration_1 = _src_config_Configuration;
var res_1 = _src_utils_res;
var tree_1 = _src_utils_tree;
var Builder_1 = _src_builder_Builder;
var color_1 = _src_utils_color;
var Bundler = /** @class */ (function (_super) {
    tslib_1.__extends(Bundler, _super);
    function Bundler(path, opts) {
        var _this = _super.call(this) || this;
        global.__$bundler = _this;
        _this.solution = new Solution_1.Solution(path, opts);
        return _this;
    }
    Bundler.clearCache = function () {
        Loader_1.Loader.clearCache();
        if (global_1.io.File.middleware) {
            for (var key in global_1.io.File.middleware) {
                var midd = global_1.io.File.middleware[key];
                if (midd.clearTemp) {
                    midd.clearTemp();
                }
            }
        }
        return Bundler;
    };
    Object.defineProperty(Bundler, "Config", {
        get: function () {
            return Configuration_1.Configuration.Instance;
        },
        enumerable: true,
        configurable: true
    });
    Bundler.prototype.getResourceTree = function (opts) {
        var solution = this.solution, type = solution.opts.type, path = solution.path;
        return Loader_1.Loader
            .load(type, path, opts, solution)
            .then(function (x) { return x.toJSON(); });
    };
    Bundler.getResourceTree = function (path, opts) {
        return new Bundler(path, opts).getResourceTree();
    };
    Bundler.prototype.getResources = function (opts) {
        var solution = this.solution, type = solution.opts.type, path = solution.path;
        return Loader_1.Loader.load(type, path, opts, solution).then(function (resource) {
            return res_1.res_flattern(resource).map(function (x) { return x; });
        });
    };
    Bundler.getResources = function (path, opts) {
        return new Bundler(path, opts).getResources();
    };
    Bundler.prototype.build = function (opts) {
        var solution = this.solution, type = solution.opts.type, path = solution.path, shouldRebuild = false, isBuilding = false, isRebuilding = false, rootResource = null, self = this;
        function build(resource) {
            isBuilding = true;
            var resources = res_1.res_flattern(resource);
            return tree_1.tree_async({
                resources: resources,
                reporter: solution.reporter,
                action: function () {
                    return Builder_1.Builder.build(resources, solution);
                },
                message: function (treeInfo, seconds) {
                    return color_1.color("Created bold<yellow<" + treeInfo.count + ">> files in bold<yellow<" + seconds + ">> sec.");
                }
            }).done(buildComplete).fail(buildFailed);
        }
        function buildComplete(resources) {
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
        function buildFailed(error) {
            isBuilding = false;
            if (isRebuilding) {
                solution.reporter.error(color_1.color('red<Build Failed>'));
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
            solution.iteration = {};
            build(rootResource);
        }
        function start() {
            return Loader_1.Loader
                .load(type, path, opts, solution)
                .then(function (resource) {
                rootResource = resource;
                if (opts && opts.watch === true) {
                    Watcher_1.Watcher
                        .watch(resource, solution)
                        .on('changed', rebuild);
                }
                return build(resource)
                    .then(function (result) { return solution.onBuildReady(result); })
                    .then(function (result) { return solution.runScripts('postbuild', result); });
            });
        }
        return solution
            .runScripts('prebuild')
            .then(start);
    };
    Bundler.build = function (path, opts) {
        return new Bundler(path, opts).build(opts);
    };
    Bundler.process = function (path, opts) {
        var bundler = new Bundler(path, opts);
        var solution = bundler.solution;
        function builderComplete(resources) {
            resources.forEach(function (res) {
                global_1.io.File.write(res.filename, res.content);
            });
            return solution
                .assetsManager
                .flush()
                .then(function () {
                return Promise.resolve(solution);
            });
        }
        if (opts && opts.watch === true) {
            bundler.on('rebuild', builderComplete);
        }
        return bundler
            .build(opts)
            .then(builderComplete);
    };
    Bundler.prototype.defineMiddleware = function (name, fn) {
        Middlewares_1._middlewares.define(name, fn);
    };
    Object.defineProperty(Bundler, "Parser", {
        get: function () {
            return {
                getDependencies: function (content, opts) {
                    if (opts === void 0) { opts = { type: 'js' }; }
                    if (typeof opts === 'string')
                        opts = { type: opts };
                    var solution = new Solution_1.Solution('', opts);
                    var resource = new Resource_1.Resource({ type: opts.type, content: content }, null, solution);
                    return Parser_1.Parser.getDependencies(resource, solution);
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bundler, "io", {
        get: function () {
            return global_1.io;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bundler, "AssetsManager", {
        get: function () { return AssetsManager_1.AssetsManager; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bundler, "Resource", {
        get: function () { return Resource_1.Resource; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bundler, "Solution", {
        get: function () { return Solution_1.Solution; },
        enumerable: true,
        configurable: true
    });
    return Bundler;
}(atma_utils_1.class_EventEmitter));
exports.Bundler = Bundler;
;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=Bundler.ts.map;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_Bundler) && isObject(module.exports)) {
						Object.assign(_src_Bundler, module.exports);
						return;
					}
					_src_Bundler = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				
"use strict";
var Bundler_1 = _src_Bundler;
module.exports = Bundler_1.Bundler;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=api.ts.map