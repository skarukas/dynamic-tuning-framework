import { PitchedObj, ETInterval } from "../internal";

/**
 * Higher level functions for dealing with equal-tempered collections.
 */
const ET = {
    /**
     * Generate the equally divided (n-ET) scale that best approximates the given `Interval` or `Notes`.
     * `Notes` are compared to a fixed scale beginning on C, `MIDIPitch(0)`.
     * 
     * @param pitched `Note(s)` or `Interval(s)`
     * @param maxBase The maximum number of divisions of the octave. Defaults to 53.
     * 
     * @return The ET base whose scale best approximates the given pitch(es).
     */
    bestFitET(pitched: PitchedObj[] | PitchedObj,  maxBase = 53): number {
        if (!(pitched instanceof Array)) pitched = [pitched];

        let best = 0,
            minError = Infinity;
        for (let base = 1; base <= maxBase; base++) {
            let error = ET.errorInET(pitched, base);
            if (error < minError) {
                best = base;
                minError = error;
            }
        }
    
        return best;
    },
    /**
     * Generate the equally divided (n-ET) scales that best approximate the given `Interval` or `Notes`.
     * `Notes` are compared to a fixed scale beginning on C, `MIDIPitch(0)`.
     * 
     * @param pitched `Note(s)` or `Interval(s)`
     * @param maxBase The maximum number of divisions of the octave. Defaults to 53.
     * @param howMany How many bases to return.
     * 
     * @return An array of ET bases, sorted by the degree to which they fit the input.
     */
    bestFitETs(pitched: PitchedObj[] | PitchedObj,  maxBase = 53, howMany = 10): number[] {
        if (!(pitched instanceof Array)) pitched = [pitched];
        if (howMany < 1) howMany = maxBase;

        let errorArr: [number, number][] = [];
        for (let base = 1; base <= maxBase; base++) {
            let error = ET.errorInET(pitched, base);
            errorArr.push([base, error]);
        }
        // sort by ascending error, or base if error is equal
        let sorted = errorArr.sort((a, b) => (a[1] === b[1])? a[0] - b[0] : a[1] - b[1]);
        return sorted.map((pair) => pair[0]).slice(0, howMany);
    },
    /**
     * Calculate the mean error of a set of pitches compared to `base`-ET. 
     * `Notes` are compared to a fixed scale beginning on C, `MIDIPitch(0)`.
     * @param pitched `Note(s)` or `Interval(s)`
     * @param base Number of divisions for the equally divided scaled. Defaults to 12.
     * @param metric Error measure, either `rms` (Root Mean Square Error) or `abs` (Mean Absolute Error)
     * 
     * @returns The mean error in cents.
     */
    errorInET(pitched: PitchedObj[] | PitchedObj, base: number = 12, metric = "rms"): number {
        if (!(pitched instanceof Array)) pitched = [pitched];
        let sum = 0;
        metric = metric.toLowerCase();

        if (metric == "rms") {
            for (let pitch of pitched) sum += pitch.errorInET(base) ** 2;
            sum = Math.sqrt(sum);
        } else if (metric == "abs") {
            for (let pitch of pitched) sum += Math.abs(pitch.errorInET(base));
        }
        return sum / pitched.length;
    },
    /**
     * Calculates the step size in cents for an equal division of the octave.
     */
    stepSizeForET(base: number): number {
        return (new ETInterval(1, base)).cents();
    }
}

export default ET;