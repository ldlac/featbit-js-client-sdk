"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Regex = void 0;
const isNullOrUndefined_1 = require("./isNullOrUndefined");
class Regex {
    static fromString(patternString) {
        let flags = '';
        const match = patternString.match(Regex.patternWithFlags);
        if (match) {
            patternString = match[1]; // Update the pattern string
            flags = match[2]; // Update the flags
        }
        return new RegExp(patternString, flags);
    }
    static isNullOrWhiteSpace(str) {
        return (0, isNullOrUndefined_1.isNullOrUndefined)(str) || !str.replace(Regex.whiteSpaceRegex, '').length;
    }
}
exports.Regex = Regex;
Regex.patternWithFlags = /\/(.*)\/([a-z]*)/i;
Regex.whiteSpaceRegex = /\s/g;
//# sourceMappingURL=Regex.js.map