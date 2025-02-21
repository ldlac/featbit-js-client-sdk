import { IEventProcessor } from "./IEventProcessor";
import { IEvent } from "./event";
export declare class NullEventProcessor implements IEventProcessor {
    flush(): Promise<void>;
    close(): Promise<void>;
    record(event: IEvent | null): boolean;
}
//# sourceMappingURL=NullEventProcessor.d.ts.map