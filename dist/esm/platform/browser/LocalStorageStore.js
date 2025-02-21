"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../../store/store");
const BaseStore_1 = require("../../store/BaseStore");
const serializeUser_1 = require("../../utils/serializeUser");
class LocalStorageStore extends BaseStore_1.BaseStore {
    constructor(options) {
        super();
        this.logger = options.logger;
    }
    /* eslint-disable class-methods-use-this */
    close() {
        // For the LocalStorage store this is a no-op.
    }
    get description() {
        return 'local-storage-store';
    }
    // This method needs to be overridden in the child class
    saveUser() {
        return __awaiter(this, void 0, void 0, function* () {
            localStorage.setItem(store_1.CurrentUserStorageKey, (0, serializeUser_1.serializeUser)(this._user));
        });
    }
    dumpStoreToStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            const storageKey = `${store_1.StoreStorageKey}-${this._user.keyId}`;
            localStorage.setItem(storageKey, JSON.stringify(this.store));
        });
    }
    loadStoreFromStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            const storageKey = `${store_1.StoreStorageKey}-${this._user.keyId}`;
            const dataStoreStr = localStorage.getItem(storageKey);
            let store = null;
            try {
                if (dataStoreStr && dataStoreStr.trim().length > 0) {
                    store = JSON.parse(dataStoreStr);
                }
            }
            catch (err) {
                this.logger.error(`error while loading local data store: ${storageKey}`, err);
            }
            if (!!store) {
                this.store = store;
            }
            else {
                this.store = {
                    flags: {},
                    version: 0
                };
            }
        });
    }
}
exports.default = LocalStorageStore;
//# sourceMappingURL=LocalStorageStore.js.map