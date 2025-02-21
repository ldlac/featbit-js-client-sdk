import { IInfo, IPlatformData, ISdkData } from "../IInfo";
export default class BrowserInfo implements IInfo {
    get appType(): string;
    platformData(): IPlatformData;
    sdkData(): ISdkData;
}
//# sourceMappingURL=BrowserInfo.d.ts.map