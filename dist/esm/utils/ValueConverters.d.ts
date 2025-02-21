export interface IConvertResult<TValue> {
    isSucceeded: boolean;
    value?: TValue;
}
export declare class ValueConverters {
    static bool(value: string): IConvertResult<boolean>;
    static number(value: string): IConvertResult<number>;
    static string(value: string): IConvertResult<string>;
    static json(value: string): IConvertResult<unknown>;
    private static success;
    private static error;
}
//# sourceMappingURL=ValueConverters.d.ts.map