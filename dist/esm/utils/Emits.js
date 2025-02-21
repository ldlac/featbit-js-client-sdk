"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emits = void 0;
/**
 * Adds the implementation of an event emitter to something that contains
 * a field of `emitter` with type `EventEmitter`.
 * @param Base The class to derive the mixin from.
 * @returns A class extending the base with an event emitter.
 */
function Emits(Base) {
    return class WithEvents extends Base {
        on(eventName, listener, context) {
            this.emitter.on(eventName, listener, context);
            return this;
        }
        addListener(eventName, listener, context) {
            this.emitter.addListener(eventName, listener, context);
            return this;
        }
        once(eventName, listener, context) {
            this.emitter.once(eventName, listener, context);
            return this;
        }
        removeListener(eventName, listener, context) {
            this.emitter.removeListener(eventName, listener, context);
            return this;
        }
        off(eventName, listener, context) {
            this.emitter.off(eventName, listener, context);
            return this;
        }
        removeAllListeners(event) {
            this.emitter.removeAllListeners(event);
            return this;
        }
        listeners(eventName) {
            return this.emitter.listeners(eventName);
        }
        emit(eventName, ...args) {
            this.emitter.emit(eventName, args);
            return this;
        }
        listenerCount(eventName) {
            return this.emitter.listenerCount(eventName);
        }
        prependListener(eventName, listener, context) {
            this.emitter.prependListener(eventName, listener, context);
            return this;
        }
        prependOnceListener(eventName, listener, context) {
            this.emitter.prependOnceListener(eventName, listener, context);
            return this;
        }
        eventNames() {
            return this.emitter.eventNames();
        }
        maybeReportError(error) {
            this.emitter.maybeReportError(error);
            return this;
        }
    };
}
exports.Emits = Emits;
//# sourceMappingURL=Emits.js.map