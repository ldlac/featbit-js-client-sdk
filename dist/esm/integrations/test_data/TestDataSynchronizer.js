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
class TestDataSynchronizer {
    constructor(dataSourceUpdates, initialFlags, onStop, listeners) {
        this.dataSourceUpdates = dataSourceUpdates;
        this.onStop = onStop;
        this.listeners = listeners;
        this.userKeyId = 'test-user-key-id';
        // make copies of these objects to decouple them from the originals
        // so updates made to the originals don't affect these internal data.
        this.flags = [...initialFlags];
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.listeners.forEach(({ deserializeData, processJson }) => {
                const data = deserializeData(this.flags);
                processJson(this.userKeyId, data);
            });
        });
    }
    identify() {
        // no-op
    }
    stop() {
        this.onStop();
    }
    close() {
        this.stop();
    }
    upsert(kind, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.dataSourceUpdates.upsert(this.userKeyId, kind, value, () => {
                    resolve();
                });
            });
        });
    }
}
exports.default = TestDataSynchronizer;
//# sourceMappingURL=TestDataSynchronizer.js.map