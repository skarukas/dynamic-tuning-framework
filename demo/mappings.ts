import { ScaleMapping, FreqRatio, ETPitch, ETMapping } from "../index";

let map = new ScaleMapping(12);

console.log(map); // 12-ET

map.set(3, new ETPitch(3.1));
map.set(13, new FreqRatio(16, 15)); // should overwrite
map.set(64, new FreqRatio(5));
map.set(58, new FreqRatio(7));
map.set(55, (new ETPitch(55.5).asFrequency()));

console.log("git em");
for (let i = 0; i <= 24; i++) {
    console.log(map.get(i));
}

let map2 = new ETMapping(19, 12);

console.log("git em");
for (let i = 60; i <= 72; i++) {
    console.log(map2.get(i).asET()); // this doesn't seem right
}