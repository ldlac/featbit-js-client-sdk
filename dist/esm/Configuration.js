"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultValues = void 0;
const Validators_1 = require("./options/Validators");
const OptionMessages_1 = __importDefault(require("./options/OptionMessages"));
const InMemoryStore_1 = __importDefault(require("./store/InMemoryStore"));
const isNullOrUndefined_1 = require("./utils/isNullOrUndefined");
const canonicalizeUri_1 = require("./utils/canonicalizeUri");
const NullBootstrapProvider_1 = require("./bootstrap/NullBootstrapProvider");
const constants_1 = require("./constants");
const DataSyncMode_1 = require("./data-sync/DataSyncMode");
const bootstrap_1 = require("./bootstrap");
// Once things are internal to the implementation of the SDK we can depend on
// types. Calls to the SDK could contain anything without any regard to typing.
// So, data we take from external sources must be normalized into something
// that can be trusted.
/**
 * These perform cursory validations. Complex objects are implemented with classes
 * and these should allow for conditional construction.
 */
const validations = {
    startWaitTime: Validators_1.TypeValidators.Number,
    sdkKey: Validators_1.TypeValidators.String,
    pollingUri: Validators_1.TypeValidators.String,
    streamingUri: Validators_1.TypeValidators.String,
    eventsUri: Validators_1.TypeValidators.String,
    webSocketPingInterval: Validators_1.TypeValidators.Number,
    logger: Validators_1.TypeValidators.Object,
    store: Validators_1.TypeValidators.ObjectOrFactory,
    dataSynchronizer: Validators_1.TypeValidators.ObjectOrFactory,
    flushInterval: Validators_1.TypeValidators.Number,
    maxEventsInQueue: Validators_1.TypeValidators.Number,
    pollingInterval: Validators_1.TypeValidators.Number,
    offline: Validators_1.TypeValidators.Boolean,
    dataSyncMode: Validators_1.TypeValidators.String,
    bootstrap: Validators_1.TypeValidators.Bootstrap,
    user: Validators_1.TypeValidators.User
};
/**
 * @internal
 */
