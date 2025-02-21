"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializePatch = exports.deserializeAll = void 0;
const DataKinds_1 = __importDefault(require("./DataKinds"));
/**
 * @internal
 */
function deserializeAll(flags) {
    const result = {
        [DataKinds_1.default.Flags.namespace]: {}
    };
    if (flags === null || flags === void 0 ? void 0 : flags.length) {
        result[DataKinds_1.default.Flags.namespace] = flags.reduce((acc, cur) => {
            acc[cur.id] = Object.assign(Object.assign({}, cur), { version: cur.timestamp || 0, key: cur.id, variations: cur.variationOptions });
            return acc;
        }, {});
    }
    return result;
}
exports.deserializeAll = deserializeAll;
/**
 * @internal
 */
function deserializePatch(flags) {
    const result = [
        ...(flags === null || flags === void 0 ? void 0 : flags.map(item => ({
            data: Object.assign(Object.assign({}, item), { version: item.timestamp, key: item.id, variations: item.variationOptions }),
            kind: DataKinds_1.default.Flags
        }))) || []
    ];
    return result;
}
exports.deserializePatch = deserializePatch;
//# sourceMappingURL=serialization.js.map