"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FbClientCore_1 = require("../../FbClientCore");
const BasicLogger_1 = require("../../logging/BasicLogger");
const EventEmitter_1 = require("../../utils/EventEmitter");
const SafeLogger_1 = require("../../logging/SafeLogger");
const Emits_1 = require("../../utils/Emits");
const BrowserPlatform_1 = __importDefault(require("./BrowserPlatform"));
const LocalStorageStore_1 = __importDefault(require("./LocalStorageStore"));
/**
 * @ignore
 */
class FbClient extends FbClientCore_1.FbClientCore {
    constructor(options, platform = undefined) {
        const fallbackLogger = new BasicLogger_1.BasicLogger({
            level: 'none',
            destination: console.log
        });
        const logger = options.logger ? new SafeLogger_1.SafeLogger(options.logger, fallbackLogger) : fallbackLogger;
        const emitter = new EventEmitter_1.EventEmitter(logger);
        let { store } = options;
        if (!store) {
            store = new LocalStorageStore_1.default(options);
        }
        super(Object.assign(Object.assign({}, options), { logger, store }), platform !== null && platform !== void 0 ? platform : new BrowserPlatform_1.default(Object.assign(Object.assign({}, options), { logger })), {
            onError: (err) => {
                if (emitter.listenerCount('error')) {
                    emitter.emit('error', err);
                }
            },
            onFailed: (err) => {
                emitter.emit('failed', err);
            },
            onReady: () => {
                emitter.emit('ready');
            },
            onUpdate: (keys) => {
                emitter.emit('update', [keys]);
                keys.forEach((key) => emitter.emit(`update:${key}`, key));
            },
            hasEventListeners: () => emitter
                .eventNames()
                .some((name) => name === 'update' || (typeof name === 'string' && name.startsWith('update:'))),
        });
        this.emitter = emitter;
    }
}
exports.default = (0, Emits_1.Emits)(FbClient);
//# sourceMappingURL=FbClient.js.map