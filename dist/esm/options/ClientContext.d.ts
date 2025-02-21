import { ILogger } from "../logging/ILogger";
import { IPlatform } from "../platform/IPlatform";
import { IClientContext } from "./IClientContext";
/**
 * The client context provides basic configuration and platform support which are required
 * when building SDK components.
 */
export default class ClientContext implements IClientContext {
    readonly sdkKey: string;
    readonly platform: IPlatform;
    flushInterval: number;
    maxEventsInQueue: number;
    offline: boolean;
    logger: ILogger;
    eventsUri: string;
    pollingUri: string;
    streamingUri: string;
    constructor(sdkKey: string, configuration: {
        logger?: ILogger;
        offline?: boolean;
        flushInterval: number;
        maxEventsInQueue: number;
        streamingUri: string;
        pollingUri: string;
        eventsUri: string;
    }, platform: IPlatform);
}
//# sourceMappingURL=ClientContext.d.ts.map