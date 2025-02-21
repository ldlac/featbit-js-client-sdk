"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpErrorMessage = exports.defaultHeaders = void 0;
function defaultHeaders(sdkKey, info) {
    const { userAgentBase, version } = info.sdkData();
    const headers = {
        'Content-Type': 'application/json',
        'User-Agent': `${userAgentBase !== null && userAgentBase !== void 0 ? userAgentBase : info.appType}/${version}`,
        'Authorization': sdkKey
    };
    return headers;
}
exports.defaultHeaders = defaultHeaders;
function httpErrorMessage(err, context, retryMessage) {
    let desc;
    if (err.status) {
        desc = `error ${err.status}${err.status === 401 ? ' (invalid SDK key)' : ''}`;
    }
    else {
        desc = `I/O error (${err.message || err})`;
    }
    const action = retryMessage !== null && retryMessage !== void 0 ? retryMessage : 'giving up permanently';
    return `Received ${desc} for ${context} - ${action}`;
}
exports.httpErrorMessage = httpErrorMessage;
//# sourceMappingURL=http.js.map