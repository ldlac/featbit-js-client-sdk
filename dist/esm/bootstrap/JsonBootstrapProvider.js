"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonBootstrapProvider = void 0;
const serialization_1 = require("../store/serialization");
const isNullOrUndefined_1 = require("../utils/isNullOrUndefined");
class JsonBootstrapProvider {
    constructor(bootstrap) {
        const flags = (bootstrap || []).map((flag) => (Object.assign(Object.assign({}, flag), { variationOptions: flag.variationOptions || [{ id: null, variation: flag.variation }] })));
        const data = (0, serialization_1.deserializeAll)(flags);
        this.dataSet = {
            flags: data.flags,
            version: 0
        };
    }
    populate(userKeyId, dataSourceUpdates, callback) {
        return new Promise((resolve, reject) => {
            if ((0, isNullOrUndefined_1.isNullOrUndefined)(this.dataSet)) {
                return resolve();
            }
            const internalCallback = () => {
                resolve();
                callback === null || callback === void 0 ? void 0 : callback();
            };
            dataSourceUpdates.init(userKeyId, this.dataSet, internalCallback);
        });
    }
}
exports.JsonBootstrapProvider = JsonBootstrapProvider;
//# sourceMappingURL=JsonBootstrapProvider.js.map