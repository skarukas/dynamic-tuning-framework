"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
const AdaptiveTuning = {
    currTimbre: null,
    calculateDissonance(notes) {
        /*
            assuming it's practical to implement sethares's algorithm
        */
    },
    /**
     * Finds the subset of the harmonic series that most closely matches the provided pitch collection.
     *
     * @param notes The pitches to be analyzed.
     * @param error Allowable rounding error (in semitones).
     *
     * @returns An object containing calculated partial numbers of the input array as well as the fundamental frequency in Hertz.
     */
    bestFitPartials(notes, error = 0.5) {
        let freqs = notes.map(n => n.getFrequency());
        return AdaptiveTuning.bestFitPartialsFromFreq(freqs, error);
    },
    /**
     * Finds the subset of the harmonic series that most closely matches the provided pitch collection.
     *
     * @param freqs An array of pitches to be analyzed, expressed in Hertz.
     * @param error Allowable rounding error (in semitones).
     *
     * @returns An object containing calculated partial numbers of the input array as well as the fundamental frequency in Hertz.
     */
    bestFitPartialsFromFreq(freqs, error = 0.5) {
        let min = internal_1.Util.getMin(freqs).value, ratios = freqs.map(n => n / min), partials = Array(freqs.length), fundamental;
        for (let i = 1; true; i++) {
            fundamental = min / i;
            let j;
            for (j = 0; j < freqs.length; j++) {
                let partial = ratios[j] * i, freqError = partial / Math.round(partial), pitchError = 12 * internal_1.Util.log2(freqError);
                if (Math.abs(pitchError) < error)
                    partials[j] = Math.round(partial);
                else
                    break;
            }
            if (j == freqs.length)
                break;
        }
        return {
            partials,
            fundamental,
            asTree() {
                return internal_1.IntervalTree.harmonicSeries(partials, new internal_1.Frequency(fundamental));
            }
        };
    }
};
exports.default = AdaptiveTuning;
//# sourceMappingURL=AdaptiveTuning.js.map