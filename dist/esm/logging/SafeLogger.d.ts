import { ILogger } from "./ILogger";
/**
 * The safeLogger logic exists because we allow the application to pass in a custom logger, but
 * there is no guarantee that the logger works correctly and if it ever throws exceptions there
 * could be serious consequences (e.g. an uncaught exception within an error event handler, due
 * to the SDK trying to log the error, can terminate the application). An exception could result
 * from faulty logic in the logger implementation, or it could be that this is not a logger at
 * all but some other kind of object; the former is handled by a catch block that logs an error
 * message to the SDK's default logger, and we can at least partly guard against the latter by
 * checking for the presence of required methods at configuration time.
 */
export declare class SafeLogger implements ILogger {
    private logger;
    private fallback;
    /**
     * Construct a safe logger with the specified logger.
     * @param logger The logger to use.
     * @param fallback A fallback logger to use in case an issue is  encountered using
     * the provided logger.
     */
    constructor(logger: ILogger, fallback: ILogger);
    private log;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
    debug(...args: any[]): void;
}
//# sourceMappingURL=SafeLogger.d.ts.map