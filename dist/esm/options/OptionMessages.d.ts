/**
 * Messages for issues which can be encountered from processing the configuration options.
 */
export default class OptionMessages {
    static optionBelowMinimum(name: string, value: number, min: number): string;
    static unknownOption(name: string): string;
    static wrongOptionType(name: string, expectedType: string, actualType: string): string;
    static wrongOptionTypeBoolean(name: string, actualType: string): string;
    static partialEndpoint(name: string): string;
    static mandatory(name: string): string;
    static invalidOptionValue(name: string): string;
    static missingKeyInBootstrapValue(key: string): string;
}
//# sourceMappingURL=OptionMessages.d.ts.map