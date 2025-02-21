"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canonicalizeUri = void 0;
// This function is designed to remove any trailing forward slashes at the end of the provided URI string
function canonicalizeUri(uri) {
    return uri.replace(/\/+$/, '');
}
exports.canonicalizeUri = canonicalizeUri;
//# sourceMappingURL=canonicalizeUri.js.map