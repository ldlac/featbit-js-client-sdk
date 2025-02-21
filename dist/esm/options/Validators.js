"use strict";
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeValidators = exports.KindValidator = exports.DateValidator = exports.UserValidator = exports.BootstrapValidator = exports.NullableBoolean = exports.Function = exports.StringMatchingRegex = exports.NumberWithMinimum = exports.TypeArray = exports.Type = exports.FactoryOrInstance = void 0;
// The classes here are static, but needs to be instantiated to
// support the generic functionality. Which is why we do not care about using
// `this`
// These validators are also of trivial complexity, so we are allowing more than
// one per file.
const OptionMessages_1 = __importDefault(require("./OptionMessages"));
/**
 * Validate a factory or instance.
 */
class FactoryOrInstance {
    is(factoryOrInstance) {
        if (Array.isArray(factoryOrInstance)) {
            return false;
        }
        const anyFactory = factoryOrInstance;
        const typeOfFactory = typeof anyFactory;
        return typeOfFactory === 'function' || typeOfFactory === 'object';
    }
    getType() {
        return 'factory method or object';
    }
}
exports.FactoryOrInstance = FactoryOrInstance;
/**
 * Validate a basic type.
 */
class Type {
    constructor(typeName, example) {
        this.typeName = typeName;
        this.typeOf = typeof example;
    }
    is(u) {
        if (Array.isArray(u)) {
            return false;
        }
        return typeof u === this.typeOf;
    }
    getType() {
        return this.typeName;
    }
}
exports.Type = Type;
/**
 * Validate an array of the specified type.
 *
 * This does not validate instances of types. All class instances
 * of classes will simply objects.
 */
class TypeArray {
    constructor(typeName, example) {
        this.typeName = typeName;
        this.typeOf = typeof example;
    }
    is(u) {
        if (Array.isArray(u)) {
            if (u.length > 0) {
                return u.every((val) => typeof val === this.typeOf);
            }
            return true;
        }
        return false;
    }
    getType() {
        return this.typeName;
    }
}
exports.TypeArray = TypeArray;
/**
 * Validate a value is a number and is greater or eval than a minimum.
 */
class NumberWithMinimum extends Type {
    constructor(min) {
        super(`number with minimum value of ${min}`, 0);
        this.min = min;
    }
    is(u) {
        return typeof u === this.typeOf && u >= this.min;
    }
}
exports.NumberWithMinimum = NumberWithMinimum;
/**
 * Validate a value is a string and it matches the given expression.
 */
class StringMatchingRegex extends Type {
    constructor(expression) {
        super(`string matching ${expression}`, '');
        this.expression = expression;
    }
    is(u) {
        return !!u.match(this.expression);
    }
}
exports.StringMatchingRegex = StringMatchingRegex;
/**
 * Validate a value is a function.
 */
class Function {
    is(u) {
        // We cannot inspect the parameters and there isn't really
        // a generic function type we can instantiate.
        // So the type guard is here just to make TS comfortable
        // calling something after using this guard.
        return typeof u === 'function';
    }
    getType() {
        return 'function';
    }
}
exports.Function = Function;
class NullableBoolean {
    is(u) {
        return typeof u === 'boolean' || typeof u === 'undefined' || u === null;
    }
    getType() {
        return 'boolean | undefined | null';
    }
}
exports.NullableBoolean = NullableBoolean;
class BootstrapValidator {
    constructor() {
        this.messages = [];
    }
    is(u) {
        if (typeof u !== 'object' || u === null) {
            this.messages.push(OptionMessages_1.default.invalidOptionValue('bootstrap'));
            return false;
        }
        try {
            const bootstrap = u;
            for (let flag of bootstrap) {
                const hasMandatoryKeys = ['id', 'variation'].every((key) => Object.keys(flag).includes(key));
                const keys = Object.keys(flag);
                if (keys.includes('id')) {
                    this.messages.push(OptionMessages_1.default.missingKeyInBootstrapValue('id'));
                }
                if (keys.includes('variation')) {
                    this.messages.push(OptionMessages_1.default.missingKeyInBootstrapValue('variation'));
                }
                if (this.messages.length > 0) {
                    return false;
                }
            }
        }
        catch (_) {
            this.messages.push(OptionMessages_1.default.wrongOptionType('bootstrap', this.getType(), typeof u));
            return false;
        }
        return true;
    }
    getType() {
        return 'IFlagBase[]';
    }
}
exports.BootstrapValidator = BootstrapValidator;
class UserValidator {
    constructor() {
        this.messages = [];
    }
    is(u) {
        if (typeof u !== 'object' || u === null) {
            this.messages.push(OptionMessages_1.default.mandatory('user'));
            return false;
        }
        const user = u;
        if (typeof user.keyId !== 'string' || user.keyId.trim() === '') {
            this.messages.push(OptionMessages_1.default.mandatory('user.keyId'));
            return false;
        }
        if (typeof user.name !== 'string' || user.name.trim() === '') {
            this.messages.push(OptionMessages_1.default.mandatory('user.name'));
            return false;
        }
        return true;
    }
    getType() {
        return 'user';
    }
}
exports.UserValidator = UserValidator;
// Our reference SDK, Go, parses date/time strings with the time.RFC3339Nano format.
// This regex should match strings that are valid in that format, and no others.
// Acceptable:
//   2019-10-31T23:59:59Z, 2019-10-31T23:59:59.100Z,
//   2019-10-31T23:59:59-07, 2019-10-31T23:59:59-07:00, etc.
// Unacceptable: no "T", no time zone designation
const DATE_REGEX = /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d\d*)?(Z|[-+]\d\d(:\d\d)?)/;
/**
 * Validate a value is a date. Values which are numbers are treated as dates and any string
 * which if compliant with `time.RFC3339Nano` is a date.
 */
class DateValidator {
    is(u) {
        return typeof u === 'number' || (typeof u === 'string' && DATE_REGEX.test(u));
    }
    getType() {
        return 'date';
    }
}
exports.DateValidator = DateValidator;
/**
 * Validates that a string is a valid kind.
 */
class KindValidator extends StringMatchingRegex {
    constructor() {
        super(/^(\w|\.|-)+$/);
    }
    is(u) {
        return super.is(u) && u !== 'kind';
    }
}
exports.KindValidator = KindValidator;
/**
 * A set of standard type validators.
 */
class TypeValidators {
    static createTypeArray(typeName, example) {
        return new TypeArray(typeName, example);
    }
    static numberWithMin(min) {
        return new NumberWithMinimum(min);
    }
    static stringMatchingRegex(expression) {
        return new StringMatchingRegex(expression);
    }
}
exports.TypeValidators = TypeValidators;
TypeValidators.String = new Type('string', '');
TypeValidators.Number = new Type('number', 0);
TypeValidators.ObjectOrFactory = new FactoryOrInstance();
TypeValidators.Object = new Type('object', {});
TypeValidators.StringArray = new TypeArray('string[]', '');
TypeValidators.Boolean = new Type('boolean', true);
TypeValidators.User = new Type('object', {});
TypeValidators.Bootstrap = new Type('object', {});
TypeValidators.Function = new Function();
TypeValidators.Date = new DateValidator();
TypeValidators.Kind = new KindValidator();
TypeValidators.NullableBoolean = new NullableBoolean();
//# sourceMappingURL=Validators.js.map