"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EvalResult_1 = __importDefault(require("./EvalResult"));
const DataKinds_1 = __importDefault(require("../store/DataKinds"));
/**
 * @internal
 */
class Evaluator {
    constructor(store) {
        this.store = store;
    }
    /**
     * Evaluate the given flag against the given context.
     * @param flagKey The key of the feature flag.
     */
    evaluate(flagKey) {
        const flag = this.store.get(DataKinds_1.default.Flags, flagKey);
        if (!flag) {
            return EvalResult_1.default.flagNotFound(flagKey);
        }
        return EvalResult_1.default.matched(flag);
    }
}
exports.default = Evaluator;
//# sourceMappingURL=Evaluator.js.map