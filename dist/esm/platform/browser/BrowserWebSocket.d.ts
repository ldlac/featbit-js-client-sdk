import { IWebSocket, IWebSocketConfig } from "../IWebSocket";
import { IEventEmitter } from "../../utils/IEventEmitter";
import { IUser } from "../../options/IUser";
declare class BrowserWebSocket implements IWebSocket {
    emitter: IEventEmitter;
    private ws?;
    private retryCounter;
    private closed;
    private _config;
    constructor();
    identify(user: IUser): void;
    connect(): void;
    close(): void;
    config(param: IWebSocketConfig): void;
    private sendPingMessage;
    private doDataSync;
    private reconnect;
}
declare const _default: {
    new (...args: any[]): {
        on(eventName: string | symbol, listener: (...args: any[]) => void, context?: any): any;
        addListener(eventName: string | symbol, listener: (...args: any[]) => void, context?: any): any;
        once(eventName: string | symbol, listener: (...args: any[]) => void, context?: any): any;
        removeListener(eventName: string | symbol, listener: (...args: any[]) => void, context?: any): any;
        off(eventName: string | symbol, listener: (...args: any) => void, context?: any): any;
        removeAllListeners(event?: string | symbol | undefined): any;
        listeners(eventName: string | symbol): Function[];
        emit(eventName: string | symbol, ...args: any[]): any;
        listenerCount(eventName: string | symbol): number;
        prependListener(eventName: string | symbol, listener: (...args: any[]) => void, context?: any): any;
        prependOnceListener(eventName: string | symbol, listener: (...args: any[]) => void, context?: any): any;
        eventNames(): (string | symbol)[];
        maybeReportError(error: any): any;
        emitter: IEventEmitter;
    };
} & typeof BrowserWebSocket;
export default _default;
//# sourceMappingURL=BrowserWebSocket.d.ts.map