"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FbClientCore = void 0;
const Configuration_1 = __importDefault(require("./Configuration"));
const ClientContext_1 = __importDefault(require("./options/ClientContext"));
const DataSourceUpdates_1 = __importDefault(require("./data-sources/DataSourceUpdates"));
const createStreamListeners_1 = require("./data-sources/createStreamListeners");
const WebSocketDataSynchronizer_1 = __importDefault(require("./data-sync/WebSocketDataSynchronizer"));
const PollingDataSynchronizer_1 = __importDefault(require("./data-sync/PollingDataSynchronizer"));
const Requestor_1 = __importDefault(require("./data-sync/Requestor"));
const DataKinds_1 = __importDefault(require("./store/DataKinds"));
const Evaluator_1 = __importDefault(require("./evaluation/Evaluator"));
const ReasonKinds_1 = require("./evaluation/ReasonKinds");
const errors_1 = require("./errors");
const Context_1 = __importDefault(require("./Context"));
const ValueConverters_1 = require("./utils/ValueConverters");
const NullDataSynchronizer_1 = require("./data-sync/NullDataSynchronizer");
const NullEventProcessor_1 = require("./events/NullEventProcessor");
const DefaultEventProcessor_1 = require("./events/DefaultEventProcessor");
const event_1 = require("./events/event");
const DataSyncMode_1 = require("./data-sync/DataSyncMode");
const Validators_1 = require("./options/Validators");
var ClientState;
(function (ClientState) {
    ClientState[ClientState["Initializing"] = 0] = "Initializing";
    ClientState[ClientState["Initialized"] = 1] = "Initialized";
    ClientState[ClientState["Failed"] = 2] = "Failed";
})(ClientState || (ClientState = {}));
class FbClientCore {
    constructor(options, platform, callbacks) {
        this.options = options;
        this.platform = platform;
        this.state = ClientState.Initializing;
        this.onError = callbacks.onError;
        this.onFailed = callbacks.onFailed;
        this.onReady = callbacks.onReady;
        const { onUpdate, hasEventListeners } = callbacks;
        const config = new Configuration_1.default(options);
        if (!config.sdkKey && !config.offline) {
            throw new Error('You must configure the client with an SDK key');
        }
        if (!config.user) {
            throw new Error('You must configure the client with a user');
        }
        this.config = config;
        this.logger = config.logger;
        this.init(platform, onUpdate, hasEventListeners);
    }
    init(platform, onUpdate, hasEventListeners) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const clientContext = new ClientContext_1.default(this.config.sdkKey, this.config, platform);
            this.store = this.config.storeFactory(clientContext);
            yield this.store.identify(this.config.user);
            this.dataSourceUpdates = new DataSourceUpdates_1.default(this.store, hasEventListeners, onUpdate);
            this.evaluator = new Evaluator_1.default(this.store);
            // use bootstrap provider to populate store
            yield this.config.bootstrapProvider.populate(this.config.user.keyId, this.dataSourceUpdates);
            if (this.config.offline) {
                this.eventProcessor = new NullEventProcessor_1.NullEventProcessor();
                this.dataSynchronizer = new NullDataSynchronizer_1.NullDataSynchronizer();
                this.initSuccess();
            }
            else {
                this.eventProcessor = new DefaultEventProcessor_1.DefaultEventProcessor(clientContext);
                const listeners = (0, createStreamListeners_1.createStreamListeners)(this.dataSourceUpdates, this.logger, {
                    put: () => this.initSuccess(),
                    patch: () => this.initSuccess()
                });
                const dataSynchronizer = this.config.dataSyncMode === DataSyncMode_1.DataSyncModeEnum.STREAMING
                    ? new WebSocketDataSynchronizer_1.default(this.config.sdkKey, this.config.user, clientContext, platform.webSocket, () => this.store.version, listeners, this.config.webSocketPingInterval)
                    : new PollingDataSynchronizer_1.default(this.config, new Requestor_1.default(this.config.sdkKey, this.config, this.platform.info, this.platform.requests), () => this.store.version, listeners, (e) => this.dataSourceErrorHandler(e));
                this.dataSynchronizer = (_c = (_b = (_a = this.config).dataSynchronizerFactory) === null || _b === void 0 ? void 0 : _b.call(_a, clientContext, this.store, this.dataSourceUpdates, () => this.initSuccess(), (e) => this.dataSourceErrorHandler(e))) !== null && _c !== void 0 ? _c : dataSynchronizer;
            }
            this.start();
        });
    }
    identify(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const validator = new Validators_1.UserValidator();
            if (!validator.is(user)) {
                validator.messages.forEach((error) => {
                    var _a;
                    (_a = this.logger) === null || _a === void 0 ? void 0 : _a.warn(error);
                });
                return;
            }
            this.config.user = user;
            yield this.store.identify(user);
            this.dataSynchronizer.identify(user);
            const [flags] = this.store.all(DataKinds_1.default.Flags);
            if (Object.keys(flags).length === 0) {
                yield this.config.bootstrapProvider.populate(user.keyId, this.dataSourceUpdates);
            }
        });
    }
    start() {
        if (this.config.offline) {
            return;
        }
        this.dataSynchronizer.start();
        setTimeout(() => {
            var _a, _b;
            if (!this.initialized()) {
                const msg = `FbClient failed to start successfully within ${this.config.startWaitTime} milliseconds. ` +
                    'This error usually indicates a connection issue with FeatBit or an invalid sdkKey.' +
                    'Please double-check your sdkKey and streamingUri/pollingUri configuration. ' +
                    'We will continue to initialize the FbClient, it still have a chance to get to work ' +
                    'if it\'s a temporary network issue';
                const error = new errors_1.TimeoutError(msg);
                this.state = ClientState.Failed;
                this.rejectionReason = error;
                (_a = this.initReject) === null || _a === void 0 ? void 0 : _a.call(this, error);
                return (_b = this.logger) === null || _b === void 0 ? void 0 : _b.warn(msg);
            }
        }, this.config.startWaitTime);
    }
    initialized() {
        return this.state === ClientState.Initialized;
    }
    waitForInitialization() {
        // An initialization promise is only created if someone is going to use that promise.
        // If we always created an initialization promise, and there was no call waitForInitialization
        // by the time the promise was rejected, then that would result in an unhandled promise
        // rejection.
        // Initialization promise was created by a previous call to waitForInitialization.
        if (this.initializedPromise) {
            return this.initializedPromise;
        }
        // Initialization completed before waitForInitialization was called, so we have completed
        // and there was no promise. So we make a resolved promise and return it.
        if (this.state === ClientState.Initialized) {
            this.initializedPromise = Promise.resolve(this);
            return this.initializedPromise;
        }
        // Initialization failed before waitForInitialization was called, so we have completed
        // and there was no promise. So we make a rejected promise and return it.
        if (this.state === ClientState.Failed) {
            this.initializedPromise = Promise.reject(this.rejectionReason);
            return this.initializedPromise;
        }
        if (!this.initializedPromise) {
            this.initializedPromise = new Promise((resolve, reject) => {
                this.initResolve = resolve;
                this.initReject = reject;
            });
        }
        return this.initializedPromise;
    }
    boolVariation(key, defaultValue) {
        return this.evaluateCore(key, defaultValue, ValueConverters_1.ValueConverters.bool).value;
    }
    boolVariationDetail(key, defaultValue) {
        return this.evaluateCore(key, defaultValue, ValueConverters_1.ValueConverters.bool);
    }
    jsonVariation(key, defaultValue) {
        return this.evaluateCore(key, defaultValue, ValueConverters_1.ValueConverters.json).value;
    }
    jsonVariationDetail(key, defaultValue) {
        return this.evaluateCore(key, defaultValue, ValueConverters_1.ValueConverters.json);
    }
    numberVariation(key, defaultValue) {
        return this.evaluateCore(key, defaultValue, ValueConverters_1.ValueConverters.number).value;
    }
    numberVariationDetail(key, defaultValue) {
        return this.evaluateCore(key, defaultValue, ValueConverters_1.ValueConverters.number);
    }
    stringVariation(key, defaultValue) {
        return this.evaluateCore(key, defaultValue, ValueConverters_1.ValueConverters.string).value;
    }
    stringVariationDetail(key, defaultValue) {
        return this.evaluateCore(key, defaultValue, ValueConverters_1.ValueConverters.string);
    }
    variation(key, defaultValue) {
        return this.evaluateCore(key, defaultValue, ValueConverters_1.ValueConverters.string).value;
    }
    variationDetail(key, defaultValue) {
        return this.evaluateCore(key, defaultValue, ValueConverters_1.ValueConverters.string);
    }
    getAllVariations() {
        var _a;
        const context = Context_1.default.fromUser(this.config.user);
        if (!context.valid) {
            const error = new errors_1.ClientError(`${(_a = context.message) !== null && _a !== void 0 ? _a : 'User not valid;'} returning default value.`);
            this.onError(error);
            return Promise.resolve([]);
        }
        const [flags, _] = this.store.all(DataKinds_1.default.Flags);
        const result = Object.keys(flags).map(flagKey => {
            var _a;
            const evalResult = this.evaluator.evaluate(flagKey);
            return { flagKey, kind: evalResult.kind, reason: evalResult.reason, value: (_a = evalResult.value) === null || _a === void 0 ? void 0 : _a.variation };
        });
        return Promise.resolve(result);
    }
    close() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.eventProcessor.close();
            (_a = this.dataSynchronizer) === null || _a === void 0 ? void 0 : _a.close();
            this.store.close();
        });
    }
    track(eventName, metricValue) {
        const metricEvent = new event_1.MetricEvent(this.config.user, eventName, this.platform.info.appType, metricValue !== null && metricValue !== void 0 ? metricValue : 1);
        this.eventProcessor.record(metricEvent);
        return;
    }
    flush(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.eventProcessor.flush();
                callback === null || callback === void 0 ? void 0 : callback(true);
                return true;
            }
            catch (err) {
                callback === null || callback === void 0 ? void 0 : callback(false);
                return false;
            }
        });
    }
    evaluateCore(flagKey, defaultValue, typeConverter) {
        var _a, _b, _c;
        const context = Context_1.default.fromUser(this.config.user);
        if (!context.valid) {
            const error = new errors_1.ClientError(`${(_a = context.message) !== null && _a !== void 0 ? _a : 'User not valid;'} returning default value.`);
            this.onError(error);
            return { flagKey, kind: ReasonKinds_1.ReasonKinds.Error, reason: error.message, value: defaultValue };
        }
        const evalResult = this.evaluator.evaluate(flagKey);
        if (evalResult.kind === ReasonKinds_1.ReasonKinds.FlagNotFound) {
            // flag not found, return default value
            const error = new errors_1.ClientError(evalResult.reason);
            this.onError(error);
            return { flagKey, kind: evalResult.kind, reason: evalResult.reason, value: defaultValue };
        }
        if (!this.initialized()) {
            (_b = this.logger) === null || _b === void 0 ? void 0 : _b.warn('Variation called before FeatBit client initialization completed (did you wait for the' +
                "'ready' event?)");
        }
        else {
            // send event
            this.eventProcessor.record(evalResult.toEvalEvent(this.config.user));
        }
        const { isSucceeded, value } = typeConverter((_c = evalResult.value) === null || _c === void 0 ? void 0 : _c.variation);
        return isSucceeded
            ? { flagKey, kind: evalResult.kind, reason: evalResult.reason, value }
            : { flagKey, kind: ReasonKinds_1.ReasonKinds.WrongType, reason: 'type mismatch', value: defaultValue };
    }
    dataSourceErrorHandler(e) {
        var _a;
        const error = e.code === 401 ? new Error('Authentication failed. Double check your SDK key.') : e;
        this.onError(error);
        this.onFailed(error);
        if (!this.initialized()) {
            this.state = ClientState.Failed;
            this.rejectionReason = error;
            (_a = this.initReject) === null || _a === void 0 ? void 0 : _a.call(this, error);
        }
    }
    initSuccess() {
        var _a, _b;
        if (!this.initialized()) {
            this.state = ClientState.Initialized;
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.info('FbClient started successfully.');
            (_b = this.initResolve) === null || _b === void 0 ? void 0 : _b.call(this, this);
            this.onReady();
        }
    }
}
exports.FbClientCore = FbClientCore;
//# sourceMappingURL=FbClientCore.js.map