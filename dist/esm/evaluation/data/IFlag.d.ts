export type FlagValue = any;
export declare enum VariationDataType {
    string = "string",
    boolean = "boolean",
    number = "number",
    json = "json",
    empty = ""
}
export interface IVariation {
    id: number;
    value: FlagValue;
}
export interface IFlagBase {
    id: string;
    variation: FlagValue;
    variationType: VariationDataType;
    sendToExperiment?: boolean;
    timestamp?: number;
    variationOptions?: IVariation[];
}
export interface IFlag extends IFlagBase {
    key: string;
    variations: IVariation[];
    version: number;
}
//# sourceMappingURL=IFlag.d.ts.map