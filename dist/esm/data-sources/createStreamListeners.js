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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStreamListeners = exports.createPatchListener = exports.createPutListener = void 0;
const serialization_1 = require("../store/serialization");
const createPutListener = (dataSourceUpdates, logger, onPutCompleteHandler = () => {
}) => ({
    deserializeData: serialization_1.deserializeAll,
    processJson: (userKeyId, { flags }) => __awaiter(void 0, void 0, void 0, function* () {
        const initData = {
            flags: flags,
            version: 0
        };
        logger === null || logger === void 0 ? void 0 : logger.debug('Initializing all data');
        dataSourceUpdates.init(userKeyId, initData, onPutCompleteHandler);
    }),
});
exports.createPutListener = createPutListener;
const createPatchListener = (dataSourceUpdates, logger, onPatchCompleteHandler = () => {
}) => ({
    deserializeData: serialization_1.deserializePatch,
    processJson: (userKeyId, data) => __awaiter(void 0, void 0, void 0, function* () {
        if ((data === null || data === void 0 ? void 0 : data.length) === 0) {
            onPatchCompleteHandler === null || onPatchCompleteHandler === void 0 ? void 0 : onPatchCompleteHandler();
            return;
        }
        data === null || data === void 0 ? void 0 : data.forEach(item => {
            logger === null || logger === void 0 ? void 0 : logger.debug(`Updating ${item.data.key} in ${item.kind.namespace}`);
            dataSourceUpdates.upsert(userKeyId, item.kind, item.data, onPatchCompleteHandler);
        });
    }),
});
exports.createPatchListener = createPatchListener;
const createStreamListeners = (dataSourceUpdates, logger, onCompleteHandlers) => {
    const listeners = new Map();
    listeners.set('put', (0, exports.createPutListener)(dataSourceUpdates, logger, onCompleteHandlers === null || onCompleteHandlers === void 0 ? void 0 : onCompleteHandlers.put));
    listeners.set('patch', (0, exports.createPatchListener)(dataSourceUpdates, logger, onCompleteHandlers === null || onCompleteHandlers === void 0 ? void 0 : onCompleteHandlers.patch));
    return listeners;
};
exports.createStreamListeners = createStreamListeners;
//# sourceMappingURL=createStreamListeners.js.map