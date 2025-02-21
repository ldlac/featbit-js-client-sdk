"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultEventQueue = void 0;
class DefaultEventQueue {
    constructor(capacity, logger) {
        this.capacity = capacity;
        this.logger = logger;
        this.closed = false;
        this.events = [];
    }
    addEvent(event) {
        if (this.closed) {
            return false;
        }
        if (this.events.length >= this.capacity) {
            this.logger.warn("Events are being produced faster than they can be processed. We shouldn't see this.");
            return false;
        }
        this.events.push(event);
        return true;
    }
    clear() {
        this.events = [];
    }
    shift() {
        return this.events.shift();
    }
    close() {
        this.closed = true;
    }
    get eventsSnapshot() {
        return [...this.events];
    }
    get length() {
        return this.events.length;
    }
    get isEmpty() {
        return this.length === 0;
    }
}
exports.DefaultEventQueue = DefaultEventQueue;
//# sourceMappingURL=DefaultEventQueue.js.map