"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
/**
 * Wait before calling the same function. Useful for expensive calls.
 * Adapted from https://amitd.co/code/typescript/debounce.
 *
 * @return The debounced function.
 *
 * @example
 *
 * ```js
 * const debouncedFunction = debounce(e => {
 *   console.log(e);
 * }, 5000);
 *
 * // Console logs 'Hello world again ' after 5 seconds
 * debouncedFunction('Hello world');
 * debouncedFunction('Hello world again');
 * ```
 * @param fn The function to be debounced.
 * @param delayMs Defaults to 5 seconds.
 */
const debounce = (fn, delayMs = 5000) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delayMs);
    };
};
exports.debounce = debounce;
//# sourceMappingURL=debounce.js.map