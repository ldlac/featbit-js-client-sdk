import { IEventQueue } from "./IEventQueue";
import { IEvent } from "./event";
import { ILogger } from "../logging/ILogger";
export declare class DefaultEventQueue implements IEventQueue {
    private readonly capacity;
    private readonly logger;
    private events;
    private closed;
    constructor(capacity: number, logger: ILogger);
    addEvent(event: IEvent): boolean;
    clear(): void;
    shift(): IEvent | undefined;
    close(): void;
    get eventsSnapshot(): IEvent[];
    get length(): number;
    get isEmpty(): boolean;
}
//# sourceMappingURL=DefaultEventQueue.d.ts.map