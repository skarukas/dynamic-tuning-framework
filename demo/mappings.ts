import { ScaleMapping, FreqRatio } from "../index";
import { ETPitch } from "../src/internal";

let map = new ScaleMapping(12);

console.log(map); // 12-ET

map.set(1, new ETPitch(61));
map.set(13, new FreqRatio(16, 15)); // should overwrite
map.set(2, new ETPitch(62));

console.log(map);