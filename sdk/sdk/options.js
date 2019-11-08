"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function makeWithOptions(_a) {
    var d = _a.d, w = _a.w, parser = _a.parser, logger = _a.logger;
    var fromCookie = parser(d.cookie); // From cookie
    var fromQuery = parser(w.location.search.replace(/^\?/, '')); // From query string
    logger({ fromCookie: fromCookie, fromQuery: fromQuery });
    return function (opts) {
        return __assign({}, fromCookie, fromQuery, opts);
    };
}
exports.makeWithOptions = makeWithOptions;
//# sourceMappingURL=options.js.map