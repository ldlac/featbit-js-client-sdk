export declare class PollingError extends Error {
    readonly status?: number;
    constructor(message: string, status?: number);
}
export declare class StreamingError extends Error {
    readonly code?: number;
    constructor(message: string, code?: number);
}
export declare class UnexpectedResponseError extends Error {
    constructor(message: string);
}
export declare class ClientError extends Error {
    constructor(message: string);
}
export declare class TimeoutError extends Error {
    constructor(message: string);
}
export declare function isHttpRecoverable(status: number): boolean;
//# sourceMappingURL=errors.d.ts.map