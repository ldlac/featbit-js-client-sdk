import { IPlatform } from "../IPlatform";
import { IInfo } from "../IInfo";
import { IRequests } from "../requests";
import { IOptions } from "../../options/IOptions";
import { IWebSocketWithEvents } from "../IWebSocket";
export default class BrowserPlatform implements IPlatform {
    info: IInfo;
    requests: IRequests;
    webSocket: IWebSocketWithEvents;
    constructor(options: IOptions);
}
//# sourceMappingURL=BrowserPlatform.d.ts.map