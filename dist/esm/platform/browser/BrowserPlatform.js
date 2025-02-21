"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BrowserInfo_1 = __importDefault(require("./BrowserInfo"));
const BrowserRequests_1 = require("./BrowserRequests");
const BrowserWebSocket_1 = __importDefault(require("./BrowserWebSocket"));
class BrowserPlatform {
    constructor(options) {
        this.info = new BrowserInfo_1.default();
        this.requests = new BrowserRequests_1.BrowserRequests();
        this.webSocket = new BrowserWebSocket_1.default();
    }
}
exports.default = BrowserPlatform;
//# sourceMappingURL=BrowserPlatform.js.map