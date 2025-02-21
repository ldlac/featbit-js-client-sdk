import { IDataSynchronizer } from "./IDataSynchronizer";
import ClientContext from "../options/ClientContext";
import { EventName, ProcessStreamResponse } from "./types";
import { IWebSocketWithEvents } from "../platform/IWebSocket";
import { IUser } from "../options/IUser";
declare class WebSocketDataSynchronizer implements IDataSynchronizer {
    private readonly getStoreTimestamp;
    private readonly listeners;
    private socket?;
    private readonly logger?;
    private connectionAttemptStartTime?;
    constructor(sdkKey: string, user: IUser, clientContext: ClientContext, socket: IWebSocketWithEvents, getStoreTimestamp: () => number, listeners: Map<EventName, ProcessStreamResponse>, webSocketPingInterval: number);
    identify(user: IUser): void;
    start(): void;
    private logConnectionStarted;
    close(): void;
    stop(): void;
}
export default WebSocketDataSynchronizer;
//# sourceMappingURL=WebSocketDataSynchronizer.d.ts.map