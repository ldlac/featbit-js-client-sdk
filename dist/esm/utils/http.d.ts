import { IInfo } from "../platform/IInfo";
export type Headers = {
    Authorization: string;
    'User-Agent': string;
    'Content-Type': string;
};
export declare function defaultHeaders(sdkKey: string, info: IInfo): Headers;
export declare function httpErrorMessage(err: {
    status: number;
    message: string;
}, context: string, retryMessage?: string): string;
//# sourceMappingURL=http.d.ts.map