exports.defaultValues = {
    startWaitTime: 5000,
    sdkKey: '',
    pollingUri: '',
    streamingUri: '',
    eventsUri: '',
    dataSyncMode: DataSyncMode_1.DataSyncModeEnum.STREAMING,
    sendEvents: true,
    webSocketPingInterval: 18 * 1000,
    flushInterval: 2000,
    maxEventsInQueue: 10000,
    pollingInterval: 30000,
    offline: false,
    store: (options) => new InMemoryStore_1.default(),
    bootstrap: undefined,
    user: undefined,
};
function validateTypesAndNames(options) {
    let errors = [];
    const validatedOptions = Object.assign({}, exports.defaultValues);
    Object.keys(options).forEach((optionName) => {
        var _a;
        // We need to tell typescript it doesn't actually know what options are.
        // If we don't then it complains we are doing crazy things with it.
        const optionValue = options[optionName];
        const validator = validations[optionName];
        if (validator) {
            if (!validator.is(optionValue)) {
                if (validator.getType() === 'boolean') {
                    errors.push(OptionMessages_1.default.wrongOptionTypeBoolean(optionName, typeof optionValue));
                    validatedOptions[optionName] = !!optionValue;
                }
                else if (validator instanceof Validators_1.NumberWithMinimum &&
                    Validators_1.TypeValidators.Number.is(optionValue)) {
                    const { min } = validator;
                    errors.push(OptionMessages_1.default.optionBelowMinimum(optionName, optionValue, min));
                    validatedOptions[optionName] = min;
                }
                else if (validator instanceof Validators_1.UserValidator) {
                    errors = [...errors, ...validator.messages];
                    validatedOptions[optionName] = exports.defaultValues[optionName];
                }
                else {
                    errors.push(OptionMessages_1.default.wrongOptionType(optionName, validator.getType(), typeof optionValue));
                    validatedOptions[optionName] = exports.defaultValues[optionName];
                }
            }
            else {
                validatedOptions[optionName] = optionValue;
            }
        }
        else {
            (_a = options.logger) === null || _a === void 0 ? void 0 : _a.warn(OptionMessages_1.default.unknownOption(optionName));
        }
    });
    return { errors, validatedOptions };
}
function validateEndpoints(options, validatedOptions) {
    var _a, _b, _c;
    const { streamingUri, pollingUri, eventsUri } = options;
    const streamingUriMissing = (0, isNullOrUndefined_1.isNullOrUndefined)(streamingUri) || streamingUri === constants_1.EmptyString;
    const pollingUriMissing = (0, isNullOrUndefined_1.isNullOrUndefined)(pollingUri) || pollingUri === constants_1.EmptyString;
    const eventsUriMissing = (0, isNullOrUndefined_1.isNullOrUndefined)(eventsUri) || eventsUri === constants_1.EmptyString;
    if (!validatedOptions.offline && (eventsUriMissing || (streamingUriMissing && pollingUriMissing))) {
        if (eventsUriMissing) {
            (_a = validatedOptions.logger) === null || _a === void 0 ? void 0 : _a.error(OptionMessages_1.default.partialEndpoint('eventsUri'));
        }
        if (validatedOptions.dataSyncMode === DataSyncMode_1.DataSyncModeEnum.STREAMING && streamingUriMissing) {
            (_b = validatedOptions.logger) === null || _b === void 0 ? void 0 : _b.error(OptionMessages_1.default.partialEndpoint('streamingUri'));
        }
        if (validatedOptions.dataSyncMode === DataSyncMode_1.DataSyncModeEnum.POLLING && pollingUriMissing) {
            (_c = validatedOptions.logger) === null || _c === void 0 ? void 0 : _c.error(OptionMessages_1.default.partialEndpoint('pollingUri'));
        }
    }
}
class Configuration {
    constructor(options = {}) {
        var _a, _b;
        this.bootstrapProvider = new NullBootstrapProvider_1.NullBootstrapProvider();
        // The default will handle undefined, but not null.
        // Because we can be called from JS we need to be extra defensive.
        options = options || {};
        // If there isn't a valid logger from the platform, then logs would go nowhere.
        this.logger = options.logger;
        const { errors, validatedOptions } = validateTypesAndNames(options);
        errors.forEach((error) => {
            var _a;
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.warn(error);
        });
        this.user = options.user;
        validateEndpoints(options, validatedOptions);
        this.streamingUri = `${(0, canonicalizeUri_1.canonicalizeUri)(validatedOptions.streamingUri)}/streaming`;
        this.pollingUri = `${(0, canonicalizeUri_1.canonicalizeUri)(validatedOptions.pollingUri)}/api/public/sdk/client/latest-all`;
        this.eventsUri = `${(0, canonicalizeUri_1.canonicalizeUri)(validatedOptions.eventsUri)}/api/public/insight/track`;
        this.startWaitTime = validatedOptions.startWaitTime;
        this.sdkKey = validatedOptions.sdkKey;
        this.webSocketPingInterval = validatedOptions.webSocketPingInterval;
        this.flushInterval = validatedOptions.flushInterval;
        this.maxEventsInQueue = validatedOptions.maxEventsInQueue;
        this.pollingInterval = validatedOptions.pollingInterval;
        this.offline = validatedOptions.offline;
        if (validatedOptions.bootstrap && validatedOptions.bootstrap.length > 0) {
            try {
                this.bootstrapProvider = new bootstrap_1.JsonBootstrapProvider(validatedOptions.bootstrap);
            }
            catch (_) {
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.error('Failed to parse bootstrap JSON, use NullBootstrapProvider.');
            }
        }
        if (this.offline) {
            (_b = this.logger) === null || _b === void 0 ? void 0 : _b.info('Offline mode enabled. No data synchronization with the FeatBit server will occur.');
        }
        this.dataSyncMode = validatedOptions.dataSyncMode;
        if (Validators_1.TypeValidators.Function.is(validatedOptions.dataSynchronizer)) {
            // @ts-ignore
            this.dataSynchronizerFactory = validatedOptions.dataSynchronizer;
        }
        else {
            // The processor is already created, just have the method return it.
            // @ts-ignore
            this.dataSynchronizerFactory = () => validatedOptions.dataSynchronizer;
        }
        if (Validators_1.TypeValidators.Function.is(validatedOptions.store)) {
            // @ts-ignore
            this.storeFactory = validatedOptions.store;
        }
        else {
            // The store is already created, just have the method return it.
            // @ts-ignore
            this.storeFactory = () => validatedOptions.store;
        }
    }
}
exports.default = Configuration;
//# sourceMappingURL=Configuration.js.map