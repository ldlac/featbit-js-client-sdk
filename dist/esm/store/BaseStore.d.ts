import { IStore } from "../platform";
import { IKeyedStoreItem, IStoreDataStorage, IStoreItem, IStoreKindData } from "./store";
import { IUser } from "../options";
import { IDataKind } from "../IDataKind";
export declare class BaseStore implements IStore {
    protected store: IStoreDataStorage;
    protected initCalled: boolean;
    protected _user: IUser;
    constructor();
    identify(user: IUser): Promise<void>;
    get user(): IUser;
    protected addItem(kind: IDataKind, key: string, item: IStoreItem): Promise<void>;
    get(kind: IDataKind, key: string): IStoreItem | null;
    all(kind: IDataKind): [IStoreKindData, number];
    init(allData: IStoreDataStorage): Promise<void>;
    upsert(kind: IDataKind, data: IKeyedStoreItem): Promise<void>;
    initialized(): boolean;
    close(): void;
    get version(): number;
    get description(): string;
    protected saveUser(): Promise<void>;
    protected loadStoreFromStorage(): Promise<void>;
    protected dumpStoreToStorage(): Promise<void>;
}
//# sourceMappingURL=BaseStore.d.ts.map