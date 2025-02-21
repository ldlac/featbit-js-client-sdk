"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TestDataSynchronizer_1 = __importDefault(require("./TestDataSynchronizer"));
const createStreamListeners_1 = require("../../data-sources/createStreamListeners");
const DataKinds_1 = __importDefault(require("../../store/DataKinds"));
class TestData {
    constructor() {
        this.currentFlags = [];
        this.store = {};
    }
    /**
     * Get a factory for update processors that will be attached to this TestData instance.
     * @returns An update processor factory.
     */
    getFactory() {
        // Provides an arrow function to prevent needed to bind the method to
        // maintain `this`.
        return (clientContext, store, dataSourceUpdates, initSuccessHandler, _errorHandler) => {
            this.store = store;
            const listeners = (0, createStreamListeners_1.createStreamListeners)(dataSourceUpdates, clientContext.logger, {
                put: initSuccessHandler,
            });
            this.dataSynchronizer = new TestDataSynchronizer_1.default(dataSourceUpdates, Object.values(this.currentFlags), () => { }, listeners);
            return this.dataSynchronizer;
        };
    }
    update(flag) {
        var _a;
        const oldVersion = ((_a = this.store.get(DataKinds_1.default.Flags, flag.id)) === null || _a === void 0 ? void 0 : _a.version) || 0;
        const newFlag = Object.assign(Object.assign({}, flag), { version: oldVersion + 1, key: flag.id });
        return this.dataSynchronizer.upsert(DataKinds_1.default.Flags, newFlag);
    }
}
exports.default = TestData;
//# sourceMappingURL=TestData.js.map