import { PitchedObj } from "../internal";
/**
 * Higher level functions for dealing with equal-tempered collections.
 */
declare const ET: {
    /**
     * Generate the equally divided (n-ET) scale that best approximates the given `Interval` or `Notes`.
     * `Notes` are compared to a fixed scale beginning on C, `MIDIPitch(0)`.
     *
     * @param pitched `Note(s)` or `Interval(s)`
     * @param maxBase The maximum number of divisions of the octave. Defaults to 53.
     *
     * @return The ET base whose scale best approximates the given pitch(es).
     */
    bestFitET(pitched: PitchedObj | PitchedObj[], maxBase?: number): number;
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
    bestFitETs(pitched: PitchedObj | PitchedObj[], maxBase?: number, howMany?: number): number[];
    /**
     * Calculate the mean error of a set of pitches compared to `base`-ET.
     * `Notes` are compared to a fixed scale beginning on C, `MIDIPitch(0)`.
     * @param pitched `Note(s)` or `Interval(s)`
     * @param base Number of divisions for the equally divided scaled. Defaults to 12.
     * @param metric Error measure, either `rms` (Root Mean Square Error) or `abs` (Mean Absolute Error)
     *
     * @returns The mean error in cents.
     */
    errorInET(pitched: PitchedObj | PitchedObj[], base?: number, metric?: string): number;
    /**
     * Calculates the step size in cents for an equal division of the octave.
     */
    stepSizeForET(base: number): number;
};
export default ET;
