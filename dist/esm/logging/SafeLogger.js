"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeLogger = void 0;
const Validators_1 = require("../options/Validators");
const loggerRequirements = {
    error: Validators_1.TypeValidators.Function,
    warn: Validators_1.TypeValidators.Function,
    info: Validators_1.TypeValidators.Function,
    debug: Validators_1.TypeValidators.Function,
};
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
class SafeLogger {
    /**
     * Construct a safe logger with the specified logger.
     * @param logger The logger to use.
     * @param fallback A fallback logger to use in case an issue is  encountered using
     * the provided logger.
     */
    constructor(logger, fallback) {
        Object.entries(loggerRequirements).forEach(([level, validator]) => {
            if (!validator.is(logger[level])) {
                throw new Error(`Provided logger instance must support logger.${level}(...) method`);
                // Note that the SDK normally does not throw exceptions to the application, but that rule
                // does not apply to FbClientNode.init() which will throw an exception if the parameters are so
                // invalid that we cannot proceed with creating the client. An invalid logger meets those
                // criteria since the SDK calls the logger during nearly all of its operations.
            }
        });
        this.logger = logger;
        this.fallback = fallback;
    }
    log(level, args) {
        try {
            this.logger[level](...args);
        }
        catch (_a) {
            // If all else fails do not break.
            this.fallback[level](...args);
        }
    }
    error(...args) {
        this.log('error', args);
    }
    warn(...args) {
        this.log('warn', args);
    }
    info(...args) {
        this.log('info', args);
    }
    debug(...args) {
        this.log('debug', args);
    }
}
exports.SafeLogger = SafeLogger;
//# sourceMappingURL=SafeLogger.js.map