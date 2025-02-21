import { IDataSynchronizer } from "./IDataSynchronizer";
import Configuration from "../Configuration";
import { EventName, PollingErrorHandler, ProcessStreamResponse } from "./types";
import Requestor from "./Requestor";
import { IUser } from "../options/IUser";
export default class PollingDataSynchronizer implements IDataSynchronizer {
    private readonly requestor;
    private readonly getStoreTimestamp;
    private readonly listeners;
    private readonly errorHandler?;
    private stopped;
    private logger?;
    private pollingInterval;
    private user;
    private timeoutHandle;
    constructor(config: Configuration, requestor: Requestor, getStoreTimestamp: () => number, listeners: Map<EventName, ProcessStreamResponse>, errorHandler?: PollingErrorHandler | undefined);
    private poll;
    identify(user: IUser): void;
    close(): void;
    start(): void;
    stop(): void;
}
//# sourceMappingURL=PollingDataSynchronizer.d.ts.map