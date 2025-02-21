"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvalEvent = exports.MetricEvent = exports.PayloadEvent = exports.ShutdownEvent = exports.FlushEvent = exports.AsyncEvent = void 0;
class AsyncEvent {
    get hash() {
        return this.timestamp.toString();
    }
    constructor() {
        this.timestamp = (new Date()).getTime();
        this.isCompletedPromise = new Promise((resolve) => {
            this.resolveFn = resolve;
        });
    }
    waitForCompletion() {
        return this.isCompletedPromise;
    }
    complete() {
        var _a;
        (_a = this.resolveFn) === null || _a === void 0 ? void 0 : _a.call(this, this);
    }
}
exports.AsyncEvent = AsyncEvent;
class FlushEvent extends AsyncEvent {
}
exports.FlushEvent = FlushEvent;
class ShutdownEvent extends AsyncEvent {
}
exports.ShutdownEvent = ShutdownEvent;
class PayloadEvent {
    constructor() {
        this.timestamp = (new Date()).getTime();
    }
    get hash() {
        return this.timestamp.toString();
    }
    toPayload() {
    }
    ;
}
exports.PayloadEvent = PayloadEvent;
class MetricEvent extends PayloadEvent {
    constructor(user, eventName, appType, metricValue) {
        super();
        this.user = user;
        this.eventName = eventName;
        this.appType = appType;
        this.metricValue = metricValue;
    }
    userPayload() {
        return {
            keyId: this.user.keyId,
            name: this.user.name,
            customizedProperties: this.user.customizedProperties
        };
    }
    toPayload() {
        return {
            user: this.userPayload(),
            metrics: [{
                    route: 'index/metric',
                    timestamp: this.timestamp,
                    numericValue: this.metricValue,
                    appType: this.appType,
                    eventName: this.eventName,
                    type: 'CustomEvent'
                }]
        };
    }
    get hash() {
        const payload = this.toPayload();
        const hasObject = {
            user: payload.user,
            metrics: payload.metrics.map((m) => (Object.assign(Object.assign({}, m), { timestamp: undefined })))
        };
        return JSON.stringify(hasObject);
    }
}
exports.MetricEvent = MetricEvent;
class EvalEvent extends PayloadEvent {
    constructor(user, flagKey, variation, sendToExperiment) {
        super();
        this.user = user;
        this.flagKey = flagKey;
        this.variation = variation;
        this.sendToExperiment = sendToExperiment;
    }
    userPayload() {
        return {
            keyId: this.user.keyId,
            name: this.user.name,
            customizedProperties: this.user.customizedProperties
        };
    }
    toPayload() {
        return {
            user: this.userPayload(),
            variations: [{
                    featureFlagKey: this.flagKey,
                    sendToExperiment: this.sendToExperiment,
                    timestamp: this.timestamp,
                    variation: this.variation
                }]
        };
    }
    get hash() {
        const payload = this.toPayload();
        const hasObject = {
            user: payload.user,
            variations: payload.variations.map((m) => (Object.assign(Object.assign({}, m), { timestamp: undefined })))
        };
        return JSON.stringify(hasObject);
    }
}
exports.EvalEvent = EvalEvent;
//# sourceMappingURL=event.js.map