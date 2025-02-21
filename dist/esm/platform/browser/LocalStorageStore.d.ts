import { IOptions } from "../../options/IOptions";
import { BaseStore } from "../../store/BaseStore";
export default class LocalStorageStore extends BaseStore {
    private logger;
    constructor(options: IOptions);
    close(): void;
    get description(): string;
    protected saveUser(): Promise<void>;
    protected dumpStoreToStorage(): Promise<void>;
    protected loadStoreFromStorage(): Promise<void>;
}
//# sourceMappingURL=LocalStorageStore.d.ts.map