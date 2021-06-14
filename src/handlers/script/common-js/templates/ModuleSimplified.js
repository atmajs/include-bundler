var ___VAR_ID___;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = ___VAR_ID___ != null ? ___VAR_ID___ : {};
    var module = { exports: exports };

    ___MODULE___;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (__isObj(___VAR_ID___) && __isObj(module.exports)) {
        Object.assign(___VAR_ID___, module.exports);
    } else {
        ___VAR_ID___ = module.exports;
    }

    __FOOTER__;
}());
