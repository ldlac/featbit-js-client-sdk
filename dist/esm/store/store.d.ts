export declare const StoreStorageKey = "fb-datastore";
export declare const CurrentUserStorageKey = "fb-user";
/**
 * Represents an item which can be stored in the feature store.
 */
export interface IStoreItem {
    version: number;
    [attribute: string]: any;
}
/**
 * When upserting an item it must contain a key.
 */
export interface IKeyedStoreItem extends IStoreItem {
    key: string;
}
/**
 * Represents the storage for a single kind of data. e.g. 'flag' or 'segment'.
 */
export interface IStoreKindData {
    [key: string]: IStoreItem;
}
/**
 * Represents the storage for the full data store.
 */
export interface IStoreDataStorage {
    flags: IStoreKindData;
    version: number;
    [attribute: string]: any;
}
//# sourceMappingURL=store.d.ts.map