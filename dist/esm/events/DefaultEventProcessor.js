"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultEventProcessor = void 0;
const EventDispatcher_1 = require("./EventDispatcher");
const event_1 = require("./event");
const isNullOrUndefined_1 = require("../utils/isNullOrUndefined");
const DefaultEventQueue_1 = require("./DefaultEventQueue");
class DefaultEventProcessor {
    constructor(clientContext) {
        this.closed = false;
        const { logger, flushInterval, maxEventsInQueue } = clientContext;
        this.logger = logger;
        this.flushInterval = flushInterval;
        this.eventQueue = new DefaultEventQueue_1.DefaultEventQueue(maxEventsInQueue, this.logger);
        this.eventDispatcher = new EventDispatcher_1.EventDispatcher(clientContext, this.eventQueue);
        this.flushLoop();
    }
    flushLoop() {
        if (this.closed) {
            return;
        }
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.flush();
            }
            catch (err) {
                this.logger.error('Unexpected error while flushing events in event processor.', err);
            }
            this.flushLoop();
        }), this.flushInterval);
    }
    flush() {
        const flushEvent = new event_1.FlushEvent();
        this.record(flushEvent);
        return flushEvent.waitForCompletion();
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.closed) {
                return;
            }
            // send a shutdown event to dispatcher
            const shutdown = new event_1.ShutdownEvent();
            this.record(shutdown);
            try {
                yield shutdown.waitForCompletion();
            }
            catch (err) {
                this.logger.error('Event processor shutdown but not complete.');
            }
            // mark the event queue as complete for adding
            this.eventQueue.close();
            this.closed = true;
        });
    }
    record(event) {
        if ((0, isNullOrUndefined_1.isNullOrUndefined)(event)) {
            return false;
        }
        if (!this.eventQueue.addEvent(event)) {
            if (event instanceof event_1.FlushEvent) {
                event.complete();
            }
            return false;
        }
        return true;
    }
}
exports.DefaultEventProcessor = DefaultEventProcessor;
//# sourceMappingURL=DefaultEventProcessor.js.map