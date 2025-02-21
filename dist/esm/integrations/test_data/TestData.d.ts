import { IFlag } from "../../evaluation/data/IFlag";
import TestDataSynchronizer from "./TestDataSynchronizer";
import { IClientContext } from "../../options/IClientContext";
import { IDataSourceUpdates } from "../../store/IDataSourceUpdates";
import { VoidFunction } from "../../utils/VoidFunction";
import { IStore } from "../../platform/IStore";
export default class TestData {
    private currentFlags;
    private dataSynchronizer;
    private store;
    /**
     * Get a factory for update processors that will be attached to this TestData instance.
     * @returns An update processor factory.
     */
    getFactory(): (clientContext: IClientContext, store: IStore, dataSourceUpdates: IDataSourceUpdates, initSuccessHandler: VoidFunction, _errorHandler?: ((e: Error) => void) | undefined) => TestDataSynchronizer;
    update(flag: IFlag): Promise<void>;
}
//# sourceMappingURL=TestData.d.ts.map