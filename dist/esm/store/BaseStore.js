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
exports.BaseStore = void 0;
class BaseStore {
    constructor() {
        this.store = {};
        this.initCalled = false;
        this._user = {};
    }
    identify(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this._user = Object.assign({}, user);
            yield this.saveUser();
            yield this.loadStoreFromStorage();
        });
    }
    get user() {
        return this._user;
    }
    addItem(kind, key, item) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            else {
                items[key] = item;
            }
            if (item.version > this.store.version) {
                this.store.version = item.version;
            }
            yield this.dumpStoreToStorage();
        });
    }
    get(kind, key) {
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
    all(kind) {
        var _a;
        const result = {};
        const items = (_a = this.store[kind.namespace]) !== null && _a !== void 0 ? _a : {};
        Object.entries(items).forEach(([key, item]) => {
            if (item) {
                result[key] = item;
            }
        });
        return [result, this.store.version];
    }
    init(allData) {
        return __awaiter(this, void 0, void 0, function* () {
            this.store = allData;
            Object.keys(allData).map(namespace => {
                Object.entries(allData[namespace]).forEach(([_, item]) => {
                    const ele = item;
                    if (ele.version > this.store.version) {
                        this.store.version = ele.version;
                    }
                });
            });
            yield this.dumpStoreToStorage();
            this.initCalled = true;
        });
    }
    upsert(kind, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.addItem(kind, data.key, data);
        });
    }
    initialized() {
        return this.initCalled;
    }
    /* eslint-disable class-methods-use-this */
    close() {
        // For the LocalStorage store this is a no-op.
    }
    get version() {
        return this.store.version;
    }
    // This getter needs to be overridden in the child class
    get description() {
        return '';
    }
    // This method needs to be overridden in the child class
    saveUser() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    // This method needs to be overridden in the child class
    loadStoreFromStorage() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    // This method needs to be overridden in the child class
    dumpStoreToStorage() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.BaseStore = BaseStore;
//# sourceMappingURL=BaseStore.js.map