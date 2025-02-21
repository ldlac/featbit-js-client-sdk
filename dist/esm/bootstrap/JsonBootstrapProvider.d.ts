import { IBootstrapProvider } from "./IBootstrapProvider";
import { IDataSourceUpdates } from "../store/IDataSourceUpdates";
import { IFlagBase } from "../evaluation/data/IFlag";
export declare class JsonBootstrapProvider implements IBootstrapProvider {
    private dataSet?;
    constructor(bootstrap: IFlagBase[]);
    populate(userKeyId: string, dataSourceUpdates: IDataSourceUpdates, callback?: () => void): Promise<void>;
}
//# sourceMappingURL=JsonBootstrapProvider.d.ts.map