import { ReasonKinds } from "./ReasonKinds";
import { IFlag } from "./data/IFlag";
import { EvalEvent } from "../events/event";
import { IUser } from "../options/IUser";
/**
 * A class which encapsulates the result of an evaluation. It allows for differentiating between
 * successful and error result types.
 *
 * @internal
 */
export default class EvalResult {
    kind: ReasonKinds;
    value: IFlag | null;
    reason?: string | undefined;
    protected constructor(kind: ReasonKinds, value: IFlag | null, reason?: string | undefined);
    static flagNotFound(flagKey: string): EvalResult;
    static matched(val: IFlag): EvalResult;
    toEvalEvent(user: IUser): EvalEvent | null;
}
//# sourceMappingURL=EvalResult.d.ts.map