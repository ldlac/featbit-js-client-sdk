import { IEventEmitter } from "./IEventEmitter";
export type EventableConstructor<T = {}> = new (...args: any[]) => T;
export type Eventable = EventableConstructor<{
    emitter: IEventEmitter;
}>;
/**
 * Adds the implementation of an event emitter to something that contains
 * a field of `emitter` with type `EventEmitter`.
 * @param Base The class to derive the mixin from.
 * @returns A class extending the base with an event emitter.
 */
export declare function Emits<TBase extends Eventable>(Base: TBase): {
    new (...args: any[]): {
        on(eventName: string | symbol, listener: (...args: any[]) => void, context?: any): this;
        addListener(eventName: string | symbol, listener: (...args: any[]) => void, context?: any): this;
        once(eventName: string | symbol, listener: (...args: any[]) => void, context?: any): this;
        removeListener(eventName: string | symbol, listener: (...args: any[]) => void, context?: any): this;
        off(eventName: string | symbol, listener: (...args: any) => void, context?: any): this;
        removeAllListeners(event?: string | symbol): this;
        listeners(eventName: string | symbol): Function[];
        emit(eventName: string | symbol, ...args: any[]): this;
        listenerCount(eventName: string | symbol): number;
        prependListener(eventName: string | symbol, listener: (...args: any[]) => void, context?: any): this;
        prependOnceListener(eventName: string | symbol, listener: (...args: any[]) => void, context?: any): this;
        eventNames(): (string | symbol)[];
        maybeReportError(error: any): this;
        emitter: IEventEmitter;
    };
} & TBase;
//# sourceMappingURL=Emits.d.ts.map