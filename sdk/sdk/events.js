"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parse_1 = __importDefault(require("../utils/parse"));
var options_1 = require("./options");
var track_1 = require("./track");
function makeCoinTracker(_a) {
    var w = _a.w, withOptions = _a.withOptions, trackEvent = _a.trackEvent;
    function push(options) {
        if (options.__tracked)
            return;
        trackEvent(withOptions(options));
        options.__tracked = true;
        originalPush(options);
    }
    w.coinTracker = w.coinTracker || [];
    var originalPush = w.coinTracker.push.bind(w.coinTracker);
    w.coinTracker.push = push;
    w.coinTracker.forEach(push);
    return w.coinTracker;
}
var w = window;
var d = document;
var apiUri = 'https://tracking.coinapp.co';
var logger = function () {
    var v = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        v[_i] = arguments[_i];
    }
    return console.log.apply(console, ['COIN Tracker'].concat(v));
};
var withOptions = options_1.makeWithOptions({ w: w, d: d, logger: logger, parser: parse_1.default });
var trackEvent = track_1.makeTrackEvent({ w: w, d: d, apiUri: apiUri, logger: logger });
exports.coinTracker = makeCoinTracker({
    w: w,
    withOptions: withOptions,
    trackEvent: trackEvent,
});
exports.forEach = exports.coinTracker.forEach.bind(exports.coinTracker);
exports.push = exports.coinTracker.push.bind(exports.coinTracker);
//# sourceMappingURL=events.js.map