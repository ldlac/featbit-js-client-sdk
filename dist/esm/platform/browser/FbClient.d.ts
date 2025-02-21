import { FbClientCore } from "../../FbClientCore";
import { IOptions } from "../../options/IOptions";
import { IEventEmitter } from "../../utils/IEventEmitter";
import { IPlatform } from "../IPlatform";
/**
 * @ignore
 */
declare class FbClient extends FbClientCore {
    emitter: IEventEmitter;
    constructor(options: IOptions, platform?: IPlatform | undefined);
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
} & typeof FbClient;
export default _default;
//# sourceMappingURL=FbClient.d.ts.map