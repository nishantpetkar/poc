// const h3 = require("h3-js");
// const geohash = require("ngeohash");
const fs = require("fs");
// var lineReader = require("readline").createInterface({
//     input: fs.createReadStream("./data4.csv")
// });

// lineReader.on("line", (line) => {
//     var split_line = line.split(",");
//     fs.appendFileSync("./data4-geohash.csv", ","+geohash.encode(split_line[2], split_line[3], 6));
// });

var geohash_str = fs.readFileSync("./data4-geohash.csv").toString();
var geohash_array = geohash_str.split(",");
var geohashes = Array.from(new Set(geohash_array));

console.log(geohashes.length);
fs.writeFileSync("./data4-geohash.csv", geohashes);