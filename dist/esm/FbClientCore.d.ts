import { IFbClientCore } from "./IFbClientCore";
import { IPlatform } from "./platform/IPlatform";
import { ILogger } from "./logging/ILogger";
import { IEvalDetail } from "./evaluation/IEvalDetail";
import { IConvertResult } from "./utils/ValueConverters";
import { IOptions } from "./options/IOptions";
import { IUser } from "./options/IUser";
export interface IClientCallbacks {
    onError: (err: Error) => void;
    onFailed: (err: Error) => void;
    onReady: () => void;
    onUpdate: (keys: string[]) => void;
    hasEventListeners: () => boolean;
}
export declare class FbClientCore implements IFbClientCore {
    private options;
    private platform;
    private state;
    private store?;
    private dataSynchronizer?;
    private eventProcessor?;
    private evaluator?;
    private initResolve?;
    private initReject?;
    private rejectionReason;
    private initializedPromise?;
    private config;
    private dataSourceUpdates?;
    private onError;
    private onFailed;
    private onReady;
    logger?: ILogger;
    constructor(options: IOptions, platform: IPlatform, callbacks: IClientCallbacks);
    private init;
    identify(user: IUser): Promise<void>;
    private start;
    initialized(): boolean;
    waitForInitialization(): Promise<IFbClientCore>;
    boolVariation(key: string, defaultValue: boolean): boolean;
    boolVariationDetail(key: string, defaultValue: boolean): IEvalDetail<boolean>;
    jsonVariation(key: string, defaultValue: any): any;
    jsonVariationDetail(key: string, defaultValue: any): IEvalDetail<any>;
    numberVariation(key: string, defaultValue: number): number;
    numberVariationDetail(key: string, defaultValue: number): IEvalDetail<number>;
    stringVariation(key: string, defaultValue: string): string;
    stringVariationDetail(key: string, defaultValue: string): IEvalDetail<string>;
    variation(key: string, defaultValue: string): string;
    variationDetail(key: string, defaultValue: string): IEvalDetail<string>;
    getAllVariations(): Promise<IEvalDetail<string>[]>;
    close(): Promise<void>;
    track(eventName: string, metricValue?: number | undefined): void;
    flush(callback?: (res: boolean) => void): Promise<boolean>;
    evaluateCore<TValue>(flagKey: string, defaultValue: TValue, typeConverter: (value: string) => IConvertResult<TValue>): IEvalDetail<TValue>;
    private dataSourceErrorHandler;
    private initSuccess;
}
//# sourceMappingURL=FbClientCore.d.ts.map