// const decode = require('geojson-polyline').decode;
// var data = require("./maa-chirala.json");
// const h3 = require("h3-js");
var geohash = require("ngeohash");
var fs = require("fs");

/* polyline data to lat long */
// for(var i = 0; i < data.routes[0].legs[0].steps.length; i++) {
//     const polygon = {
//         type: 'Polygon',
//         coordinates: [data.routes[0].legs[0].steps[i].polyline.points]
//     };
//     fs.appendFileSync("./maa-chirala-latlng.txt", "\n"+decode(polygon).coordinates[0]);
// }

/* lat long to h3 */
var str = fs.readFileSync("./maa-chirala-latlng.txt").toString().split(",");

var geohash_array = [];
for(var i = 0; i < str.length; i += 2) {
    geohash_array.push(geohash.encode(parseFloat(str[i+1]), parseFloat(str[i]), 6));
}
var geohashes = Array.from(new Set(geohash_array));

console.log(geohashes.length);
fs.writeFileSync("./maa-chirala-geohash.csv", geohashes);