import ClientContext from "../options/ClientContext";
import { IEventQueue } from "./IEventQueue";
export declare class EventDispatcher {
    private readonly logger;
    private sender;
    private buffer;
    private serializer;
    private maxEventPerRequest;
    private stopped;
    constructor(clientContext: ClientContext, queue: IEventQueue);
    private dispatchLoop;
    private addEventToBuffer;
    private triggerFlush;
    private flushEvents;
    private getUniqueEvents;
}
//# sourceMappingURL=EventDispatcher.d.ts.map