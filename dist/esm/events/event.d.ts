import { IUser } from "../options/IUser";
import { IVariation } from "../evaluation/data/IFlag";
export interface IEvent {
    hash: string;
}
export declare class AsyncEvent implements IEvent {
    private readonly isCompletedPromise?;
    private resolveFn?;
    timestamp: number;
    get hash(): string;
    constructor();
    waitForCompletion(): Promise<AsyncEvent>;
    complete(): void;
}
export declare class FlushEvent extends AsyncEvent {
}
export declare class ShutdownEvent extends AsyncEvent {
}
export declare class PayloadEvent implements IEvent {
    timestamp: number;
    get hash(): string;
    toPayload(): any;
}
export declare class MetricEvent extends PayloadEvent {
    user: IUser;
    eventName: string;
    appType: string;
    metricValue: number;
    constructor(user: IUser, eventName: string, appType: string, metricValue: number);
    private userPayload;
    toPayload(): any;
    get hash(): string;
}
export declare class EvalEvent extends PayloadEvent {
    user: IUser;
    flagKey: string;
    variation: IVariation;
    sendToExperiment: boolean;
    constructor(user: IUser, flagKey: string, variation: IVariation, sendToExperiment: boolean);
    private userPayload;
    toPayload(): any;
    get hash(): string;
}
//# sourceMappingURL=event.d.ts.map