import EvalResult from "./EvalResult";
import { IStore } from "../platform/IStore";
/**
 * @internal
 */
export default class Evaluator {
    private store;
    constructor(store: IStore);
    /**
     * Evaluate the given flag against the given context.
     * @param flagKey The key of the feature flag.
     */
    evaluate(flagKey: string): EvalResult;
}
//# sourceMappingURL=Evaluator.d.ts.map