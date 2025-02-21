"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestLogger = void 0;
class TestLogger {
    constructor() {
        this.logs = [];
    }
    error(...args) {
        this.logs.push(args.join(' '));
    }
    warn(...args) {
        this.logs.push(args.join(' '));
    }
    info(...args) {
        this.logs.push(args.join(' '));
    }
    debug(...args) {
        this.logs.push(args.join(' '));
    }
    reset() {
        this.logs = [];
    }
}
exports.TestLogger = TestLogger;
//# sourceMappingURL=TestLogger.js.map