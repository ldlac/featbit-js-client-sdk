"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeUser = void 0;
function serializeUser(user) {
    var _a;
    if (!user) {
        return '';
    }
    const builtInProperties = `${user.keyId},${user.name}`;
    const customizedProperties = (_a = user.customizedProperties) === null || _a === void 0 ? void 0 : _a.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }).map(p => `${p.name}:${p.value}`).join(',');
    return `${builtInProperties},${customizedProperties}`;
}
exports.serializeUser = serializeUser;
//# sourceMappingURL=serializeUser.js.map