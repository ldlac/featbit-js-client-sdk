"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Messages for issues which can be encountered from processing the configuration options.
 */
class OptionMessages {
    static optionBelowMinimum(name, value, min) {
        return `Config option "${name}" had invalid value of ${value}, using minimum of ${min} instead`;
    }
    static unknownOption(name) {
        return `Ignoring unknown config option "${name}"`;
    }
    static wrongOptionType(name, expectedType, actualType) {
        return `Config option "${name}" should be of type ${expectedType}, got ${actualType}, using default value`;
    }
    static wrongOptionTypeBoolean(name, actualType) {
        return `Config option "${name}" should be a boolean, got ${actualType}, converting to boolean`;
    }
    static partialEndpoint(name) {
        return `You have set custom uris without specifying the ${name} URI; connections may not work properly`;
    }
    static mandatory(name) {
        return `${name} is mandatory`;
    }
    static invalidOptionValue(name) {
        return `Invalid option value: ${name}`;
    }
    static missingKeyInBootstrapValue(key) {
        return `Missing key "${key}" in bootstrap value`;
    }
}
exports.default = OptionMessages;
//# sourceMappingURL=OptionMessages.js.map