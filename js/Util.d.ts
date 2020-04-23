declare const Util: {
    /** Round `n` to a certain number of decimal `places`. */
    round: (n: number, places?: number) => number;
    /** Calculate the logarithm of `n` to a certain `base`. */
    log: (n: number, base: number) => number;
    /** Calculate the log of `n`, base 2. */
    log2: (n: number) => number;
    /** Calculate the modulo of two numbers. In contrast to `%`, this never returns a negative number. */
    mod: (n: number, base: number) => number;
    /**
     * Calculate the quotient and remainder when dividing two numbers
     * @returns A pair with the form `[quotient, remainder]`
     */
    divide: (n: number, d: number) => [number, number];
    /**
     * Perform an operation analagous to modulo but with exponentiation instead of multiplication.
     * Essentially finds the "remainder" of calculating a logarithm.
     */
    powerMod: (n: number, base: number) => number;
    /** Calculate the next furthest integer away from zero. */
    absCeil: (n: number) => number;
    /** The frequency equal to A4 (MIDI note 69). */
    refA: number;
    /**
     * Calculate the frequency representation of an equal-tempered pitch.
     * Equates MIDI pitch 69 with `Util.refA`, and equates all equal-tempered zero values.
     */
    ETToFreq: (pitch: number, base?: number) => number;
    /**
     * Calculate the equal-tempered pitch representation of a frequency.
     * Equates MIDI pitch 69 with `Util.refA`, and equates all equal-tempered zero values.
     */
    freqToET: (freq: number, base?: number) => number;
    /**
     * Return the chromatic (12-ET) note name of a pitch.
     *
     * @param pitch A MIDI pitch.
     * @returns The note name as a string (always using sharps).
     */
    pitchToChromaticNoteName: (pitch: number) => string;
    /**
     * Convert a decimal to a fraction.
     * Give the rational approximation of a number using continued fractions.
     *
     * @param n A floating-point number.
     * @param places The number of places at which to round. Defaults to 9.
     *
     * @return A pair of numbers in the form `[numerator, denominator]`.
     */
    dtf(n: number, places?: number): number[];
    /** All previously calculated prime numbers. */
    __primes__: any[];
    /** Generate all prime numbers up to `limit` (inclusive). */
    primesUpTo(limit: number): number[];
    /** Find the largest prime factor of an integer. */
    largestPrimeFactor(n: number): number;
    /** Get all possible unordered pairs (2-combinations) of an array. */
    getPairs<T>(arr: T[]): T[][];
    /**
     * Find the minimum element in an array.
     *
     * @param lessThan Custom callback for comparing non-numeric types.
     *
     * @returns The minimum value and its index, wrapped in an object `{index, value}`.
     */
    getMin<T_1>(arr: T_1[], lessThan?: (a: T_1, b: T_1) => boolean): {
        index: number;
        value: T_1;
    };
    /** Check whether `index` is an integer in the interval `[0, length)`. */
    isValidIndex: (index: number, length: number) => boolean;
};
export default Util;
