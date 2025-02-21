"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullBootstrapProvider = void 0;
class NullBootstrapProvider {
    constructor() {
        this.dataSet = {
            flags: {},
            version: 0
        };
    }
    populate(userKeyId, dataSourceUpdates, callback) {
        return new Promise((resolve, reject) => {
            resolve();
            callback === null || callback === void 0 ? void 0 : callback();
        });
    }
}
exports.NullBootstrapProvider = NullBootstrapProvider;
//# sourceMappingURL=NullBootstrapProvider.js.map