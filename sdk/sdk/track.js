"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeTrackEvent(_a) {
    var w = _a.w, d = _a.d, apiUri = _a.apiUri, logger = _a.logger;
    function appendChild(element) {
        if (d.body) {
            d.body.appendChild(element);
        }
        else {
            d.addEventListener('readystatechange', function () { return appendChild(element); });
        }
    }
    function appendImgPixel(src) {
        var img = d.createElement('img');
        img.style.position = 'absolute';
        img.style.top = '-1000px';
        img.style.left = '-1000px';
        img.style.opacity = '0';
        img.src = src;
        appendChild(img);
    }
    function addPingPixel(opts) {
        appendImgPixel(apiUri + "/ping?url=" + w.location.href);
    }
    function addLinkClickPixel(opts) {
        if (opts.drop_id) {
            appendImgPixel(apiUri + "/drop/click/" + opts.drop_id);
        }
    }
    function addConversionPixel(opts) {
        if (opts.drop_id) {
            appendImgPixel(apiUri + "/drop/convert/" + opts.drop_id);
        }
    }
    return function (opts) {
        if (!opts)
            return;
        logger('Track event', opts);
        switch (opts && opts.event) {
            case 'ping':
                return addPingPixel(opts);
            case 'click':
                return addLinkClickPixel(opts);
            case 'convert':
                return addConversionPixel(opts);
        }
    };
}
exports.makeTrackEvent = makeTrackEvent;
//# sourceMappingURL=track.js.map