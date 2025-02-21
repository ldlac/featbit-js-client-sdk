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
exports.DefaultEventSender = void 0;
const IEventSender_1 = require("./IEventSender");
const http_1 = require("../utils/http");
const errors_1 = require("../errors");
const sleep_1 = __importDefault(require("../utils/sleep"));
class DefaultEventSender {
    constructor(clientContext) {
        const { sdkKey, eventsUri, platform } = clientContext;
        const { info, requests } = platform;
        this.defaultHeaders = (0, http_1.defaultHeaders)(sdkKey, info);
        this.eventsUri = eventsUri;
        this.requests = requests;
    }
    send(payload, retry) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = {
                status: IEventSender_1.DeliveryStatus.Succeeded,
            };
            const headers = Object.assign({}, this.defaultHeaders);
            let error;
            try {
                const { status } = yield this.requests.fetch(this.eventsUri, {
                    headers,
                    body: payload,
                    method: 'POST',
                });
                if (status >= 200 && status <= 299) {
                    return res;
                }
                error = new errors_1.UnexpectedResponseError((0, http_1.httpErrorMessage)({ status, message: 'some events were dropped' }, 'event posting'));
                if (!(0, errors_1.isHttpRecoverable)(status)) {
                    res.status = IEventSender_1.DeliveryStatus.FailedAndMustShutDown;
                    res.error = error;
                    return res;
                }
            }
            catch (err) {
                error = err;
            }
            // recoverable but not retrying
            if (error && !retry) {
                res.status = IEventSender_1.DeliveryStatus.Failed;
                res.error = error;
                return res;
            }
            // wait 1 second before retrying
            yield (0, sleep_1.default)();
            return this.send(payload, false);
        });
    }
}
exports.DefaultEventSender = DefaultEventSender;
//# sourceMappingURL=DefaultEventSender.js.map