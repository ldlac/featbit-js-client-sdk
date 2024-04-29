import { IDataKind } from "../IDataKind";
import { StoreStorageKey, IKeyedStoreItem, IStoreDataStorage, IStoreItem, IStoreKindData } from "./store";
import { IStore } from "../platform/IStore";
import { IUser } from "../options/IUser";
import { IOptions } from "../options/IOptions";

export default class InMemoryStore implements IStore {

  private allStores: { [DataStoreStorageKey: string]: IStoreDataStorage } = {};

  private store: IStoreDataStorage  = {} as IStoreDataStorage;

  private initCalled = false;

  private _user: IUser = {} as IUser;

  constructor(options: IOptions) {}

  identify(user: IUser) {
    this._user = {...user};

    this.store = this.allStores[`${StoreStorageKey}-${this._user.keyId}`] ?? { flags: {}, version: 0 };
  }

  get user(): IUser {
    return this._user;
  }

  private addItem(kind: IDataKind, key: string, item: IStoreItem) {
    let items = this.store[kind.namespace];
    if (!items) {
      items = {};
      this.store[kind.namespace] = items;
    }
    if (Object.hasOwnProperty.call(items, key)) {
      const old = items[key];
      if (!old || old.version < item.version) {
        items[key] = item;
      }
    } else {
      items[key] = item;
    }

    if (item.version > this.store.version) {
      this.store.version = item.version;
    }

    this.allStores[`${StoreStorageKey}-${this._user.keyId}`] = {...this.store};
  }

  get(kind: IDataKind, key: string): IStoreItem | null {
    const items = this.store[kind.namespace];
    if (items) {
      if (Object.prototype.hasOwnProperty.call(items, key)) {
        const item = items[key];
        if (item) {
          return item;
        }
      }
    }
    return null;
  }

  all(kind: IDataKind): [IStoreKindData, number] {
    const result: IStoreKindData = {};
    const items = this.store[kind.namespace] ?? {};
    Object.entries(items).forEach(([key, item]) => {
      if (item) {
        result[key] = <IStoreItem>item;
      }
    });

    return [result, this.store.version];
  }

  init(allData: IStoreDataStorage, callback: () => void): void {
    this.store = allData as IStoreDataStorage;

    this.store.version = 0;
    Object.keys(allData).map(namespace => {
      Object.entries(allData[namespace]).forEach(([_, item]) => {
        const ele = item as IStoreItem;
        if (ele.version > this.store.version) {
          this.store.version = ele.version;
        }
      })
    });

    this.allStores[`${StoreStorageKey}-${this._user.keyId}`] = {...this.store};
    this.initCalled = true;
    callback?.();
  }

  upsert(kind: IDataKind, data: IKeyedStoreItem, callback: () => void): void {
    this.addItem(kind, data.key, data);
    callback?.();
  }

  initialized(): boolean {
    return this.initCalled;
  }

  /* eslint-disable class-methods-use-this */
  close(): void {
    // For the memory store this is a no-op.
  }

  getDescription(): string {
    return 'in-memory-store';
  }

  get version(): number {
    return this.store.version;
  }
}