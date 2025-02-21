"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullEventProcessor = void 0;
class NullEventProcessor {
    flush() {
        return Promise.resolve();
    }
    close() {
        return Promise.resolve();
    }
    record(event) {
        return false;
    }
}
exports.NullEventProcessor = NullEventProcessor;
//# sourceMappingURL=NullEventProcessor.js.map