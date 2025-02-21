"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultEventSerializer = void 0;
const event_1 = require("./event");
class DefaultEventSerializer {
    serialize(events) {
        const payload = events
            .map(event => event instanceof event_1.EvalEvent || event instanceof event_1.MetricEvent ? event.toPayload() : null)
            .filter(event => event !== null);
        return JSON.stringify(payload);
    }
}
exports.DefaultEventSerializer = DefaultEventSerializer;
//# sourceMappingURL=DefaultEventSerializer.js.map