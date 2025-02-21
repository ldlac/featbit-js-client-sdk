/**
 * Interface for type validation.
 */
export interface TypeValidator {
    messages?: string[];
    is(u: unknown): boolean;
    getType(): string;
}
/**
 * Validate a factory or instance.
 */
export declare class FactoryOrInstance implements TypeValidator {
    is(factoryOrInstance: unknown): boolean;
    getType(): string;
}
/**
 * Validate a basic type.
 */
export declare class Type<T> implements TypeValidator {
    private typeName;
    protected typeOf: string;
    constructor(typeName: string, example: T);
    is(u: unknown): u is T;
    getType(): string;
}
/**
 * Validate an array of the specified type.
 *
 * This does not validate instances of types. All class instances
 * of classes will simply objects.
 */
export declare class TypeArray<T> implements TypeValidator {
    private typeName;
    protected typeOf: string;
    constructor(typeName: string, example: T);
    is(u: unknown): u is T;
    getType(): string;
}
/**
 * Validate a value is a number and is greater or eval than a minimum.
 */
export declare class NumberWithMinimum extends Type<number> {
    readonly min: number;
    constructor(min: number);
    is(u: unknown): u is number;
}
/**
 * Validate a value is a string and it matches the given expression.
 */
export declare class StringMatchingRegex extends Type<string> {
    readonly expression: RegExp;
    constructor(expression: RegExp);
    is(u: unknown): u is string;
}
/**
 * Validate a value is a function.
 */
export declare class Function implements TypeValidator {
    is(u: unknown): u is (...args: any[]) => void;
    getType(): string;
}
export declare class NullableBoolean implements TypeValidator {
    is(u: unknown): boolean;
    getType(): string;
}
export declare class BootstrapValidator implements TypeValidator {
    messages: string[];
    is(u: unknown): boolean;
    getType(): string;
}
export declare class UserValidator implements TypeValidator {
    messages: string[];
    is(u: unknown): boolean;
    getType(): string;
}
/**
 * Validate a value is a date. Values which are numbers are treated as dates and any string
 * which if compliant with `time.RFC3339Nano` is a date.
 */
export declare class DateValidator implements TypeValidator {
    is(u: unknown): boolean;
    getType(): string;
}
/**
 * Validates that a string is a valid kind.
 */
export declare class KindValidator extends StringMatchingRegex {
    constructor();
    is(u: unknown): u is string;
}
/**
 * A set of standard type validators.
 */
export declare class TypeValidators {
    static readonly String: Type<string>;
    static readonly Number: Type<number>;
    static readonly ObjectOrFactory: FactoryOrInstance;
    static readonly Object: Type<object>;
    static readonly StringArray: TypeArray<string>;
    static readonly Boolean: Type<boolean>;
    static readonly User: Type<object>;
    static readonly Bootstrap: Type<object>;
    static readonly Function: Function;
    static createTypeArray<T>(typeName: string, example: T): TypeArray<T>;
    static numberWithMin(min: number): NumberWithMinimum;
    static stringMatchingRegex(expression: RegExp): StringMatchingRegex;
    static readonly Date: DateValidator;
    static readonly Kind: KindValidator;
    static readonly NullableBoolean: NullableBoolean;
}
//# sourceMappingURL=Validators.d.ts.map