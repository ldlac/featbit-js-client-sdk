import { ILogger } from "../logging/ILogger";
export declare class TestLogger implements ILogger {
    logs: string[];
    error(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
    debug(...args: any[]): void;
    reset(): void;
}
//# sourceMappingURL=TestLogger.d.ts.map