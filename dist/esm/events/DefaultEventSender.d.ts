import { IEventSender, IEventSenderResult } from "./IEventSender";
import ClientContext from "../options/ClientContext";
export declare class DefaultEventSender implements IEventSender {
    private readonly defaultHeaders;
    private readonly eventsUri;
    private requests;
    constructor(clientContext: ClientContext);
    send(payload: string, retry: boolean): Promise<IEventSenderResult>;
}
//# sourceMappingURL=DefaultEventSender.d.ts.map