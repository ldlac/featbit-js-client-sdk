"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const types_1 = require("./types");
const http_1 = require("../utils/http");
class PollingDataSynchronizer {
    constructor(config, requestor, getStoreTimestamp, listeners, errorHandler) {
        this.requestor = requestor;
        this.getStoreTimestamp = getStoreTimestamp;
        this.listeners = listeners;
        this.errorHandler = errorHandler;
        this.stopped = false;
        this.logger = config.logger;
        this.pollingInterval = config.pollingInterval;
        this.user = config.user;
    }
    poll() {
        var _a;
        if (this.stopped) {
            return;
        }
        const startTime = Date.now();
        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.debug('Polling for feature flag and segments updates');
        this.requestor.requestData(this.getStoreTimestamp(), this.user, (err, body) => {
            var _a, _b, _c, _d, _e, _f, _g;
            const elapsed = Date.now() - startTime;
            const sleepFor = Math.max(this.pollingInterval - elapsed, 0);
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.debug('Elapsed: %d ms, sleeping for %d ms', elapsed, sleepFor);
            if (err) {
                const { status } = err;
                if (status && !(0, errors_1.isHttpRecoverable)(status)) {
                    const message = (0, http_1.httpErrorMessage)(err, 'polling request');
                    (_b = this.logger) === null || _b === void 0 ? void 0 : _b.error(message);
                    (_c = this.errorHandler) === null || _c === void 0 ? void 0 : _c.call(this, new errors_1.PollingError(message, status));
                    // It is not recoverable, return and do not trigger another
                    // poll.
                    return;
                }
                (_d = this.logger) === null || _d === void 0 ? void 0 : _d.warn((0, http_1.httpErrorMessage)(err, 'polling request', 'will retry'));
            }
            else {
                let featureFlags = [];
                let userKeyId = (_e = this.user) === null || _e === void 0 ? void 0 : _e.keyId;
                let processStreamResponse = this.listeners.get('patch');
                if (body) {
                    const message = JSON.parse(body);
                    if (message.messageType === 'data-sync') {
                        switch (message.data.eventType) {
                            case types_1.StreamResponseEventType.patch:
                                processStreamResponse = this.listeners.get('patch');
                                break;
                            case types_1.StreamResponseEventType.full:
                                processStreamResponse = this.listeners.get('put');
                                break;
                        }
                        ({ featureFlags, userKeyId } = message.data);
                    }
                }
                const data = (_f = processStreamResponse === null || processStreamResponse === void 0 ? void 0 : processStreamResponse.deserializeData) === null || _f === void 0 ? void 0 : _f.call(processStreamResponse, featureFlags);
                (_g = processStreamResponse === null || processStreamResponse === void 0 ? void 0 : processStreamResponse.processJson) === null || _g === void 0 ? void 0 : _g.call(processStreamResponse, userKeyId, data);
            }
            // Falling through, there was some type of error and we need to trigger
            // a new poll.
            this.timeoutHandle = setTimeout(() => {
                this.poll();
            }, sleepFor);
        });
    }
    identify(user) {
        this.user = Object.assign({}, user);
    }
    close() {
        this.stop();
    }
    start() {
        this.poll();
    }
    stop() {
        if (this.timeoutHandle) {
            clearTimeout(this.timeoutHandle);
            this.timeoutHandle = undefined;
        }
        this.stopped = true;
    }
}
exports.default = PollingDataSynchronizer;
//# sourceMappingURL=PollingDataSynchronizer.js.map