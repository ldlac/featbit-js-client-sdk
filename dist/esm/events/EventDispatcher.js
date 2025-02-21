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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDispatcher = void 0;
const IEventSender_1 = require("./IEventSender");
const DefaultEventQueue_1 = require("./DefaultEventQueue");
const DefaultEventSender_1 = require("./DefaultEventSender");
const event_1 = require("./event");
const DefaultEventSerializer_1 = require("./DefaultEventSerializer");
const sleep_1 = __importDefault(require("../utils/sleep"));
class EventDispatcher {
    constructor(clientContext, queue) {
        this.maxEventPerRequest = 50;
        this.stopped = false;
        const { logger, maxEventsInQueue } = clientContext;
        this.logger = logger;
        this.buffer = new DefaultEventQueue_1.DefaultEventQueue(maxEventsInQueue, this.logger);
        this.sender = new DefaultEventSender_1.DefaultEventSender(clientContext);
        this.serializer = new DefaultEventSerializer_1.DefaultEventSerializer();
        this.dispatchLoop(queue).then();
    }
    dispatchLoop(queue) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('Start dispatch loop.');
            let running = true;
            while (running) {
                try {
                    const event = queue.shift();
                    if (event === undefined) {
                        yield (0, sleep_1.default)(1000);
                        continue;
                    }
                    if (event instanceof event_1.PayloadEvent) {
                        this.addEventToBuffer(event);
                    }
                    else if (event instanceof event_1.FlushEvent) {
                        yield this.triggerFlush(event);
                    }
                    else if (event instanceof event_1.ShutdownEvent) {
                        yield this.triggerFlush(event);
                        this.stopped = true;
                        running = false;
                    }
                }
                catch (err) {
                    this.logger.error('Unexpected error in event dispatcher.', err);
                }
            }
            this.logger.debug('Finish dispatch loop.');
        });
    }
    addEventToBuffer(event) {
        if (this.stopped) {
            return;
        }
        if (this.buffer.addEvent(event)) {
            this.logger.debug('Added event to buffer.');
        }
        else {
            this.logger.warn('Exceeded event queue capacity, event will be dropped. Increase capacity to avoid dropping events.');
        }
    }
    triggerFlush(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.stopped) {
                event.complete();
                return;
            }
            if (this.buffer.isEmpty) {
                event.complete();
                this.logger.debug('Flush empty buffer.');
                // There are no events to flush. If we don't complete the message, then the async task may never
                // complete (if it had a non-zero positive timeout, then it would complete after the timeout).
                return;
            }
            const snapshot = this.buffer.eventsSnapshot;
            this.buffer.clear();
            try {
                yield this.flushEvents(snapshot);
                this.logger.debug(`${snapshot.length} events has been flushed.`);
            }
            catch (err) {
                this.logger.warn('Exception happened when flushing events', err);
            }
            event.complete();
        });
    }
    flushEvents(events) {
        return __awaiter(this, void 0, void 0, function* () {
            events = this.getUniqueEvents(events);
            const total = events.length;
            for (let i = 0; i < total; i += this.maxEventPerRequest) {
                const length = Math.min(this.maxEventPerRequest, total - i);
                const slice = events.slice(i, i + length);
                const payload = this.serializer.serialize(slice);
                const { status } = yield this.sender.send(payload, true);
                if (status === IEventSender_1.DeliveryStatus.FailedAndMustShutDown) {
                    this.stopped = true;
                }
            }
        });
    }
    getUniqueEvents(events) {
        const uniqueEvents = [];
        const hashes = [];
        for (const event of events) {
            if (!hashes.includes(event.hash)) {
                uniqueEvents.push(event);
                hashes.push(event.hash);
            }
        }
        return uniqueEvents;
    }
}
exports.EventDispatcher = EventDispatcher;
//# sourceMappingURL=EventDispatcher.js.map