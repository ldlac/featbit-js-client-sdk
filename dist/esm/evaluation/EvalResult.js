"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReasonKinds_1 = require("./ReasonKinds");
const event_1 = require("../events/event");
/**
 * A class which encapsulates the result of an evaluation. It allows for differentiating between
 * successful and error result types.
 *
 * @internal
 */
class EvalResult {
    constructor(kind, value, reason) {
        this.kind = kind;
        this.value = value;
        this.reason = reason;
    }
    static flagNotFound(flagKey) {
        return new EvalResult(ReasonKinds_1.ReasonKinds.FlagNotFound, null, `flag not found: ${flagKey}`);
    }
    static matched(val) {
        return new EvalResult(ReasonKinds_1.ReasonKinds.Match, val, 'target match');
    }
    toEvalEvent(user) {
        var _a, _b, _c;
        if (this.kind !== ReasonKinds_1.ReasonKinds.Match) {
            return null;
        }
        const targetedVariation = (_a = this.value) === null || _a === void 0 ? void 0 : _a.variations.find(v => { var _a; return v.value === ((_a = this.value) === null || _a === void 0 ? void 0 : _a.variation); });
        return new event_1.EvalEvent(user, (_b = this.value) === null || _b === void 0 ? void 0 : _b.id, targetedVariation, (_c = this.value) === null || _c === void 0 ? void 0 : _c.sendToExperiment);
    }
}
exports.default = EvalResult;
//# sourceMappingURL=EvalResult.js.map