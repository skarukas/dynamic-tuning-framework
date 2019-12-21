const Util = {
    __primes: [],
    refA: 440,
    round: (n: number, places: number = 0): number => {
        let c = 10**places;
        return Math.round(n * c) / c;
    },
    log: (n: number, base: number) => Math.log(n) / Math.log(base),
    log2:(n: number) => Util.log(n, 2),
    mod: (n: number, base: number = 1): number => ((n % base) + base) % base,
    powerMod: (n: number, base: number) => base**(Util.mod(Util.log(n, base))),
    ETToFreq: (pitch: number, base: number = 12) => Util.refA * 2**((pitch - 69) / base),
    freqToET: (freq: number, base: number = 12) => base * Util.log2(freq / Util.refA) + 69,
    dtf(n: number, err: number = 1E-9): number[] { 
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
    generatePrimes(limit: number): number[] {
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
    largestPrimeFactor(n: number): number {
        let primes = Util.generatePrimes(n);
        for (let i = primes.length - 1; i >= 0; i--) {
            if (n % primes[i] == 0) return primes[i];
        }
        return 1;
    },
    getPairs<T>(arr: T[]): T[][] {
        let result: T[][] = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                result.push([arr[i], arr[j]]);
            }
        }
        return result;
    }
}

export { Util };