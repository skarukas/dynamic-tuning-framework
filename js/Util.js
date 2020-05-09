const Util = {
    // ====== Math Utils ======
    /** Round `n` to a certain number of decimal `places`. */
    round: (n, places = 0) => {
        let c = Math.pow(10, places);
        return Math.round(n * c) / c;
    },
    /** Calculate the logarithm of `n` to a certain `base`. */
    log: (n, base) => Math.log(n) / Math.log(base),
    /** Calculate the log of `n`, base 2. */
    log2: (n) => Util.log(n, 2),
    /** Calculate the modulo of two numbers. In contrast to `%`, this never returns a negative number. */
    mod: (n, base) => {
        //correct for rounding err
        let m = (n % base);
        m = (Math.abs(m) < 1e-14) ? 0 : m;
        return (m + base) % base;
    },
    /**
     * Calculate the quotient and remainder when dividing two numbers
     * @returns A pair with the form `[quotient, remainder]`
     */
    divide: (n, d) => [Math.floor(n / d), Util.mod(n, d)],
    /**
     * Perform an operation analagous to modulo but with exponentiation instead of multiplication.
     * Essentially finds the "remainder" of calculating a logarithm.
     */
    powerMod: (n, base) => Math.pow(base, (Util.mod(Util.log(n, base), 1))),
    /** Calculate the next furthest integer away from zero. */
    absCeil: (n) => (n >= 0) ? Math.ceil(n) : Math.floor(n),
    // ====== Pitch / Frequency Conversion ======
    /** The frequency equal to A4 (MIDI note 69). */
    refA: 440,
    /**
     * Calculate the frequency representation of an equal-tempered pitch.
     * Equates MIDI pitch 69 with `Util.refA`, and equates all equal-tempered zero values.
     */
    ETToFreq: (pitch, base = 12) => Util.refA * Math.pow(2, (pitch / base - 69 / 12)),
    /**
     * Calculate the equal-tempered pitch representation of a frequency.
     * Equates MIDI pitch 69 with `Util.refA`, and equates all equal-tempered zero values.
     */
    freqToET: (freq, base = 12) => base * (Util.log2(freq / Util.refA) + 69 / 12),
    /**
     * Return the chromatic (12-ET) note name of a pitch.
     *
     * @param pitch A MIDI pitch.
     * @returns The note name as a string (always using sharps).
     */
    pitchToChromaticNoteName: (pitch) => {
        let noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        let pitchClass = Math.round(Util.mod(pitch, 12));
        return noteNames[pitchClass];
    },
    /**
     * Convert a decimal to a fraction.
     * Give the rational approximation of a number using continued fractions.
     *
     * @param n A floating-point number.
     * @param places The number of places at which to round. Defaults to 9.
     *
     * @return A pair of numbers in the form `[numerator, denominator]`.
     */
    dtf(n, places = 9) {
        let err = Math.pow(10, -places);
        let x = n, a = Math.floor(x), h1 = 1, h2, k1 = 0, k2, h = a, k = 1;
        while (x - a > err * k * k) {
            x = 1 / (x - a);
            a = Math.floor(x);
            h2 = h1;
            h1 = h;
            k2 = k1;
            k1 = k;
            h = h2 + a * h1;
            k = k2 + a * k1;
        }
        return [h, k];
    },
    // ====== Prime Numbers ======
    /** All previously calculated prime numbers. */
    __primes__: [],
    /** Generate all prime numbers up to `limit` (inclusive). */
    primesUpTo(limit) {
        if (limit < 2)
            return [];
        let primes = Util.__primes__;
        let i = primes.length - 1;
        // select already generated primes less than limit
        /**
         * TODO: use binary search instead
         */
        if (i >= 0 && limit <= primes[i]) {
            while (limit < primes[i])
                i--;
            return primes.slice(0, i + 1);
        }
        i = (i == -1) ? 2 : primes[i] + 1;
        // append primes up to limit
        outer: for (; i <= limit; i++) {
            for (let p of primes) {
                if (p > Math.sqrt(i))
                    break;
                if (i % p == 0)
                    continue outer;
            }
            primes.push(i);
        }
        return primes.slice();
    },
    /** Find the largest prime factor of an integer. */
    largestPrimeFactor(n) {
        if (n % 1 !== 0)
            return 1;
        let primes = Util.primesUpTo(n);
        for (let i = primes.length - 1; i >= 0; i--) {
            if (n % primes[i] == 0)
                return primes[i];
        }
        return 1;
    },
    // ====== Array Utils ======
    /** Get all possible unordered pairs (2-combinations) of an array. */
    getPairs(arr) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                result.push([arr[i], arr[j]]);
            }
        }
        return result;
    },
    /**
     * Find the minimum element in an array.
     *
     * @param lessThan Custom callback for comparing non-numeric types.
     *
     * @returns The minimum value and its index, wrapped in an object `{index, value}`.
     */
    getMin(arr, lessThan) {
        lessThan = (a, b) => a < b;
        let minIndex = 0, minValue = arr[0];
        for (let i = 0; i < arr.length; i++) {
            if (lessThan(arr[i], minValue)) {
                minIndex = i;
                minValue = arr[i];
            }
        }
        return { index: minIndex, value: minValue };
    },
    /** Check whether `index` is an integer in the interval `[0, length)`. */
    isValidIndex: (index, length) => (index >= 0) && (Util.mod(index, 1) == 0) && (index < length),
};
export default Util;
//# sourceMappingURL=Util.js.map