"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlagBuilder = void 0;
// used only by tests
const IFlag_1 = require("../../evaluation/data/IFlag");
class FlagBuilder {
    constructor() {
        this._id = `xxxxx-${new Date().getTime()}-xxxxxx`;
        this._variationType = IFlag_1.VariationDataType.empty;
        this._sendToExperiment = false;
        this._variation = '';
        this._variations = [];
    }
    id(id) {
        this._id = id;
        return this;
    }
    key(key) {
        this._key = key;
        return this;
    }
    version(version) {
        this._version = version;
        return this;
    }
    sendToExperiment(val) {
        this._sendToExperiment = val;
        return this;
    }
    variation(variation) {
        this._variation = variation;
        return this;
    }
    variationType(variationType) {
        this._variationType = variationType;
        return this;
    }
    variations(variations) {
        this._variations = variations;
        return this;
    }
    build() {
        return {
            id: this._id,
            key: this._key,
            version: this._version,
            variationType: this._variationType,
            variations: this._variations,
            sendToExperiment: this._sendToExperiment,
            variation: this._variation,
            timestamp: new Date().getTime()
        };
    }
}
exports.FlagBuilder = FlagBuilder;
//# sourceMappingURL=FlagBuilder.js.map