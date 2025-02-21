"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
class EventEmitter {
    constructor(logger) {
        this.logger = logger;
        this.events = {};
    }
    listeningTo(event) {
        return !!this.events[event];
    }
    on(event, handler, context) {
        this.events[event] = this.events[event] || [];
        this.events[event] = this.events[event].concat({
            handler: handler,
            context: context,
        });
        return this;
    }
    addListener(event, handler, context) {
        return this.on(event, handler, context);
    }
    once(event, handler, context) {
        const onceHandler = (...args) => {
            this.off(event, onceHandler, context);
            handler.apply(context, args);
        };
        return this.on(event, onceHandler, context);
    }
    off(event, handler, context) {
        if (!this.events[event]) {
            return this;
        }
        for (let i = 0; i < this.events[event].length; i++) {
            if (this.events[event][i].handler === handler && this.events[event][i].context === context) {
                this.events[event] = this.events[event].slice(0, i).concat(this.events[event].slice(i + 1));
            }
        }
        return this;
    }
    removeListener(event, handler, context) {
        return this.off(event, handler, context);
    }
    removeAllListeners(event) {
        if (event) {
            delete this.events[event];
        }
        else {
            this.events = {};
        }
        return this;
    }
    listeners(event) {
        return this.events[event] ? this.events[event].map((event) => event.handler) : [];
    }
    emit(event, ...args) {
        if (!this.events[event]) {
            return this;
        }
        // Copy the list of handlers before iterating, in case any handler adds or removes another handler.
        // Any such changes should not affect what we do here-- we want to notify every handler that existed
        // at the moment that the event was fired.
        const copiedHandlers = [...this.events[event]];
        for (let i = 0; i < copiedHandlers.length; i++) {
            copiedHandlers[i].handler.apply(copiedHandlers[i].context, Array.prototype.slice.call(arguments, 1));
        }
        return this;
    }
    listenerCount(event) {
        return this.events[event] ? this.events[event].length : 0;
    }
    prependListener(event, handler, context) {
        this.events[event] = this.events[event] || [];
        this.events[event] = [
            {
                handler: handler,
                context: context,
            },
            ...this.events[event]
        ];
        return this;
    }
    prependOnceListener(event, handler, context) {
        const onceHandler = (...args) => {
            this.off(event, onceHandler, context);
            handler.apply(context, args);
        };
        return this.prependListener(event, onceHandler, context);
    }
    eventNames() {
        return Object.keys(this.events);
    }
    maybeReportError(error) {
        var _a;
        if (!error) {
            return this;
        }
        if (this.listeningTo('error')) {
            this.emit('error', error);
        }
        else {
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.error(error);
        }
        return this;
    }
}
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=EventEmitter.js.map