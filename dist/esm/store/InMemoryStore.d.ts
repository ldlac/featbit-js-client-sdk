import { BaseStore } from "./BaseStore";
export default class InMemoryStore extends BaseStore {
    private allStores;
    constructor();
    close(): void;
    get description(): string;
    protected saveUser(): Promise<void>;
    protected dumpStoreToStorage(): Promise<void>;
    protected loadStoreFromStorage(): Promise<void>;
}
//# sourceMappingURL=InMemoryStore.d.ts.map