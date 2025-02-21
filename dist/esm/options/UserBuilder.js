"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBuilder = void 0;
/**
 * Creates an instance of the FeatBit user.
 *
 * @return
 *   The new {@link IUser} instance.
 */
class UserBuilder {
    constructor(keyId) {
        this._keyId = '';
        this._name = '';
        this._custom = [];
        this._keyId = keyId;
    }
    name(name) {
        this._name = name;
        return this;
    }
    custom(propertyName, value) {
        var _a;
        (_a = this._custom) === null || _a === void 0 ? void 0 : _a.push({ name: propertyName, value: `${value}` });
        return this;
    }
    build() {
        return {
            name: this._name,
            keyId: this._keyId,
            customizedProperties: this._custom
        };
    }
}
exports.UserBuilder = UserBuilder;
//# sourceMappingURL=UserBuilder.js.map