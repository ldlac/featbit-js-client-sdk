"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The client context provides basic configuration and platform support which are required
 * when building SDK components.
 */
class ClientContext {
    constructor(sdkKey, configuration, platform) {
        this.sdkKey = sdkKey;
        this.platform = platform;
        this.logger = configuration.logger;
        this.offline = configuration.offline;
        this.flushInterval = configuration.flushInterval;
        this.maxEventsInQueue = configuration.maxEventsInQueue;
        this.streamingUri = configuration.streamingUri;
        this.pollingUri = configuration.pollingUri;
        this.eventsUri = configuration.eventsUri;
    }
}
exports.default = ClientContext;
//# sourceMappingURL=ClientContext.js.map