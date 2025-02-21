import { IFlag, VariationDataType, IVariation, FlagValue } from "../../evaluation/data/IFlag";
export declare class FlagBuilder {
    private _id;
    private _key?;
    private _version?;
    private _variationType;
    private _sendToExperiment;
    private _variation;
    private _variations;
    id(id: string): FlagBuilder;
    key(key: string): FlagBuilder;
    version(version: number): FlagBuilder;
    sendToExperiment(val: boolean): FlagBuilder;
    variation(variation: FlagValue): FlagBuilder;
    variationType(variationType: VariationDataType): FlagBuilder;
    variations(variations: IVariation[]): FlagBuilder;
    build(): IFlag;
}
//# sourceMappingURL=FlagBuilder.d.ts.map