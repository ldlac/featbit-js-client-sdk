import { IEventProcessor } from "./IEventProcessor";
import ClientContext from "../options/ClientContext";
import { IEvent } from "./event";
export declare class DefaultEventProcessor implements IEventProcessor {
    private readonly logger;
    private readonly flushInterval;
    private readonly eventDispatcher;
    private readonly eventQueue;
    private closed;
    constructor(clientContext: ClientContext);
    private flushLoop;
    flush(): Promise<any>;
    close(): Promise<void>;
    record(event: IEvent | null): boolean;
}
//# sourceMappingURL=DefaultEventProcessor.d.ts.map