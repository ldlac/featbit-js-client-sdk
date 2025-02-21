"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WebSocketDataSynchronizer {
    constructor(sdkKey, user, clientContext, socket, getStoreTimestamp, listeners, webSocketPingInterval) {
        this.getStoreTimestamp = getStoreTimestamp;
        this.listeners = listeners;
        const { logger, streamingUri } = clientContext;
        this.logger = logger;
        this.socket = socket;
        this.socket.config({
            sdkKey,
            streamingUri,
            pingInterval: webSocketPingInterval,
            user,
            logger,
            getStoreTimestamp
        });
        this.listeners.forEach(({ deserializeData, processJson }, eventName) => {
            var _a;
            (_a = this.socket) === null || _a === void 0 ? void 0 : _a.addListener(eventName, (event) => {
                var _a;
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.debug(`Received ${eventName} event`);
                if (event === null || event === void 0 ? void 0 : event.data) {
                    const { featureFlags, userKeyId } = event.data;
                    const data = deserializeData(featureFlags);
                    processJson(userKeyId, data);
                }
            });
        });
    }
    identify(user) {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.identify(user);
    }
    start() {
        var _a;
        this.logConnectionStarted();
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.connect();
    }
    logConnectionStarted() {
        var _a;
        this.connectionAttemptStartTime = Date.now();
        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.info(`Stream connection attempt StartTime ${this.connectionAttemptStartTime}`);
    }
    close() {
        this.stop();
    }
    stop() {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.close();
        this.socket = undefined;
    }
}
exports.default = WebSocketDataSynchronizer;
//# sourceMappingURL=WebSocketDataSynchronizer.js.map