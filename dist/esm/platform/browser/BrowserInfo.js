"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const version_1 = require("../../version");
class BrowserInfo {
    get appType() {
        return 'Browser-Client-SDK';
    }
    platformData() {
        return {
            os: {},
            name: 'Browser',
            additional: {},
        };
    }
    sdkData() {
        return {
            name: version_1.name,
            version: version_1.version,
            userAgentBase: this.appType
        };
    }
}
exports.default = BrowserInfo;
//# sourceMappingURL=BrowserInfo.js.map