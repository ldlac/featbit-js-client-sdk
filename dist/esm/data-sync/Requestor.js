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
const errors_1 = require("../errors");
const http_1 = require("../utils/http");
/**
 * @internal
 */
class Requestor {
    constructor(sdkKey, config, info, requests) {
        this.requests = requests;
        this.headers = (0, http_1.defaultHeaders)(sdkKey, info);
        this.uri = config.pollingUri;
    }
    /**
     * Perform a request and utilize the ETag cache. The ETags are cached in the
     * requestor instance.
     */
    request(requestUrl, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.requests.fetch(requestUrl, options);
            const body = yield res.text();
            return { res, body };
        });
    }
    requestData(timestamp, payload, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(payload)
            };
            try {
                const { res, body } = yield this.request(`${this.uri}?timestamp=${timestamp !== null && timestamp !== void 0 ? timestamp : 0}`, options);
                if (res.status !== 200 && res.status !== 304) {
                    const err = new errors_1.StreamingError(`Unexpected status code: ${res.status}`, res.status);
                    return cb(err, undefined);
                }
                return cb(undefined, res.status === 304 ? null : body);
            }
            catch (err) {
                return cb(err, undefined);
            }
        });
    }
}
exports.default = Requestor;
//# sourceMappingURL=Requestor.js.map