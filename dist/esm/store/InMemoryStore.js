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
const store_1 = require("./store");
const BaseStore_1 = require("./BaseStore");
class InMemoryStore extends BaseStore_1.BaseStore {
    constructor() {
        super();
        this.allStores = {};
    }
    /* eslint-disable class-methods-use-this */
    close() {
        // For the LocalStorage store this is a no-op.
    }
    get description() {
        return 'in-memory-store';
    }
    saveUser() {
        return __awaiter(this, void 0, void 0, function* () {
            // For in-memory store, this is a no-op.
        });
    }
    dumpStoreToStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            const storageKey = `${store_1.StoreStorageKey}-${this._user.keyId}`;
            this.allStores[storageKey] = Object.assign({}, this.store);
        });
    }
    loadStoreFromStorage() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const storageKey = `${store_1.StoreStorageKey}-${this._user.keyId}`;
            this.store = (_a = this.allStores[storageKey]) !== null && _a !== void 0 ? _a : { flags: {}, version: 0 };
        });
    }
}
exports.default = InMemoryStore;
//# sourceMappingURL=InMemoryStore.js.map