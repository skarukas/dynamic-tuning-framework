declare const Util: {
    __primes: any[];
    refA: number;
    round: (n: number, places?: number) => number;
    log: (n: number, base: number) => number;
    log2: (n: number) => number;
    /**
     * Calculate the modulo of two numbers. In contrast to `%`, this never returns a negative number.
     */
    mod: (n: number, base: number) => number;
    powerMod: (n: number, base: number) => number;
    /**
     * Calculate the next furthest integer away from zero.
     */
    absCeil: (n: number) => number;
    ETToFreq: (pitch: number, base?: number) => number;
    freqToET: (freq: number, base?: number) => number;
    /**
     * Give the rational approximation of a number using continued fractions.
     *
     * @param n A floating-point number.
     * @param places The number of places at which to round. Defaults to 9.
     */
    dtf(n: number, places?: number): number[];
    /**
     * Generate all prime numbers up to `limit` (inclusive).
     */
    primesUpTo(limit: number): number[];
    /**
     * Find the largest prime factor of an integer.
     */
    largestPrimeFactor(n: number): number;
    /**
     * Get all possible unordered pairs (2-combinations) of an array.
     */
    getPairs<T>(arr: T[]): T[][];
    /**
     * Finds the minimum element in an array.
     *
     * @param lessThan Custom callback for comparing non-numeric types.
     *
     * @returns The minimum value and its index, wrapped in an object.
     */
    getMin<T_1>(arr: T_1[], lessThan?: (a: T_1, b: T_1) => boolean): {
        index: number;
        value: T_1;
    };
};
export default Util;
