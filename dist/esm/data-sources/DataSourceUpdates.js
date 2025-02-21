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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataKinds_1 = __importDefault(require("../store/DataKinds"));
/**
 * @internal
 */
class DataSourceUpdates {
    constructor(store, hasEventListeners, onChange) {
        this.store = store;
        this.hasEventListeners = hasEventListeners;
        this.onChange = onChange;
    }
    init(userKeyId, allData, callback) {
        if (userKeyId !== this.store.user.keyId) {
            callback === null || callback === void 0 ? void 0 : callback();
            return;
        }
        const checkForChanges = this.hasEventListeners();
        const doInit = (oldData) => __awaiter(this, void 0, void 0, function* () {
            yield this.store.init(allData);
            Promise.resolve().then(() => {
                if (checkForChanges) {
                    const updatedKeys = Object.keys(allData)
                        .flatMap((namespace) => {
                        const oldDataForKind = (oldData === null || oldData === void 0 ? void 0 : oldData[namespace]) || {};
                        const newDataForKind = allData[namespace];
                        const mergedData = Object.assign(Object.assign({}, oldDataForKind), newDataForKind);
                        return Object.keys(mergedData)
                            .filter((key) => this.isUpdated(oldDataForKind && oldDataForKind[key], newDataForKind && newDataForKind[key]));
                    });
                    updatedKeys.length > 0 && this.onChange(updatedKeys);
                }
            });
            callback === null || callback === void 0 ? void 0 : callback();
        });
        if (checkForChanges) {
            const [flags, version] = this.store.all(DataKinds_1.default.Flags);
            const oldData = {
                flags,
                version
            };
            doInit(oldData);
        }
        else {
            doInit();
        }
    }
    upsert(userKeyId, kind, data, callback) {
        if (userKeyId !== this.store.user.keyId) {
            callback === null || callback === void 0 ? void 0 : callback();
            return;
        }
        const { key } = data;
        const checkForChanges = this.hasEventListeners();
        const doUpsert = (oldItem) => __awaiter(this, void 0, void 0, function* () {
            yield this.store.upsert(kind, data);
            Promise.resolve().then(() => {
                if (checkForChanges && this.isUpdated(oldItem, data[key])) {
                    this.onChange([key]);
                }
            });
            callback === null || callback === void 0 ? void 0 : callback();
        });
        if (checkForChanges) {
            const item = this.store.get(kind, key);
            doUpsert(item || undefined);
        }
        else {
            doUpsert();
        }
    }
    isUpdated(oldData, newData) {
        return !oldData || !newData || newData.version > oldData.version;
    }
}
exports.default = DataSourceUpdates;
//# sourceMappingURL=DataSourceUpdates.js.map