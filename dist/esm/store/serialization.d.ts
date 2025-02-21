import { IFlag } from "../evaluation/data/IFlag";
import { IVersionedData } from "../IVersionedData";
import { IDataKind } from "../IDataKind";
export interface Flags {
    flags: {
        [name: string]: IFlag;
    };
}
type VersionedFlag = IVersionedData & IFlag;
export interface IPatchData {
    data: VersionedFlag;
    kind: IDataKind;
}
/**
 * @internal
 */
export declare function deserializeAll(flags: IFlag[]): Flags;
/**
 * @internal
 */
export declare function deserializePatch(flags: IFlag[]): IPatchData[];
export {};
//# sourceMappingURL=serialization.d.ts.map