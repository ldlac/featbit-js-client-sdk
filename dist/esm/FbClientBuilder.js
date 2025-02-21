"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FbClientBuilder = void 0;
const FbClient_1 = __importDefault(require("./platform/browser/FbClient"));
/**
 * Creates an instance of the FeatBit client.
 *
 * Applications should instantiate a single instance for the lifetime of the application.
 * The client will begin attempting to connect to FeatBit as soon as it is created. To
 * determine when it is ready to use, call {@link IFbClient.waitForInitialization}, or register an
 * event listener for the `"ready"` event using {@link IFbClient.on}.
 *
 * **Important:** Do **not** try to instantiate `FbClient` with its constructor
 * (`new FbClientNode()`); the SDK does not currently support
 * this.
 *
 * @return
 *   The new {@link IFbClient} instance.
 */
class FbClientBuilder {
    constructor(options) {
        this._options = options !== null && options !== void 0 ? options : {};
    }
    /**
     * Creates a new instance of the FeatBit client.
     */
    build() {
        return new FbClient_1.default(this._options, this._platform);
    }
    platform(platform) {
        this._platform = platform;
        return this;
    }
    /**
     * Refer to {@link IOptions.startWaitTime}.
     */
    startWaitTime(startWaitTime) {
        this._options.startWaitTime = startWaitTime;
        return this;
    }
    /**
     * Refer to {@link IOptions.sdkKey}.
     */
    sdkKey(sdkKey) {
        this._options.sdkKey = sdkKey;
        return this;
    }
    /**
     * Refer to {@link IOptions.user}.
     */
    user(user) {
        this._options.user = user;
        return this;
    }
    /**
     * Refer to {@link IOptions.streamingUri}.
     */
    streamingUri(streamingUri) {
        this._options.streamingUri = streamingUri;
        return this;
    }
    /**
     * Refer to {@link IOptions.pollingUri}.
     */
    pollingUri(pollingUri) {
        this._options.pollingUri = pollingUri;
        return this;
    }
    /**
     * Refer to {@link IOptions.eventsUri}.
     */
    eventsUri(eventsUri) {
        this._options.eventsUri = eventsUri;
        return this;
    }
    /**
     * Refer to {@link IOptions.dataSyncMode}.
     */
    dataSyncMode(mode) {
        this._options.dataSyncMode = mode;
        return this;
    }
    /**
     * Refer to {@link IOptions.pollingInterval}.
     */
    pollingInterval(pollingInterval) {
        this._options.pollingInterval = pollingInterval;
        return this;
    }
    /**
     * Refer to {@link IOptions.flushInterval}.
     */
    flushInterval(flushInterval) {
        this._options.flushInterval = flushInterval;
        return this;
    }
    /**
     * Refer to {@link IOptions.maxEventsInQueue}.
     */
    maxEventsInQueue(maxEventsInQueue) {
        this._options.maxEventsInQueue = maxEventsInQueue;
        return this;
    }
    /**
     * Refer to {@link IOptions.logger}.
     */
    logger(logger) {
        this._options.logger = logger;
        return this;
    }
    /**
     * Refer to {@link IOptions.offline}.
     */
    offline(offline) {
        this._options.offline = offline;
        return this;
    }
    /**
     * Use the JsonBootstrapProvider.
     */
    bootstrap(flags) {
        this._options.bootstrap = flags;
        return this;
    }
    /**
     * Refer to {@link IOptions.dataSynchronizer}.
     */
    dataSynchronizer(dataSynchronizer) {
        this._options.dataSynchronizer = dataSynchronizer;
        return this;
    }
}
exports.FbClientBuilder = FbClientBuilder;
//# sourceMappingURL=FbClientBuilder.js.map