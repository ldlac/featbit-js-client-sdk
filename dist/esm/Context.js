"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Context {
    /**
     * Contexts should be created using the static factory method {@link Context.fromUser}.
     *
     * The factory methods are static functions within the class because they access private
     * implementation details, so they cannot be free functions.
     */
    constructor(valid, message) {
        this.valid = valid;
        this.message = message;
    }
    static fromUser(user) {
        if (!user) {
            return Context.contextForError('No user specified');
        }
        const { keyId, name } = user;
        if (keyId === undefined || keyId === null || keyId.trim() === '') {
            return Context.contextForError('key is mandatory');
        }
        const context = new Context(true);
        context._user = user;
        return context;
    }
    get user() {
        return this._user;
    }
    get keyId() {
        return this._user.keyId;
    }
    value(property) {
        var _a, _b, _c, _d, _e;
        if (property === 'keyId') {
            return (_a = this._user) === null || _a === void 0 ? void 0 : _a.keyId;
        }
        else if (property === 'name') {
            return (_b = this._user) === null || _b === void 0 ? void 0 : _b.name;
        }
        else {
            return (_e = (_d = (_c = this._user) === null || _c === void 0 ? void 0 : _c.customizedProperties) === null || _d === void 0 ? void 0 : _d.find(x => x.name === property)) === null || _e === void 0 ? void 0 : _e.value;
        }
    }
    static contextForError(message) {
        return new Context(false, message);
    }
}
exports.default = Context;
//# sourceMappingURL=Context.js.map