"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicLogger = void 0;
const format_1 = __importDefault(require("./format"));
const LogPriority = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    none: 4,
};
const LevelNames = ['debug', 'info', 'warn', 'error', 'none'];
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
class BasicLogger {
    /**
     * This should only be used as a default fallback and not as a convenient
     * solution. In most cases you should construct a new instance with the
     * appropriate options for your specific needs.
     */
    static get() {
        return new BasicLogger({});
    }
    constructor(options) {
        var _a, _b, _c;
        this.logLevel = (_b = LogPriority[(_a = options.level) !== null && _a !== void 0 ? _a : 'info']) !== null && _b !== void 0 ? _b : LogPriority.info;
        this.name = (_c = options.name) !== null && _c !== void 0 ? _c : 'FeatBit';
        // eslint-disable-next-line no-console
        this.destination = options.destination;
        this.formatter = options.formatter;
    }
    tryFormat(...args) {
        var _a;
        try {
            if (this.formatter) {
                // In case the provided formatter fails.
                return (_a = this.formatter) === null || _a === void 0 ? void 0 : _a.call(this, ...args);
            }
            return (0, format_1.default)(...args);
        }
        catch (_b) {
            return (0, format_1.default)(...args);
        }
    }
    tryWrite(msg) {
        try {
            this.destination(msg);
        }
        catch (_a) {
            // eslint-disable-next-line no-console
            console.error(msg);
        }
    }
    log(level, args) {
        if (level >= this.logLevel) {
            const prefix = `${LevelNames[level]}: [${this.name}]`;
            try {
                if (this.destination) {
                    this.tryWrite(`${prefix} ${this.tryFormat(...args)}`);
                }
                else {
                    // `console.error` has its own formatter.
                    // So we don't need to do anything.
                    // eslint-disable-next-line no-console
                    console.error(...args);
                }
            }
            catch (_a) {
                // If all else fails do not break.
                // eslint-disable-next-line no-console
                console.error(...args);
            }
        }
    }
    error(...args) {
        this.log(LogPriority.error, args);
    }
    warn(...args) {
        this.log(LogPriority.warn, args);
    }
    info(...args) {
        this.log(LogPriority.info, args);
    }
    debug(...args) {
        this.log(LogPriority.debug, args);
    }
}
exports.BasicLogger = BasicLogger;
//# sourceMappingURL=BasicLogger.js.map