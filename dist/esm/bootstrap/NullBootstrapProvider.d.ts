import { IBootstrapProvider } from "./IBootstrapProvider";
import { IDataSourceUpdates } from "../store/IDataSourceUpdates";
export declare class NullBootstrapProvider implements IBootstrapProvider {
    private dataSet?;
    constructor();
    populate(userKeyId: string, dataSourceUpdates: IDataSourceUpdates, callback?: () => void): Promise<void>;
}
//# sourceMappingURL=NullBootstrapProvider.d.ts.map