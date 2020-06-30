// const h3 = require("h3-js");
// const geohash = require("ngeohash");
// console.log(h3.h3ToGeo('8f3da218ea52a8c'));
// console.log(h3.geoToH3(28.68628, 77.22182, 13));
// console.log(h3.geoToH3(28.68583, 77.22188, 15));
// var stringSimilarity = require("string-similarity");
var fs = require("fs");

// var result = stringSimilarity.findBestMatch(fs.readFileSync("./data2-h3.csv").toString(), [
//     fs.readFileSync("./h3data-maa-hyderabad.csv").toString(),
//     // fs.readFileSync("./data1-h3.csv").toString(),
//     fs.readFileSync("./h3data.csv").toString()
// ]);

// console.log(result.bestMatchIndex);

// console.log(geohash.encode(28.68628, 77.22182, 7));
var path1 = fs.readFileSync("./data1-geohash.csv").toString().split(",");
var path2 = fs.readFileSync("./data4-geohash.csv").toString().split(",");

var first = null,
    second = null;
path2 = path2.reverse();
console.log(new Date().getTime());
for(var i = 0; i < path2.length; i++) {
    var index = path1.indexOf(path2[i]);
    if(index !== -1) {
        if(!first) {
            first = index;
        }
        else if(!second) {
            second = index;
        }
        else {
            break;
        }
    }
}
console.log(first);
console.log(second);
console.log(new Date().getTime());
if(first - second > 0) {
    console.log("backward");
}
else {
    console.log("forward");
}