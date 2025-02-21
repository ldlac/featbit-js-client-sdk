import { IDataSourceUpdates } from "../store/IDataSourceUpdates";
import { IStoreDataStorage, IKeyedStoreItem } from "../store/store";
import { IStore } from "../platform/IStore";
import { IDataKind } from "../IDataKind";
/**
 * @internal
 */
export default class DataSourceUpdates implements IDataSourceUpdates {
    private readonly store;
    private readonly hasEventListeners;
    private readonly onChange;
    constructor(store: IStore, hasEventListeners: () => boolean, onChange: (keys: string[]) => void);
    init(userKeyId: string, allData: IStoreDataStorage, callback?: () => void): void;
    upsert(userKeyId: string, kind: IDataKind, data: IKeyedStoreItem, callback: () => void): void;
    private isUpdated;
}
//# sourceMappingURL=DataSourceUpdates.d.ts.map