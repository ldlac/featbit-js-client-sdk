import { IRequestor } from "./IRequestor";
import Configuration from "../Configuration";
import { IInfo } from "../platform/IInfo";
import { IRequests } from "../platform/requests";
/**
 * @internal
 */
export default class Requestor implements IRequestor {
    private readonly requests;
    private readonly headers;
    private readonly uri;
    constructor(sdkKey: string, config: Configuration, info: IInfo, requests: IRequests);
    /**
     * Perform a request and utilize the ETag cache. The ETags are cached in the
     * requestor instance.
     */
    private request;
    requestData(timestamp: number, payload: any, cb: (err: any, body: any) => void): Promise<void>;
}
//# sourceMappingURL=Requestor.d.ts.map