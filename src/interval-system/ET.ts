import PitchedObj from "../note/PitchedObj";

const ET = {
    bestFitET: (pitchedArr: PitchedObj[],  maxBase = 53): number => {
        let best = 0,
            minError = Infinity;
        for (let base = 1; base <= maxBase; base++) {
            let error = ET.errorInET(pitchedArr, base);
            if (error < minError) {
                best = base;
                minError = error;
            }
        }
    
        return best;
    },
    bestFitETs: (pitchedArr: PitchedObj[],  maxBase = 53, howMany = 10): number[] => {
        if (howMany < 1) howMany = maxBase;

        let errorArr: [number, number][] = [];
        for (let base = 1; base <= maxBase; base++) {
            let error = ET.errorInET(pitchedArr, base);
            errorArr.push([base, error]);
        }
        let sorted = errorArr.sort((a, b) => a[1] - b[1]);
        return sorted.map((pair) => pair[0]).slice(0, howMany);
    },
    /**
     * Returns the total error of `pitches` compared to `base`-ET
     * @param metric Error measure, either `rms` (Root Mean Square Error) or `abs` (Mean Absolute Error)
     * @return mean error in cents 
     */
    errorInET: (pitchedArr: PitchedObj[], base: number = 12, metric = "rms"): number => {
        let sum = 0;
        metric = metric.toLowerCase();
        if (metric == "rms") {
            for (let pitch of pitchedArr) sum += pitch.errorInET(base) ** 2;
            sum = Math.sqrt(sum);
        } else if (metric == "abs") {
            for (let pitch of pitchedArr) sum += Math.abs(pitch.errorInET(base));
        }
        return sum / pitchedArr.length;
    }
}

export default ET;