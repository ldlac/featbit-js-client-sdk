"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validators_1 = require("../options/Validators");
/**
 * Attempt to produce a string representation of a value.
 * The format should be roughly comparable to `util.format`
 * aside from object which will be JSON versus the `util.inspect`
 * format.
 * @param val
 * @returns A string representation of the value if possible.
 */
function tryStringify(val) {
    if (typeof val === 'string') {
        return val;
    }
    if (val === undefined) {
        return 'undefined';
    }
    if (val === null) {
        return 'null';
    }
    if (Object.prototype.hasOwnProperty.call(val, 'toString')) {
        try {
            return val.toString();
        }
        catch (_a) {
            /* Keep going */
        }
    }
    if (typeof val === 'bigint') {
        return `${val}n`;
    }
    try {
        return JSON.stringify(val);
    }
    catch (error) {
        if (error instanceof TypeError && error.message.indexOf('circular') >= 0) {
            return '[Circular]';
        }
        return '[Not Stringifiable]';
    }
}
/**
 * Attempt to produce a numeric representation.
 * BigInts have an `n` suffix.
 * @param val
 * @returns The numeric representation or 'NaN' if not numeric.
 */
function toNumber(val) {
    // Symbol has to be treated special because it will
    // throw an exception if an attempt is made to convert it.
    if (typeof val === 'symbol') {
        return 'NaN';
    }
    if (typeof val === 'bigint') {
        return `${val}n`;
    }
    return String(Number(val));
}
/**
 * Attempt to produce an integer representation.
 * BigInts have an `n` suffix.
 * @param val
 * @returns The integer representation or 'NaN' if not numeric.
 */
function toInt(val) {
    if (typeof val === 'symbol') {
        return 'NaN';
    }
    if (typeof val === 'bigint') {
        return `${val}n`;
    }
    return String(parseInt(val, 10));
}
/**
 * Attempt to produce a float representation.
 * BigInts have an `n` suffix.
 * @param val
 * @returns The integer representation or 'NaN' if not numeric.
 */
function toFloat(val) {
    if (typeof val === 'symbol') {
        return 'NaN';
    }
    return String(parseFloat(val));
}
// Based on:
// https://nodejs.org/api/util.html#utilformatformat-args
// The result will not match browser exactly, but it should get the
// right information through.
const escapes = {
    s: (val) => tryStringify(val),
    d: (val) => toNumber(val),
    i: (val) => toInt(val),
    f: (val) => toFloat(val),
    j: (val) => tryStringify(val),
    o: (val) => tryStringify(val),
    O: (val) => tryStringify(val),
    c: () => '',
};
/**
 * A basic formatted for use where `util.format` is not available.
 * This will not be as performant, but it will produce formatted
 * messages.
 *
 * @internal
 *
 * @param args
 * @returns Formatted string.
 */
function format(...args) {
    var _a;
    const formatString = args.shift();
    if (Validators_1.TypeValidators.String.is(formatString)) {
        let out = '';
        let i = 0;
        while (i < formatString.length) {
            const char = formatString.charAt(i);
            if (char === '%') {
                const nextIndex = i + 1;
                if (nextIndex < formatString.length) {
                    const nextChar = formatString.charAt(i + 1);
                    if (nextChar in escapes && args.length) {
                        const value = args.shift();
                        // This rule is for math.
                        // eslint-disable-next-line no-unsafe-optional-chaining
                        out += (_a = escapes[nextChar]) === null || _a === void 0 ? void 0 : _a.call(escapes, value);
                    }
                    else if (nextChar === '%') {
                        out += '%';
                    }
                    else {
                        out += `%${nextChar}`;
                    }
                    i += 2;
                }
            }
            else {
                out += char;
                i += 1;
            }
        }
        // If there are any args left after we exhaust the format string
        // then just stick those on the end.
        if (args.length) {
            if (out.length) {
                out += ' ';
            }
            out += args.map(tryStringify).join(' ');
        }
        return out;
    }
    return args.map(tryStringify).join(' ');
}
exports.default = format;
//# sourceMappingURL=format.js.map