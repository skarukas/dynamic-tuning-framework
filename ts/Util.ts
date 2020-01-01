const Util = {
    __primes: [],
    refA: 440,
    round: (n: number, places: number = 0): number => {
        let c = 10**places;
        return Math.round(n * c) / c;
    },
    log: (n: number, base: number) => Math.log(n) / Math.log(base),
    log2:(n: number) => Util.log(n, 2),
    /**
     * Calculate the modulo of two numbers. In contrast to `%`, this never returns a negative number.
     */
    mod: (n: number, base: number): number => ((n % base) + base) % base,
    powerMod: (n: number, base: number) => base**(Util.mod(Util.log(n, base), 1)),
    /**
     * Calculate the quotient and remainder when dividing two numbers
     * @returns A pair with the form `[quotient, remainder]`
     */
    divide: (n: number, d: number): [number, number] => [Math.floor(n / d), Util.mod(n, d)],
    /**
     * Calculate the next furthest integer away from zero.
     */
    absCeil: (n: number) => (n >= 0)? Math.ceil(n) : Math.floor(n),
    ETToFreq: (pitch: number, base: number = 12) => Util.refA * 2**(pitch/base - 69/12),
    freqToET: (freq: number, base: number = 12) => base * (Util.log2(freq / Util.refA) + 69/12),
    isValidIndex: (index: number, length: number): boolean => (index >= 0) && (Util.mod(index, 1) == 0) && (index < length),
    /**
     * Give the rational approximation of a number using continued fractions.
     * 
     * @param n A floating-point number.
     * @param places The number of places at which to round. Defaults to 9.
     */
    dtf(n: number, places: number = 9): number[] { 
        let err = 10 ** -places;
        let x = n,
            a = Math.floor(x),
            h1 = 1,
            h2,
            k1 = 0,
            k2,
            h = a,
            k = 1;
    
        while (x-a > err*k*k) {
            x = 1/(x-a);
            a = Math.floor(x);
            h2 = h1; h1 = h;
            k2 = k1; k1 = k;
            h = h2 + a*h1;
            k = k2 + a*k1;
        }
        return [h, k];
    },
    /**
     * Generate all prime numbers up to `limit` (inclusive).
     */
    primesUpTo(limit: number): number[] {
        if (limit < 2) return [];

        let primes: number[] = Util.__primes;
        let i = primes.length - 1;

        // select already generated primes less than limit
        /**
         * TODO: use binary search instead
         */
        if (i >= 0 && limit <= primes[i]) {
            while (limit < primes[i]) i--;
            return primes.slice(0, i + 1);
        }

        i = (i == -1)? 2 : primes[i] + 1;
        // append primes up to limit
        outer: for (; i <= limit; i++) {
            for (let p of primes) {
                if (p > Math.sqrt(i)) break;
                if (i % p == 0) continue outer;
            }
            primes.push(i);
        }
        return primes.slice();
    },
    /**
     * Find the largest prime factor of an integer.
     */
    largestPrimeFactor(n: number): number {
        if (n % 1 !== 0) return 1;

        let primes = Util.primesUpTo(n);
        for (let i = primes.length - 1; i >= 0; i--) {
            if (n % primes[i] == 0) return primes[i];
        }
        return 1;
    },
    /**
     * Get all possible unordered pairs (2-combinations) of an array.
     */
    getPairs<T>(arr: T[]): T[][] {
        let result: T[][] = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                result.push([arr[i], arr[j]]);
            }
        }
        return result;
    },
    /**
     * Finds the minimum element in an array.
     * 
     * @param lessThan Custom callback for comparing non-numeric types.
     * 
     * @returns The minimum value and its index, wrapped in an object.
     */
    getMin<T>(arr: T[], lessThan?: (a: T, b: T) => boolean) : { index: number, value: T } {
        lessThan = (a, b) => a < b;
        let minIndex = 0,
            minValue = arr[0];
        for (let i = 0; i < arr.length; i++) {
            if (lessThan(arr[i], minValue)) {
                minIndex = i;
                minValue = arr[i];
            }
        }
        return { index: minIndex, value: minValue };
    }
}

export default Util;