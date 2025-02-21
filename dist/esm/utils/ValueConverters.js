"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueConverters = void 0;
class ValueConverters {
    static bool(value) {
        if ((value === null || value === void 0 ? void 0 : value.toUpperCase()) === 'TRUE') {
            return ValueConverters.success(true);
        }
        if ((value === null || value === void 0 ? void 0 : value.toUpperCase()) === 'FALSE') {
            return ValueConverters.success(false);
        }
        return ValueConverters.error();
    }
    static number(value) {
        const num = Number(value);
        if (Number.isNaN(num)) {
            return ValueConverters.error();
        }
        return ValueConverters.success(num);
    }
    static string(value) {
        return ValueConverters.success(value);
    }
    static json(value) {
        try {
            const val = JSON.parse(value);
            return ValueConverters.success(val);
        }
        catch (err) {
            return ValueConverters.error();
        }
    }
    static success(value) {
        return {
            isSucceeded: true,
            value: value
        };
    }
    static error() {
        return {
            isSucceeded: false
        };
    }
}
exports.ValueConverters = ValueConverters;
//# sourceMappingURL=ValueConverters.js.map