"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parse(str) {
    if (!str)
        return {};
    return str
        .split(/&|;/g)
        .map(function (v) { return v.split('='); })
        .reduce(function (params, entry) {
        params[entry[0]] = entry[1];
        return params;
    }, {});
}
exports.default = parse;
//# sourceMappingURL=parse.js.map