"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHttpRecoverable = exports.TimeoutError = exports.ClientError = exports.UnexpectedResponseError = exports.StreamingError = exports.PollingError = void 0;
class PollingError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = 'FbPollingError';
    }
}
exports.PollingError = PollingError;
class StreamingError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = 'FbStreamingError';
    }
}
exports.StreamingError = StreamingError;
class UnexpectedResponseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FbUnexpectedResponseError';
    }
}
exports.UnexpectedResponseError = UnexpectedResponseError;
class ClientError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FbClientError';
    }
}
exports.ClientError = ClientError;
class TimeoutError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FeatBitTimeoutError';
    }
}
exports.TimeoutError = TimeoutError;
function isHttpRecoverable(status) {
    if (status >= 400 && status < 500) {
        return status === 400 || status === 408 || status === 429;
    }
    return true;
}
exports.isHttpRecoverable = isHttpRecoverable;
//# sourceMappingURL=errors.js.map