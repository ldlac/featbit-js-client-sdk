import { ILogger } from "./ILogger";
import { IBasicLoggerOptions } from "./IBasicLoggerOptions";
/**
 * A basic logger which handles filtering by level.
 *
 * With the default options it will write to `console.error`
 * and it will use the formatting provided by `console.error`.
 * If the destination is overwritten, then it will use an included
 * formatter similar to `util.format`.
 *
 * If a formatter is available, then that should be overridden
 * as well for performance.
 */
export declare class BasicLogger implements ILogger {
    private logLevel;
    private name;
    private destination?;
    private formatter?;
    /**
     * This should only be used as a default fallback and not as a convenient
     * solution. In most cases you should construct a new instance with the
     * appropriate options for your specific needs.
     */
    static get(): BasicLogger;
    constructor(options: IBasicLoggerOptions);
    private tryFormat;
    private tryWrite;
    private log;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
    debug(...args: any[]): void;
}
//# sourceMappingURL=BasicLogger.d.ts.map